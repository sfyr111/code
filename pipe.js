function _pipe(f, g) {
  return function(x) {
    return g(f(x))
  }
}

const pipe = (...args) => {
  const len = args.length
  let count = 0
  let result
  return function f(...subArgs) {
    result = args[count].apply(this, subArgs)
    if (count >= len - 1) {
      count = 0
      return result
    }
    count++
    return f.call(null, result)
  }
}