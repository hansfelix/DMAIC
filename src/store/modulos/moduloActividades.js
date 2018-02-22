import Vuex from "vuex";
import * as firebase from "firebase";

export const moduloActividades = {
  /*======================= STATE =======================*/
  state: {
    actividades: []
  },
  /*======================= GETTERS =======================*/
  getters: {
    actividades(state) {
      return state.actividades;
    },
    actividadesTP(state) {
      var filter = state.actividades.filter(function(el) {
        return (el.TipoActividad === "TP");
      });
      return filter;
    },
    actividadesTC(state) {
      var filter = state.actividades.filter(function(el) {
        return (el.TipoActividad === "TC");
      });
      return filter;
    },
    actividadesTNC(state) {
      var filter = state.actividades.filter(function(el) {
        return (el.TipoActividad === "TNC");
      });
      return filter;
    }
  },
  /*======================= MUTATIONS =======================*/
  mutations: {
    pushActividad(state, actividad) {
      state.actividades.push(actividad);
    },
    setActividades(state, actividades) {
      state.actividades = actividades;
    }
  },
  /*======================= ACTIONS =======================*/
  actions: {
    //
    //CREAR ACTIVIDAD
    //
    crear_actividad({ commit }, obj) {
      firebase
        .database()
        .ref(
          "datos-proyecto/" + obj.idPyt + "/" + obj.idMedicion + "/actividades/"
        )
        .push(obj.actividad)
        .then(data => {
          const newActividad = obj.actividad;
          newActividad["id"] = data.key;

          commit("pushActividad", newActividad);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //
    //CARGAR ACTIVIDADES
    //
    cargar_actividades({ commit }, obj) {
      // commit("setLoadingMediciones", true);
      firebase
        .database()
        .ref(
          "datos-proyecto/" + obj.idPyt + "/" + obj.idMedicion + "/actividades/"
        )
        .once("value")
        .then(data => {
          const actividades = [];
          const obj = data.val();
          for (let key in obj) {
            //añadimos el id al objeto leido
            obj[key].id = key;
            //añadimos el obj al array
            actividades.push(obj[key]);
          }
          commit("setActividades", actividades);
          // commit("setLoadingMediciones", false);
        })
        .catch(error => {
          console.log(error);
          //   commit("setLoadingMediciones", false);
        });
    }
  }
};
