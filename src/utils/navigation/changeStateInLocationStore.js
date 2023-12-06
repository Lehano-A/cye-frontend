import loglevel from 'loglevel'
import { CHANGE_STATE_IN_LOCATION_STORE } from '../constants'

const log = loglevel.getLogger(CHANGE_STATE_IN_LOCATION_STORE)



// изменить/заменить какое-то состояние/слайс в ЛОКАЛЬНОМ сторе
function changeStateInLocationStore(data) {
  log.debug(`
  Была вызвана функция: changeStateInLocationStore

  data: `, data)

  const {
    locationData = null, // кастомный объект локального местоположения
    replacedData = null, // массив, каждый элемент которого - объект
  } = data || {}


  const store = { ...locationData.state.store }

  replacedData.forEach((element) => {
    const { sliceName, states } = element

    store[sliceName] = { ...store[sliceName], ...states }
  })


  log.debug('Изменённый локальный стор: ', store)
  return store
}

export default changeStateInLocationStore