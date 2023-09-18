import log from "loglevel"

// "keydown":
// 1) поиск через ENTER, по введённой подстроке
// 2) или по выбранному варианту стрелками на клавиатуре + ENTER
// "submit" - поиск по клику на кнопке поиска (только подстрока)
// "click" - поиск по клику на вариант из выпадающего списка
function checkActionByValue({ e, option }) {

  if ((e.type === 'click' || e.type === "keydown")) {

    if (option.brand) {
      log.debug(`
        В выпадающем списке выбрана опция - 'бренд':
        ${option.brand}
      `)

      return {
        searchValue: { brand: option.brand },
        endpoint: 'brands'
      }
    }


    if (option.categories) {
      log.debug(`
        В выпадающем списке выбрана опция - 'categories':
        ${option.categories}
      `)

      return {
        searchValue: { categories: option.categories },
        endpoint: 'categories'
      }
    }


    if (option.title) {
      log.debug(`
        В выпадающем списке выбрана опция - 'title':
        ${option.title}
      `)
      return {
        searchValue: { title: option.title },
        endpoint: 'submit'
      }
    }
  }


  log.debug(`
    Запрос осуществлён через:
    1) 'стрелки + Enter' (keydown)
      или
    2) 'подстрока + Enter' (keydown)
      или
    3) 'подстрока + клик по кнопке поиска' (submit)

     Значение: ${option}
  `)

  // если есть вариант .title, значит вариант выбран "стрелками" + "Enter"
  // иначе, введена "подстрока" + "Enter"
  return {
    searchValue: option.title ? option : { title: option.trim() },
    endpoint: 'submit'
  }
}

export { checkActionByValue }