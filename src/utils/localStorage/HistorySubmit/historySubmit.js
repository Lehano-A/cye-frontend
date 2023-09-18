import log from "loglevel"
import {
  getDataLocalStorage,
  saveItemLocalStorage,
  fullUpdateKeyLocalStorage,
} from "../localStorage";


// сохранить "поисковый запрос" в историю сабмитов
function saveToHistorySubmit(data, searchValue) {

  const key = "historySubmit"

  const historySubmit = getDataLocalStorage(key)

  if (historySubmit?.length > 0) {
    if (checkDoubleValueLocalStorage(historySubmit, searchValue)) {

      filterCurrentValueInHistorySubmit(historySubmit, searchValue, key)
      return
    }
  }

  if (historySubmit?.length === 5) {
    removeOneFromHistory(key)
  }

  saveSubmitValueToLocalStorage(key, data)
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
function filterCurrentValueInHistorySubmit(historySubmit, searchValue, key) {
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
    fullUpdateKeyLocalStorage(key, filter)
    return true
  }
}


// сохранить значение из инпута при сабмите в локальное хранилище
function saveSubmitValueToLocalStorage(key, value) {

  const historySubmit = getDataLocalStorage(key)

  log.debug(`"${Boolean(historySubmit)}" - проверка наличия ключа в хранилище`)

  if (historySubmit === null) {
    log.debug(`"${key}" - такого ключа в хранилище нет. Создаём ключ и добавляем значение.`)
    saveItemLocalStorage(key, [value])
    return
  }

  if (historySubmit?.length > 0) {
    log.debug(`"${key}" - такой ключ  в хранилище уже есть. Добавляем значение.`)

    addSubmitValueToHistory(historySubmit, value)
    saveItemLocalStorage(key, historySubmit)
  }
}


// добавить элемент в начало истории
function addSubmitValueToHistory(arr, value) {
  arr.unshift(value)
}



// удалить последний элемент из истории
function removeOneFromHistory(key) {
  const data = getDataLocalStorage(key)
  data.pop()
  saveItemLocalStorage(key, data)
}



export {
  saveToHistorySubmit,
  saveSubmitValueToLocalStorage,
  addSubmitValueToHistory,
  checkDoubleValueLocalStorage,
  removeOneFromHistory,
}