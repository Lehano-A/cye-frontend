import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  shadows: {
    none: 'none',
    1: 'none',
  },
  typography: {
    fontFamily: 'Roboto'
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        p: 'p',
      },
    },
  },
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