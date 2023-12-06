// Supports weights 300-700
import '@fontsource-variable/comfortaa';
import { createTheme } from "@mui/material/styles";
import { regexAlphaNum } from "../utils/constants";


const palette = {
  primary: {
    light: 'rgba(160, 171, 223, 1)',
    main: '#5c70c8',
    dark: '#263a9c',
  },

  primaryTint: {
    100: 'rgba(247, 248, 253, 1)',
    200: 'rgba(226, 230, 245, 1)',
    500: 'rgba(124, 133, 175, 1)',
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
  },

  getAlphaColor: function (name, contrast, value) {
    return this[name][contrast].replace(regexAlphaNum, value)
  }
}





const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: 0,
        }
      }
    },
  },


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
    fontFamily: 'Roboto',
  },


  palette: palette,


  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          '&.MuiAutocomplete-option.Mui-focused': {
            backgroundColor: palette.getAlphaColor("primary", "light", 0.1) // цвет фона элемента опции при наведении
          },

        },
        paper: {
          padding: '10px 0',
        },
        listbox: {
          padding: 0
        },
      },
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
          '.MuiInputBase-root': {
            border: `5px ${palette.primary.light} solid`,
            borderRadius: "4px 0 0 4px",
            borderRight: "none",
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

    
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
            'borderLeft': '1px solid rgba(0, 0, 0, 0.12)',
            'borderRadius': '5px'
          },
          '.MuiToggleButtonGroup-grouped:first-of-type': {
            'borderRadius': '5px'
          },
        }
      }
    }
  }
},
)

export default theme;