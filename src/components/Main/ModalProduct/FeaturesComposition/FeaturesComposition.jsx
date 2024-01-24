import React from "react";
import { Box, Typography } from "@mui/material";
import { handleDataIcon } from "../../../../utils/IconsInformingUtils/handleDataIcon";
import StyledIconInforming from "../../../shared/StyledIconInforming/StyledIconInforming";
import { styled } from "@mui/material/styles";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../utils/constants";


const StyledMainBox = styled(Box)(({ theme, color }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '355px',
    minHeight: '70px',
    width: '100%',
    backgroundColor: theme.palette[`${color}`].light,
    borderRadius: '15px',
    marginBottom: '20px',
  }
})


const styleIconInforming = {
  width: '35px',
  height: '35px',
  marginRight: '15px',
}


const StyledTilteIcon = styled(Typography)(({ theme, color }) => {
  return {
    color: theme.palette[`${color}`].main,
    fontWeight: 600,

    [MEDIA_XS_MODAL_PRODUCT]: {
      fontSize: '15px'
    },

    [MEDIA_MD_MODAL_PRODUCT]: {
      fontSize: '16px'
    }
  }
})


const StyledBoxTitleIngredients = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '290px',
    marginLeft: '25px',
    padding: '10px 0',
  }
})


const StyledIngredient = styled(Typography)(() => {
  return {
    fontSize: "14px",
    '&:nth-of-type(2)': { marginTop: '15px' },
    '&:last-of-type': { marginBottom: '5px' }
  }
})



function FeaturesComposition({ data }) {

  return (
    <>
      {
        data.map((feature, id) => {

          const dataIcon = handleDataIcon(feature.feature)

          return (
            <StyledMainBox key={id} color={dataIcon.color}>

              <StyledBoxTitleIngredients>
                <StyledTilteIcon color={dataIcon.color}>
                  {dataIcon.title}
                </StyledTilteIcon>

                {feature.ingredients.map((ingredient, id) => {
                  return <StyledIngredient key={id}>
                    {ingredient}
                  </StyledIngredient>
                })}

              </StyledBoxTitleIngredients>


              <StyledIconInforming color={dataIcon.color} sx={styleIconInforming} inheritViewBox component={dataIcon.icon} />

            </StyledMainBox>)
        })
      }
    </>
  )
}

export default FeaturesComposition