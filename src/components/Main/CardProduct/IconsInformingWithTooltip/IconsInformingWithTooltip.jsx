import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, IconButton, ClickAwayListener } from "@mui/material"
import { handleDataIcon } from "../../../../utils/IconsInformingUtils/handleDataIcon";
import TooltipIcon from "./TooltipIconInforming/TooltipIconInforming";
import { SIZE_ICON_AND_BUTTON_INFORMING } from "../../../../utils/constants";

/* -------------------------------- selectors ------------------------------- */
import { selectUserDevice } from "../../../../redux/reducers/selectors/checkUserDeviceSelectors";
import IconInforming from "./IconInforming/IconInforming";


const StyledBoxIconCard = styled(Box)(() => {
  return {
    margin: '0 5px',

    '&:hover': {
      cursor: 'pointer'
    }
  }
})


const StyledIconButton = styled(IconButton)(() => {
  return {
    width: SIZE_ICON_AND_BUTTON_INFORMING,
    height: SIZE_ICON_AND_BUTTON_INFORMING,
  }
})



function IconsInformingWithTooltip({ feature }) {

  const userDevice = useSelector(selectUserDevice)

  const [isOpenTooltip, setIsOpenTooltip] = useState(false)
  const [dataIcon, setDataIcon] = useState(null)


  useEffect(() => {
    const data = handleDataIcon(feature)
    setDataIcon(data)
  }, [])



  const handleTooltipClose = () => {
    setIsOpenTooltip(false)
  };



  const handleVisibilityTooltipByButton = () => {
    if (isOpenTooltip) {
      setIsOpenTooltip(false)
    } else {
      setIsOpenTooltip(true)
    }
  };



  return (
    <>
      {(dataIcon && userDevice === 'mobile') &&

        (<ClickAwayListener onClickAway={handleTooltipClose}>
          <Box> {/* Box необходим для корректной работы ClickAwayListener */}
            <TooltipIcon
              value={dataIcon.title}
              placement='top'
              color={dataIcon.color}
              handleTooltipClose={handleTooltipClose}
              isOpenTooltip={isOpenTooltip}
              PopperProps={{
                disablePortal: true,
              }}
              isDisableFocusListener={true}
              isDisableHoverListener={true}
              isDisableTouchListener={true}
              
            >
              <StyledBoxIconCard>
                <StyledIconButton
                  onClick={handleVisibilityTooltipByButton}
                  disableRipple
                >

                  <IconInforming
                    color={dataIcon.color}
                    component={dataIcon.icon}
                    inheritViewBox
                    size={SIZE_ICON_AND_BUTTON_INFORMING}
                  />

                </StyledIconButton>
              </StyledBoxIconCard>

            </TooltipIcon>
          </Box>
        </ClickAwayListener>)
      }



      {(dataIcon && userDevice === 'desktop') &&

        (<TooltipIcon
          value={dataIcon.title}
          placement='top'
          color={dataIcon.color}
          isDisableFocusListener={true}
          isDisableHoverListener={false}
          isDisableTouchListener={true}
        >
          <StyledBoxIconCard>
            <StyledIconButton
              disableRipple
            >

              <IconInforming
                inheritViewBox
                color={dataIcon.color}
                component={dataIcon.icon}
              />
            </StyledIconButton>
          </StyledBoxIconCard>

        </TooltipIcon>
        )
      }
    </>
  )
}

export default IconsInformingWithTooltip




