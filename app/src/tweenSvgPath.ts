import animationFrameDelta from "animation-frame-delta"
import TWEEN from "@tweenjs/tween.js"
const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');



type Segments = (string | number)[][]

export default function(from: string | SVGPathElement, to: string, duration: number, easing: (at: number) => number = TWEEN.Easing.Linear.None, ) {
  
}

export function tweenPreparedSvgPaths(from: Segments, to: Segments, duration: number, easing: (at: number) => number = TWEEN.Easing.Linear.None) {
  from = JSON.parse(JSON.stringify(from))
  let tweenGroup = new TWEEN.Group()
  
  for (let i = 0; i < from.length; i++) {
    let start = from[i];
    let end = to[i];

    let prep = start[0]
    new TWEEN.Tween(start, tweenGroup)
      .to(end, duration)
      .easing(easing)
      .onUpdate((e) => {
        e[0] = prep
      })
      .start();
  }
  
  return new Tween(tweenGroup, from)
}

class Tween {
  constructor(private group: TWEEN.Group, private segments: Segments) {

  }
  public update(at?: number) {
    this.group.update(at)
    return this.segments
  }
}
