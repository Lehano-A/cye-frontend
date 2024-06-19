import React, { useRef } from "react";
import Interpretation from "./Interpretation/Interpretation";
import ModalWindow from "../../../ModalWindow/ModalWindow";

/* --------------------------------- slices --------------------------------- */
import { toggleVisiblePopper } from "../../../../redux/reducers/slices/popperInterpretationSlice";

/* --------------------------------- hooks --------------------------------- */
import useBreakpoints from "../../../../hooks/useMediaQuery";



function PopperInterpretation({ dataInterpretation }) {

  const breakpoints = useBreakpoints();
  const popperRef = useRef(null);


  return (
    <>
      {
        !breakpoints.MD ?

          <ModalWindow
            setVisible={toggleVisiblePopper}
            positionButtonClose='fixed'
            hideBackdrop={true}
            ref={popperRef}
          >
            <Interpretation data={dataInterpretation} />
          </ModalWindow>

          :

          <ModalWindow
            setVisible={toggleVisiblePopper}
            positionButtonClose='fixed'
            heightModal="fit-content"
            widthModal="85%"
            maxWidth="calc(1100px - 5%)"
            withoutPaddingScroll={true}
          >
            <Interpretation data={dataInterpretation} />
          </ModalWindow>
      }
    </>
  )
}

export default PopperInterpretation
