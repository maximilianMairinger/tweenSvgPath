import animationFrameDelta from "animation-frame-delta"
const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');
require("xrray")(Array)
import TweenObject, { Tween } from "tween-object"


type Segments = (string | number)[][]
type Keyframes<Of> = {value: Of, offset?: number}[]
type ControlableSegmentTween = TweenObject<Segments, Segments>

class ControlableStringTween extends Tween<string, Segments> {
  protected parseIn(face: string): Segments {
    try {
      return normalize(abs(parse(face)))
    }
    catch(e) {
      throw new Error("Failed to parseIn svgPathString.")
    }
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







export default function (array: true,                   keyframes: Keyframes<string>,   duration?: number, easing?: (at: number) => number, run?: true ): ReadAbleTweenStringTween
export default function (array: true,                   keyframes: Keyframes<string>,   duration?: number, easing?: (at: number) => number, run?: false): ControlableStringTween
export default function (array: true,                   keyframes: Keyframes<Segments>, duration?: number, easing?: (at: number) => number, run?: true ): ReadAbleTweenSegmentTween
export default function (array: true,                   keyframes: Keyframes<Segments>, duration?: number, easing?: (at: number) => number, run?: false): ControlableSegmentTween
export default function (from: Segments,                to: Segments,                   duration?: number, easing?: (at: number) => number, run?: true ): ReadAbleTweenSegmentTween
export default function (from: Segments,                to: Segments,                   duration?: number, easing?: (at: number) => number, run?: false): ControlableSegmentTween
export default function (from: string | SVGPathElement, to: string,                     duration?: number, easing?: (at: number) => number, run?: true ): ReadAbleTweenStringTween
export default function (from: string | SVGPathElement, to: string,                     duration?: number, easing?: (at: number) => number, run?: false): ControlableStringTween
export default function (from_array: string | SVGPathElement | Segments | true, to_keyframes: string | Segments | Keyframes<string> | Keyframes<Segments>, duration?: number, easing?: (at: number) => number, run: boolean = true) {
  // defaults

  if (duration === undefined) {
    if (run) duration = 1000
    else duration = 1
  }



  let elem: SVGPathElement
  if (from_array instanceof SVGPathElement) {
    elem = from_array
    from_array = elem.getAttribute("d")
  }

  let InterpolatorClass: typeof ControlableStringTween | typeof TweenObject = from_array === true ? typeof (to_keyframes as Keyframes<string> | Keyframes<Segments>).first.value === "string" ? ControlableStringTween : TweenObject : typeof from_array === "string" ? ControlableStringTween : TweenObject
  //@ts-ignore
  let interpolator = new InterpolatorClass(from_array, to_keyframes, duration, easing)


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
