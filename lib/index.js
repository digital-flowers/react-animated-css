"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Animated = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _browserOrNode = require("browser-or-node");

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isLteIE9 = function isLteIE9() {
  var ua = _browserOrNode.isBrowser ? window.navigator.userAgent : "";
  var ie = ua.indexOf("MSIE ");
  return ie > -1 && parseInt(ua.substring(ie + 5, ua.indexOf(".", ie)), 10) <= 9;
};

var Animated = exports.Animated = function (_React$Component) {
  _inherits(Animated, _React$Component);

  function Animated(props) {
    _classCallCheck(this, Animated);

    var _this = _possibleConstructorReturn(this, (Animated.__proto__ || Object.getPrototypeOf(Animated)).call(this, props));

    _this.state = props.animateOnMount ? {
      animation: props.isVisible ? props.animationIn : props.animationOut,
      delay: props.isVisible ? props.animationInDelay : props.animationOutDelay
    } : {};
    return _this;
  }

  _createClass(Animated, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var isVisible = nextProps.isVisible;

      if (isVisible !== this.props.isVisible) {
        var _props = this.props,
            animationIn = _props.animationIn,
            animationOut = _props.animationOut,
            animationInDelay = _props.animationInDelay,
            animationOutDelay = _props.animationOutDelay;

        this.setState({
          animation: isVisible ? animationIn : animationOut,
          delay: isVisible ? animationInDelay : animationOutDelay
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          style = _props2.style,
          isVisible = _props2.isVisible,
          innerRef = _props2.innerRef,
          className = _props2.className;
      var _state = this.state,
          animation = _state.animation,
          delay = _state.delay;


      var classes = (0, _classnames2.default)("animated", animation, className);

      if (isLteIE9() || !animation) {
        style.opacity = isVisible ? 1 : 0;
      }

      return _react2.default.createElement(
        "div",
        {
          className: classes,
          ref: innerRef,
          style: _extends({
            animationDelay: delay + "ms",
            pointerEvents: isVisible ? "all" : "none"
          }, style)
        },
        children
      );
    }
  }]);

  return Animated;
}(_react2.default.Component);

Animated.propTypes = {
  animationIn: _propTypes.string,
  animationOut: _propTypes.string,
  animationInDelay: _propTypes.number,
  animationOutDelay: _propTypes.number,
  style: _propTypes.object,
  isVisible: _propTypes.bool,
  innerRef: _propTypes.func,
  className: _propTypes.string,
  animateOnMount: _propTypes.bool
};

Animated.defaultProps = {
  animationIn: "fadeIn",
  animationOut: "fadeOut",
  className: "",
  animationInDelay: 0,
  animationOutDelay: 0,
  isVisible: true,
  style: {},
  animateOnMount: true
};