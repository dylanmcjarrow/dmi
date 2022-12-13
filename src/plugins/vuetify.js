/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'


const custom_dark = {
  dark: true,
  colors: {
    primary: '#65c8cf',
    secondary: '#f8bed4',
    textColor:"#ffffff"
  }
}
const custom_light = {
  dark: false,
  colors: {
    primary: '#ffa8ca',
    secondary: '#54f2ff',
    textColor:"#000000"
  }

}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'custom_light',
    themes: {
      custom_dark,
      custom_light
    }
  },
})
