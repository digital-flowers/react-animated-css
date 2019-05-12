import {isBrowser} from "browser-or-node";
import camelCase from 'lodash/camelCase';

/**
 * is the property supported, or is the value supported for the given property
 *
 * @param {string} property
 * @param {number|string} value
 * @returns {boolean}
 */
const isSupported = (property, value) => {
  if (isBrowser) {
    // Try the native standard method first
    if ('CSS' in window && 'supports' in window.CSS) {
      return window.CSS.supports(property, value);
    }

    // Check Opera's native method
    if ('supportsCSS' in window) {
      return window.supportsCSS(property, value);
    }

    // Convert to camel-case for DOM interactions
    const camelCaseProperty = camelCase(property);

    // Check if the property is supported
    const element = document.createElement('div');
    const support = (camelCaseProperty in element.style);

    // Assign the property and value to invoke the CSS interpreter
    element.style.cssText = `${property}:${value}`;

    // Ensure both the property and value are
    // supported and return
    return support && (element.style[camelCaseProperty] !== '');
  }
  return false;
};

export default isSupported;
