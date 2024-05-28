import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

const StyledBoxAbsoluteCentered = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}))


export default StyledBoxAbsoluteCentered