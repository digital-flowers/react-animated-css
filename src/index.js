import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/**
 * check if IE is <= 9
 * @return {boolean}
 */
const isLteIE9 = () => {
    const ua = window.navigator.userAgent;
    const ie = ua.indexOf("MSIE ");
    return ie > -1 && parseInt(ua.substring(ie + 5, ua.indexOf(".", ie))) <= 9;
};

/**
 * animated text typing
 * @type {Object}
 */
export class Animated extends React.Component {
    timeoutId;

    constructor(props) {
        super(props);
        this.state = props.animateOnMount ? {
            animation: props.isVisible ? props.animationIn : props.animationOut
        } : {};
    }

    componentWillReceiveProps(nextProps) {
        const {isVisible} = nextProps;
        if (isVisible !== this.props.isVisible) {
            const {animationIn, animationOut} = this.props;
            clearTimeout(this.timeoutId);
            this.setState({animation: isVisible ? animationIn : animationOut});
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }

    render() {
        const {children, animationInDelay, animationOutDelay, style, isVisible, innerRef, className} = this.props;
        const {animation} = this.state;
        const classes = classNames("animated", animation, className);
        if (isLteIE9() || !animation) {
            style.opacity = isVisible ? 1 : 0;
        }
        return (
            <div className={classes} ref={innerRef} style={{
                animationDelay: `${isVisible ? animationInDelay : animationOutDelay}s`,
                pointerEvents: isVisible ? "all" : "none",
                ...style
            }}>
                {children}
            </div>
        );
    }
}

Animated.propTypes = {
    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    animationInDelay: PropTypes.number,
    animationOutDelay: PropTypes.number,
    style: PropTypes.object,
    isVisible: PropTypes.bool,
    innerRef: PropTypes.func,
    className: PropTypes.string,
    animateOnMount: PropTypes.bool
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
