// Type definitions for react-animated-css 1.0.2
// Project: https://github.com/digital-flowers/react-animated-css
// <reference types="react" />
import {Component, Ref} from "react";

declare module "react-animated-css" {
  type AnimationString =
    "bounce"
    | "flash"
    | "pulse"
    | "rubberBand"
    | "shake"
    | "headShake"
    | "swing"
    | "tada"
    | "wobble"
    | "jello"
    | "bounceIn"
    | "bounceInDown"
    | "bounceInLeft"
    | "bounceInRight"
    | "bounceInUp"
    | "bounceOut"
    | "bounceOutDown"
    | "bounceOutLeft"
    | "bounceOutRight"
    | "bounceOutUp"
    | "fadeIn"
    | "fadeInDown"
    | "fadeInDownBig"
    | "fadeInLeft"
    | "fadeInLeftBig"
    | "fadeInRight"
    | "fadeInRightBig"
    | "fadeInUp"
    | "fadeInUpBig"
    | "fadeOut"
    | "fadeOutDown"
    | "fadeOutDownBig"
    | "fadeOutLeft"
    | "fadeOutLeftBig"
    | "fadeOutRight"
    | "fadeOutRightBig"
    | "fadeOutUp"
    | "fadeOutUpBig"
    | "flipInX"
    | "flipInY"
    | "flipOutX"
    | "flipOutY"
    | "lightSpeedIn"
    | "lightSpeedOut"
    | "rotateIn"
    | "rotateInDownLeft"
    | "rotateInDownRight"
    | "rotateInUpLeft"
    | "rotateInUpRight"
    | "rotateOut"
    | "rotateOutDownLeft"
    | "rotateOutDownRight"
    | "rotateOutUpLeft"
    | "rotateOutUpRight"
    | "hinge"
    | "jackInTheBox"
    | "rollIn"
    | "rollOut"
    | "zoomIn"
    | "zoomInDown"
    | "zoomInLeft"
    | "zoomInRight"
    | "zoomInUp"
    | "zoomOut"
    | "zoomOutDown"
    | "zoomOutLeft"
    | "zoomOutRight"
    | "zoomOutUp"
    | "slideInDown"
    | "slideInLeft"
    | "slideInRight"
    | "slideInUp"
    | "slideOutDown"
    | "slideOutLeft"
    | "slideOutRight"
    | "slideOutUp";

  export class Animated extends Component<AnimatedProps> {
  }

  export interface AnimatedProps {
    /**
     * The animation-in style.
     * @default "fadeIn"
     */
    animationIn: AnimationString;

    /**
     * The animation-out style.
     * @default "fadeOut"
     */
    animationOut: AnimationString;

    /**
     * The animation-in delay.
     * @default 0
     */
    animationInDelay?: number;

    /**
     * The animation-out delay.
     * @default 0
     */
    animationOutDelay?: number;

    /**
     * The animation-in duration.
     * @default 1000
     */
    animationInDuration?: number;

    /**
     * The animation-out duration.
     * @default 1000
     */
    animationOutDuration?: number;

    /**
     * Additional CSS styling.
     * @default {}
     */
    style?: object;

    /**
     * Is Animation visible?
     * @default true
     */
    isVisible: boolean;

    innerRef?: Ref<Animated>;

    /**
     * Additional class name.
     * @default ""
     */
    className?: string;

    /**
     * Will it display animation on mounting?
     * @default true
     */
    animateOnMount?: boolean;
  }
}
