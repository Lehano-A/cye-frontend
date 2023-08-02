import { ReactComponent as IconNatural } from "../../images/icons/cardProduct/natural.svg"
import { ReactComponent as IconPreservingAgents } from "../../images/icons/cardProduct/preserving-agent.svg"
import { ReactComponent as IconUndesirableIngredients } from "../../images/icons/cardProduct/undesirable-ingredients.svg"
import { ReactComponent as IconChildren } from "../../images/icons/cardProduct/children.svg"
import { ReactComponent as IconPregnancy } from "../../images/icons/cardProduct/pregnancy.svg"


function handleDataIcon(feature) {

  if (feature === 'fullNatural') {
    return {
      icon: IconNatural,
      color: 'fullNatural',
      title: 'Полностью натуральный продукт',
    }
  }

  if (feature === 'preservingAgents') {
    return {
      icon: IconPreservingAgents,
      color: 'preservingAgents',
      title: 'Консерванты',
    }
  }

  if (feature === 'undesirableIngredients') {
    return {
      icon: IconUndesirableIngredients,
      color: 'undesirableIngredients',
      title: 'Нежелательные компоненты',
    }
  }

  if (feature === 'forbiddenForChildren') {
    return {
      icon: IconChildren,
      color: 'forbiddenForChildren',
      title: 'Запрещено детям',
    }
  }

  if (feature === 'forbiddenForPregnancy') {
    return {
      icon: IconPregnancy,
      color: 'forbiddenForPregnancy',
      title: 'Запрещено кормящим и беременным'
    }
  }
}

export { handleDataIcon }