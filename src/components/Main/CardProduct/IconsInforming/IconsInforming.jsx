import React from "react";
import { styled } from "@mui/material/styles";
import { Box, SvgIcon } from "@mui/material"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import { ReactComponent as IconNatural } from "../../../../images/icons/cardProduct/natural.svg"
import { ReactComponent as IconWarning } from "../../../../images/icons/cardProduct/warning.svg"

const styleBoxIconCard = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '5px 5px 0',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  backgroundColor: '#fff',
}

const StyledTooltip = styled(({ className, iconType, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, iconType }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: iconType === 'natural' ? theme.palette.success.light : theme.palette.error.light,
    color: '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: iconType === 'natural' ? theme.palette.success.main : theme.palette.error.main,
  },
}));


function IconsInforming({ dataProduct }) {

  const { isFullNatural } = dataProduct

  return (
    <>
      <Box sx={styleBoxIconCard}>
        <StyledTooltip
          describeChild
          title={isFullNatural ? 'Полностью натуральный продукт' : 'Продукт содержит консерванты'}
          placement="right"
          arrow
          disableTouchListener
          disableInteractive
          iconType={isFullNatural ? 'natural' : 'warning'}
        >
          <SvgIcon
            color={isFullNatural ? 'success' : 'error'}
            component={isFullNatural ? IconNatural : IconWarning}
            inheritViewBox
          />
        </StyledTooltip>
      </Box>
    </>)
}

export default IconsInforming