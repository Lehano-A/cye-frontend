import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, List } from '@mui/material';
import { styled } from '@mui/material/styles';

/* -------------------------------- selectors ------------------------------- */
import { selectIsHistorySubmitDisplayed } from '../../../../../redux/reducers/selectors/inputSearchSelectors';
import { MEDIA_XL_MODAL_PRODUCT, MEDIA_XSPLUS_MODAL_PRODUCT, MEDIA_XS_MODAL_PRODUCT } from '../../../../../utils/constants';


const StyledSubheader = styled('h5')(() => {
  return {
    fontWeight: 100,

    [MEDIA_XS_MODAL_PRODUCT]: {
      fontSize: '20px',
      margin: '20px 0 20px 20px',
    },

    [MEDIA_XSPLUS_MODAL_PRODUCT]: {
      fontSize: '22px',
      margin: '20px 0 20px 30px',
    },

    [MEDIA_XL_MODAL_PRODUCT]: {
      fontSize: '24px',
      margin: '20px 0 20px 40px',
    }
  }
})



const DropListbox = forwardRef((props, ref) => {

  const isHistorySubmitDisplayed = useSelector(selectIsHistorySubmitDisplayed)


  return (
    <Box>

      <List
        sx={{ '&:nth-of-type(2)': { fontSize: '5px' } }}
        {...props}
        ref={ref}
        subheader={
          isHistorySubmitDisplayed &&
          <StyledSubheader> Недавно искали </StyledSubheader>
        }
      >
        {props.children}
      </List>

    </Box>
  );
});

export default DropListbox;
