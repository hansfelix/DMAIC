import * as firebase from "firebase";
import {
  path_medicion,
  path_medicion_deproceso
} from '../paths.js';
export const moduloMediciones = {
  /**
   * == STATE
   * State(estado) general de la Aplicación.
   */
  state: {
    mediciones: [],
    medicionActual: {},
    loading_mediciones: false,
    loading_medicionActual: false
  },

  /**
   * == GETTERS
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
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
    },
    loading_medicionActual(state) {
      return state.loading_medicionActual;
    }
  },

  /**
   * == MUTATIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación.
   * Operaciones síncronas.
   */
  mutations: {
    set_mediciones(state, payload) {
      state.mediciones = payload;
    },
    set_medicionActual(state, payload) {
      state.medicionActual = payload;
    },
    set_loading_mediciones(state, payload) {
      state.loading_mediciones = payload;
    },
    set_loading_medicionActual(state, payload) {
      state.loading_medicionActual = payload;
    },
    /**
     * mutations personalizados
     */
    push_mediciones(state, payload) {
      state.mediciones.push(payload);
    },

  },
  /**
   * == ACTIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación (No lo hacen directamente, sino mediante mutations).
   * Operaciones asíncronas.
   */
  actions: {
    /**
     * @description Carga la medición seleccionada de FIREBASE 🔥
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_medicion({
      commit
    }, payload) {

      commit("set_loading_medicionActual", true);
      let path = path_medicion(payload);

      firebase
        .database()
        .ref(path)
        .once("value")
        .then(data => {
          const tomaDatos = [];
          const obj = data.val();

          for (let key in obj) {
            obj[key].id = key;
            tomaDatos.push(obj[key]);
          }
          commit("set_mediciones", tomaDatos);
          commit("set_loading_medicionActual", false);
        })
        .catch(error => {
          console.log(error);
          commit("set_loading_medicionActual", false);
        });
    },

    /**
     * @description Crea un medición en FIREBASE 🔥
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    crear_medicion({
      commit,
      getters,
      rootState
    }, payload) {

      return new Promise((resolve, reject) => {

        let path = path_medicion_deproceso(payload);

        firebase
          .database()
          .ref(path)
          .push(payload.medicion)
          .then(data => {
            payload.medicion.id = data.key;
            // rootState.mod_procesos.procesos.
            commit("push_medicion", payload,{ module: "mod_procesos" });
            commit("push_mediciones", payload.medicion); // Verificar

            //Escribir la medición en otra 
            let path = path_medicion(payload);
            firebase
              .database()
              .ref(path + "/datos")
              .set({
                [data.key]: payload.medicion
              })
              .then(data => {
                console.log("Se escribió por segunda vez corectamente")
                resolve("Se escribió correctamente la nueva medición")
              })



          })
          .catch(error => {
            console.log(error);
            reject(error);
          });

      })

    },

    cargar_tomaDatosActual({
      commit
    }, payload) {
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
    },


    cargar_medicion({
      commit
    }, payload) {
      ////////////////
      console.log("cargando la medición");
      commit("setLoading", true);

      commit("set_loading_medicionActual", true);
      let path = path_medicion(payload);

      firebase
        .database()
        .ref(path)
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
    },

        /**
     * @description Crea un medición en FIREBASE 🔥
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_medicionActual({
      commit
    }, payload) {
      ////////////////
      console.log("cargando la medición");
      commit("setLoading", true);

      commit("set_loading_medicionActual", true);
      let path = path_medicion(payload);

      firebase
        .database()
        .ref(path + "/datos")
        .once("value")
        .then(data => {
          const tomaDatosActual = [];
          const obj = data.val();
          obj.id =  data.uid;
   

          commit("set_medicionActual", obj);

          // commit("setLoadedprocesos", procesos);
          commit("setLoading", false);

          console.log("se cargo medición actual", obj);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    }
  }
};
