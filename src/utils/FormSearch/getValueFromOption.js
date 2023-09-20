// получить значение из опции
function getValueFromOption(option) {
  if (option.title) {
    return option.title
  }

  if (option.brand || option.categories) {
    return Object.values(option)[0]
  }

  return option // если была введена "строка"
}

export { getValueFromOption }