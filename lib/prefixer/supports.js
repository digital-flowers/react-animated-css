'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browserOrNode = require('browser-or-node');

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isSupported = function isSupported(property, value) {
  if (_browserOrNode.isBrowser) {
    if ('CSS' in window && 'supports' in window.CSS) {
      return window.CSS.supports(property, value);
    }

    if ('supportsCSS' in window) {
      return window.supportsCSS(property, value);
    }

    var camelCaseProperty = (0, _camelCase2.default)(property);

    var element = document.createElement('div');
    var support = camelCaseProperty in element.style;

    element.style.cssText = property + ':' + value;

    return support && element.style[camelCaseProperty] !== '';
  }
  return false;
};

exports.default = isSupported;