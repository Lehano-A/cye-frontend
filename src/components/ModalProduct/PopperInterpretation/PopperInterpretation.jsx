import React, { useState, useEffect, useRef } from "react";
import { Box, Popper, Typography, Fade } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleVisiblePopper, setValueInterpretation } from "../../../redux/reducers/popperInterpretationSlice";
import { styled } from "@mui/material";

const StyledArrow = styled('div')(() => {
  return {
    position: 'absolute',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '5px', // ширина и высота стрелки
      borderColor: 'transparent transparent black transparent', // цвета границ
      position: 'absolute',
      top: '-9px', // смещение стрелки вверх почти на половину ее высоты, и ставим на границу
      left: '-5px'
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
  let isVisible = useSelector(state => state.popperInterpretation.visible)
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
  }, [dispatch, popperRef, refIngredient]);


  const handleArrowRef = (ref) => {
    setArrowRef(ref);
  };


  return (
    <Popper
      ref={popperRef}
      transition
      placement="bottom-start"
      arrow="true"
      sx={{ zIndex: 9999999 }}
      open={isVisible}
      anchorEl={refIngredient}
      popperOptions={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -1], // смещение вверх, чтобы не создавалось пустова пространства между целевым элементом и Popper
            }
          },
          {
            name: 'arrow',
            enabled: true,
            options: {
              element: arrowRef,
            },
          },
        ]
      }}
    >

      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={{ enter: 200, exit: 0 }}>
          <Box>

            {/* стрелка Popper */}
            <Box ref={handleArrowRef}>
              <StyledArrow />
            </Box>

            <Box sx={stylePopperContent}>
              <Typography sx={{ padding: '15px', fontSize: '14px' }}>
                {interpretationValue}
              </Typography>
            </Box>

          </Box>
        </Fade>
      )
      }

    </Popper>

  )
}

export default PopperInterpretation

