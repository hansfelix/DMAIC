
import * as firebase from "firebase";

// dmaic-b6e44
//
// ├── user
// │   └── { user_uid }
// │       ├── administrador
// │       ├── correo
// │       ├── nombre
// │       ├── foto
// │       └── ultimasModificaciones
// │           └── { ultimaModificacion_uid }
// │               └── { proyecto_uid }
// │               └── { proceso_uid }
// │               └── { tomaDato_uid }
// │               └── tipo
// │               └── fecha
// │               └── accion
// └── ...

export const moduloUsuarios = {
  /**
   *
   * == STATE
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    users: [],
    user: null,
    usersBusqueda: [],
    administrador: false,
    authApp: null,
    ErrorIngreso: false,
    loadingUser: false,
    loadingUsers: false,
    autenticado: false
  },

  /**
   *
   * == GETTERS
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   *
   */
  getters: {
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
    usersBusqueda(state) {
      return state.usersBusqueda;
    },
    administrador(state) {
      return state.administrador;
    },
    autenticado(state) {
      return state.autenticado;
    },
    ErrorIngreso(state) {
      return state.ErrorIngreso;
    },
    loadingUsers(state) {
      return state.loadingUsers;
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
    // User
    //============
    set_user(state, payload) {
      state.user = payload;
    },
    set_users(state, payload) {
      state.users = payload;
    },
    set_userBusqueda(state, payload) {
      state.usersBusqueda = payload;
    },
    set_administrador(state, payload) {
      state.administrador = payload;
    },
    set_autenticado(state, payload) {
      state.autenticado = payload;
    },
    set_loadingUser(state, payload) {
      state.loadingUser = payload;
    },
    set_authApp(state, payload) {
      state.authApp = payload;
    },
    set_loadingUsers(state, payload) {
      state.loadingUsers = payload;
    },
    // Push
    //=====
    push_users(state, payload) {
      state.users.push(payload);
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
     * @description Carga una segunda configuración de la app, para ejecutar métodos de autenticación
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_authApp({ commit }) {
      var authApp = firebase.initializeApp(
        {
          apiKey: "AIzaSyBr72IEXyp1izKWkZW2shmxX2I4MMQ58mI",
          authDomain: "dmaic-b6e44.firebaseapp.com",
          databaseURL: "https://dmaic-b6e44.firebaseio.com",
          projectId: "dmaic-b6e44",
          storageBucket: "dmaic-b6e44.appspot.com",
          messagingSenderId: "201730548149"
        },
        "Secondary"
      );
      commit("set_authApp", authApp);
    },

    /**
     * @description Autentifica al usuario con el correo y contraseña solicitado.
     * @param { commit } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    signUserIn({ commit }, payload) {
      commit("set_loadingUser", true);
      commit("setErrorIngreso", false);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("set_loadingUser", false);
          console.log(user.uid);
          //Sacar datos de BD
          firebase
            .database()
            .ref("users/" + user.uid)
            .once("value")
            .then(data => {
              console.log(data.val());
              const newUser = data.val();
              newUser.id = user.uid;
              commit("set_user", newUser);
              commit("set_autenticado", true);

              //Verificar si es administrador
              if (newUser.administrador == true) {
                commit("set_administrador", true);
              }
            })
            .catch(error => {
              console.log(error);
              commit("setErrorIngreso", true);
            });
        })
        .catch(error => {
          commit("setLoading", false);
          // commit('setError', error)
          commit("setErrorIngreso", true);
          console.log(error);
        });
    },

    /**
     * @description Lee los datos del usuario nuevamente si es que la autenticación no ha caducado.
     * @param { commit } user
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    autoSignIn({ commit }, user) {
      firebase
        .database()
        .ref("users/" + user.uid)
        .once("value")
        .then(data => {
          console.log(
            "se ha auto-autentificado al siguiente usuario:",
            data.val()
          );
          const newUser = data.val();
          newUser.id = user.uid;
          commit("set_user", newUser);
          commit("set_autenticado", true);

          //Verificar si es administrador
          if (newUser.administrador == true) {
            commit("set_administrador", true);
          }
        })
        .catch(error => {
          console.log(error);
          commit("setLoadingprocesos", false);
        });
    },
    // FIREBASE AUTH
    // SET AUTENTICADO
    set_autenticado({ commit }) {
      commit("set_autenticado", true);
    },

    /**
     * @description Deslogea al usuario
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    logout({ commit }) {
      firebase.auth().signOut();
      commit("set_user", null);
      commit("set_autenticado", false);
    },

    /**
     * @description Crea un nuevo usuario en el Auth de Firebase y luego crea los datos en la DB
     * @param { commit } user
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    signUserUp({ commit, state }, user) {
      // commit("setLoading", true);
      // commit("clearError");
      const newUser = {
        nombre: user.userNombre,
        correo: user.userCorreo,
        contraseña: user.userContrasena,
        foto:
          "https://firebasestorage.googleapis.com/v0/b/dmaic-b6e44.appspot.com/o/no_photo.jpg?alt=media&token=21eba14f-fac9-411c-9bd7-eb12b4b788c1",
        administrador: user.administrador
      };

      state.authApp
        .auth()
        .createUserWithEmailAndPassword(user.userCorreo, user.userContrasena)
        .then(user => {
          // commit("setLoading", false);
          state.authApp.auth().signOut();
          console.log(newUser);

          firebase
            .database()
            .ref("users/" + user.uid)
            .set(newUser)
            .then(data => {
              //const key = data.key;
              // commit("pushReporte", payload.reporte);
            })
            .catch(error => {
              console.log(error);
            });
          // commit("set_user", newUser);
        })
        .catch(error => {
          // commit("setLoading", false);
          // commit("setError", error);
          console.log(error);
        });
    },

    /**
     * @description Carga los usuarios registrados en el sistema.
     * @param { commit } user
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_usuarios({ commit, dispatch }) {
      commit("set_loadingUsers", true);
      firebase
        .database()
        .ref("users/")
        .once("value")
        .then(data => {
          const users = [];
          const obj = data.val();
          for (let key in obj) {
            obj.id = key;
            users.push(obj[key]);
          }
          commit("set_users", users);
          commit("set_loadingUsers", false);
        })
        .catch(error => {
          console.log(error);
          commit("set_loadingUsers", false);
        });
    },

    /**
     * @description Carga los usuarios registrados en el sistema.
     * @param { commit } user
     * @returns -
     * @author Hans Felix
     * @created 01/03/0218
     */
    cargar_usuarios_ByUid({ commit, dispatch }, arrayUidUsers) {
      commit("set_loadingUsers", true);
      for (var i = 0; i < arrayUidUsers.length; i++) {
        firebase
          .database()
          .ref("users/" + arrayUidUsers[i])
          .once("value")
          .then(data => {
            const obj = data.val();
            obj.id = data.key;
            commit("push_users", obj);
            commit("set_loadingUsers", false);
          })
          .catch(error => {
            console.log(error);
            commit("set_loadingUsers", false);
          });
      }
    },

    /**
     * @description Carga los usuarios registrados en el sistema.
     * @param { commit } user
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    cargar_usuarios_busqueda({ commit, dispatch }, queryText) {
      commit("set_loadingUsers", true);
      firebase
        .database()
        .ref("users/")
        .orderByChild("nombre")
        .startAt(queryText)
        .endAt(queryText + "\uf8ff")
        .once("value")
        .then(data => {
          const users = [];
          const obj = data.val();
          for (let key in obj) {
            obj[key].id = key;
            users.push(obj[key]);
          }
          commit("set_userBusqueda", users);
          commit("set_loadingUsers", false);
        })
        .catch(error => {
          console.log(error);
          commit("set_loadingUsers", false);
        });
    },

    /**
     * @description Carga los usuarios registrados en el sistema.
     * @param { commit } user
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    escribir_ultimaModificacion({ commit, getters }, ultimaModificacion) {
      var user = getters.user;

      firebase
        .database()
        .ref("users/" + user.id + "/ultimasModificaciones")
        .push(ultimaModificacion)
        .then(data => {
          //const key = data.key;
          // commit("pushReporte", payload.reporte);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
