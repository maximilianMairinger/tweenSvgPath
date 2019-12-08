# Animation frame delta



## Example

Register a animation loop like so

```js
import animFrame from "animation-frame-delta"

animFrame((delta, timestamp, absoluteDelta) => {
  console.log(delta)
})
```

To unsubscribe the registered listener simply call `unsubscribe(func)`