import { SvgIcon } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SIZE_ICON_AND_BUTTON_INFORMING } from "../../../../../helpers/constants";



const IconInforming = styled(SvgIcon, {
  shouldForwardProp: (prop) => prop !== 'iconSize',
})(({ theme, color, iconSize }) => {

  return {
    width: iconSize ? iconSize.width : SIZE_ICON_AND_BUTTON_INFORMING,
    height: iconSize ? iconSize.height : SIZE_ICON_AND_BUTTON_INFORMING,
    color: theme.palette[`${color}`].main,
  }
})

export default IconInforming