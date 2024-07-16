import {
  DANGEROUS_TYPE_ATTENTION_ICON,
  FULL_NATURAL_TYPE_ATTENTION_ICON,
  WITH_CAUTION_TYPE_ATTENTION_ICON,
} from "../../constants";


const priority = [
  DANGEROUS_TYPE_ATTENTION_ICON,
  WITH_CAUTION_TYPE_ATTENTION_ICON,
  FULL_NATURAL_TYPE_ATTENTION_ICON,
]


// проверить приоритетность типов иконки внимания
function checkPriorityTypesAttentionIcon(type) {
  return priority.some((item) => type === item)
}


// проверить иконку внимания пищевой добавки
function checkAttentionIconsFoodAdditive(arr) {
  if (arr.length === 0) {
    return []
  }

  let foundPriority

  for (let item of priority) {
    const id = arr.indexOf(item)

    if (id !== -1) {
      foundPriority = arr[id]
      break
    }
  }
  return foundPriority ? foundPriority : []
}



export { checkAttentionIconsFoodAdditive, checkPriorityTypesAttentionIcon }