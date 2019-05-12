import isPlainObject from 'lodash/isPlainObject';
import prefix from './prefix';
import isSupported from './supports';
import {ANIMATABLE_VALUES, CSS_PROPERTIES} from './constants';

const toKebabCase = string => string.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);

/**
 * create a new style object with prefixes applied
 *
 * @param {Object} object
 * @returns {Object}
 */
const applyPrefixes = object => {
  if (!isPlainObject(object)) {
    return object;
  }

  let value;

  return Object
    .keys(object)
    .reduce((styleObject, originalKey) => {
      let key = originalKey;

      value = object[key];

      if (isPlainObject(value)) {
        return {
          ...styleObject,
          [key]: applyPrefixes(value)
        };
      }

      if (CSS_PROPERTIES.indexOf(key) !== -1 && !isSupported(toKebabCase(key), value)) {
        key = `${prefix.js}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      }

      if (originalKey === 'display' && object[originalKey] === 'flex' && !isSupported('display', 'flex')) {
        return {
          ...styleObject,
          [key]: (prefix.js === 'ms' ? '-ms-flexbox' : `${prefix.css}flex`)
        };
      }

      if (originalKey === 'transition') {
        const animatableValuesObject = ANIMATABLE_VALUES.reduce((animatableValues, animatableValue) => {
          const kebabValue = toKebabCase(animatableValue);
          const re = new RegExp(kebabValue, 'g');

          if (re.test(object[originalKey]) && !isSupported(kebabValue)) {
            const cleanValue = object[originalKey].replace(re, `${prefix.css}${kebabValue}`);

            return {
              ...animatableValues,
              [key]: cleanValue
            };
          }

          return animatableValues;
        }, {});

        return {
          ...styleObject,
          ...animatableValuesObject
        };
      }

      return {
        ...styleObject,
        [key]: value
      };
    }, {});
};

export default applyPrefixes;
