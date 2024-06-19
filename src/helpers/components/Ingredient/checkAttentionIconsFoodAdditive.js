import {
  DANGEROUS_TYPE_ATTENTION_ICON,
  FULL_NATURAL_TYPE_ATTENTION_ICON,
  PRESERVING_AGENTS_TYPE_ATTENTION_ICON,
} from "../../constants";


// проверить иконку внимания пищевой добавки
function checkAttentionIconsFoodAdditive(arr) {
  const hasDangerous = arr.filter((name) =>
    name === DANGEROUS_TYPE_ATTENTION_ICON ||
    name === PRESERVING_AGENTS_TYPE_ATTENTION_ICON ||
    name === FULL_NATURAL_TYPE_ATTENTION_ICON
  );

  if (hasDangerous.length > 0) {
    return hasDangerous.join()
  }

  return arr.join()
}


export { checkAttentionIconsFoodAdditive }