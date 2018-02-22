import Vuex from "vuex";
import * as firebase from "firebase";

export const moduloReportes = {
  /*======================= STATE =======================*/
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
  /*======================= GETTERS =======================*/
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
  /*======================= MUTATIONS =======================*/
  mutations: {
    setReporte(state, reporte) {
      state.reporte = reporte;
    },
    setLoadingReporte(state, reporte) {
      state.loadingReporte = reporte;
    },
    setNota(state, nota){
      state.reporte.nota = nota;
    }
  },
  /*======================= ACTIONS =======================*/
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
            "/reporte/"
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
            "/reporte/"
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
            "/reporte/nota"
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
