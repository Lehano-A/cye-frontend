import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, ClickAwayListener } from "@mui/material"
import { handleDataIcon } from "../../../../utils/IconsInforming/handleDataIcon";
import TooltipIcon from "./TooltipIconInforming/TooltipIconInforming";
import { useSelector } from "react-redux";
import StyledIconInforming from "../../../shared/StyledIconInforming/StyledIconInforming";

const StyledBoxIconCard = styled(Box)`
margin: 0 10px 4px 0;

  &:hover {
    cursor: pointer;
  };
`

const StyledIconButton = styled(IconButton)(({ size }) => {
  return {
    width: size,
    height: size,
    backgroundColor: '#fff',
  }
})


function IconsInforming({ feature }) {

  useEffect(() => {
    const data = handleDataIcon(feature)
    setDataIcon(data)
  }, [])

  const sizeIconAndButton = '25px'

  const [isOpenTooltip, setIsOpenTooltip] = useState(false)

  const [dataIcon, setDataIcon] = useState(null)

  const userDevice = useSelector(state => state.checkUserDevice.userDevice)



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
          <div>
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
                  size={sizeIconAndButton}
                  disableRipple
                >

                  <StyledIconInforming
                    color={dataIcon.color}
                    component={dataIcon.icon}
                    inheritViewBox
                    size={sizeIconAndButton}
                  />

                </StyledIconButton>

              </StyledBoxIconCard>
            </TooltipIcon>
          </div>
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
              size={sizeIconAndButton}
              disableRipple
            >

              <StyledIconInforming
                color={dataIcon.color}
                component={dataIcon.icon}
                inheritViewBox
                size={sizeIconAndButton}
              />

            </StyledIconButton>

          </StyledBoxIconCard>
        </TooltipIcon>
        )
      }
    </>
  )
}

export default IconsInforming




