import React, { useState, useEffect, useRef } from "react";
import { Box, Popper, Fade, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Interpretation from "./Interpretation/Interpretation";
import { styled } from "@mui/material/styles";
import ModalWindow from "../../../ModalWindow/ModalWindow";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XSPLUS_MODAL_PRODUCT } from "../../../../helpers/constants";

/* --------------------------------- slices --------------------------------- */
import { toggleVisiblePopper, setDataInterpretation } from "../../../../redux/reducers/slices/popperInterpretationSlice";

/* --------------------------------- hooks --------------------------------- */
import useBreakpoints from "../../../../hooks/useMediaQuery";


const StyledPopper = styled(Popper, {
  shouldForwardProp: (prop) => prop !== 'arrow',
})(({ theme, arrow }) => ({
  zIndex: 9999999,
  '& > div': {
    position: 'relative',
  },

  '&[data-popper-placement*="bottom"]': {
    '& > div': {
      marginTop: arrow ? 2 : 6,
    },
    '& .MuiPopper-arrow': {
      top: 0,
      left: 0,
      marginTop: '-5px',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 6px 6px 6px',
        borderColor: `transparent transparent black transparent`,
      },
    },
  },

  '&[data-popper-placement*="top"]': {
    '& > div': {
      marginBottom: arrow ? 2 : 6,
    },
    '& .MuiPopper-arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-16px',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '6px 6px 0 6px',
        borderColor: `black transparent transparent transparent`,
      },
    },
  },

  '&[data-popper-placement*="right"]': {
    '& > div': {
      marginLeft: arrow ? 2 : 6,
    },
    '& .MuiPopper-arrow': {
      left: 0,
      marginLeft: '-10px',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '6px 6px 6px 0',
        borderColor: `transparent black transparent transparent`,
      },
    },
  },

  '&[data-popper-placement*="left"]': {
    '& > div': {
      marginRight: arrow ? 2 : 6,
    },
    '& .MuiPopper-arrow': {
      right: 0,
      marginRight: '-10px',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '6px 0 6px 6px',
        borderColor: `transparent transparent transparent black`,
      },
    },
  },
}));

const StyledArrow = styled('div')(() => {
  return {
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '0',
      height: '0',
      borderStyle: 'solid',
    },
  }
})

const stylePopperContent = {
  maxWidth: '750px',
  borderRadius: '4px',

  [MEDIA_XSPLUS_MODAL_PRODUCT]: {
    maxWidth: '600px',
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    maxWidth: '750px',
  },
}



function PopperInterpretation({ refIngredient, dataInterpretation }) {

  const breakpoints = useBreakpoints();
  const dispatch = useDispatch()
  const isVisiblePopper = useSelector(state => state.popperInterpretation.visible)
  const popperRef = useRef(null);
  const [arrowRef, setArrowRef] = useState(null)


  // клик вне Popper (закрытие Popper)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // если есть реф Popper и текущая цель события - не Popper и не элемент Ingredient
      if (popperRef.current && !popperRef.current.contains(event.target) && event.target !== refIngredient) {
        dispatch(toggleVisiblePopper())
        dispatch(setDataInterpretation([]))
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperRef, refIngredient]);


  return (
    isVisiblePopper &&
    <>
      {
        !breakpoints.MD ?

          <ModalWindow
            setVisible={toggleVisiblePopper}
            isVisible={isVisiblePopper}
            positionButtonClose='fixed'
          >
            <Interpretation data={dataInterpretation} />
          </ModalWindow>


          :


          <StyledPopper
            ref={popperRef}
            transition
            placement="auto-start"
            open={isVisiblePopper}
            anchorEl={refIngredient}
            disablePortal={true}
            modifiers={[
              {
                name: 'flip',
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: 'viewport',
                  padding: 8,
                },
              },
              {
                name: 'preventOverflow',
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: true,
                  tether: true,
                  rootBoundary: 'viewport',
                  padding: 15,
                },
              },

              {
                name: 'arrow',
                enabled: true,
                options: {
                  element: arrowRef,
                },
              },
            ]}
          >


            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={{ enter: 200, exit: 0 }}>
                <Box>

                  <StyledArrow className="MuiPopper-arrow" ref={setArrowRef} />

                  <Paper elevation={24} sx={stylePopperContent}>
                    <Interpretation data={dataInterpretation} />
                  </Paper>

                </Box>
              </Fade>
            )
            }
          </StyledPopper>
      }
    </>
  )
}

export default PopperInterpretation


