
import * as firebase from "firebase";
var varx = "x";
export const moduloMediciones = {
  /**
   *
   * == STATE
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    mediciones: [],
    medicionActual: {},
    loading_mediciones: false
  },

  /**
   *
   * == GETTERS
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   *
   */
  getters: {
    mediciones(state) {
      return state.mediciones;
    },
    medicionActual(state) {
      return state.medicionActual;
    },
    loading_mediciones(state) {
      return state.loading_mediciones;
    }
  },

  /**
   *
   * == MUTATIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación.
   * Operaciones síncronas.
   *
   */
  mutations: {
    set_medicionActual(state, payload) {
      state.medicionActual = payload;
    },
    set_mediciones(state, payload) {
      state.mediciones = payload;
    },
    set_loading_mediciones(state, payload) {
      state.loading_mediciones = payload;
    },
    push_mediciones(state, payload) {
      state.mediciones.push(payload);
    }
  },
  /**
   *
   * == ACTIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación (No lo hacen directamente, sino mediante mutations).
   * Operaciones asíncronas.
   *
   */
  actions: {
    cargar_tomaDatos({ commit }, payload) {
      commit("set_loading_mediciones", true);


      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            payload.proyecto_uid +
            "/" +
            payload.idproceso +
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
          commit("set_mediciones", tomaDatos);
          commit("set_loading_mediciones", false);
        })
        .catch(error => {
          console.log(error);
          commit("set_loading_mediciones", false);
        });
    },
    // Guardar los Proyectos en FIREBASE
    crear_medicion({ commit, getters }, payload) {

      var proyectosRef = firebase
      .database()
      .ref(
        "datos-proyecto/" +
          payload.proyecto_uid +
          "/" +
          payload.idproceso +
          "/tomaDatos/"
      );
      
      firebase
        .database()
        .ref(
          "procesos/" +
            payload.proyecto_uid +
            "/" +
            payload.proceso_uid +
            "/medicion/"
        )
        .push(payload.medicion)
        .then(data => {
          payload.tomaDatos.id = data.key;
          commit("push_mediciones", payload.tomaDatos);
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
            payload.proyecto_uid +
            "/" +
            payload.idproceso +
            "/tomaDatos/" +
            payload.idTomaDatos +
            "/datos"
        )
        .once("value")
        .then(data => {
          const tomaDatosActual = [];
          const obj = data.val();

          for (let key in obj) {
            obj[key].id = key;
            tomaDatosActual.push(obj[key]);
          }

          commit("set_medicionActual", tomaDatosActual);

          // commit("setLoadedprocesos", procesos);
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
