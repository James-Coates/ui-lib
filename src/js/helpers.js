export function logger(message) {
  console.log(message);
  return message;
}

export const qs = (selector, scope) => {
  const el = (scope || document.body).querySelector(selector);
  return el !== null ? el : undefined;
};

export function qsa(selector, scope) {
  return [].slice.call((scope || document.body).querySelectorAll(selector));
}

export const addEvent = (el, name, method) => {
  const fn = (e) => {
    e.preventDefault();
    method(e);
  };

  el.addEventListener(name, fn);

  return {
    remove() {
      el.removeEventListener(name, fn);
    },
  };
};

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
  return el;
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ' '
    );
  }
  return el;
};

export const toggleClass = (el, className) => {
  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
  return el;
};

export const hasClass = (el, className) => {
  let bool;
  if (el.classList) {
    bool = el.classList.contains(className);
  } else {
    bool = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
  return bool;
};

export const getClosestElement = (
  elemToStart,
  elemToFind,
  root = document.body
) => {
  let matches = root.querySelectorAll(elemToFind),
    el = elemToStart,
    i;

  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {}
  } while (i < 0 && (el = el.parentElement));
  return el;
};
