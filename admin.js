const form = document.querySelector('[data-login-form]');
const error = document.querySelector('[data-login-error]');

form?.addEventListener('submit', async event => {
  event.preventDefault();
  error.hidden = true;
  const button = form.querySelector('button');
  button.disabled = true;
  button.textContent = 'Entrando…';
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: form.password.value })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || 'No se pudo iniciar sesión.');
    window.location.href = '/?admin=1#inicio';
  } catch (exception) {
    error.textContent = exception.message;
    error.hidden = false;
    button.disabled = false;
    button.textContent = 'Entrar';
  }
});
