import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const dataDirectory = path.join(root, 'data');
const dataFile = path.join(dataDirectory, 'admin.json');
const adminPassword = process.env.ADMIN_PASSWORD || 'cambiar-esta-clave';
const glissandooEventsUrl = 'https://glissandoo.com/sites/am_lamatanza';
const sessionDuration = 8 * 60 * 60 * 1000;
const sessions = new Map();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

const defaultData = {
  settings: {
    enrollmentOpen: true,
    enrollmentCourse: '2026 / 2027',
    enrollmentDeadline: 'Hasta el 31 de octubre',
    contactEmail: 'bandalamatanza@gmail.com'
  },
  content: {},
  events: [
    { id: 'event-1', date: '2026-09-25', time: '20:30', title: 'Concierto Intercambio La Murada', location: 'CEIP Maestro Ismael García', published: true },
    { id: 'event-2', date: '2026-09-26', time: '17:30', title: 'Concierto Intercambio La Matanza', location: 'Parroquia de La Matanza', published: true },
    { id: 'event-3', date: '2026-10-07', time: '19:00', title: 'Pasacalles Fiestas La Matanza', location: 'Parroquia de La Matanza', published: true }
  ],
  gallery: [],
  messages: [],
  applications: []
};

async function readData() {
  try {
    return JSON.parse(await readFile(dataFile, 'utf8'));
  } catch {
    await mkdir(dataDirectory, { recursive: true });
    await writeFile(dataFile, JSON.stringify(defaultData, null, 2), 'utf8');
    return structuredClone(defaultData);
  }
}

async function saveData(data) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(data, null, 2), 'utf8');
}

function sendJson(response, status, payload, headers = {}) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  response.end(JSON.stringify(payload));
}

function parseCookies(request) {
  return Object.fromEntries((request.headers.cookie || '').split(';').filter(Boolean).map(part => {
    const index = part.indexOf('=');
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }));
}

function isAuthenticated(request) {
  const sessionId = parseCookies(request).lm_admin_session;
  const session = sessionId && sessions.get(sessionId);
  if (!session) return false;
  if (session.expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error('Payload demasiado grande.'));
    });
    request.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('JSON no válido.')); }
    });
    request.on('error', reject);
  });
}

function passwordMatches(candidate) {
  const expected = Buffer.from(adminPassword);
  const received = Buffer.from(String(candidate || ''));
  return expected.length === received.length && timingSafeEqual(expected, received);
}

async function handleApi(request, response, pathname) {
  if (request.method === 'GET' && pathname === '/api/public/glissandoo-events') {
    try {
      const remoteResponse = await fetch(`${glissandooEventsUrl}?_=${Date.now()}`, { headers: { 'User-Agent': 'La-Matanza-web/1.0' } });
      if (!remoteResponse.ok) throw new Error(`Glissandoo HTTP ${remoteResponse.status}`);
      const html = await remoteResponse.text();
      const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      const data = match ? JSON.parse(match[1]) : {};
      const events = (data?.props?.pageProps?.group?.events || [])
        .filter(event => event.datetime && event.displayName)
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      sendJson(response, 200, { source: glissandooEventsUrl, events });
    } catch (error) {
      sendJson(response, 502, { error: 'No se pudieron leer los eventos de Glissandoo.' });
    }
    return true;
  }
  if (request.method === 'GET' && pathname === '/api/public/data') {
    const data = await readData();
    sendJson(response, 200, { settings: data.settings, content: data.content || {} });
    return true;
  }
  if (request.method === 'POST' && pathname === '/api/public/messages') {
    const body = await readRequestBody(request);
    const data = await readData();
    data.messages.unshift({ id: `message-${Date.now()}`, createdAt: new Date().toISOString(), status: 'new', ...body });
    await saveData(data);
    sendJson(response, 201, { ok: true });
    return true;
  }
  if (request.method === 'POST' && pathname === '/api/public/applications') {
    const body = await readRequestBody(request);
    const data = await readData();
    data.applications.unshift({ id: `application-${Date.now()}`, createdAt: new Date().toISOString(), status: 'new', ...body });
    await saveData(data);
    sendJson(response, 201, { ok: true });
    return true;
  }
  if (request.method === 'GET' && pathname === '/api/admin/session') {
    sendJson(response, 200, { authenticated: isAuthenticated(request) });
    return true;
  }
  if (request.method === 'POST' && pathname === '/api/admin/login') {
    const body = await readRequestBody(request);
    if (!passwordMatches(body.password)) {
      sendJson(response, 401, { error: 'Contraseña incorrecta.' });
      return true;
    }
    const sessionId = randomBytes(32).toString('hex');
    sessions.set(sessionId, { expiresAt: Date.now() + sessionDuration });
    sendJson(response, 200, { ok: true }, { 'Set-Cookie': `lm_admin_session=${sessionId}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${sessionDuration / 1000}` });
    return true;
  }
  if (request.method === 'POST' && pathname === '/api/admin/logout') {
    const sessionId = parseCookies(request).lm_admin_session;
    if (sessionId) sessions.delete(sessionId);
    sendJson(response, 200, { ok: true }, { 'Set-Cookie': 'lm_admin_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0' });
    return true;
  }
  if (pathname.startsWith('/api/admin/')) {
    if (!isAuthenticated(request)) {
      sendJson(response, 401, { error: 'Sesión no válida.' });
      return true;
    }
    if (request.method === 'GET' && pathname === '/api/admin/data') {
      sendJson(response, 200, await readData());
      return true;
    }
    if (request.method === 'PUT' && pathname === '/api/admin/data') {
      const body = await readRequestBody(request);
      const current = await readData();
      const next = {
        settings: { ...current.settings, ...(body.settings || {}) },
        content: { ...(current.content || {}), ...(body.content || {}) },
        events: current.events,
        gallery: Array.isArray(body.gallery) ? body.gallery : current.gallery,
        messages: current.messages,
        applications: current.applications
      };
      await saveData(next);
      sendJson(response, 200, next);
      return true;
    }
    if (request.method === 'PATCH' && pathname.startsWith('/api/admin/inbox/')) {
      const [, , , , type, id] = pathname.split('/');
      const body = await readRequestBody(request);
      const data = await readData();
      const collection = Array.isArray(data[type]) ? data[type] : null;
      const item = collection?.find(entry => entry.id === id);
      if (!item) { sendJson(response, 404, { error: 'Mensaje no encontrado.' }); return true; }
      Object.assign(item, body);
      await saveData(data);
      sendJson(response, 200, item);
      return true;
    }
  }
  return false;
}

const server = createServer(async (request, response) => {
  try {
    const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (requestPath.startsWith('/api/')) {
      if (await handleApi(request, response, requestPath)) return;
      sendJson(response, 404, { error: 'API route not found.' });
      return;
    }
    const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
    if (relativePath === 'data' || relativePath.startsWith('data/')) {
      response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Forbidden');
      return;
    }
    const filePath = path.resolve(root, relativePath);
    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    const contents = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': types[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    response.end(contents);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, () => {
  if (!process.env.ADMIN_PASSWORD) console.warn('ADMIN_PASSWORD no está definido; usa una contraseña temporal solo para desarrollo.');
  console.log(`http://localhost:${port}`);
});
