import constructLocationConfig from "../../../../utils/navigation/constructLocationConfig"
import loglevel from 'loglevel'
import { saveCurrentPathDataBeforeOpeningModalProduct } from "../../../../redux/reducers/actions/navigation/navigation"
import createPathname from "../../../../utils/navigation/createPathname"
import { ACTIONS_NAVIGATION, NOT_FOUND, OPENING_MODAL_PRODUCT_BY_LINK } from "../../../../utils/constants"

const log = loglevel.getLogger(ACTIONS_NAVIGATION)



function handleOpeningModalProductByLink(data) {
  log.debug(`
  Метод: replacePathname
  Произошёл вызов функции: handleOpeningModalProductByLink

  data: `, data)

  const { dataForPathname, dataForQueryParams, dataForSavingLocationState, notFoundModalAndBGProducts, dispatch } = data
  const { foundProductForModal = null } = dataForSavingLocationState
  const { search, pagination } = dataForQueryParams
  const { brokenURI = null, permalink } = search


  if (notFoundModalAndBGProducts) {
    return constructLocationConfig({
      dataForPathname: '/',
      dataForQueryParams: '',
      withoutDocTitle: true,
      withoutLocationState: true,
    })
  }


  const preQuerySearchParams = preHandleQuerySearchParams({ pagination, search })
  const preDocTitle = preHandleDocTitle(data)
  const preLocationState = preHandleLocationState(data)

  const config = constructLocationConfig({
    dataForQueryParams: preQuerySearchParams,
    dataForDocTitle: preDocTitle,
    ...preLocationState
  })


  // если сервер сообщил, что URI - битый , значит нужно обновить стэйт savedPathDataBeforeOpeningModalProduct
  if (brokenURI) {
    log.debug(`
    Продолжение работы функции: handleOpeningModalProductByLink

    Что произошло: URI оказался битый
    Что делаем: обновляем savedPathDataBeforeOpeningModalProduct

    config: `, config);


    config.state.pathname = createPathname({
      permalink,
      brokenURI: dataForPathname.search.brokenURI
    })
    config.state.search = '?page=1'
    config.state.inputValue = search.searchValue
    config.state.store.docTitle = foundProductForModal.data.title

    dispatch(saveCurrentPathDataBeforeOpeningModalProduct({
      stage: OPENING_MODAL_PRODUCT_BY_LINK,
      dataForSavingLocationState: config.state
    }))
  }

  return config
}



function preHandleQuerySearchParams(data) {
  log.debug(`
  Продолжение работы функции: handleOpeningModalProductByLink

  Произошёл вызов функции: prehandleQuerySearchParams

  data: `, data)

  const { pagination, search } = data
  const { page } = pagination
  const { searchBy = null, permalink = null, searchValue = null, brokenURI } = search
  const { foundProductForModal } = search


  if (brokenURI) {
    return {
      fullReplace: true,
      pagination,
      search,
    }
  }


  if (page === 0 && foundProductForModal.status === NOT_FOUND) {
    return ''
  }


  let box = {
    searchBy,
    searchValue,
    page: pagination.page
  }

  if (permalink) {
    const { brand, category } = permalink

    if (brand && category) {
      box.permalinkBrand = brand
      box.permalinkCategory = category
    } else

      if (brand || category) {
        box.permalink = brand || category
      } else {

        const permalinks = {}

        Object.entries(permalink).forEach((element) => {
          permalinks[element[0]] = element[1]
        })

        box = { ...box, ...permalinks }
      }
  }

  return box
}



function preHandleDocTitle(data) {
  const { dataForQueryParams } = data
  const { pagination, search } = dataForQueryParams
  const { page } = pagination
  const { foundProductForModal } = search


  if (page === 0 && foundProductForModal.status === NOT_FOUND) {
    return ''
  }

  return {
    foundProductForModal: foundProductForModal.data
  }
}



function preHandleLocationState(data) {
  const { dataForQueryParams, dataForSavingLocationState } = data
  const { foundProductForModal = null, pathDataBeforeOpeningModalProduct } = dataForSavingLocationState
  const { pagination } = dataForQueryParams
  const { page } = pagination


  if (page === 0 && foundProductForModal.status === NOT_FOUND) {
    return { withoutLocationState: true }
  }

  return {
    dataForLocationState: {
      toState: { // именно выборочно, поскольку иначе будет добавляться ещё лишний ключ .state
        pathname: pathDataBeforeOpeningModalProduct.pathname,
        search: pathDataBeforeOpeningModalProduct.search,
        hash: pathDataBeforeOpeningModalProduct.hash,
      }
    }
  }
}

export default handleOpeningModalProductByLink