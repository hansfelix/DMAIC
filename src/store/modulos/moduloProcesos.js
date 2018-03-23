
import * as firebase from "firebase";

export const moduloProcesos = {
  /**
   * == STATE
   * State(estado) general de la Aplicación.
   */
  state: {
    procesos: [{}],
    procesoActual: {},
    loading_procesos: false
  },

  /**
   * == GETTERS
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   */
  getters: {
    procesos(state) {
      return state.procesos;
    },
    procesoActual(state) {
      return state.procesoActual;
    },
    loading_procesos(state) {
      return state.loading_procesos;
    }
  },

  /**
   * == MUTATIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación.
   * Operaciones síncronas.
   */
  mutations: {
    // Setters
    //======
    set_procesos(state, payload) {
      state.procesos = payload;
    },
    set_procesoActual(state, payload) {
      state.procesoActual = payload;
    },
    set_loading_procesos(state, payload) {
      state.loading_procesos = payload;
    },
    // Push
    //======
    push_procesos(state, payload) {
      state.procesos.push(payload);
    },
    // Especiales
    //======
    set_procesoActualConfigurado(state, payload) {
      state.procesoActual.configurado = payload;
    },
    set_procesoActualDashboard(state, payload) {
      state.procesoActual.dashboard = payload;
    },
    set_procesoActual_duracion(state, payload) {
      state.procesoActual.dataprocesoActual.duracion = payload;
    }
  },

  /**
   * == ACTIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación (No lo hacen directamente, sino mediante mutations).
   * Operaciones asíncronas.
   */
  actions: {
    /**
     * @description Cargar los procesos según el Uid del proyecto de FIREBASE 🔥
     * @param { commit } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_procesos({ commit }, proyecto_uid) {
      commit("set_loading_procesos", true);

      var procesosRef = firebase.database().ref("procesos/" + proyecto_uid);
      procesosRef
        .once("value")
        .then(data => {
          const procesos = [];
          const obj = data.val();

          for (let key in obj) {
            obj[key].id = key;
            procesos.push(obj[key]);
          }

          commit("set_procesos", procesos);
          commit("set_loading_procesos", false);
        })
        .catch(error => {
          console.log(error);
          commit("set_loading_procesos", false);
        });
    },

    /**
     * @description Carga el proceso según el Uid del proyecto de FIREBASE 🔥
     * @param { commit } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_procesoActual({ commit }, payload) {
      console.log("cargando medición actual");
      commit("setLoading", true);
      firebase
        .database()
        .ref("procesos/" + payload.proyecto_uid + "/" + payload.idproceso + "/")
        .once("value")
        .then(data => {
          //const key = data.key;
          const proceso = {
            id: data.key,
            dataprocesoActual: data.val()
          };

          commit("set_procesoActual", proceso);
          commit("setLoading", false);

          console.log("se cargo medición actual", proceso);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },

    /**
     * @description Crea un proceso en FIREBASE 🔥
     * @param { commit, getters } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    crear_proceso({ commit, getters }, payload) {
      firebase
        .database()
        .ref("procesos/" + payload.proyecto_uid)
        .push(payload.proceso)
        .then(data => {
          payload.proceso.id = data.key;
          commit("push_procesos", payload.proceso);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },

    /**
     * @description actualiza el campo proceso_configurado 🔥
     * @param { commit, getters } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    actualizar_proceso_configurado({ commit }, payload) {
      console.log("actualizando configruacion actual");
      commit("setLoading", true);
      firebase
        .database()
        .ref(
          "procesos/" +
            payload.proyecto_uid +
            "/" +
            payload.idproceso +
            "/configurado"
        )
        .set(true)
        .then(data => {
          commit("set_procesoActualConfigurado", true);
          console.log("configruacion actualizada ");
        })
        .catch(error => {
          console.log(error);
        });
    },

    /**
     * @description actualiza el campo proceso_dashboard 🔥
     * @param { commit, getters } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    actualizar_proceso_dashboard({ commit }, payload) {
      console.log("actualizando configruacion actual");
      // commit("setLoading", true);
      firebase
        .database()
        .ref(
          "procesos/" +
            payload.proyecto_uid +
            "/" +
            payload.idproceso +
            "/dashboard"
        )
        .set(true)
        .then(data => {
          commit("set_procesoActualDashboard", payload.dashboard);
          // console.log("configruacion actualizada ");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
