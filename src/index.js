import React from "react";
import classNames from "classnames";
import {isBrowser} from "browser-or-node";
import {bool, func, number, object, string} from "prop-types";

/**
 * check if IE is <= 9
 * @return {boolean}
 */
const isLteIE9 = () => {
  const ua = isBrowser ? window.navigator.userAgent : "";
  const ie = ua.indexOf("MSIE ");
  return (
    ie > -1 && parseInt(ua.substring(ie + 5, ua.indexOf(".", ie)), 10) <= 9
  );
};

/**
 * animated text typing
 *
 * @prop {string} animationIn
 * Defines the animation to be used as the appearing animation.
 * @since 1.0.0
 * [required]: defaults to "fadeIn"
 *
 * @prop {string} animationOut
 * Defines the animation to be used as the disappearing animation.
 * @since 1.0.0
 * [required]: defaults to "fadeOut"
 *
 * @prop {number} animationInDelay
 * Defines the animationDelay attribute in ms for the animationIn animation.
 * since 1.0.2
 * [optional]: defaults to 0
 *
 * @prop {number} animationOutDelay
 * Defines the animationDelay attribute in ms for the animationOut animation.
 * since 1.0.2
 * [optional]: defaults to 0
 *
 * @prop {object} style
 * Pass down to Reacts` style attribute for custom component styling.
 * since 1.0.0
 * [optional]: defaults to empty object
 *
 * @prop {boolean} isVisible
 * If passed true it will trigger the animationIn and animationInDelay animation.
 * If passed false it will trigger the animationOut and animationOutDelay animation.
 * since 1.0.0
 * [required]: defaults to true
 *
 * @prop {function} innerRef
 * Passes down to Reacts` ref attribute.
 * since 1.0.0
 * [optional]: defaults to null
 *
 * @prop {string} className
 * Passing down any className to Reacts` className attribute.
 * since 1.0.0
 * [optional]: defaults to empty string
 *
 * @prop {boolean} animateOnMount
 * If passed true it will trigger the initial animation when component is mounted.
 * If passed false it will not trigger the initial animation.
 * since 1.0.0
 * [optional]: defaults to true
 *
 * Internal component state:
 *
 * @state {string} animation
 * This state prop is defined by animationIn or animationOut and
 * alternates between the two when @prop {boolean }isVisible is toggled.
 * since 1.0.0
 *
 * @state {boolean} delay
 * This state prop is defined by animationInDelay and animationOutDelay
 * and alternates between the two when @prop {boolean }isVisible is toggled.
 * since 1.0.2
 *
 * @type {Object}
 */
export class Animated extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.animateOnMount
      ? {
        animation: props.isVisible ? props.animationIn : props.animationOut,
        delay: props.isVisible
          ? props.animationInDelay
          : props.animationOutDelay
      }
      : {};
  }

  componentWillReceiveProps(nextProps) {
    const {isVisible} = nextProps;
    if (isVisible !== this.props.isVisible) {
      const {
        animationIn,
        animationOut,
        animationInDelay,
        animationOutDelay
      } = this.props;
      this.setState({
        animation: isVisible ? animationIn : animationOut,
        delay: isVisible ? animationInDelay : animationOutDelay
      });
    }
  }

  render() {
    const {children, style, isVisible, innerRef, className} = this.props;
    const {animation, delay} = this.state;

    const classes = classNames("animated", animation, className);

    if (isLteIE9() || !animation) {
      style.opacity = isVisible ? 1 : 0;
    }

    return (
      <div
        className={classes}
        ref={innerRef}
        style={{
          animationDelay: `${delay}ms`,
          pointerEvents: isVisible ? "all" : "none",
          ...style
        }}
      >
        {children}
      </div>
    );
  }
}

Animated.propTypes = {
  animationIn: string,
  animationOut: string,
  animationInDelay: number,
  animationOutDelay: number,
  style: object,
  isVisible: bool,
  innerRef: func,
  className: string,
  animateOnMount: bool
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
