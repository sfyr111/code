const throttle = (fn, hold = 100) => {
  let last
  let timer

  return (...args) => {
    const now = Date.now()

    if (last && now < last + hold) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, hold)
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}

const log = throttle((x) => console.log(x), 1000)

log(1000)
log(2000)
log(3000)
log(3000)
log(3000)
log(3000)
log(3000)
// log(1000)
// log(1000)
// log(1000)