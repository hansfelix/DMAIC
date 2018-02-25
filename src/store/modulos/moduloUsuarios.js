import Vuex from "vuex";
import * as firebase from "firebase";

export const moduloUsuarios = {
  /**
   *
   * == STATE
   *
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    authApp: null,
    ErrorIngreso: false,
    users: [],
    user: null,
    loading_user: false,
    autenticado: false
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
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
    ErrorIngreso(state) {
      return state.ErrorIngreso;
    },
    autenticado(state) {
      return state.autenticado;
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
    setLoadingUser(state, payload) {
      state.loading_user = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setAutenticado(state, payload) {
      state.autenticado = payload;
    },
    setAuthApp(state, payload) {
      state.authApp = payload;
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
      commit("setAuthApp", authApp);
    },

    /**
     * @description Autentifica al usuario con el correo y contraseña solicitado.
     * @param { commit } payload
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    signUserIn({ commit }, payload) {
      commit("setLoadingUser", true);
      commit("setErrorIngreso", false);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoadingUser", false);
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
              commit("setUser", newUser);
              commit("setAutenticado", true);
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
          console.log(data.val());
          const newUser = data.val();
          newUser.id = user.uid;
          commit("setUser", newUser);
          commit("setAutenticado", true);
        })
        .catch(error => {
          console.log(error);
          commit("setLoadingMediciones", false);
        });
    },
    // FIREBASE AUTH
    // SET AUTENTICADO
    setAutenticado({ commit }) {
      commit("setAutenticado", true);
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
      commit("setUser", null);
      commit("setAutenticado", false);
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
          // commit("setUser", newUser);
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
    cargar_usuarios({ commit }) {
      // commit("setLoadingMediciones", true);
      firebase
        .database()
        .ref("users/")
        .once("value")
        .then(data => {
          const users = [];
          const obj = data.val();
          for (let key in obj) {
            users.push({
              id: key,
              administrador: obj[key].administrador,
              correo: obj[key].correo,
              nombre: obj[key].nombre
            });
          }
          commit("setUsers", users);
          // commit("setLoadingMediciones", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoadingMediciones", false);
        });
    }
  }
};
