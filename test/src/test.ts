import tweenSvgPath from "../../app/src/tweenSvgPath"
import animationFrameDelta from "animation-frame-delta"
import { Data } from "front-db"
import bez from "bezier-easing"
const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');
const elem: SVGPathElement = document.querySelector("#path")
const app: HTMLElement = document.querySelector("#main")



type Segments = (string | number)[][]



let input1 = "M105 55C105 85.3757 85.3757 110 55 110C24.6243 110 0 85.3757 0 55C0 24.6243 24.6243 0 55 0C85.3757 0 105 24.6243 105 55Z";
let input2 = "M103.5 55.5C103.5 66 60.5 117 52.5 117C44.5 117 3.05176e-05 69 0 55.5C-3.05175e-05 42 27 -51.5 52.5 42C68.5 -47 103.5 36.4599 103.5 55.5Z";
let input3 = new String("M32 73C-13.5721 73 93.4278 110.073 51.9278 110.073C10.4279 110.073 0.427943 81.4272 0.427887 56.5C0.427831 31.5728 13.4278 3.8147e-06 51.9278 3.05176e-05C90.4279 3.05176e-05 77.5721 73 32 73Z")

let parsed1: Segments = normalize(abs(parse(input1)))
let parsed2: Segments = normalize(abs(parse(input2)))
let parsed3: Segments = normalize(abs(parse(input3)))


let easeInOut = bez(.42, 0, .58, 1)

//@ts-ignore
input3.offset = .99


let w = tweenSvgPath(true, [
  input1,
  input2,
  input3,
  input1
], {
  start: 500,
  end: 3000,
  easing: easeInOut,
  iterations: 3,
  fill: true
}, true)


let scrollData = new Data(0)

// scrollData.subscribe(w.update.bind(w))

window.addEventListener("scroll", (e) => {
  scrollData.val = window.scrollY
})


w.onUpdate((path) => {
  elem.setAttribute("d", path)
})


