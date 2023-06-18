import { SvgIcon } from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledIconInforming = styled(SvgIcon)(({ theme, color }) => {
  return {
    color: theme.palette[`${color}`].main
  }
})


export default StyledIconInforming