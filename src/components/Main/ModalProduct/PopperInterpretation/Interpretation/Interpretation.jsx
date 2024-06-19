import { Box, } from "@mui/material"
import { styled } from "@mui/material/styles";
import DesktopInterpretation from "./versions/DesktopInterpretation";
import MobileInterpretation from "./versions/MobileInterpretation";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../../helpers/constants";

/* ---------------------------------- hooks --------------------------------- */
import useBreakpoints from "../../../../../hooks/useMediaQuery";


const CommonBox = styled(Box)(() => ({
  display: 'flex',

  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 0',
  },

  [MEDIA_XSPLUS_MODAL_PRODUCT]: {
    padding: '15px 30px',
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    flexDirection: 'row',
    alignItems: 'start',
    gap: 25,
  },
}))



function Interpretation({ data }) {

  const breakpoints = useBreakpoints()


  return (
    <CommonBox>
      {
        !breakpoints.MDPlus &&
        <MobileInterpretation data={data} />
      }

      {
        breakpoints.MDPlus &&
        <DesktopInterpretation data={data} breakpoints={breakpoints}
        />
      }
    </CommonBox>
  )
}

export default Interpretation