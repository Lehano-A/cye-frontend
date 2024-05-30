import React, { useState, useEffect, useRef } from "react";
import { Box, Popper, Typography, Fade } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

/* --------------------------------- slices --------------------------------- */
import { toggleVisiblePopper, setValueInterpretation } from "../../../../redux/reducers/slices/popperInterpretationSlice";

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
      marginBottom: '-15px',
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
  maxWidth: '450px',
  border: '1px dashed #000',
  borderRadius: '4px',
  backgroundColor: 'background.paper',
}



function PopperInterpretation({ refIngredient, interpretationValue }) {

  const dispatch = useDispatch()
  const isVisible = useSelector(state => state.popperInterpretation.visible)
  const popperRef = useRef(null);
  const [arrowRef, setArrowRef] = useState(null)


  // клик вне Popper (закрытие Popper)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // если есть реф Popper и текущая цель события - не Popper и не элемент Ingredient
      if (popperRef.current && !popperRef.current.contains(event.target) && event.target !== refIngredient) {
        dispatch(toggleVisiblePopper())
        dispatch(setValueInterpretation(''))
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperRef, refIngredient]);


  return (
    <StyledPopper
      ref={popperRef}
      transition
      placement="bottom-start"
      open={isVisible}
      anchorEl={refIngredient}
      disablePortal={true}
      modifiers={[
        {
          name: 'flip',
          enabled: true,
          options: {
            altBoundary: true,
            rootBoundary: 'document',
            padding: 8,
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

            <Box sx={stylePopperContent}>
              <Typography sx={{ padding: '15px', fontSize: '14px' }}>
                {interpretationValue}
              </Typography>
            </Box>

          </Box>
        </Fade>
      )
      }
    </StyledPopper>
  )
}

export default PopperInterpretation


