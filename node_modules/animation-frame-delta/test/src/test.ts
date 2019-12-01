import * as reqaf from "../../app/src/animationFrameDelta"


let f = () => {
  console.log(reqaf.stats);
  
}
reqaf.default(f)

setTimeout(() => {
  reqaf.unsubscribe(f)

  setTimeout(() => {
    reqaf.unsubscribe(f)
  }, 1000)
}, 1000)

//reqaf.ignoreUnsubscriptionError()

declare let global: any

global.w = reqaf.stats