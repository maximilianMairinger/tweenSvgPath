import animationFrameDelta from "animation-frame-delta"
import TWEEN from "@tweenjs/tween.js"
const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');
require("xrray")(Array)


export const { Easing } = TWEEN



type Segments = (string | number)[][]

export default function (from: string | SVGPathElement, to: string, duration: number, easing?: (at: number) => number, run?: true): ReadAbleTweenStringTween
export default function (from: string | SVGPathElement, to: string, duration: number, easing?: (at: number) => number, run?: false): ControlableStringTween
export default function (from: string | SVGPathElement, to: string, duration: number, easing?: (at: number) => number, run: boolean = true) {
  let elem: SVGPathElement
  if (from instanceof SVGPathElement) {
    elem = from
    from = elem.getAttribute("d")
  }
  from = normalize(abs(parse(from)));
  to = normalize(abs(parse(to)));
  
  //@ts-ignore
  let controlableStringTween = setupTweenPreparedSvgPaths(from as Segments, to, duration, easing, ControlableStringTween)


  if (run) animationFrameDelta(() => {
    controlableStringTween.update()
  }, duration)

  if (elem !== undefined) controlableStringTween.onUpdate((s) => {
    elem.setAttribute("d", s)
  })

  return controlableStringTween
}

export function tweenPreparedSvgPaths(from: Segments, to: Segments, duration: number, easing?: (at: number) => number, run?: true): ReadAbleTweenSegmentTween
export function tweenPreparedSvgPaths(from: Segments, to: Segments, duration: number, easing?: (at: number) => number, run?: false): ControlableSegmentTween
export function tweenPreparedSvgPaths(from: Segments, to: Segments, duration: number, easing?: (at: number) => number, run: boolean = true) {
  let controlableSegmentTween = setupTweenPreparedSvgPaths(from, to, duration, easing, ControlableSegmentTween)
  if (run) animationFrameDelta(() => {
    controlableSegmentTween.update()
  }, duration)
  //@ts-ignore
  return controlableSegmentTween
}

function setupTweenPreparedSvgPaths<TweenWrapper extends typeof ControlableSegmentTween | typeof ControlableStringTween>(from: Segments, to: Segments, duration: number, easing: (at: number) => number = Easing.Linear.None, TweenWrapper: TweenWrapper): InstanceType<TweenWrapper> {
  from = JSON.parse(JSON.stringify(from))
  let tweenGroup = new TWEEN.Group()

  let tweens: TWEEN.Tween[] = []
  
  for (let i = 0; i < from.length; i++) {
    let start = from[i]
    
    let prep = start[0]
    tweens.add(new TWEEN.Tween(start, tweenGroup)
      .to(to[i], 100)
      .easing(Easing.Linear.None)
      .onUpdate((e) => {
        e[0] = prep
      })
    )
  }
  
  //@ts-ignore
  return new TweenWrapper(tweenGroup, from, tweens, easing)
}


interface ReadableTween<UpdateFunc extends AnyUpdateFunc> {
  onUpdate(func: UpdateFunc): UpdateFunc
  offUpdate(func: UpdateFunc): void
}

abstract class ControlableTween<UpdateFunc extends AnyUpdateFunc> implements ReadableTween<UpdateFunc> {
  private updateLs: UpdateFunc[] = []
  private startTime: number
  
  constructor(protected group: TWEEN.Group, protected segments: Segments, protected tweensStart: TWEEN.Tween[], private easing: (at: number) => number) {
    
  }

  protected generalUpdate(at?: number) {
    this.startTime = performance.now()
    
    this.tweensStart.ea((tween) => {
      tween.start(this.startTime)
    })
    
    this.generalUpdateWithoutStart(at)
    this.generalUpdate = this.generalUpdateWithoutStart
  }

  private generalUpdateWithoutStart(at?: number) {
    if (at === undefined) at = performance.now()
    debugger
    console.log(tweenProgressToSaveProgress(this.easing(at + this.startTime)));
    
    this.group.update(tweenProgressToSaveProgress(this.easing(at + this.startTime)))
  }

  protected notifyObservers(segementsOrString: UpdateFunc extends SegmentUpdateFunc ? Segments : string) {
    let i = 0;
    let length = this.updateLs.length
    for (; i < length; i++) {
      //@ts-ignore
      this.updateLs[i](segementsOrString)
    }
    return segementsOrString
  }

  public onUpdate(func: UpdateFunc) {
    this.updateLs.add(func)
    return func
  }
  public offUpdate(func: UpdateFunc) {
    this.updateLs.rmV(func)
  }
}

type SegmentUpdateFunc = (pathSegment: Segments) => void
type StringUpdateFunc = (path: string) => void
type AnyUpdateFunc = SegmentUpdateFunc | StringUpdateFunc

type ReadAbleTweenSegmentTween = ReadableTween<SegmentUpdateFunc>
type ReadAbleTweenStringTween = ReadableTween<StringUpdateFunc>

class ControlableSegmentTween extends ControlableTween<SegmentUpdateFunc> {
  constructor(group: TWEEN.Group, segments: Segments, tweensStart: TWEEN.Tween[], easing: (at: number) => number) {
    super(group, segments, tweensStart, easing)
  }
  public update(at?: number) {
    this.generalUpdate(at)
    return this.notifyObservers(this.segments)
  }
}

class ControlableStringTween extends ControlableTween<StringUpdateFunc> {
  constructor(group: TWEEN.Group, segments: Segments, tweensStart: TWEEN.Tween[], easing: (at: number) => number) {
    super(group, segments, tweensStart, easing)
  }
  public update(at?: number) {
    this.generalUpdate(at)
    let i = 0
    let s = ""
    let length = this.segments.length
    for (; i < length; i++) {
      s += this.segments[i].join(" ") + " "
    }
    s = s.substr(0, s.length-1)
    
    return this.notifyObservers(s)
  }
}

let tweenProgressToSaveProgress = progressToSaveProgress(0, 99.99999)

function progressToSaveProgress(min: number, max: number) {
  return function progressToSaveProgress(val: number) {
    if (val < min) return min
    else if (val > max) return max
    return val
  }
}
