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
  private updateLs: Function[] = []
  private startTimestamp: number;
  
  constructor(public from: number, public to: number, public duration: number, public easing: (at: number) => number) {
    
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
    let erg = this.from + (this.to - this.from) * this.easing(at / this.duration)
    this.updateLs.forEach((f) => {
      f(erg)
    })
    return erg
  }

  public onUpdate(func: Function) {
    this.updateLs.add(func)
    return func
  }
  public offUpdate(func: Function) {
    this.updateLs.rmV(func)
  }
}

type GenericObject = {[prop: string]: any}

class Tween<Of> {
  private _from: Of;
  private _to: Of;
  private tweeny: any;
  private tweenyKeyMap: GenericObject = {};
  constructor(from: Of, to: Of, public duration: number = 1, public easing: (at: number) => number = a => a) {
    this._from = from
    this._to = to
    this.prepInput()
  } 
  

  public update() {

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
    if (typeof this.tweenyKeyMap === "object") this.prepTweeny(this.tweeny, this.tweenyKeyMap)
    
    debugger
  }

  private prepTweeny(tweeny: any, keyMap: GenericObject) {
    let typeofTweeny
    for (const key in tweeny) {
      typeofTweeny = typeof tweeny[key]
      if (typeofTweeny === "number") {
        keyMap[key] = tweeny[key]
      }
      else if (typeofTweeny === "object") {
        let me = keyMap[key] = {}
        this.prepTweeny(tweeny[key], me)
      }
    }
    
      
    
  }

  private checkInput(from: any, to: any) {
    let typeofFrom = typeof from
    let typeofTo = typeof to
    if (typeofFrom !== typeofTo) throw new InterpolationCheckError("Typeof from and typeof to are not equal.")
    if (typeofFrom === "object") {
      let fromKeys = Object.keys(from)
      if (fromKeys.length !== Object.keys(to).length) throw new InterpolationCheckError("Count of keys are not equal.")
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
    bb2: "wos"
  }
}, 2000, a => a);

// animationFrameDelta(() => {
//   console.log(c.update());
  
// }, 2000)

