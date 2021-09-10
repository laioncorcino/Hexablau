import { DEFAULTS } from '@core';


export function append(html = '', to = DEFAULTS.PAGE_WRAPPER) {
  const isMounted = document.querySelector(to);
  if (isMounted) {
    isMounted.insertAdjacentHTML('beforeend', html);
  }
}


export function prepend(html = '', to = DEFAULTS.PAGE_WRAPPER) {
  const isMounted = document.querySelector(to);
  if (isMounted) {
    isMounted.insertAdjacentHTML('afterbegin', html);
  }
}


export function insertAfter(html = '', to = DEFAULTS.PAGE_WRAPPER) {
  const isMounted = document.querySelector(to);
  if (isMounted) {
    isMounted.insertAdjacentHTML('afterend', html);
  }
}


export function insertBefore(html = '', to = DEFAULTS.PAGE_WRAPPER) {
  const isMounted = document.querySelector(to);
  if (isMounted) {
    isMounted.insertAdjacentHTML('beforebegin', html);
  }
}


export function randomId() {
  return `p${Math.random().toString(36).substring(7)}`;
}


export function resetRandomIds(object = {}) {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: randomId() }), {});
}