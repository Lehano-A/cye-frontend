function handlePromiseError(err, callback) {
  console.log('sdsdsdssd', err);
  err.then((dataError) => {
    console.log('dataError', dataError);
    callback(dataError)
  })
}

export default handlePromiseError