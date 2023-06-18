import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box} from "@mui/material"
import { handleDataIcon } from "../../../../utils/IconsInforming/handleDataIcon";
import TooltipIcon from "../../../shared/TooltipIcon/TooltipIcon";
import StyledIconInforming from "../../../shared/StyledIconInforming/StyledIconInforming";


const StyledBoxIconCard = styled(Box)`
  &:not(:last-child) {
    margin-right: ${props => (props.typeicon.forbiddenForChildren || props.typeicon.forbiddenForPregnancy) ? '1px' : '5px'}
  }
`


function IconsInforming({ feature }) {

  const { description } = feature
  const [dataIcon, setDataIcon] = useState(null)


  useEffect(() => {
    const dataIcon = handleDataIcon(feature)
    setDataIcon(dataIcon)
  }, [])


  return (
    <>
      {dataIcon &&
        <StyledBoxIconCard
          typeicon={feature}
        >

          <TooltipIcon
            value={description}
            placement='right'
            color={dataIcon.color}
          >
            <StyledIconInforming
              color={dataIcon.color}
              component={dataIcon.icon}
              inheritViewBox
            />

          </TooltipIcon>

        </StyledBoxIconCard>
      }
    </>
  )
}

export default IconsInforming