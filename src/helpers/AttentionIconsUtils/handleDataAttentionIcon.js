import { ReactComponent as IconFullNatural } from "../../images/icons/cardProduct/full-natural.svg"
import { ReactComponent as IconPreservingAgents } from "../../images/icons/cardProduct/preserving-agents.svg"
import { ReactComponent as IconWithCaution } from "../../images/icons/cardProduct/with-caution.svg"
import { ReactComponent as IconChildren } from "../../images/icons/cardProduct/children.svg"
import { ReactComponent as Dangerous } from "../../images/icons/cardProduct/dangerous.svg"
import { DANGEROUS_TYPE_ATTENTION_ICON, FORBIDDEN_FOR_CHILDREN_PREGNANCY_AND_LACTATING_TYPE_ATTENTION_ICON, FULL_NATURAL_TYPE_ATTENTION_ICON, PRESERVING_AGENTS_TYPE_ATTENTION_ICON, WITH_CAUTION_TYPE_ATTENTION_ICON } from "../constants"



function handleDataAttentionIcon(feature) {

  if (feature === FULL_NATURAL_TYPE_ATTENTION_ICON) {
    return {
      icon: IconFullNatural,
      color: FULL_NATURAL_TYPE_ATTENTION_ICON,
      title: 'Полностью натуральный продукт',
    }
  }

  if (feature === PRESERVING_AGENTS_TYPE_ATTENTION_ICON) {
    return {
      icon: IconPreservingAgents,
      color: PRESERVING_AGENTS_TYPE_ATTENTION_ICON,
      title: 'Консерванты',
    }
  }

  if (feature === FORBIDDEN_FOR_CHILDREN_PREGNANCY_AND_LACTATING_TYPE_ATTENTION_ICON) {
    return {
      icon: IconChildren,
      color: FORBIDDEN_FOR_CHILDREN_PREGNANCY_AND_LACTATING_TYPE_ATTENTION_ICON,
      title: 'Запрещено детям, беременным и кормящим',
    }
  }

  if (feature === WITH_CAUTION_TYPE_ATTENTION_ICON) {
    return {
      icon: IconWithCaution,
      color: 'withCaution',
      title: 'С осторожностью при проблемах со здоровьем',
    }
  }

  if (feature === DANGEROUS_TYPE_ATTENTION_ICON) {
    return {
      icon: Dangerous,
      color: DANGEROUS_TYPE_ATTENTION_ICON,
      title: 'Опасная пищевая добавка',
    }
  }
}

export { handleDataAttentionIcon }