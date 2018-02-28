//Importación de librerías
import * as firebase from "firebase";

export const moduloTomaDatos = {
   /**
   *
   * == STATE
   *
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    tomaDatos: [{ad:"a"}],
    tomaDatosActual: {},
    loading_tomaDatos: false
  },

  /**
   *
   * == GETTERS
   *
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   *
   */
  getters: {
    tomaDatosActual(state) {
      return state.tomaDatosActual;
    },
    tomaDatosActual_r(state) {
      var reverse = state.tomaDatosActual.reverse()
      return reverse;
    },
    tomaDatos(state) {
      return state.tomaDatos;
    },
    loading_tomaDatos(state) {
      return state.loading_tomaDatos;
    }
  },

  /**
   *
   * == MUTATIONS
   *
   * Funciones encargadas de cambiar el STATE de la Aplicación.
   * Operaciones síncronas.
   *
   */
  mutations: {

    setMedicionActual_duracion(state, payload) {
      //////////
      state.medicionActual.dataMedicionActual.duracion = payload;
    },
    setTomaDatosActual(state, payload) {
      state.tomaDatosActual = payload;
    },
    setLoadedTomaDatos(state, payload) {
      state.tomaDatos = payload;
    },
    setLoadingTomaDatos(state, payload) {
      state.loading_tomaDatos = payload;
    },
    pushTomaDatos(state, payload) {
      state.tomaDatos.push(payload);
    },
    setMedicionActualConfigurado(state, payload) {
      ///////
      state.medicionActual.configurado = payload;
    },
    setMedicionActualDashboard(state, payload) {
      ///////////
      state.medicionActual.dashboard = payload;
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
    cargar_tomaDatos({ commit }, payload) {
      commit("setLoadingTomaDatos", true);

      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/tomaDatos/"
        )
        .once("value")
        .then(data => {
          const tomaDatos = [];
          const obj = data.val();

          for (let key in obj) {
            obj[key].id = key;
            tomaDatos.push(obj[key]);
          }
          commit("setLoadedTomaDatos", tomaDatos);
          commit("setLoadingTomaDatos", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoadingTomaDatos", false);
        });
    },
    // Guardar los Proyectos en FIREBASE
    crear_TomaDatos({ commit, getters }, payload) {
      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/tomaDatos/"
        )
        .push(payload.tomaDatos)
        .then(data => {
          payload.tomaDatos.id = data.key;
          commit("pushTomaDatos", payload.tomaDatos);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    cargar_tomaDatosActual({ commit }, payload) {
      ////////////////
      console.log("cargando medición actual");
      commit("setLoading", true);
      firebase
        .database()
        .ref(
          "datos-proyecto/" +
          payload.idPyt +
          "/" +
          payload.idMedicion +
          "/tomaDatos/" +
          payload.idTomaDatos +
          "/datos")
        .once("value")
        .then(data => {
          const tomaDatosActual = [];
          const obj = data.val();

          for (let key in obj) {
            obj[key].id = key;
            tomaDatosActual.push(obj[key]);
          }

          commit("setTomaDatosActual", tomaDatosActual);

          // commit("setLoadedMediciones", mediciones);
          commit("setLoading", false);

          console.log("se cargo medición actual", tomaDatosActual);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    }
  }
};
