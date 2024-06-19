import { List } from "@mui/material"
import { styled } from "@mui/material/styles"

const BaseList = styled(List)(() => ({
  display: 'flex',
  padding: 0,
  listStyleType: 'none',
  width: '100%',
}))

export default BaseList