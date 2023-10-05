import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from '@mui/material/useMediaQuery';
import GridCardsProducts from "../components/Main/BoxSearchResult/GridCardsProducts/GridCardsProducts";

/* --------------------------------- slices --------------------------------- */
import { setColumnsGridCards } from "../redux/reducers/slices/boxSearchResultSlice";

/* -------------------------------- selectors ------------------------------- */
import { selectСolumnsGridCards } from "../redux/reducers/selectors/boxSearchResultSelectors"



function GridCardsProductsContainer({ arrForShowSearchResultProducts }) {

  const dispatch = useDispatch()

  const columnsGridCards = useSelector(selectСolumnsGridCards)

  const screenXS = useMediaQuery('(min-width: 0)');
  const screenSM = useMediaQuery('(min-width: 450px)');
  const screenMD = useMediaQuery('(min-width: 700px)');
  const screenLG = useMediaQuery('(min-width: 960px)');



  useEffect(() => {

    const repeatColumns = checkCurrentScreenSize()

    if (repeatColumns !== columnsGridCards) {
      dispatch(setColumnsGridCards(repeatColumns))
    }

  }, [screenXS, screenSM, screenMD, screenLG])



  function checkCurrentScreenSize() {
    const sizes = [screenXS, screenSM, screenMD, screenLG]
    let repeatColumns

    for (let i = 0; i < sizes.length; i++) {

      if (sizes[i]) {
        switch (i) {
          case 0:
            repeatColumns = 'repeat(1, 200px)'
            break

          case 1:
            repeatColumns = 'repeat(2, 200px)'
            break

          case 2:
            repeatColumns = 'repeat(3, 200px)'
            break

          case 3:
            repeatColumns = 'repeat(4, 200px)'
            break

          default:
            break
        }
      }
    }
    
    return repeatColumns
  }



  return (
    <>
      <GridCardsProducts
        arrForShowSearchResultProducts={arrForShowSearchResultProducts}
        columnsGridCards={columnsGridCards}
      />
    </>
  )
}

export default GridCardsProductsContainer