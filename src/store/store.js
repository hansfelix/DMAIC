import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

//modulos
import { moduloActividades } from "./modulos/moduloActividades";
import { moduloReportes } from "./modulos/moduloReportes";
import { moduloMediciones } from "./modulos/moduloMediciones";
import { moduloObreros } from "./modulos/moduloObreros";
import { moduloProyectos } from "./modulos/moduloProyectos";
import { moduloUsuarios } from "./modulos/moduloUsuarios";
import { moduloTomaDatos } from "./modulos/moduloTomaDatos";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // medicionActual: null,
    reporte: null,

    // loading_mediciones: false,

    loading: false
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    //   PROYECTOS

    // MEDICIONES

    //OBRERO

    //USERS

    //REPORTE
    pushReporte(state, payload) {
      state.reporte = payload;
    },
    setErrorIngreso(state, payload) {
      state.ErrorIngreso = payload;
    }
  },
  actions: {
    // Cargar los proyectos de FIREBASE

    // loadMedicionActual({ commit }, payload) {
    //   commit("setLoadedMedicionActual", payload);
    // },

    // FIREBASE GET DATA
    // MEDICIONES

    //REPORTE
    createReporte({ commit, getters }, payload) {
      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/reporte/"
        )
        .set(payload.reporte)
        .then(data => {
          //const key = data.key;
          commit("pushReporte", payload.reporte);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    //LOAD REPORTE

    //ACTUALIZAR MEDICION - DURACION
    actualizarDuracion({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref(
          "mediciones/" + payload.idPyt + "/" + payload.idMedicion + "/duracion"
        )
        .set(payload.nuevaDuracion)
        .then(data => {
          //const key = data.key;
          // const medicion = {
          //   id: data.key,
          //   dataMedicionActual: data.val()
          // };
          commit("setMedicionActual_duracion", payload.nuevaDuracion);

          // commit("setLoadedMediciones", mediciones);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    }

    //ACTIVIDADEs
    // CREA UNA ACTIVIDAD

    // FIREBASE AUTH
    // INGRESAR
  },
  getters: {},
  modules: {
    mod_actividades: moduloActividades,
    mod_reportes: moduloReportes,
    mod_mediciones: moduloMediciones,
    mod_obreros: moduloObreros,
    mod_proyectos: moduloProyectos,
    mod_usuarios: moduloUsuarios,
    mod_tomaDatos: moduloTomaDatos
  }
});
