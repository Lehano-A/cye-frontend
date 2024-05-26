// сохранить ключ
function saveItemLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}


// получить данные по ключу
function getDataLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}


// удаление ключа
function deleteKeyFromLocalStorage(key) {
  return localStorage.removeItem(key)
}


// обновление ключа
function fullUpdateKeyLocalStorage(key, data) {
  deleteKeyFromLocalStorage(key)
  saveItemLocalStorage(key, data)
}


export {
  saveItemLocalStorage,
  getDataLocalStorage,
  deleteKeyFromLocalStorage,
  fullUpdateKeyLocalStorage,
}