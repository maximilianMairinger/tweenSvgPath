import animationFrameDelta from "animation-frame-delta"
import TWEEN from "@tweenjs/tween.js"

animationFrameDelta((...a) => {
  //console.log(a);
  
})


type Segments = (string | number)[][]

export default function(from: Segments | string | SVGPathElement, to: Segments | string, ) {
  
}

const testElem = document.querySelector("#test")[0]

export function tweenPreparedSvgPaths(from: Segments, to: Segments | string, update: () => void) {
  if (from.length !== to.length) throw new Error("Both paths must have equal ammount of points")
  for (let i = 0; i < from.length; i++) {
  let start = from[i];
  let end = to[i];
  const tween = new TWEEN.Tween(start)
    .to(end, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((e) => {
      testElem.innerText = i + "     " + start.join();
    })
    .start();
  }
}
