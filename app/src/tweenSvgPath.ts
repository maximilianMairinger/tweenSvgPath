import animationFrameDelta from "animation-frame-delta"
import TweenObject, { Tween, Options } from "tween-object"
import Xrray from "xrray" // Just for types; Xrray gets inited in TweenObject
import * as par from "./parse"

export let parse = par


type Segments = par.Segments
type ControlableSegmentTween = TweenObject<Segments, Segments>
type Seg = par.Seg
type Str = par.Str

class ControlableStringTween extends Tween<Str["Keyframe"], Seg["Keyframe"]> {
  protected parseIn(face: Str["Keyframe"]): Seg["Keyframe"] {
    return parse.toObject(face)
  }
  protected parseOut(interior: Seg["Keyframe"]): Str["Keyframe"] {
    return parse.toPath(interior)
  }
}

type EasingFunction = (at: number) => number
type EasingOb = { function: EasingFunction }
type Easing = EasingFunction | EasingOb


export default function (array: true,                         keyframes: Str["Keyframes"], options: Options, run?: true ): ReadAbleTweenStringTween
export default function (array: true,                         keyframes: Str["Keyframes"], options: Options, run?: false): ControlableStringTween
export default function (array: true,                         keyframes: Seg["Keyframes"], options: Options, run?: true ): ReadAbleTweenSegmentTween
export default function (array: true,                         keyframes: Seg["Keyframes"], options: Options, run?: false): ControlableSegmentTween
export default function (from: Seg["Frame"],                  to: Seg["Frame"],            options: Options, run?: true ): ReadAbleTweenSegmentTween
export default function (from: Seg["Frame"],                  to: Seg["Frame"],            options: Options, run?: false): ControlableSegmentTween
export default function (from: Str["Frame"] | SVGPathElement, to: Str["Frame"],            options: Options, run?: true ): ReadAbleTweenStringTween
export default function (from: Str["Frame"] | SVGPathElement, to: Str["Frame"],            options: Options, run?: false): ControlableStringTween
export default function (array: true,                         keyframes: Str["Keyframes"], duration?: number, easing?: Easing, run?: true ): ReadAbleTweenStringTween
export default function (array: true,                         keyframes: Str["Keyframes"], duration?: number, easing?: Easing, run?: false): ControlableStringTween
export default function (array: true,                         keyframes: Seg["Keyframes"], duration?: number, easing?: Easing, run?: true ): ReadAbleTweenSegmentTween
export default function (array: true,                         keyframes: Seg["Keyframes"], duration?: number, easing?: Easing, run?: false): ControlableSegmentTween
export default function (from: Seg["Frame"],                  to: Seg["Frame"],            duration?: number, easing?: Easing, run?: true ): ReadAbleTweenSegmentTween
export default function (from: Seg["Frame"],                  to: Seg["Frame"],            duration?: number, easing?: Easing, run?: false): ControlableSegmentTween
export default function (from: Str["Frame"] | SVGPathElement, to: Str["Frame"],            duration?: number, easing?: Easing, run?: true ): ReadAbleTweenStringTween
export default function (from: Str["Frame"] | SVGPathElement, to: Str["Frame"],            duration?: number, easing?: Easing, run?: false): ControlableStringTween
export default function (from_array: true | Seg["Frame"] | Str["Frame"] | SVGPathElement, to_keyframes: Str["Keyframes"] | Seg["Keyframes"] | Seg["Frame"] | Str["Frame"], duration_options?: number | Options, easing_run?: Easing | boolean, run?: boolean) {
  // defaults

  let duration: number

  if (duration_options === undefined) {
    if (run === undefined) run = true
    if (run) duration_options = 1000
    else duration_options = 1
    duration = duration_options
  }
  else if (typeof duration_options === "number") {
    if (run === undefined) run = true
    duration = duration_options
  }
  else {
    if (easing_run === undefined) run = true
    else {
      run = easing_run as boolean
      easing_run = undefined
    }

    //@ts-ignore
    if (duration_options.end === undefined) {
      //@ts-ignore
      if (run) duration_options.end = duration_options.start + 1000
      //@ts-ignore
      else duration_options.end = duration_options.start + 1
    }

    //@ts-ignore
    duration = duration_options.end
  }





  let elem: SVGPathElement
  if (from_array instanceof SVGPathElement) {
    elem = from_array
    from_array = elem.getAttribute("d")
  }

  let InterpolatorClass: typeof ControlableStringTween | typeof TweenObject = from_array === true ? typeof (to_keyframes as Seg["Keyframes"] | Str["Keyframes"]).first === "string" ? ControlableStringTween : TweenObject : typeof from_array === "string" ? ControlableStringTween : TweenObject
  //@ts-ignore
  let interpolator: ControlableStringTween | TweenObject = new InterpolatorClass(from_array, to_keyframes, duration_options, easing_run)


  //@ts-ignore
  if (run) animationFrameDelta(interpolator.update.bind(interpolator), duration, interpolator.options.iterations)

  if (elem !== undefined) interpolator.onUpdate((s) => {
    //@ts-ignore
    elem.setAttribute("d", s)
  })

  return interpolator as ReadAbleTweenStringTween | ControlableStringTween | ReadAbleTweenSegmentTween | ControlableSegmentTween
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
