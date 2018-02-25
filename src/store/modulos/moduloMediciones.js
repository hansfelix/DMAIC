//Importación de librerías
import * as firebase from "firebase";

export const moduloMediciones = {
  /*======================= STATE =======================*/
  state: {
    mediciones: [
      {
        id: "sad",
        nombreProceso: "asda",
        herramientaUsada: "asda",
        ingenieroCampo: "Hans",
        jefeGrupo: "Seiko",
        fecha: "20/20/20",
        duracion: 60,
        dashboard: false
      }
    ],
    medicionActual: {},
    loading_mediciones: false
  },
  /*======================= GETTERS =======================*/
  getters: {
    MedicionActual(state) {
      return state.medicionActual;
    },
    mediciones(state) {
      return state.mediciones;
    },
    loading_mediciones(state) {
      return state.loading_mediciones;
    },
    medicionActual(state) {
      return state.medicionActual;
    }
  },
  /*======================= MUTATIONS =======================*/
  mutations: {
    setLoadedMedicionActual(state, payload) {
      var idMedicion = payload.idMedicion;

      var result = state.mediciones.filter(function(obj) {
        return obj.id == idMedicion;
      });

      if (result.length >= 1) {
        state.medicionActual = result[0];
      } else {
        state.medicionActual = null;
      }
    },

    setMedicionActual_duracion(state, payload) {
      state.medicionActual.dataMedicionActual.duracion = payload;
    },
    setMedicionActual(state, payload) {
      state.medicionActual = payload;
    },
    setLoadedMediciones(state, payload) {
      state.mediciones = payload;
    },
    setLoadingMediciones(state, payload) {
      state.loading_mediciones = payload;
    },
    pushMedicion(state, payload) {
      state.mediciones.push(payload);
    },
    setMedicionActualConfigurado(state, payload) {
      state.medicionActual.configurado = payload;
    },
    setMedicionActualDashboard(state, payload){
      state.medicionActual.dashboard = payload;
    }
  },
  /*======================= ACTIONS =======================*/
  actions: {
    loadMediciones({ commit }, payload) {
      commit("setLoadingMediciones", true);

      firebase
        .database()
        .ref("mediciones/" + payload.idPyt)
        .once("value")
        .then(data => {
          const mediciones = [];
          const obj = data.val();

          for (let key in obj) {
            obj[key].id = key;
            mediciones.push(obj[key]);
          }
          commit("setLoadedMediciones", mediciones);
          commit("setLoadingMediciones", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoadingMediciones", false);
        })
    },
    // Guardar los Proyectos en FIREBASE
    createMedicion({ commit, getters }, payload) {
      // const medicion = {
      //   cr: payload.cr,
      //   nombrePyt: payload.nombrePyt
      // };
      firebase
        .database()
        .ref("mediciones/" + payload.idPyt)
        .push(payload.medicion)
        .then(data => {
          payload.medicion.id = data.key;
          commit("pushMedicion", payload.medicion);
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    loadMedicionActual({ commit }, payload) {
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
    },
    actualizar_medicion_configurado({ commit }, payload) {
      console.log("actualizando configruacion actual");
      commit("setLoading", true);
      firebase
        .database()
        .ref(
          "mediciones/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/configurado"
        )
        .set(true)
        .then(data => {
          //const key = data.key;
          // const medicion = {
          //   id: data.key,
          //   dataMedicionActual: data.val()
          // };

          // commit("setMedicionActual", medicion);

          // // commit("setLoadedMediciones", mediciones);
          // commit("setLoading", false);

          commit("setMedicionActualConfigurado", true);
          console.log("configruacion actualizada ");
        })
        .catch(error => {
          console.log(error);
        });
    },
    //
    //
    //
    actualizar_medicion_dashboard({ commit }, payload) {
      console.log("actualizando configruacion actual");
      // commit("setLoading", true);
      firebase
        .database()
        .ref(
          "mediciones/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/dashboard"
        )
        .set(true)
        .then(data => {
          commit("setMedicionActualDashboard", payload.dashboard);
          // console.log("configruacion actualizada ");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
