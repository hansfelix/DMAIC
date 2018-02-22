import Vuex from "vuex";
import * as firebase from "firebase";

export const moduloTomaDatos = {
  /*======================= STATE =======================*/
  state: {
    tomaDatos: [{}],
    tomaDatosActual: {},
    loading_tomaDatos: false
  },
  /*======================= GETTERS =======================*/
  getters: {
    tomaDatosActual(state) {
      return state.tomaDatosActual;
    },
    tomaDatos(state) {
      return state.tomaDatos;
    },
    loading_tomaDatos(state) {
      return state.loading_tomaDatos;
    }
  },
  /*======================= MUTATIONS =======================*/
  mutations: {

    setMedicionActual_duracion(state, payload) {
      //////////
      state.medicionActual.dataMedicionActual.duracion = payload;
    },
    setMedicionActual(state, payload) {
      ////////
      state.medicionActual = payload;
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
  /*======================= ACTIONS =======================*/
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
    loadTomaDatosActual({ commit }, payload) {
      ////////////////
      console.log("cargando medición actual");
      commit("setLoading", true);
      firebase
        .database()
        .ref("mediciones/" + payload.idPyt + "/" + payload.idMedicion + "/")
        .once("value")
        .then(data => {
          //const key = data.key;
          const medicion = {
            id: data.key,
            dataMedicionActual: data.val()
          };

          commit("setMedicionActual", medicion);

          // commit("setLoadedMediciones", mediciones);
          commit("setLoading", false);

          console.log("se cargo medición actual", medicion);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    }
  }
};
