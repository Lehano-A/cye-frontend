import { useMediaQuery } from "@mui/material";
import { MIN_WIDTH_0, MIN_WIDTH_1000, MIN_WIDTH_500, MIN_WIDTH_700, MIN_WIDTH_900 } from "../utils/constants";



function useBreakpoints() {

  return {
    XS: useMediaQuery(MIN_WIDTH_0),
    XSPlus: useMediaQuery(MIN_WIDTH_500),
    MD: useMediaQuery(MIN_WIDTH_700),
    MDPlus: useMediaQuery(MIN_WIDTH_900),
    XL: useMediaQuery(MIN_WIDTH_1000),
  }
}

export default useBreakpoints