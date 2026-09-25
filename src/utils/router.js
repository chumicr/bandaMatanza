export const ROUTE_ALIASES = Object.freeze({ curriculum: 'nuestra-historia' });

export function resolveRoute(hash = window.location.hash) {
  const requestedKey = (hash || '#inicio').slice(1) || 'inicio';
  return { requestedKey, key: ROUTE_ALIASES[requestedKey] || requestedKey };
}
