const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');

export type Segments = (string | number)[][]
type Path = string


export const toObject = function (path: Path): Segments {
  try {
    return normalize(abs(parse(path)))
  }
  catch(e) {
    throw new Error("Failed to parseIn svgPathString.")
  }
}

export const toPath = function (segmants: Segments): Path {
  let i = 0
  let s = ""
  for (; i < segmants.length; i++) {
    s += segmants[i].join(" ") + " "
  }
  s = s.substr(0, s.length-1)
  return s
}