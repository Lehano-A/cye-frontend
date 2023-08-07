import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"


const StyledTooltip = styled(({ className, color, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, color, device }) => {

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette[`${color}`].main,
      color: '#fff',
      fontSize: 11,
      maxWidth: '310px',
      top: device === 'mobile' ? '5px' : 0
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette[`${color}`].main,
      top: device === 'mobile' ? '28px' : '24px', // для появления стрелки в одном месте, иначе отображается с перемещением
    },
  }
});


function TooltipIcon({ children, value, color, placement, isOpenTooltip, handleTooltipClose, isDisableFocusListener, isDisableHoverListener, isDisableTouchListener, userDevice }) {



  return (

    <StyledTooltip
      onClose={handleTooltipClose}
      open={isOpenTooltip}
      title={value}
      color={color}
      placement={placement}
      arrow
      describeChild
      disableInteractive
      disableFocusListener={isDisableFocusListener}
      disableHoverListener={isDisableHoverListener}
      disableTouchListener={isDisableTouchListener}
      enterDelay={0}
      leaveDelay={0}
      enterTouchDelay={0}
      leaveTouchDelay={0}
      TransitionProps={{ timeout: 0 }}
      device={userDevice}
    >
      {children}
    </StyledTooltip>

  )
}

export default TooltipIcon