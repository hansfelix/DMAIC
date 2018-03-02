
import * as firebase from "firebase";

export const moduloConfiguracion = {
  /**
   *
   * == STATE
   * State(estado) general de la Aplicación.
   *
   */
  state: {
    texturas: [{}],
    loading_texturas: false,
    menuItems: [
      {
        icon: "home",
        title: "Inicio",
        url: "/Inicio"
      },
      {
        icon: "domain",
        title: "Proyectos",
        url: "/Proyectos"
      },
      {
        icon: "person",
        title: "Mi perfil",
        url: "/Profile"
      }
    ]
  },

  /**
   *
   * == GETTERS
   * Funciones reutilizables que obtienen datos parciales del state.
   * Evita dependencias.
   *
   */
  getters: {
    texturas(state) {
      return state.texturas;
    },
    menuItems(state){
      return state. menuItems;
    }
  },

  /**
   *
   * == MUTATIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación.
   * Operaciones síncronas.
   *
   */
  mutations: {
    pushTextura(state, textura) {
      state.texturas.push(textura);
    },
    setLoadedTexturas(state, texturas) {
      state.texturas = texturas;
    },
    setLoadingTexturas(state, payload) {
      state.loading_texturas = payload;
    }
  },

  /**
   *
   * == ACTIONS
   * Funciones encargadas de cambiar el STATE de la Aplicación (No lo hacen directamente, sino mediante mutations).
   * Operaciones asíncronas.
   *
   */
  actions: {
    /**
     * @description Crea una textura en FIREBASE 🔥
     * @param { commit } payload
     * @returns -
     * @author Hans Felix
     * @created 28/02/0218
     */
    crear_textura({ commit }, textura) {
      firebase
        .storage()
        .ref()
        .child("texturas/" + textura.url.name)
        .put(textura.url)
        .then(function(snapshot) {
          console.log(snapshot);
          textura.url = snapshot.downloadURL;

          firebase
            .database()
            .ref("texturas/")
            .push(textura)
            .then(data => {
              //
              const obj = {
                [data.key]: textura
              };
              commit("pushTextura", textura);
            })
            .catch(error => {
              //
              console.log(error);
            });
        });
    },

    /**
     * @description Crea las textura de FIREBASE 🔥
     * @param { commit }
     * @returns -
     * @author Hans Felix
     * @created 28/02/0218
     */
    cargar_texturas({ commit }) {
      commit("setLoadingTexturas", true);
      firebase
        .database()
        .ref("texturas")
        .once("value")
        .then(data => {
          const proyectos = [];
          const obj = data.val();
          for (let key in obj) {
            obj.id = key;
            proyectos.push(obj[key]);
          }
          //cargar los proyectos al state
          commit("setLoadedTexturas", proyectos);
          //set LoadingProyectos
          commit("setLoadingTexturas", false);
        })
        .catch(error => {
          console.log(error);
          //set LoadingProyectos
          commit("setLoadingTexturas", false);
        });
    },
    actualizar_textura() {},
    borrar_textura() {}
  }
};
