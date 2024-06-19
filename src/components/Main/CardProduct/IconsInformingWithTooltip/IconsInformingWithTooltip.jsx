import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, IconButton, ClickAwayListener } from "@mui/material"
import { handleDataAttentionIcon } from "../../../../helpers/AttentionIconsUtils/handleDataAttentionIcon";
import TooltipIcon from "./TooltipIconInforming/TooltipIconInforming";
import IconInforming from "./IconInforming/IconInforming";
import { SIZE_ICON_AND_BUTTON_INFORMING } from "../../../../helpers/constants";

/* -------------------------------- selectors ------------------------------- */
import { selectUserDevice } from "../../../../redux/reducers/selectors/checkUserDeviceSelectors";


const StyledBoxIconCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'margin',
})(({ margin }) => {
  return {
    margin: `${margin ? margin : '0 5px'}`,

    '&:hover': {
      cursor: 'pointer'
    }
  }
})


const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'iconSize',
})(({ iconSize }) => {

  return {
    width: iconSize ? iconSize.width : SIZE_ICON_AND_BUTTON_INFORMING,
    height: iconSize ? iconSize.height : SIZE_ICON_AND_BUTTON_INFORMING,
  }
})



function IconsInformingWithTooltip({ feature, iconSize, margin }) {
  const userDevice = useSelector(selectUserDevice)

  const [isOpenTooltip, setIsOpenTooltip] = useState(false)
  const [dataIcon, setDataIcon] = useState(null)


  useEffect(() => {
    const data = handleDataAttentionIcon(feature)
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
                  iconSize={iconSize}
                >

                  <IconInforming
                    color={dataIcon.color}
                    component={dataIcon.icon}
                    inheritViewBox
                    iconSize={iconSize}
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
          <StyledBoxIconCard margin={margin}>
            <StyledIconButton
              disableRipple
              iconSize={iconSize}
            >
              <IconInforming
                inheritViewBox
                color={dataIcon.color}
                component={dataIcon.icon}
                iconSize={iconSize}
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




