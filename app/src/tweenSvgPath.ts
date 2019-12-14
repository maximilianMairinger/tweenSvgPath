import animationFrameDelta from "animation-frame-delta"
const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');
require("xrray")(Array)
import ControlableSegmentTween, { Tween } from "tween-object"


class ControlableStringTween extends Tween<string, Segments> {
  protected parseIn(face: string): Segments {
    return normalize(abs(parse(face)))
  }

  protected parseOut(interior: Segments) {
    let i = 0
    let s = ""
    for (; i < interior.length; i++) {
      s += interior[i].join(" ") + " "
    }
    s = s.substr(0, s.length-1)
    return s
  }
}




type Segments = (string | number)[][]

export default function (from: Segments,                to: Segments, duration?: number, easing?: (at: number) => number, run?: true ): ReadAbleTweenSegmentTween
export default function (from: Segments,                to: Segments, duration?: number, easing?: (at: number) => number, run?: false): ControlableSegmentTween
export default function (from: string | SVGPathElement, to: string,   duration?: number, easing?: (at: number) => number, run?: true ): ReadAbleTweenStringTween
export default function (from: string | SVGPathElement, to: string,   duration?: number, easing?: (at: number) => number, run?: false): ControlableStringTween
export default function (from: string | SVGPathElement | Segments, to: string | Segments, duration?: number, easing?: (at: number) => number, run: boolean = true) {
  let elem: SVGPathElement
  if (from instanceof SVGPathElement) {
    elem = from
    from = elem.getAttribute("d")
  }
  
  let InterpolatorClass = typeof from === "string" ? ControlableStringTween : ControlableStringTween
  //@ts-ignore
  let interpolator = new InterpolatorClass(from, to, duration, easing)
  
  


  if (run) animationFrameDelta(() => {
    interpolator.update()
  }, duration)

  if (elem !== undefined) interpolator.onUpdate((s) => {
    elem.setAttribute("d", s)
  })

  return interpolator
}

interface ReadableTween<UpdateFunc extends AnyUpdateFunc> {
  onUpdate(func: UpdateFunc): UpdateFunc
  offUpdate(func: UpdateFunc): void
}


type SegmentUpdateFunc = (pathSegment: Segments) => void
type StringUpdateFunc = (path: string) => void
type AnyUpdateFunc = SegmentUpdateFunc | StringUpdateFunc

type ReadAbleTweenSegmentTween = ReadableTween<SegmentUpdateFunc>
type ReadAbleTweenStringTween = ReadableTween<StringUpdateFunc>
