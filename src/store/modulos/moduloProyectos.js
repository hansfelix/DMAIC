
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
    proyectoActual: null,
    loading_proyectos: false,
    loading_proyectoActual: true
  },

  /**
   *
   * == GETTERS
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   *
   */
  getters: {
    proyectoActual(state) {
      return state.proyectoActual;
    },
    proyectos(state) {
      return state.proyectos;
    },
    loading_proyectos(state) {
      return state.loading_proyectos;
    },
    loading_proyectoActual(state) {
      return state.loading_proyectoActual;
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
    set_proyectoActual(state, payload) {
      state.proyectoActual = payload;
    },
    set_proyectos(state, payload) {
      state.proyectos = payload;
    },
    setLoadingProyectos(state, payload) {
      state.loading_proyectos = payload;
    },
    set_loading_proyectoActual(state, payload) {
      state.loading_proyectoActual = payload;
    },
    actualizar_proyecto(state, proyecto) {
      var proyecto_uidBorrar = state.proyectos.findIndex(function(item) {
        return item.id === proyecto.id;
      });
      state.proyectos.splice(proyecto_uidBorrar, 1, proyecto);
    },
    eliminar_proyecto(state, proyecto) {
      var proyecto_uidBorrar = state.proyectos.findIndex(function(item) {
        return item.id === proyecto.id;
      });
      state.proyectos.splice(proyecto_uidBorrar, 1);
    },
    createProyecto(state, payload) {
      state.proyectos.unshift(payload);
    },
    push_proyecto(state, payload) {
      state.proyectos.unshift(payload);
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
    /**
     * @description Cargar el proyecto actual indicando el uid_proyecto  🔥
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_proyectoActual({ commit, state }, proyecto_uid) {
      commit("set_loading_proyectoActual", true);

      var result = state.proyectos.findIndex(function(obj) {
        return obj.id == proyecto_uid;
      });

      var proyectoActual = state.proyectos[result];
      commit("set_proyectoActual", proyectoActual);
      commit("set_loading_proyectoActual", false);
    },

    /**
     * @description Cargar todos los proyectos de FIREBASE 🔥
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_proyectos({ commit }) {
      commit("setLoadingProyectos", true);
      var proyectosRef = firebase.database().ref("proyectos");

      proyectosRef.on("child_added", data => {
        const proyecto = data.val();
        proyecto.id = data.key;

        //añadir cada proyecto al state
        commit("push_proyecto", proyecto);
        //set LoadingProyectos
        commit("setLoadingProyectos", false);
      });

      proyectosRef.on("child_changed", data => {
        const proyecto = data.val();
        proyecto.id = data.key;

        //añadir cada proyecto al state
        commit("actualizar_proyecto", proyecto);
      });

      proyectosRef.on("child_removed", data => {
        const proyecto = data.val();
        proyecto.id = data.key;

        //eliminar el proyecto del state
        commit("eliminar_proyecto", proyecto);
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
          commit("set_proyectos", proyectos);
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

          // escribir ultimaModificacion
          const ultimaModificacion = {
            proyecto_uid: data.key,
            proceso_uid: "",
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
    },

    /**
     * @description Actualiza un proyecto en FIREBASE 🔥
     * @param { commit } proyecto
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    actualizar_proyecto({ commit }, proyecto) {
      var proyecto_uid = proyecto.id;
      delete proyecto.id;
      firebase
        .database()
        .ref("proyectos/" + proyecto_uid)
        .set(proyecto)
        .then(data => {
          console.log("se actualizó el proyecto:", proyecto);
        })
        .catch(error => {
          console.log(error);
        });
    },

    /**
     * @description Actualiza un proyecto en FIREBASE
     * @param { commit } proyecto
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    actualizar_proyecto_anadirUsuario({ commit, dispatch }, payload) {
      firebase
        .database()
        .ref("proyectos/" + payload.proyecto_uid + "/users/" + payload.user_uid)
        .set(true)
        .then(data => {
          //proyecto.id = proyecto_uid;
          //commit("actualizar_proyecto", proyecto);
          // commit("createProyecto", proyecto);
          // dispatch("cargar_proyectos");
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    }
  }
};
