export const page = (content, className = 'page') => `<section class="${className}">${content}</section>`;

export const title = (eyebrow, heading, text = '') => `<div class="page-title"><p class="eyebrow">${eyebrow}</p><h1 class="display">${heading}</h1>${text ? `<p class="lead">${text}</p>` : ''}</div>`;
