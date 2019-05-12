import {isBrowser} from "browser-or-node";

let prefixObject = {
  css: '',
  js: ''
};

if (isBrowser) {
  const styles = window.getComputedStyle(document.documentElement);
  const prefixString = Array.prototype.slice.call(styles).join('');
  const standardPrefixString = prefixString.match(/-(moz|webkit|ms)-/);
  const operaPrefixString = prefixString.match(styles.OLink === '' && ['', 'o']);
  const prefixMatch = standardPrefixString || operaPrefixString;

  const prefix = prefixMatch ? prefixMatch[1] : '';

  prefixObject = {
    css: `-${prefix}-`,
    js: prefix
  };

  if (prefixObject.js !== 'ms') {
    prefixObject = {
      ...prefixObject,
      js: `${prefixObject.js.charAt(0).toUpperCase()}${prefixObject.js.slice(1)}`
    };
  }
}

export default prefixObject;
