# Tween svg-path

High performance & lightweight tween interpolation for svg paths

## Example

This takes an svg path element and interpolates it to the given path over the duration of 1000ms.

```js
import tweenSvgPath from "tweenSvgPath"

let fromSvgElem = document.querySelector("#svg path")
let toSvgPath   = "[your from svg path]"
let duration    = 1000

let tweeny = tweenSvgPath(fromSvgElem, toSvgPath, duration)
```

If you like to manually control the update cycle, set the optional parameter `run` to false.

```js
let run = false

let tweeny = tweenSvgPath(fromSvgElem, toSvgPath, duration, run)
console.log(tweeny.update(500))
```

This way you could sync the animation up to something like a scroll position.

To manually tween it over a timeline (like in the example above) use [animation-frame-delta](https://www.npmjs.com/package/animation-frame-delta) as it has been extensively tested to work well together.

```js
import animationFrameDelta from "animation-frame-delta"

animationFrameDelta((progress) => {
  tweeny.update(progress)
}, duration)

// or the more cool but less readable version

animationFrameDelta(tweeny.update.bind(tweeny))
```

Additionally the distribution can be controlled as well. To do so, dont give a `SVGPathElement` as from parameter but a string.

```js
let fromSvgPath = "[your from svg path]"
let toSvgPath   = "[your to   svg path]"

let tweeny = tweenSvgPath(fromSvgPath, toSvgPath, duration)

const elem = document.querySelector("#svg path")
tweeny.onUpdate((interpolatedSvg) => {
  elem.setAttribute("d", interpolatedSvg)
})
```

Paths can be given in parsed fashion (as `type Segments = (string | number)[][]`) as well. The output will not be stringifyed to a svg path like in the examples above. 

> Note: The libraries [parse-svg-path](https://www.npmjs.com/package/parse-svg-path), [abs-svg-path](https://www.npmjs.com/package/abs-svg-path) and [normalize-svg-path](https://www.npmjs.com/package/normalize-svg-path) provide parsing to the mentioned Segements type.

```js
import * as parse from "parse-svg-path"
import * as abs from "abs-svg-path"
import * as normalize from "normalize-svg-path"

let fromPathSegments = normalize(abs(parse("[your from svg path]")))
let toParsedSegments   = normalize(abs(parse("[your to   svg path]")))

tweenSvgPath(fromPathSegments, toParsedSegments, duration).onUpdate((interpolatedPathSegmenets) => {
  console.log(interpolatedPathSegmenets)
})
```


## Conribute

All feedback is appreciated. Create a pull request or write an issue.
