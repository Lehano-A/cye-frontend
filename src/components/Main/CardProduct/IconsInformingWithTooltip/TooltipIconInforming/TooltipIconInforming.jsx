import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"


const StyledTooltip = styled(({ className, color, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, color }) => {

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette[`${color}`].main,
      color: '#fff',
      maxWidth: '310px',
      top: '5px',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette[`${color}`].main,
    },
  }
});



function TooltipIcon({ children, value, color, placement, isOpenTooltip, handleTooltipClose, isDisableFocusListener, isDisableHoverListener, isDisableTouchListener }) {

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
    >
      {children}
    </StyledTooltip>
  )
}

export default TooltipIcon