import log from "loglevel"
import {
  getDataLocalStorage,
  saveItemLocalStorage,
  fullUpdateKeyLocalStorage,
  deleteKeyFromLocalStorage,
} from "../localStorage";



// сохранить "поисковый запрос" в историю сабмитов
function saveToHistorySubmit(dataForSave, searchValue) {

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

  saveSubmitValueToLocalStorage(keyStorage, dataForSave)
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
  let filteredElement = null

  /*
    Если значения - разные, тогда 'different' - будет true.
    Если значения - одинаковые, тогда элемент истории присвоится в 'filteredElement', а методу .filter вернётся false, и он его не запишет в новый массив.
    Далее, если уже найден отфильтрованный элемент, то до конца массива будет возвращаться true, т.к. цель одна, и она найдена.
  */
  const filteredHistory = historySubmit.filter((item) => {
    let different = null

    if (filteredElement) {
      return true
    }

    for (let innerKey in item) { // проходимся по ключу

      if (item[innerKey] !== searchValue) {
        different = true
      } else {
        filteredElement = item
        return false
      }
    }

    return different
  })


  if (filteredHistory.length === 0) {
    return
  }

  // если изначальный массив длиннее отфильтрованного,
  // значит значение текущего "поискового запроса" совпадает с значением в истории
  if (historySubmit.length - filteredHistory.length === 1) {
    addSubmitValueToHistory(filteredHistory, filteredElement)
    fullUpdateKeyLocalStorage(keyStorage, filteredHistory)
    return true
  }
}



// сохранить значение из инпута при сабмите в локальное хранилище
function saveSubmitValueToLocalStorage(keyStorage, dataForSave) {

  const historySubmit = getDataLocalStorage(keyStorage)

  log.debug(`"${Boolean(historySubmit)}" - проверка наличия ключа в хранилище`)

  if (historySubmit === null) {
    log.debug(`"${keyStorage}" - такого ключа в хранилище нет. Создаём ключ и добавляем значение.`)
    saveItemLocalStorage(keyStorage, [dataForSave])
    return
  }

  if (historySubmit?.length > 0) {
    log.debug(`"${keyStorage}" - такой ключ  в хранилище уже есть. Добавляем значение.`)

    addSubmitValueToHistory(historySubmit, dataForSave)
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

  const dataStorage = getDataLocalStorage(keyStorage)
  const filteredData = searchValueInStorage(dataStorage, targetValue)

  if (filteredData.length === 0) {
    deleteKeyFromLocalStorage(keyStorage)
    return
  }

  saveItemLocalStorage(keyStorage, filteredData)
  return filteredData
}



// поиск значения в хранилище
function searchValueInStorage(dataStorage, targetValue) {

  return dataStorage.filter((option) => {
    let matchedValue

    // проходимся по ключам объекта
    for (let key in option) {
      // если значение в хранилище совпадает с значением, которое удаляем
      if (option[key] === targetValue) {
        matchedValue = option
        continue
      }
    }

    if (!matchedValue) {
      return option
    }
  })
}


export {
  saveToHistorySubmit,
  saveSubmitValueToLocalStorage,
  addSubmitValueToHistory,
  checkDoubleValueLocalStorage,
  removeByValueFromHistory,
}