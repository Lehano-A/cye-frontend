import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { handleDataAttentionIcon } from "../../../../helpers/AttentionIconsUtils/handleDataAttentionIcon";
import { styled } from "@mui/material/styles";
import IconInforming from "../../CardProduct/IconsInformingWithTooltip/IconInforming/IconInforming";
import { MEDIA_MD_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from "../../../../helpers/constants";


const CommonBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  [MEDIA_XS_MODAL_PRODUCT]: {
    marginBottom: '15px'
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    marginBottom: 0
  },
}))


const BoxTitleAndIcon = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:nth-of-type(1n):not(:last-of-type)': {
    marginBottom: '10px'
  }
}))


const BoxTitle = styled(Paper)(({ theme, color }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '355px',
    width: '100%',
    backgroundColor: theme.palette[`${color}`].main,
    borderRadius: '10px',
    marginRight: '5px',
  }
})


const styleIconInforming = {
  width: '35px',
  height: '35px',
}


const Title = styled(Typography)(({ theme, color }) => {
  return {
    color: theme.palette[`${color}`].contrastText,
    letterSpacing: 0.5,

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
    padding: '10px 20px',
  }
})



function FeaturesComposition({ data }) {
  return (
    <CommonBox>
      {
        data.map((item, id) => {

          const dataIcon = handleDataAttentionIcon(item.feature)

          return (
            <BoxTitleAndIcon key={id}>
              <BoxTitle color={dataIcon.color} elevation={3}>

                <StyledBoxTitleIngredients>
                  <Title color={dataIcon.color}>
                    {dataIcon.title}
                  </Title>
                </StyledBoxTitleIngredients>
              </BoxTitle>


              <IconInforming
                inheritViewBox
                component={dataIcon.icon}
                color={dataIcon.color}
                sx={styleIconInforming}
              />
            </BoxTitleAndIcon>
          )
        })
      }
    </CommonBox>
  )
}

export default FeaturesComposition
