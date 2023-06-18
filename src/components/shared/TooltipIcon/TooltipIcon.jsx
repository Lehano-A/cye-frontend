import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"

const StyledTooltip = styled(({ className, color, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, color }) => {

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette[`${color}`].light,
      color: '#fff',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      left: '-5px', // отступ от элемента события
      maxWidth: '310px'
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette[`${color}`].main,
    },
  }
});


function TooltipIcon({ children, value, color, placement }) {

  return (
    <StyledTooltip
      title={value}
      color={color}
      placement={placement}
      arrow
      describeChild
      disableTouchListener
      disableInteractive
    >
      {children}
    </StyledTooltip>
  )
}

export default TooltipIcon