
import * as firebase from "firebase";

export const moduloActividades = {
  /**
   *
   * == STATE
   *
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    actividades: []
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
    actividades(state) {
      return state.actividades;
    },
    actividadesTP(state) {
      var filter = state.actividades.filter(function(el) {
        return el.TipoActividad === "TP";
      });
      return filter;
    },
    actividadesTC(state) {
      var filter = state.actividades.filter(function(el) {
        return el.TipoActividad === "TC";
      });
      return filter;
    },
    actividadesTNC(state) {
      var filter = state.actividades.filter(function(el) {
        return el.TipoActividad === "TNC";
      });
      return filter;
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
    pushActividad(state, actividad) {
      state.actividades.push(actividad);
    },
    setActividades(state, actividades) {
      state.actividades = actividades;
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
    //
    //CREAR ACTIVIDAD
    //
    crear_actividad({ commit }, obj) {
      firebase
        .database()
        .ref(
          "datos-proyecto/" + obj.proyecto_uid + "/" + obj.idproceso + "/actividades/"
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
      // commit("setLoadingprocesos", true);
      firebase
        .database()
        .ref(
          "datos-proyecto/" + obj.proyecto_uid + "/" + obj.idproceso + "/actividades/"
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
          // commit("setLoadingprocesos", false);
        })
        .catch(error => {
          console.log(error);
          //   commit("setLoadingprocesos", false);
        });
    }
  }
};
