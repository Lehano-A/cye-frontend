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
  wordBreak: 'break-word',
  
  [MEDIA_XS_MODAL_PRODUCT]: {
    marginBottom: '15px',
    justifyContent: 'center',
    alignItems: 'center'
  },

  [MEDIA_MD_MODAL_PRODUCT]: {
    marginBottom: 0
  },
}))


const BoxTitleAndIcon = styled(Paper)(({ theme, color }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '355px',
    width: '100%',
    backgroundColor: theme.palette[`${color}`].main,
    borderRadius: '10px',
    padding: "8px 6px 8px 12px",

    '&:nth-of-type(1n):not(:last-of-type)': {
      marginBottom: '10px'
    }
  }
})


const styleIconInforming = {
  width: '35px',
  height: '35px',
  color: '#fff'
}


const Title = styled(Typography)(({ theme, color }) => {
  return {
    color: theme.palette[`${color}`].contrastText,
    letterSpacing: 0.5,
    fontSize: '15px'
  }
})



function FeaturesComposition({ data }) {
  return (
    <CommonBox>
      {
        data.map((item, id) => {

          const dataIcon = handleDataAttentionIcon(item.feature)

          return (
            <BoxTitleAndIcon key={id} color={dataIcon.color} elevation={3}>

              <Title color={dataIcon.color}>
                {dataIcon.title}
              </Title>

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
