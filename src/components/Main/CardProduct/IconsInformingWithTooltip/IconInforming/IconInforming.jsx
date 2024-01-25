import { SvgIcon } from "@mui/material";
import { styled } from "@mui/material/styles";



const IconInforming = styled(SvgIcon)(({ theme, color, size }) => {
  return {
    width: size,
    height: size,
    color: theme.palette[`${color}`].main,
  }
})

export default IconInforming