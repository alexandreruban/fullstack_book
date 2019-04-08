// Other possible syntax;
// require("bulma/css/bulma.css");
// require("font-awesome/css/font-awesome.css");

import "font-awesome/css/font-awesome.css";
import "bulma/css/bulma.css"

import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App),
}).$mount('#app')
