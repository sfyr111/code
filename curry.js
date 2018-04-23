// https://robertwpearce.com/blog/ramda-chops-function-currying.html

// curry :: ((a, b, c) -> d) -> a -> b -> c -> d
//
// 1. 接受一个函数
const curry = (fn) => {
  // 2. 返回一个带有 n 个参数的函数
  return (...xs) => {
    // 确保有一个 list 来处理
    
    const args =
      xs.length ? xs : [ undefined ]

    // 如果传入的参数数量少于 fn 要求的数量，
    // 则不要做更多的工作; 
    // 继续并返回一个新版本的函数，
    // 该函数仍在等待更多参数。
    
    if (args.length < fn.length) {
      // 安全地创建一个新函数并绑定参数而不调用它的方法。
      return curry(Function.bind.apply(fn, [ null ].concat(args)))
    }

    // 如果我们提供了所有参数，那么让我们应用它们并返回结果。

    // 否则，让我们做一些工作，
    // 并根据参数的数量来查看是否返回一个带较少参数的新函数，
    // 或者继续并用最终参数调用该函数，以便返回值。

    const val =
      args.length === fn.length
        ? fn.apply(null, args)
        : args.reduce(applyCurry, fn) // args.length > fn.length

    // 如果我们的值仍然是一个函数，
    // 那么让我们返回仍然需要应用某些参数的函数的curried版本，并重复上述所有内容。

    // 否则，我们都在这里完成，所以让我们返回值。

    return isFunction(val)
      ? curry(val)
      : val
  }
}

const applyCurry = (fn, arg) => {
  // 如果fn实际上不是函数，则返回我们收到的任何内容。
  
  if (!isFunction(fn)) { return fn }

  // 如果我们还有超过1个参数需要应用，
  // 那么让我们将一个值绑定到下一个参数并继续。

  // 否则，那么让我们继续前进，并用参数调用该函数; 
  // 我们的'[undefined]`default在这里避免了一些潜在的麻烦。

  return fn.length > 1
    ? fn.bind(null, arg)
    : fn.call(null, arg)
}

const isFunction = x =>
  typeof x === 'function'

  const add = curry((a, b) => a + b)

  // add // => Function
  // add(1) // => Function 
  // add(1)(2) // => 3
  add(1, 2) // => 3
  add(1, 2, 99) // => 3 (we don't care about the last one!)
  add(1, 2, 99, 2000) // => 3 (we don't care about the last two!)