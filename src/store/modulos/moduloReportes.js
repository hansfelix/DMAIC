//Importación de librerías
import * as firebase from "firebase";

export const moduloReportes = {
  /**
   *
   * == STATE
   *
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    reporte: {
      barNGA: {
        arrayActividades: [],
        arrayActividadesColores: [],
        arrayActividadesPercent: []
      },
      cuadroProductividad: {},
      cuadroResumen: {},
      pieNGA: {
        arrayTipoActividad: [],
        arrayTipoActividad_color: [],
        arraytotalTipoActividad: []
      }
    },
    loadingReporte: false
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
    LoadingReporte(state) {
      return state.loadingReporte;
    },
    reporte(state) {
      return state.reporte;
    },
    dataPie(state) {
      return {
        labels: state.reporte.pieNGA.arrayTipoActividad,
        datasets: [
          {
            backgroundColor: state.reporte.pieNGA.arrayTipoActividad_color,
            data: state.reporte.pieNGA.arraytotalTipoActividad
          }
        ]
      };
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
    setReporte(state, reporte) {
      state.reporte = reporte;
    },
    setLoadingReporte(state, reporte) {
      state.loadingReporte = reporte;
    },
    setNota(state, nota) {
      state.reporte.nota = nota;
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
    //CREAR REPORTE
    //
    crear_reporte({ commit }, payload) {
      console.log("Inicio reporte:", payload.reporte);
      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/tomaDatos/" +
            payload.idTomaDatos +
            "/reporte"
        )
        .set(payload.reporte)
        .then(data => {
          commit("setReporte", payload.reporte);
          console.log("reporte actualizado:", payload.reporte);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //
    //CARGAR REPORTE
    //
    cargar_reporte({ commit }, payload) {
      console.log("cargando reporte:", payload);

      commit("setLoadingReporte", true);
      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/tomaDatos/" +
            payload.idTomaDatos +
            "/reporte"
        )
        .once("value")
        .then(data => {
          if (data.val() !== null) {
            commit("setReporte", data.val());
          }
          console.log("reporte actuaizado:", data.val());

          commit("setLoadingReporte", false);

          // commit("setLoadedMediciones", mediciones);
          // commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoadingReporte", false);
        });
      // Reach out to firebase and store it
    },
    //
    //ACTUALZIAR REPORTE NOTA
    //
    actualizar_reporte_nota({ commit }, payload) {
      // console.log("Inicio reporte:", payload.reporte);
      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            payload.idPyt +
            "/" +
            payload.idMedicion +
            "/tomaDatos/" +
            payload.idTomaDatos +
            "/reporte"
        )
        .set(payload.nota)
        .then(data => {
          commit("setNota", payload.nota);
          // console.log("reporte actualizado:", payload.reporte);
        })
        .catch(error => {
          console.log(error);
        });
    },
    
  }
};
