import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const defaultTheme = createTheme()

const theme = createTheme({

  MuiDialog: {
    styleOverrides: {
      root: {
        '& .MuiDialog-paper': {
          backgroundColor: '#000',
          maxWidth: '1800px', // здесь можно указать необходимую максимальную ширину
        },
      }
    },
  },

  typography: {
    fontFamily: 'Roboto'
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

    MuiPaper: {
      variants: [{
        props: { variant: 'header' },
        style: {
          boxShadow: `0px 2px 1px -1px rgba(160 171 223 / 30%), 0px 1px 1px 0px rgba(160 171 223 / 14%), 0px 1px 3px 0px rgba(160 171 223 / 12%)`,
          borderRadius: 0,
        },
      }],
    },

    MuiCard: {
      variants: [{
        props: { variant: 'searchResult' },
        style: {
          boxShadow: 'none'
        }
      }]
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiInputBase-root:hover': {
            borderColor: grey[400],
            transition: '0.2s ease'
          },

          '.MuiInputBase-root': {
            border: '5px #a0abdf solid',
            height: '55px',
            padding: '0 0 0 9px',
          },

          '.MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },

          '.MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }
      },
    },




  },
})

export default theme;