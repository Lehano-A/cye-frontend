function handlePromiseError(err, callback) {

  err.then((dataError) => {
    callback(dataError)
  })
}

export default handlePromiseError