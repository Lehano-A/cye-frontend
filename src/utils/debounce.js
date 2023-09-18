function debounce(callback, delay) {
  let timeout

  return function (e, newValue) {

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback(e, newValue)

    }, delay)
  }

}


export { debounce }


