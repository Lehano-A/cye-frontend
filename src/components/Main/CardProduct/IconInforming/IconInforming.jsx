import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, SvgIcon, ClickAwayListener } from "@mui/material"
import { handleDataIcon } from "../../../../utils/IconsInforming/handleDataIcon";
import TooltipIcon from "./TooltipIconInforming/TooltipIconInforming";
import { useSelector } from "react-redux";


const StyledBoxIconCard = styled(Box)`
  &:not(:last-child) {
    margin-right: ${props => (props.typeicon === 'forbiddenForChildren' || props.typeicon === 'forbiddenForPregnancy') ? '1px' : '5px'}
  };
  &:hover {
    cursor: pointer;
  };
`
const StyledIconButton = styled(IconButton)(({ theme, color, open }) => {
  return {
    backgroundColor: theme.palette[`${color}`].main,
    '&:hover': { backgroundColor: open ? theme.palette[`${color}`].light : theme.palette[`${color}`].main },
    '&:focus': { backgroundColor: open ? theme.palette[`${color}`].light : theme.palette[`${color}`].main }
  }
})


function IconsInforming({ feature }) {

  useEffect(() => {
    const data = handleDataIcon(feature)
    setDataIcon(data)
  }, [])

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
              userDevice={userDevice}
            >
              <StyledBoxIconCard>

                <StyledIconButton
                  color={dataIcon.color}
                  open={isOpenTooltip}
                  onClick={handleVisibilityTooltipByButton}
                >

                  <SvgIcon htmlColor="#fff" component={dataIcon.icon} inheritViewBox />

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
              color={dataIcon.color}
            >

              <SvgIcon htmlColor="#fff" component={dataIcon.icon} inheritViewBox />

            </StyledIconButton>

          </StyledBoxIconCard>
        </TooltipIcon>
        )
      }
    </>
  )
}

export default IconsInforming




