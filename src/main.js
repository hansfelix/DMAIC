import Vue from "vue";
import './plugins/vuetify'
import App from "./App";
import router from "./router";
import * as firebase from "firebase";
import { store } from "./store/store";
import NgaPieChart from './Charts/NgaPieChart';
import NgaBarChart from './Charts/NgaBarChart';
import VueFrame from 'vue-frame'

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
