import { ReactComponent as IconNatural } from "../../images/icons/cardProduct/natural.svg"
import { ReactComponent as IconPreservingAgent } from "../../images/icons/cardProduct/preserving-agent.svg"
import { ReactComponent as IconUndesirableIngredients } from "../../images/icons/cardProduct/undesirable-ingredients.svg"
import { ReactComponent as IconChildren } from "../../images/icons/cardProduct/children.svg"
import { ReactComponent as IconPregnancy } from "../../images/icons/cardProduct/pregnancy.svg"


function handleDataIcon({ isFullNatural, preservingAgent, undesirableIngredients, forbiddenForChildren, forbiddenForPregnancy }) {

  if (isFullNatural) {
    return { icon: IconNatural, color: 'success' }
  }

  if (preservingAgent) {
    return { icon: IconPreservingAgent, color: 'error' }
  }

  if (undesirableIngredients) {
    return { icon: IconUndesirableIngredients, color: 'warning' }
  }

  if (forbiddenForChildren) {
    return { icon: IconChildren, color: 'primary' }
  }

  if (forbiddenForPregnancy) {
    return { icon: IconPregnancy, color: 'secondary' }
  }
}

export { handleDataIcon }