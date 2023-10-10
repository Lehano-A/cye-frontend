const arrCardForSkeletonCard = new Array(8).fill(true, 0)

const regexAlphaNum = /\d+(?:\.\d+)?(?=\))/

const PER_PAGE = 12 // подгружаемых карточек в boxSearchResult за 1 запрос

const DELAY_SKELETON = 400

const SIZE_ICON_AND_BUTTON_INFORMING = '25px'

const ENDPOINT_SUBMIT = 'submit'
const ENDPOINT_BRANDS = 'brands'
const ENDPOINT_CATEGORIES = 'categories'


export {
  arrCardForSkeletonCard,
  regexAlphaNum,
  PER_PAGE,
  DELAY_SKELETON,
  SIZE_ICON_AND_BUTTON_INFORMING,
  ENDPOINT_SUBMIT,
  ENDPOINT_BRANDS,
  ENDPOINT_CATEGORIES,
}