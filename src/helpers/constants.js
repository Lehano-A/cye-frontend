const arrCardForSkeletonCard = new Array(8).fill(true, 0)

const regexAlphaNum = /\d+(?:\.\d+)?(?=\))/

const defaultPaginationData = {
  page: null,
  totalPages: null,
}

const messages = {
  notFoundPage: 'Сервер очень старался, но эту страницу ему найти не удалось'
}

// breakpoints
const MIN_WIDTH_0 = '(min-width: 0)'

const MIN_WIDTH_500 = '(min-width: 500px)'

const MIN_WIDTH_700 = '(min-width: 700px)'

const MIN_WIDTH_900 = '(min-width: 900px)'

const MIN_WIDTH_1000 = '(min-width: 1000px)'

const MIN_WIDTH_1100 = '(min-width: 1100px)'

const MIN_WIDTH_1200 = '(min-width: 1200px)'


// media queries
const MEDIA_XS_MODAL_PRODUCT = `@media ${MIN_WIDTH_0}`

const MEDIA_XSPLUS_MODAL_PRODUCT = `@media ${MIN_WIDTH_500}`

const MEDIA_SM_MODAL_PRODUCT = `@media ${MIN_WIDTH_700}`

const MEDIA_MD_MODAL_PRODUCT = `@media ${MIN_WIDTH_900}`

const MEDIA_XL_MODAL_PRODUCT = `@media ${MIN_WIDTH_1000}`

const MEDIA_XLPLUS_MODAL_PRODUCT = `@media ${MIN_WIDTH_1100}`

const MEDIA_LG_MODAL_PRODUCT = `@media ${MIN_WIDTH_1200}`



const DELAY_SKELETON = 0

const SIZE_ICON_AND_BUTTON_INFORMING = '25px'

const BASE_DOCTITLE = "ЧТО Я ЕМ"

const PRESSED_BUTTON_PAGINATION = 'pressedButtonPagination'

const START_PATH_SEARCH_PRODUCT = '/search/products/'

const BEFORE_REQ_TO_API = 'beforeReqToApi'

const AFTER_RES_FROM_API = 'afterResFromApi'

const OPENING_MODAL_PRODUCT_BY_LINK = 'openingModalProductByLink'

const MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK = 'movementByHistoryUpdatePageOrFollowedlink'

const REDIRECTION_FROM_MODAL_PRODUCT_PAGE = 'redirectionFromModalProductPage'

const OPENING_MODAL_PRODUCT = 'openingModalProduct'

const CLOSING_MODAL_PRODUCT = 'closingModalProduct'

const AFTER_CLOSING_MODAL_PRODUCT = 'afterClosingModalProduct'

const AFTER_ERROR_APP_HAS_OCCURRED_AND_CLOSING_MODAL_PRODUCT = 'afterErrorAppHasOccurredAndClosingModalProduct'

const BRAND = 'brand'

const CATEGORY = 'category'

const BRAND_AND_CATEGORY = 'brandAndCategory'

const TEXT = 'text'

const PERMALINK = 'permalink'

const NOT_FOUND = 'notFound'

const LOADING = 'loading'

const PRODUCT_TITLE = 'productTitle'

const AFTER_ERROR_PAGE = 'afterErrorPage'


// loggers
const CONSTRUCTION_LOCATION_CONFIG = 'constructLocationConfig'

const ACTIONS_NAVIGATION = 'actionsNavigation'

const CHANGE_STATE_IN_LOCATION_STORE = 'changeStateInLocationStore'

const NAVIGATION = 'navigation'

const MODAL_PRODUCT = 'modalProduct'

const CHANGING_DOC_TITLE = 'changingDocTitle'

const OPENED_MODAL_PRODUCT_PAGE = 'OpenedModalProductPage'

const SEND_TO_API = 'sendToApi'

const CREATE_REQ_CONFIG_SEARCH_PRODUCT = 'createReqConfigSearchProduct'

const SEARCH_PRODUCT_RESULT_PAGE = 'SearchProductResultPage'

const HISTORY_SUBMIT = 'HistorySubmit'


// mode loggers
const SILENT = 'silent'
const TRACE = 'trace'


// attentionIcons
const DANGEROUS_TYPE_ATTENTION_ICON = 'dangerous';

const WITH_CAUTION_TYPE_ATTENTION_ICON = 'withCaution';

const FULL_NATURAL_TYPE_ATTENTION_ICON = 'fullNatural';

const PRESERVING_AGENTS_TYPE_ATTENTION_ICON = 'preservingAgents';

const FORBIDDEN_FOR_CHILDREN_PREGNANCY_AND_LACTATING_TYPE_ATTENTION_ICON = 'forbiddenForChildrenPregnancyAndLactating';


// title in Interpetation
const SYNONYMS = 'Другие названия';

const WHAT_IS_IT = 'Что это';

const ORIGIN = 'Происхождение';

const WHY_USED = 'Для чего';

const WHERE_USED = 'Где применяется';

const WITH_CAUTION = 'Потенциальный вред';

const DANGEROUS = 'Опасность';



export {
  arrCardForSkeletonCard,
  regexAlphaNum,
  defaultPaginationData,
  messages,

  // breakpoints
  MIN_WIDTH_0,
  MIN_WIDTH_500,
  MIN_WIDTH_700,
  MIN_WIDTH_900,
  MIN_WIDTH_1000,

  // media queries
  MEDIA_XS_MODAL_PRODUCT,
  MEDIA_XSPLUS_MODAL_PRODUCT,
  MEDIA_SM_MODAL_PRODUCT,
  MEDIA_MD_MODAL_PRODUCT,
  MEDIA_XL_MODAL_PRODUCT,
  MEDIA_XLPLUS_MODAL_PRODUCT,
  MEDIA_LG_MODAL_PRODUCT,

  DELAY_SKELETON,
  SIZE_ICON_AND_BUTTON_INFORMING,
  BASE_DOCTITLE,
  PRESSED_BUTTON_PAGINATION,
  START_PATH_SEARCH_PRODUCT,
  BEFORE_REQ_TO_API,
  AFTER_RES_FROM_API,
  OPENING_MODAL_PRODUCT_BY_LINK,
  MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK,
  REDIRECTION_FROM_MODAL_PRODUCT_PAGE,
  OPENING_MODAL_PRODUCT,
  CLOSING_MODAL_PRODUCT,
  AFTER_CLOSING_MODAL_PRODUCT,
  AFTER_ERROR_APP_HAS_OCCURRED_AND_CLOSING_MODAL_PRODUCT,
  BRAND,
  CATEGORY,
  BRAND_AND_CATEGORY,
  TEXT,
  PERMALINK,
  NOT_FOUND,
  LOADING,
  PRODUCT_TITLE,
  AFTER_ERROR_PAGE,

  // loggers
  CONSTRUCTION_LOCATION_CONFIG,
  ACTIONS_NAVIGATION,
  CHANGE_STATE_IN_LOCATION_STORE,
  NAVIGATION,
  MODAL_PRODUCT,
  CHANGING_DOC_TITLE,
  OPENED_MODAL_PRODUCT_PAGE,
  SEND_TO_API,
  CREATE_REQ_CONFIG_SEARCH_PRODUCT,
  SEARCH_PRODUCT_RESULT_PAGE,
  HISTORY_SUBMIT,

  // mode loggers
  SILENT,
  TRACE,

  // attentionIcons
  DANGEROUS_TYPE_ATTENTION_ICON,
  WITH_CAUTION_TYPE_ATTENTION_ICON,
  FULL_NATURAL_TYPE_ATTENTION_ICON,
  PRESERVING_AGENTS_TYPE_ATTENTION_ICON,
  FORBIDDEN_FOR_CHILDREN_PREGNANCY_AND_LACTATING_TYPE_ATTENTION_ICON,

  // title in Interpetation
  SYNONYMS,
  WHAT_IS_IT,
  ORIGIN,
  WHY_USED,
  WHERE_USED,
  WITH_CAUTION,
  DANGEROUS,
}