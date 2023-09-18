import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Box, List, Typography } from '@mui/material';

/* -------------------------------- selectors ------------------------------- */
import { selectIsHistorySubmitDisplayed } from '../../../../../redux/reducers/selectors/inputSearchSelectors';


const DropListbox = forwardRef((props, ref) => {

  const isHistorySubmitDisplayed = useSelector(selectIsHistorySubmitDisplayed)


  return (
    <Box>

      {(isHistorySubmitDisplayed) &&
        <Typography
          variant="h5"
          sx={{ margin: '5px 0 12px 30px', }}
        >
          Ваши поиски
        </Typography>
      }

      <List {...props} ref={ref}>
        {props.children}
      </List>

    </Box>
  );
});

export default DropListbox;
