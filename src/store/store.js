import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

//Importación de modulos
import { moduloActividades } from "./modulos/moduloActividades";
import { moduloReportes } from "./modulos/moduloReportes";
import { moduloMediciones } from "./modulos/moduloMediciones";
import { moduloObreros } from "./modulos/moduloObreros";
import { moduloProyectos } from "./modulos/moduloProyectos";
import { moduloUsuarios } from "./modulos/moduloUsuarios";
import { moduloTomaDatos } from "./modulos/moduloTomaDatos";

Vue.use(Vuex);

export const store = new Vuex.Store({
  /**
   *
   * == STATE
   *
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    reporte: null,
    loading: false
  },

  /**
   *
   * == GETTERS
   *
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   *
   */
  getters: {},

  /**
   *
   * == MUTATIONS
   *
   * Funciones encargadas de cambiar el STATE de la Aplicación.
   * Operaciones síncronas.
   *
   */
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    pushReporte(state, payload) {
      state.reporte = payload;
    },
    setErrorIngreso(state, payload) {
      state.ErrorIngreso = payload;
    }
  },

  /**
   *
   * == ACTIONS
   *
   * Funciones encargadas de cambiar el STATE de la Aplicación (No lo hacen directamente, sino mediante mutations).
   * Operaciones asíncronas.
   *
   */
  actions: {
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
  },

  /**
   *
   * == MODULES
   *
   * Modularización de la aplicación para un mejor orden.
   *
   */
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
