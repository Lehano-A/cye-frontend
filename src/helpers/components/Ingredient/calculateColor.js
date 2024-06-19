import {
  DANGEROUS_TYPE_ATTENTION_ICON,
  FULL_NATURAL_TYPE_ATTENTION_ICON,
  WITH_CAUTION_TYPE_ATTENTION_ICON,
} from "../../constants"


// вычислить цвет текста ингредиента
function calculateColorIngredient(theme, color, typeAttentionIcon) {
  if (
    typeAttentionIcon === DANGEROUS_TYPE_ATTENTION_ICON ||
    typeAttentionIcon === WITH_CAUTION_TYPE_ATTENTION_ICON ||
    typeAttentionIcon === FULL_NATURAL_TYPE_ATTENTION_ICON
  ) {

    return {
      bgColor: theme.palette[typeAttentionIcon].main,
      textColor: theme.palette[typeAttentionIcon].contrastText
    }
  }

  return {
    bgColor: theme.palette[`${color}`].light,
    textColor: theme.palette[`${color}`].main,
  }
}


export { calculateColorIngredient }