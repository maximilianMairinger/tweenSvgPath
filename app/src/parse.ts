const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');

export type Segments = (string | number)[][]
type Path = String

export type Seg = {
  Frame: Segments & {offset?: never}
  Keyframe: Segments & {offset?: number}
  Keyframes: Seg["Keyframe"][]
}

export type Str = {
  Frame: Path & {offset?: never}
  Keyframe: Path & {offset?: number}
  Keyframes: Str["Keyframe"][]
}


export const toObject = function (path: Str["Keyframe"]): Seg["Keyframe"] {
  let offset = path.offset
  try {
    let parsed = normalize(abs(parse(path)))
    if (offset !== undefined) parsed.offset = offset
    return parsed
  }
  catch(e) {
    throw new Error("Failed to parseIn svgPathString.")
  }
}

export const toPath = function (segments: Seg["Keyframe"]): Str["Keyframe"] {
  let i = 0
  let s = ""
  for (; i < segments.length; i++) {
    s += segments[i].join(" ") + " " 
  }
  s = s.substr(0, s.length-1)
  return s
}