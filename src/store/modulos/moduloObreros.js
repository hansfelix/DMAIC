import Vuex from "vuex";
import * as firebase from "firebase";

export const moduloObreros = {
  /*======================= STATE =======================*/
  state: {
    obreros: [],
    loading_anadirObrero: false
  },
  /*======================= GETTERS =======================*/
  getters: {
    obreros(state) {
      return state.obreros;
    },
    loading_anadirObrero(state) {
      return state.loading_anadirObrero;
    }
  },
  /*======================= MUTATIONS =======================*/
  mutations: {
    pushObrero(state, payload) {
      state.obreros.push(payload);
    },
    setLoadedObreros(state, payload) {
      state.obreros = payload;
    },
    setLoading_anadirObrero(state, payload) {
      state.loading_anadirObrero = payload;
    }
  },
  /*======================= ACTIONS =======================*/
  actions: {
    // CREA UN OBRERO
    crear_obrero({ commit, getters }, obj) {
      commit("setLoading_anadirObrero", false);
      firebase
        .database()
        .ref("datos-proyecto/" + obj.idPyt + "/" + obj.idMedicion + "/obreros/")
        .push(obj.obrero)
        .then(data => {
          const key = data.key;
          const newObrero = {
            id: key,
            dataObrero: obj.obrero
          };
          commit("pushObrero", newObrero);
          commit("setLoading_anadirObrero", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading_anadirObrero", false);
        });
      // Reach out to firebase and store it
    },
    // LOAD UN OBRERO
    loadObreros({ commit, getters }, obj) {
      // const medicion = {
      //   cr: payload.cr,
      //   nombrePyt: payload.nombrePyt
      // };
      firebase
        .database()
        .ref("datos-proyecto/" + obj.idPyt + "/" + obj.idMedicion + "/obreros/")
        .once("value")
        .then(data => {
          const obreros = [];
          const obj = data.val();
          for (let key in obj) {
            obreros.push({
              id: key,
              dataObrero: obj[key]
            });
          }
          commit("setLoadedObreros", obreros);
          commit("setLoadingProyectos", false);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    borrar_obrero({ commit }, obj) {
      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            obj.idPyt +
            "/" +
            obj.idMedicion +
            "/obreros/" +
            obj.obrero.idObrero
        )
        .remove();
    }
  }
};
