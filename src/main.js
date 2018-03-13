import Vue from "vue";
import App from "./App";
import router from "./router";
import * as firebase from "firebase";
import { store } from "./store/store";
import NgaPieChart from './Charts/NgaPieChart';
import NgaBarChart from './Charts/NgaBarChart';
import VueFrame from 'vue-frame'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCard,
  VProgressLinear,
  VDialog,
  VForm,
  VTextField,
  VSubheader,
  VDivider,
  VAvatar,
  VSelect,
  VBreadcrumbs,
  VChip,
  VTooltip,
  VDataTable,
  VSwitch,
  VSnackbar,
  VTabs,
  VExpansionPanel,
  VAlert
} from "vuetify";
import "../node_modules/vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VProgressLinear,
    VDialog,
    VForm,
    VTextField,
    VSubheader,
    VDivider,
    VAvatar,
    VSelect,
    VBreadcrumbs,
    VChip,
    VTooltip,
    VDataTable,
    VSwitch,
    VSnackbar,
    VTabs,
    VExpansionPanel,
    VAlert
  },
  theme: {
    primary: "#78909c",
    secondary: "#5c6bc0",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBr72IEXyp1izKWkZW2shmxX2I4MMQ58mI",
      authDomain: "dmaic-b6e44.firebaseapp.com",
      databaseURL: "https://dmaic-b6e44.firebaseio.com",
      projectId: "dmaic-b6e44",
      storageBucket: "dmaic-b6e44.appspot.com",
      messagingSenderId: "201730548149"
    });



    this.$store.dispatch("cargar_authApp");

    // Auth
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }else{
        this.$router.push("/LogIn")
      }
    });
    // this.$store.dispatch("set_autenticado"); // esta arriba en autoDignIn
    //this.$store.dispatch("cargar_proyectos");
  }
});
