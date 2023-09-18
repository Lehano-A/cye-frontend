import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, IconButton, ClickAwayListener } from "@mui/material"
import { handleDataIcon } from "../../../../utils/IconsInformingUtils/handleDataIcon";
import TooltipIcon from "./TooltipIconInforming/TooltipIconInforming";
import StyledIconInforming from "../../../shared/StyledIconInforming/StyledIconInforming";

/* -------------------------------- selectors ------------------------------- */
import { selectUserDevice } from "../../../../redux/reducers/selectors/checkUserDeviceSelectors";

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

  const SIZEICONANDBUTTON = '25px'

  const [isOpenTooltip, setIsOpenTooltip] = useState(false)
  const [dataIcon, setDataIcon] = useState(null)

  const userDevice = useSelector(selectUserDevice)


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
                  size={SIZEICONANDBUTTON}
                  disableRipple
                >

                  <StyledIconInforming
                    color={dataIcon.color}
                    component={dataIcon.icon}
                    inheritViewBox
                    size={SIZEICONANDBUTTON}
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
              size={SIZEICONANDBUTTON}
              disableRipple
            >

              <StyledIconInforming
                color={dataIcon.color}
                component={dataIcon.icon}
                inheritViewBox
                size={SIZEICONANDBUTTON}
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




