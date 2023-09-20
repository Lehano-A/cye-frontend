import log from "loglevel"
import {
  getDataLocalStorage,
  saveItemLocalStorage,
  fullUpdateKeyLocalStorage,
  deleteKeyFromLocalStorage,
} from "../localStorage";


// сохранить "поисковый запрос" в историю сабмитов
function saveToHistorySubmit(data, searchValue) {

  const keyStorage = "historySubmit"

  const historySubmit = getDataLocalStorage(keyStorage)

  if (historySubmit?.length > 0) {
    if (checkDoubleValueLocalStorage(historySubmit, searchValue)) {

      filterCurrentValueInHistorySubmit(historySubmit, searchValue, keyStorage)
      return
    }
  }

  if (historySubmit?.length === 5) {
    removeLastValueFromHistory(keyStorage)
  }

  saveSubmitValueToLocalStorage(keyStorage, data)
}



// проверить наличие такого же значения в ключе
function checkDoubleValueLocalStorage(historySubmit, searchValue) {

  if (historySubmit) {
    return historySubmit.some((item) => {
      let isEqual = null

      for (let innerKey in item) {
        if (item[innerKey] === searchValue) {
          isEqual = true
          continue
        }
      }

      return isEqual
    })
  }
}


// отфильтровать текущее значение в "истории сабмитов"
function filterCurrentValueInHistorySubmit(historySubmit, searchValue, keyStorage) {
  let filtered = null

  const filter = historySubmit.filter((item) => {

    let differents = null

    for (let innerKey in item) { // проходимся по ключу

      if (item[innerKey] !== searchValue) {
        differents = item
      } else {
        filtered = item
        return
      }
    }

    return differents
  })


  if (filter.length === 0) {
    return
  }

  // если изначальный массив длиннее отфильтрованного,
  // значит значение текущего "поискового запроса" совпадает с значением в истории
  if (historySubmit.length - filter.length === 1) {
    addSubmitValueToHistory(filter, filtered)
    fullUpdateKeyLocalStorage(keyStorage, filter)
    return true
  }
}


// сохранить значение из инпута при сабмите в локальное хранилище
function saveSubmitValueToLocalStorage(keyStorage, value) {

  const historySubmit = getDataLocalStorage(keyStorage)

  log.debug(`"${Boolean(historySubmit)}" - проверка наличия ключа в хранилище`)

  if (historySubmit === null) {
    log.debug(`"${keyStorage}" - такого ключа в хранилище нет. Создаём ключ и добавляем значение.`)
    saveItemLocalStorage(keyStorage, [value])
    return
  }

  if (historySubmit?.length > 0) {
    log.debug(`"${keyStorage}" - такой ключ  в хранилище уже есть. Добавляем значение.`)

    addSubmitValueToHistory(historySubmit, value)
    saveItemLocalStorage(keyStorage, historySubmit)
  }
}


// добавить элемент в начало истории
function addSubmitValueToHistory(arr, value) {
  arr.unshift(value)
}


// удалить последний элемент из истории
function removeLastValueFromHistory(keyStorage) {
  const data = getDataLocalStorage(keyStorage)
  data.pop()
  saveItemLocalStorage(keyStorage, data)
}


// удалить элемент по значению из истории
function removeByValueFromHistory(targetValue) {
  const keyStorage = 'historySubmit'

  const data = getDataLocalStorage(keyStorage)
  const filter = data.filter((option) => {

    for (let key in option) {
      if (option[key] !== targetValue) {
        return option
      }
    }
  })

  if (filter.length === 0) {
    deleteKeyFromLocalStorage(keyStorage)
    return
  }

  saveItemLocalStorage(keyStorage, filter)
  return filter
}




export {
  saveToHistorySubmit,
  saveSubmitValueToLocalStorage,
  addSubmitValueToHistory,
  checkDoubleValueLocalStorage,
  removeByValueFromHistory,
}