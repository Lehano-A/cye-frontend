import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";


const theme = createTheme({
  palette: {
    primary: {
      main: '#5c70c8',
      light: '#a0abdf',
      dark: '#263a9c',
    },
    secondary: {
      main: '#bf38ac',
      light: '#db8ece',
      dark: '#82008c',
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: grey[400]
          }
        }
      },
    },

  },
})

export default theme;