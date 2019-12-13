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
  constructor(public from: number, public to: number, public onUpdate: (res: number) => void) {
    
  }
  public update(at: number) {
    this.onUpdate(this.from + (this.to - this.from) * at)
  }
}

type GenericObject = {[prop: string]: any}


export abstract class Interpolate<Face, Interior extends GenericObject = GenericObject> {
  private _from: Interior;
  private _to: Interior;
  private tweeny: Interior;
  private tweenInstances: SimpleTween[] = []

  private updateListeners: ((res: Readonly<Face>) => void)[] = []

  private startTime: number
  constructor(from: Face, to: Face, public duration: number = 1, public easing: (at: number) => number = a => a) {
    this._from = this.parseIn(from)
    this._to = this.parseIn(to)
    this.prepInput()
  }

  protected updateWithoutNotification(at?: number) {
    if (at === undefined) {
      if (this.startTime === undefined) {
        at = 0
        this.startTime = now()
      }
      else {
        at = now() - this.startTime
      }
    }

    if (at > this.duration) at = this.duration
    else if (at < 0) at = 0
    at = at / this.duration
    at = this.easing(at)

    this.tweenInstances.ea((tween) => {
      tween.update(at)
    })
  }

  protected abstract parseOut(interior: Interior): Face
  protected abstract parseIn(face: Face): Interior

  public update(at?: number): Readonly<Face> {
    this.updateWithoutNotification(at)
    let res = this.parseOut(this.tweeny)
    this.updateListeners.ea((f) => {
      f(res)
    })
    return res
  }

  

  public onUpdate(ls: (res: Readonly<Face>) => void) {
    this.updateListeners.add(ls)
    return ls
  }

  public offUpdate(ls: (res: Readonly<Face>) => void) {
    this.updateListeners.rmV(ls)
  }


  public set from(to: Face) {
    this._from = this.parseIn(to)
    this.prepInput()
  }
  public get from(): Face {
    return this.parseOut(this._from)
  }

  public set to(to: Face) {
    this._to = this.parseIn(to)
    this.prepInput()
  }
  public get to(): Face {
    return this.parseOut(this._to)
  }

  private prepInput() {
    this.checkInput(this._from, this._to)


    this.tweeny = clone(this._from)
    let typeofTweeny = typeof this.tweeny
    if (typeofTweeny === "object") this.prepTweeny(this.tweeny, this._to)
    //@ts-ignore
    else if (typeofTweeny === "number") this.tweenInstances.add(new SimpleTween(this._from, this._to, (e) => {
      this.tweeny = e
    }))
  }

  private prepTweeny(tweeny: any, _to: any) {
    let typeofFrom: any
    for (const key in tweeny) {
      let from = tweeny[key]
      let to = _to[key]
      typeofFrom = typeof from
      if (typeofFrom === "number") {
        this.tweenInstances.add(new SimpleTween(from, to, (e) => {
          tweeny[key] = e
        }))
      }
      else if (typeofFrom === "object") {
        this.prepTweeny(from, to)
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

export default class InterpolateObject extends Interpolate<GenericObject, GenericObject> {

  protected parseOut(interior: GenericObject): GenericObject {
    return interior  
  }
  
  protected parseIn(face: GenericObject): GenericObject {
    return face
  }
}




