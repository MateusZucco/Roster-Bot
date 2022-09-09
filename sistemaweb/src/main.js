import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import "./styles/colors.css";
import "./styles/fonts.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import {
  faCaretUp,
  faPhone,
  faPhoneFlip,
  faEnvelope,
  faAnglesDown
} from "@fortawesome/free-solid-svg-icons";

import {
  
} from "@fortawesome/free-regular-svg-icons";

import {
  faWhatsapp,
  faFacebookSquare,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faWhatsapp,
  faFacebookSquare,
  faInstagram,
  faCaretUp,
  faPhone,
  faPhoneFlip,
  faEnvelope,
  faAnglesDown
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
