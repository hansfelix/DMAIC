import Vue from "vue";
import router from './router'
import './plugins/vuetify'
import App from "./App";
import * as firebase from "firebase";
import { store } from "./store/store";

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
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID
    });



    this.$store.dispatch("cargar_authApp");

    // Auth
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      } else {
        this.$router.push("/LogIn")
      }
    });
    // this.$store.dispatch("set_autenticado"); // esta arriba en autoDignIn
    //this.$store.dispatch("cargar_proyectos");
  }
});
