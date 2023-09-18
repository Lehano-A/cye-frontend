const selectIsOpenedDropList = state => state.dropListPreSearchResult.isOpenedDropList;

const selectIsCursorInsideDropList = state => state.dropListPreSearchResult.isCursorInsideDropList;

const selectApiFoundProductsForDropList = state => state.dropListPreSearchResult.apiFoundProductsForDropList;

const selectSaveboxDropListBeforeSubmit = state => state.dropListPreSearchResult.saveboxDropListBeforeSubmit;


export {
  selectIsOpenedDropList,
  selectIsCursorInsideDropList,
  selectApiFoundProductsForDropList,
  selectSaveboxDropListBeforeSubmit,
}