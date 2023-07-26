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
      light: '#a0abdf',
      main: '#5c70c8',
      dark: '#263a9c',
    },

    secondary: {
      light: '#db8ece',
      main: '#bf38ac',
      dark: '#82008c',
    },

    warning: {
      light: '#ffb74d',
      main: '#FFA500',
      dark: '#f57c00',
    },

    fullNatural: {
      light: 'rgba(32, 163, 95, 0.33)',
      main: '#20a35f',
    },

    preservingAgents: {
      light: 'rgba(255, 173, 173, 0.5)',
      main: '#D74141',
    },

    undesirableIngredients: {
      light: 'rgba(255, 188, 64, 0.5)',
      main: '#F69027',
    },

    forbiddenForChildren: {
      light: 'rgba(133, 148, 214, 0.5)',
      main: '#5c70c8',
      dark: '#3F51A8',

    },

    forbiddenForPregnancy: {
      light: 'rgba(195, 132, 199, 0.5)',
      main: '#82008C',
    }
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