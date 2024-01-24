// получить значение из опции
function getValueFromOption(option) {

  if (option.text || option.brand || option.category) {
    return Object.values(option)[0]
  }

  /*
   если есть option.title, значит это объект продукта с ключами:
   id, imagesURI и title
  */
  if (option.title) {
    return option.title
  }

  return option // если была введена "подстрока"
}

export { getValueFromOption }