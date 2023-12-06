const arrCardForSkeletonCard = new Array(8).fill(true, 0)

const regexAlphaNum = /\d+(?:\.\d+)?(?=\))/

const defaultPaginationData = {
  page: null,
  totalPages: null,
}

const messages = {
  notFoundPage: 'Сервер очень старался, но эту страницу найти не удалось'
}

const DELAY_SKELETON = 0

const SIZE_ICON_AND_BUTTON_INFORMING = '25px'

const BASE_DOCTITLE = "ЧТО Я ЕМ"

const PRESSED_BUTTON_PAGINATION = 'pressedButtonPagination'

const START_URN_SEARCH_PRODUCT = '/search/products/'

const BEFORE_REQ_TO_API = 'beforeReqToApi'

const AFTER_RES_FROM_API = 'afterResFromApi'

const OPENING_MODAL_PRODUCT_BY_LINK = 'openingModalProductByLink'

const MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK = 'movementByHistoryUpdatePageOrFollowedlink'

const REDIRECTION_FROM_MODAL_PRODUCT_PAGE = 'redirectionFromModalProductPage'

const OPENING_MODAL_PRODUCT = 'openingModalProduct'

const CLOSING_MODAL_PRODUCT = 'closingModalProduct'

const AFTER_CLOSING_MODAL_PRODUCT = 'afterClosingModalProduct'

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


// mode loggers
const SILENT = 'silent'

const TRACE = 'trace'




export {
  arrCardForSkeletonCard,
  regexAlphaNum,
  defaultPaginationData,
  messages,

  DELAY_SKELETON,
  SIZE_ICON_AND_BUTTON_INFORMING,
  BASE_DOCTITLE,
  PRESSED_BUTTON_PAGINATION,
  START_URN_SEARCH_PRODUCT,
  BEFORE_REQ_TO_API,
  AFTER_RES_FROM_API,
  OPENING_MODAL_PRODUCT_BY_LINK,
  MOVEMENT_BY_HISTORY_UPDATE_PAGE_OR_FOLLOWED_LINK,
  REDIRECTION_FROM_MODAL_PRODUCT_PAGE,
  OPENING_MODAL_PRODUCT,
  CLOSING_MODAL_PRODUCT,
  AFTER_CLOSING_MODAL_PRODUCT,
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

  // mode loggers
  SILENT,
  TRACE,
}