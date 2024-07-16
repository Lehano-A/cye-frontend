import { checkPriorityTypesAttentionIcon } from "./checkAttentionIconsFoodAdditive";


// вычислить цвет текста ингредиента
function calculateColorIngredient(theme, color, typeAttentionIcon) {

  if (color.length === 0) {
    return { bgColor: null, textColor: null }
  }

  if (checkPriorityTypesAttentionIcon(typeAttentionIcon)) {
    return {
      bgColor: theme.palette[typeAttentionIcon].main,
      textColor: theme.palette[typeAttentionIcon].contrastText
    }
  }

  return {
    bgColor: theme.palette[color.join()].light,
    textColor: theme.palette[color.join()].main,
  }
}


export { calculateColorIngredient }