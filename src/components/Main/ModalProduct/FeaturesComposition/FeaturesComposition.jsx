import React from "react";
import { Box, Typography } from "@mui/material";
import { handleDataIcon } from "../../../../utils/IconsInforming/handleDataIcon";
import StyledIconInforming from "../../../shared/StyledIconInforming/StyledIconInforming";
import { styled } from "@mui/material/styles";

const styleBox = {
  display: 'flex',
  alignItems: 'center',
}

const styleIconInforming = {
  width: '22px',
  height: '22px',
  marginRight: '5px'
}

const StyledDescriptionIcon = styled(Typography)(({ theme, color }) => {
  return {
    color: theme.palette[`${color}`].dark
  }
})



function FeaturesComposition({ data }) {
  return (
    <>
      {
        data.map((feature, id) => {
          const dataIcon = handleDataIcon(feature)

          return (
            <Box key={id} sx={styleBox}>

              <StyledIconInforming color={dataIcon.color} sx={styleIconInforming} inheritViewBox component={dataIcon.icon} />

              <StyledDescriptionIcon
                color={dataIcon.color}
                fontSize="13px"
              >
                {feature.description}
              </StyledDescriptionIcon>

            </Box>)
        })
      }
    </>
  )
}

export default FeaturesComposition