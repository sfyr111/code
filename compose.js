function _compose(f, g) {
  return function(x) {
    return f(g(x))
  }
}

const compose = (...args) => {
  const len = args.length
  let count = len - 1
  let result
  return function f(...subArgs) {
    result = args[count].apply(this, subArgs)
    if (count <= 0) {
      count = len - 1
      return result
    }

    count--
    return f.call(null, result)
  }
}
