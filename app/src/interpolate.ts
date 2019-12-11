const now = performance.now.bind(performance)
import animationFrameDelta from "animation-frame-delta"
import clone from "clone"
require("xrray")(Array)


class InterpolateError extends Error {
  constructor(msg: string = "Unknown") {
    super()
    this.message = msg
  }
  public set message(to: string) {
    super.message = "InterpolateError: " + to
  }
}


class InterpolationCheckError extends InterpolateError {
  private steps: string[] = []
  constructor(private msg: string = "Unknown") {
    super()
    this.message = msg
  }

  public set message(to: string) {
    super.message = "CheckError: " + to
  }

  public addStep(...steps: string[]) {
    this.steps.dda(...steps)

    super.message = "CheckError at \"" + this.steps.join(".") + "\": " + this.msg
  }

}




class SimpleTween {
  private updateLs: ((res: number) => void)[] = []
  private startTimestamp: number;

  private _duration: number
  private _easing:  (at: number) => number

  public static linearEasing = a => a
  
  constructor(public from: number, public to: number, duration?: number, easing: (at: number) => number = SimpleTween.linearEasing) {
    this._duration = duration
    this.easing = easing
    this.assignUpdateFunc()
  }

  public update(at?: number) {
    if (at === undefined) {
      if (this.startTimestamp === undefined) this.startTimestamp = now()
      at = now() - this.startTimestamp
    }
    return this.updateAt(at)
  }

  public updateAt(at: number) {
    if (at < 0) at = 0
    if (at > this.duration) at = this.duration
    let erg = this.from + (this.to - this.from) * this.parseAt(at)
    this.updateLs.forEach((f) => {
      f(erg)
    })
    return erg
  }

  private pa_easing_duration(at: number) {
    return this._easing(at / this._duration)
  }

  private pa_duration(at: number) {
    return at / this._duration
  }

  private pa_easing(at: number) {
    return this._easing(at)
  }

  private pa_none(at: number) {
    return 1
  }



  public onUpdate(func: (res: number) => void) {
    this.updateLs.add(func)
    return func
  }
  public offUpdate(func: (res: number) => void) {
    this.updateLs.rmV(func)
  }

  public set duration(to: number) {
    this._duration = to
  }
  public get duration(): number {
    return this._duration
  }

  public set easing(to: (at: number) => number) {
    this._easing = to
  }
  public get easing(): (at: number) => number {
    return this._easing
  }

  private parseAt: (at: number) => number

  private assignUpdateFunc() {
    let hasDuration = this._duration !== undefined && this._duration !== 1
    let hasEasing = this.easing !== undefined && this._easing !== SimpleTween.linearEasing
    if (!hasDuration && !hasEasing) {
      this.parseAt = this.pa_none
    }
    else if (hasDuration && !hasEasing) {
      this.parseAt = this.pa_duration
    }
    else if (!hasDuration && hasEasing) {
      this.parseAt = this.pa_easing
    }
    else {
      this.parseAt = this.pa_easing_duration
    }
  }

}

type GenericObject = {[prop: string]: any}
const objectString = "object"

class Tween<Of> {
  private _from: Of;
  private _to: Of;
  private tweeny: any;
  private tweenInstances: SimpleTween[] 
  constructor(from: Of, to: Of, public duration: number = 1, public easing: (at: number) => number = a => a) {
    this._from = from
    this._to = to
    this.prepInput()
  } 
  

  public update() {
    // TODO: 
    // calc easing and duration then fill this to all tweenies (updateAt) also dont check for (is > than may and < min on each insatcne)
    // We dont have to export SimpleTween at all. think about makeing it super performant without checks or even move to class Tween
  }

  public set from(to: Of) {
    this._from = to
    this.prepInput()
  }
  public get from(): Of {
    return this._from
  }

  public set to(to: Of) {
    this._to = to
    this.prepInput()
  }
  public get to(): Of {
    return this._to
  }

  private prepInput() {
    this.checkInput(this._from, this._to)


    this.tweeny = clone(this._from)
    if (typeof this.tweeny === "object") this.prepTweeny(this.tweeny, this._to)
  }

  private prepTweeny(tweeny: any, _to: any) {
    let typeofFrom: any
    for (const key in tweeny) {
      let from = tweeny[key]
      let to = _to[key]
      typeofFrom = typeof from
      if (typeofFrom === "number") {
        let t = new SimpleTween(from, to)
        t.onUpdate((e) => {
          tweeny[key] = e
        })
        this.tweenInstances.add(t)
      }
      else if (typeofFrom === "object") {
        this.prepTweeny(from, to[key])
      }
    }
    
      
    
  }

  private checkInput(from: any, to: any) {
    let typeofFrom = typeof from
    let typeofTo = typeof to
    if (typeofFrom !== typeofTo) throw new InterpolationCheckError("Typeof from and typeof to are not equal.")
    if (typeofFrom === "object") {
      let fromKeys = Object.keys(from)
      if (fromKeys.length !== Object.keys(to).length) throw new InterpolationCheckError("Length of keys are not equal.")
      for (let key of fromKeys) {
        try {
          this.checkInput(from[key], to[key])
        }
        catch(e) {
          if (e instanceof InterpolationCheckError) {
            e.addStep(key)
          }

          throw e
        }
      }
    }
    else if (typeofFrom !== "number") {
      if (from !== to) throw new InterpolationCheckError("Unable to interpolate between none numeric values. When using such, make sure the values are the same at given from and to.")
    }
  }
}

let c = new Tween({
  a: 123,
  b: {
    bb: 321,
    bb2: "wos"
  }
}, {
  a: 200,
  b: {
    bb: 434,
    bb2: "wo"
  }
}, 2000, a => a);

// animationFrameDelta(() => {
//   console.log(c.update());
  
// }, 2000)

