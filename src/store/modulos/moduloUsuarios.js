import Vuex from "vuex";
import * as firebase from "firebase";

export const moduloUsuarios = {
  /*======================= STATE =======================*/
  state: {
    ErrorIngreso: false,
    users: [],
    user: null,
    loading_user: false,
    autenticado: false
  },
  /*======================= GETTERS =======================*/
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
  /*======================= MUTATIONS =======================*/
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
    }
  },
  /*======================= ACTIONS =======================*/
  actions: {
    signUserIn({ commit }, payload) {
      commit("setLoadingUser", true);
      // commit('clearError')
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
    // FIREBASE AUTH
    // AUTO INGRESAR
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
    // LOG OUT
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
      commit("setAutenticado", false);
    },
    // FIREBASE AUTH
    // SET AUTENTICADO
    setAutenticado({ commit }) {
      commit("setAutenticado", true);
    },
    // FIREBASE AUTH
    // CREAR USUARIO
    signUserUp({ commit }, user) {
      // commit("setLoading", true);
      // commit("clearError");

      const newUser = {
        nombre: user.userNombre,
        correo: user.userCorreo,
        contraseña: user.userContrasena,
        administrador: user.administrador
      };

      firebase
        .auth()
        .createUserWithEmailAndPassword(user.userCorreo, user.userContrasena)
        .then(user => {
          // commit("setLoading", false);

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
    loadUsers({ commit }) {
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
