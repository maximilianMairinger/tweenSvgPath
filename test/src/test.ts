import tweenSvgPath, { tweenPreparedSvgPaths } from "../../app/src/tweenSvgPath"
import animationFrameDelta from "animation-frame-delta"
import TWEEN from "@tweenjs/tween.js"
const testElem: SVGPathElement = document.querySelector("#path")

var parse = require('parse-svg-path');
var abs = require('abs-svg-path');
var normalize = require('normalize-svg-path');


let input1 = "M211.313,236.242C211.313,236.242,68.853,0.073,68.853,0.073C68.853,0.073,0,0.073,0,0.073C0,0.073,168.129,278.76,168.129,278.76C168.129,278.76,185.629,278.76,185.629,278.76C185.629,278.76,211.313,236.242,211.313,236.242M433.478,0C433.478,0,364.535,0,364.535,0C364.535,0,196.327,278.833,196.327,278.833C196.327,278.833,265.18,278.833,265.18,278.833C265.18,278.833,433.478,0,433.478,0M222.069,357.189C222.069,357.189,364.6,593.358,364.6,593.358C364.6,593.358,433.45300000000003,593.358,433.45300000000003,593.358C433.45300000000003,593.358,265.25300000000004,314.67199999999997,265.25300000000004,314.67199999999997C265.25300000000004,314.67199999999997,247.817,314.67199999999997,247.817,314.67199999999997C247.817,314.67199999999997,222.069,357.189,222.069,357.189M0,593.431C0,593.431,68.853,593.431,68.853,593.431C68.853,593.431,237.151,314.6,237.151,314.6C237.151,314.6,168.264,314.6,168.264,314.6C168.264,314.6,0,593.431,0,593.431";
let input2 = "M 218.172 299.236 C 218.172 299.236 396.895 0 396.895 0 C 396.895 0 318.2 0 318.2 0 C 318.2 0 138.631 299.236 138.631 299.236 C 138.631 299.236 216.69 298.625 216.69 298.625 C 216.69 298.625 218.172 299.236 218.172 299.236 M 465.808 0 C 465.808 0 396.895 0 396.895 0 C 396.895 0 213.62 299.236 213.62 299.236 C 213.62 299.236 287.25 297.185 287.25 297.185 C 287.25 297.185 465.808 0 465.808 0 M 216.69 294.742 C 216.69 294.742 34.985 593.1 34.985 593.1 C 34.985 593.1 109.514 593.1 109.514 593.1 C 109.514 593.1 288.5 295.089 288.5 295.089 C 288.5 295.089 254.489 297.177 254.489 297.177 C 254.489 297.177 216.69 294.742 216.69 294.742 M -38.127 593.1 C -38.127 593.1 34.985 593.1 34.985 593.1 C 34.985 593.1 220.71499999999997 295.091 220.71499999999997 295.091 C 220.71499999999997 295.091 139.62699999999998 297.25 139.62699999999998 297.25 C 139.62699999999998 297.25 -38.127 593.1 -38.127 593.1";

//tweenSvgPath(segments1)


let w = tweenSvgPath(testElem, input2, 1000)