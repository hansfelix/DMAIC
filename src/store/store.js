import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

//Importación de modulos
import { moduloActividades } from "./modulos/moduloActividades";
import { moduloReportes } from "./modulos/moduloReportes";
import { moduloProcesos } from "./modulos/moduloProcesos";
import { moduloObreros } from "./modulos/moduloObreros";
import { moduloProyectos } from "./modulos/moduloProyectos";
import { moduloUsuarios } from "./modulos/moduloUsuarios";
import { moduloMediciones } from "./modulos/moduloMediciones";
import { moduloConfiguracion } from "./modulos/moduloConfiguracion";

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
            payload.proyecto_uid +
            "/" +
            payload.idproceso +
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

    //ACTUALIZAR proceso - DURACION
    actualizarDuracion({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref(
          "procesos/" + payload.proyecto_uid + "/" + payload.idproceso + "/duracion"
        )
        .set(payload.nuevaDuracion)
        .then(data => {
          //const key = data.key;
          // const proceso = {
          //   id: data.key,
          //   dataprocesoActual: data.val()
          // };
          commit("setprocesoActual_duracion", payload.nuevaDuracion);

          // commit("setLoadedprocesos", procesos);
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
    mod_procesos: moduloProcesos,
    mod_obreros: moduloObreros,
    mod_proyectos: moduloProyectos,
    mod_usuarios: moduloUsuarios,
    mod_mediciones: moduloMediciones,
    mod_configracion: moduloConfiguracion
  }
});
