import Vuex from "vuex";
import * as firebase from "firebase";

export const moduloProyectos = {
  /*======================= STATE =======================*/
  state: {
    proyectos: [],
    pytActual: null,
    loading_proyectos: false
  },
  /*======================= GETTERS =======================*/
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
  /*======================= MUTATIONS =======================*/
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
  /*======================= ACTIONS =======================*/
  actions: {
    // Cargar los proyectos de FIREBASE
    loadPytActual({ commit }, payload) {
      commit("setLoadedPytActual", payload);
    },
    // Cargar los proyectos de FIREBASE
    loadProyectos({ commit }) {
      commit("setLoadingProyectos", true);
      firebase
        .database()
        .ref("proyectos")
        .once("value")
        .then(data => {
          const proyectos = [];
          const obj = data.val();
          for (let key in obj) {
            proyectos.push({
              id: key,
              cr: obj[key].cr,
              nombrePyt: obj[key].nombrePyt
            });
          }
          commit("setLoadedProyectos", proyectos);
          commit("setLoadingProyectos", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoadingProyectos", false);
        });
    },
    //
    //
    //
 
    // Guardar los Proyectos en FIREBASE
    createProyecto({ commit, getters }, payload) {
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
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    // Actualizar Proyecto en FIREBASE
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
