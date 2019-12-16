import tweenSvgPath from "../../app/src/tweenSvgPath"
import animationFrameDelta from "animation-frame-delta"
import { Data } from "front-db"
import bez from "bezier-easing"
const elem: SVGPathElement = document.querySelector("#path")
const app: HTMLElement = document.querySelector("#main")







let input1 = "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z";
let input2 = "M103.5 55.5C103.5 66 60.5 117 52.5 117C44.5 117 3.05176e-05 69 0 55.5C-3.05175e-05 42 27 -51.5 52.5 42C68.5 -47 103.5 36.4599 103.5 55.5Z";



let easeInOut = bez(.42, 0, .58, 1)


let w = tweenSvgPath(elem, input2, 1500, easeInOut, false)



let scrollData = new Data(0)

scrollData.subscribe(w.update.bind(w))

window.addEventListener("scroll", (e) => {
  scrollData.val = window.scrollY
})

// scrollData.subscribe((e) => {
//   w.update(e)
// })

// w.onUpdate((path) => {
//   elem.setAttribute("d", path)
// })


