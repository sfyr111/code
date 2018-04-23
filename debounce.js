const debounce = (fn, delay = 100) => {
  let timer
  
  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const log = debounce((x) => console.log(x), 1000)

log(1000)
log(1000)
log(1000)
log(1000)
log(1000)
log(1000)