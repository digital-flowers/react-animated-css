import React from "react";
import { number, string, object, bool, func } from "prop-types";
import classNames from "classnames";

/**
 * check if IE is <= 9
 * @return {boolean}
 */
const isLteIE9 = () => {
  const ua = window.navigator.userAgent;
  const ie = ua.indexOf("MSIE ");
  return (
    ie > -1 && parseInt(ua.substring(ie + 5, ua.indexOf(".", ie)), 10) <= 9
  );
};

/**
 * animated text typing
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
    const { isVisible } = nextProps;
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
    const { children, style, isVisible, innerRef, className } = this.props;
    const { animation, delay } = this.state;

    const classes = classNames("animated", animation, className);

    if (isLteIE9() || !animation) {
      style.opacity = isVisible ? 1 : 0;
    }

    return (
      <div
        className={classes}
        ref={innerRef}
        style={{
          animationDelay: `${delay}s`,
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
  start: string,
  finish: string,
  enter: number,
  exit: number,
  style: object,
  animate: bool,
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
