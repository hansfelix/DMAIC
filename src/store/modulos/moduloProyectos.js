//Importación de librerías
import * as firebase from "firebase";

// dmaic-b6e44
//
// ├── proyectos
// │   └── { proyecto_uid }
// │       ├── cr
// │       ├── nombrePyt
// │       └── users
// │           └── { user_uid }
// └── ...

export const moduloProyectos = {
  /**
   *
   * == STATE
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    proyectos: [],
    pytActual: null,
    loading_proyectos: false
  },

  /**
   *
   * == GETTERS
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   *
   */
  getters: {
    pytActual(state) {
      return state.pytActual;
    },
    proyectos(state) {
      return state.proyectos;
    },
    loading_proyectos(state) {
      return state.loading_proyectos;
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
    setLoadedPytActual(state, payload) {
      var idPyt = payload.idPyt;

      var result = state.proyectos.filter(function(obj) {
        return obj.id == idPyt;
      });

      if (result.length >= 1) {
        state.pytActual = result[0];
      } else {
        state.pytActual = null;
      }
    },
    setLoadedProyectos(state, payload) {
      state.proyectos = payload;
    },
    setLoadingProyectos(state, payload) {
      state.loading_proyectos = payload;
    },
    actualizarProyecto(state, proyecto) {
      var idPytBorrar = state.proyectos.findIndex(function(item) {
        return item.id === proyecto.id;
      });

      state.proyectos.splice(idPytBorrar, 1, proyecto);
    },
    createProyecto(state, payload) {
      state.proyectos.push(payload);
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
    loadPytActual({ commit }, payload) {
      commit("setLoadedPytActual", payload);
    },

    /**
     * @description Cargar todos los proyectos de FIREBASE 🔥
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_proyectos({ commit }) {
      //set LoadingProyectos
      commit("setLoadingProyectos", true);
      //Llamada a Firebase
      //Obtiene los proyectos, el id lo pone como propiedad del objeto
      firebase
        .database()
        .ref("proyectos")
        .once("value")
        .then(data => {
          const proyectos = [];
          const obj = data.val();
          for (let key in obj) {
            obj[key].id = key;
            proyectos.push(obj[key]);
          }
          //cargar los proyectos al state
          commit("setLoadedProyectos", proyectos);
          //set LoadingProyectos
          commit("setLoadingProyectos", false);
        })
        .catch(error => {
          console.log(error);
          //set LoadingProyectos
          commit("setLoadingProyectos", false);
        });
    },

    /**
     * @description Cargar los proyectos según el Uid del usuario de FIREBASE 🔥
     * @param { commit } user_uid
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_proyectosByUid({ commit }, user_uid) {
      //set LoadingProyectos
      commit("setLoadingProyectos", true);
      //Llamada a Firebase
      //Obtiene los proyectos, el id lo pone como propiedad del objeto
      firebase
        .database()
        .ref("proyectos")
        .orderByChild("users/" + user_uid)
        .equalTo(true)
        .once("value")
        .then(data => {
          const proyectos = [];
          const obj = data.val();
          for (let key in obj) {
            obj[key].id = key;
            proyectos.push(obj[key]);
          }
          //cargar los proyectos al state
          commit("setLoadedProyectos", proyectos);
          //set LoadingProyectos
          commit("setLoadingProyectos", false);
        })
        .catch(error => {
          console.log(error);
          //set LoadingProyectos
          commit("setLoadingProyectos", false);
        });
    },

    /**
     * @description Crea un proyecto en FIREBASE 🔥
     * @param { commit, getters } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    crear_proyecto({ commit, dispatch }, payload) {
      const proyecto = {
        cr: payload.cr,
        nombrePyt: payload.nombrePyt
      };
      firebase
        .database()
        .ref("proyectos")
        .push(proyecto)
        .then(data => {
          proyecto.id = data.key;
          commit("createProyecto", proyecto);

          // escribir ultimaModificacion
          const ultimaModificacion = {
            proyecto_uid: data.key,
            medicion_uid: "",
            tomaDato_uid: "",
            tipo: "proyecto",
            accion: "Has creado el proyecto " + proyecto.nombrePyt,
            fecha: new Date().toLocaleDateString()
          };
          dispatch("escribir_ultimaModificacion", ultimaModificacion);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },

    /**
     * @description Actualiza un proyecto en FIREBASE
     * @param { commit } proyecto
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    actualizarProyecto({ commit }, proyecto) {
      var idPyt = proyecto.id;
      delete proyecto.id;
      firebase
        .database()
        .ref("proyectos/" + idPyt)
        .set(proyecto)
        .then(data => {
          proyecto.id = idPyt;

          commit("actualizarProyecto", proyecto);
          // commit("createProyecto", proyecto);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    }
  }
};
