import { styled } from "@mui/material/styles"
import BaseList from "./BaseLIst"
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../helpers/constants"

const OuterList = styled(BaseList)(() => ({
  [MEDIA_XS_MODAL_PRODUCT]: {
    flexDirection: 'column',
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

export default OuterList