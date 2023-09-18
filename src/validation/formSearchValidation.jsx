import log from "loglevel"


// проверить валидность значения в поле ввода перед дальнейшими действиями
function checkValidInputValue(params) {

  params.inputValue = params.inputValue.trim()
  params.onlyValueTrim = params.onlyValueTrim.trim()

  const { eventType, option, inputValue, savedInputValueAfterSubmit,  onlyValueTrim } = params


  // если длина значения <= 1, тогда запрос не отправляется или пустая строка
  if (onlyValueTrim?.length <= 1 || onlyValueTrim === "") {
    log.error(`
    Обработчик: checkValidInputValue

    Сработало условие:
    - onlyValueTrim?.length <= 1 || onlyValueTrim === ""

    Что произошло:
    - значение в инпуте не прошло валидацию

    Значение: ${onlyValueTrim}
    `)
    return
  }


  // если значение не изменилось, после сабмита, тогда новый не отправляем
  // (в том числе, когда сначала выбрали вариант из списка, стёрли символ и опять нажали на этот же вариант в списке)
  // "keydown":
  // 1) поиск через ENTER, по введённой подстроке
  // 2) или по выбранному варианту стрелками на клавиатуре + ENTER (в этом случае -  option имеет объект {title: ..., imagesUrl: ...})
  if (eventType === 'keydown') {
    // убеждаемся, что выбран вариант из выпадающего списка
    // и что этот вариант совпадает с предыдущим значением сабмита
    if (option.title && option.title === savedInputValueAfterSubmit) {
      log.error(`
        ********** Тип события: ${eventType} **********

        Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита.
        Новый запрос к серверу не производим.
      `);
      return false
    }

    // если значение в строке совпадает со значением, после сабмита
    if (inputValue === savedInputValueAfterSubmit && (inputValue === option.title || savedInputValueAfterSubmit === option.title)) {
      log.error(`
        ********** Тип события: ${eventType} **********

        Значение в строке совпадает со значением, после сабмита, а также с выбранным вариантом из выпадающего списка.
        Новый запрос к серверу не производим.
      `);
      return false
    }

    if (inputValue === savedInputValueAfterSubmit && option.title === undefined) {
      log.error(`
        ********** Тип события: ${eventType} **********

        Значение в строке совпадает со значением, после сабмита, а варианты из выпадающего списка не задействовали.
        Новый запрос к серверу не производим.
      `);
      return false
    }
  }

  // "submit" - поиск по клику на кнопке поиска (только подстрока)
  if (eventType === 'submit') {
    if (inputValue === savedInputValueAfterSubmit) {
      log.error(`
        ********** Тип события: ${eventType} **********

        Значение в строке совпадает со значением, после сабмита.
        Новый запрос к серверу не производим.`);
      return false
    }
  }

  // "click" - поиск по клику на вариант из выпадающего списка
  if (eventType === 'click') {
    if (option.title && option.title === savedInputValueAfterSubmit) {
      log.error(`
        ********** Тип события: ${eventType} **********

        Выбран вариант из выпадающего списка и этот вариант совпадает с предыдущим значением сабмита.
        Новый запрос к серверу не производим.
      `);
      return false
    }
  }

  log.debug(`%c
    ********** Тип события: ${eventType} **********

    %cЗначение и событие - валидны. Всё хорошо, производится отправка запроса на сервер.
  `, 'color: green; font-weight: bold;', 'color: white;');
  return true
}

export { checkValidInputValue }