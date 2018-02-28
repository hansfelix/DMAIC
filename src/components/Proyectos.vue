<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid grid-list-lg>
      <v-layout row align-center wrap>

        <!-- BreadCumb -->
        <v-flex xs12>
          <v-breadcrumbs>
            <v-icon slot="divider">chevron_right</v-icon>
            <v-breadcrumbs-item v-for="item in itemsBreadCumb" :key="item.text" :disabled="item.disabled" :to="item.url">
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-flex>

        <!-- Cabecera -->
        <v-flex xs12 md8 align-center>
          <h1 display-3 class="tittle_H">Proyectos</h1>
          <span>Se listan a los proyectos resgistrados, para añadir uno nuevo, de click en el botón
            <strong>AÑADIR PROYECTO</strong>:</span>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs12 md4 class="text-xs-center text-md-right">
          <v-btn color="secondary" dark @click.stop="dialog = true; txt_nombrePyt =''; txt_cr=''">
            Añadir Proyecto
            <v-icon right dark>queue</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>


      <!-- progress LOADING PROYECTOS-->
      <v-layout>
        <v-flex s12 class="text-xs-center">
          <v-progress-linear v-bind:indeterminate="true" v-if="loading_proyectos"></v-progress-linear>
        </v-flex>
      </v-layout>

      <!-- PROYECTOS CARGADOS -->
      <v-layout row wrap>
        <v-flex xs12 md3 v-for="proyecto in proyectos" :key="proyecto.id" v-if="!loading_proyectos">
          <v-card>
            <v-card-title primary-title>
              <div>
                <router-link class="headline mb-0 card_tittle-CR" :to="'/Mediciones/' + proyecto.id">{{proyecto.cr}}</router-link>
                <div class="grey--text two-lines">{{proyecto.nombrePyt}}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="primary" :to="'/Mediciones/' + proyecto.id">VER MEDICIONES</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="openDialog_anadirUsuarios(proyecto)">
                <v-icon color="primary">group</v-icon>
              </v-btn>
              <v-btn icon @click="editarProyecto(proyecto)">
                <v-icon color="primary"> mode_edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <!-- dialog CREAR PROYECTO -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog" max-width="500px">
              <form @submit.prevent="onCreateProyecto">
                <v-card>
                  <v-card-title>
                    <span class="headline">Nuevo Proyecto</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="CR" id="txt_cr" v-model="txt_cr" hint="Ej: 3028" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Nombre" id="txt_nombrePyt" v-model="txt_nombrePyt" hint="Ej: Descolmatación del río Piura" required></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <small>*Campos obligatorios</small>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false" type="submit">Añadir</v-btn>
                  </v-card-actions>
                </v-card>
              </form>
            </v-dialog>
          </v-layout>
        </template>

        <!-- dialog EDITAR PROYECTO -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog_editarProyecto" max-width="500px">
              <form @submit.prevent="onCreateProyecto">
                <v-card>
                  <v-card-title>
                    <span class="headline">Editar Proyecto</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="CR" id="txt_cr" v-model="txt_cr" hint="Ej: 3028" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Nombre" id="txt_nombrePyt" v-model="txt_nombrePyt" hint="Ej: Descolmatación del río Piura" required></v-text-field>
                        </v-flex>

                        <v-flex xs12 sm6 md6>
                          <small>*Campos obligatorios</small>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog_editarProyecto = false">Cerrar</v-btn>
                    <v-btn color="blue darken-1" flat @click="actualizarProyecto()">Actualizar</v-btn>
                  </v-card-actions>
                </v-card>
              </form>
            </v-dialog>
          </v-layout>
        </template>

        <!-- dialog AÑADIR USUSARIO -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog_anadirUsuario" max-width="600px">
              <form @submit.prevent="onCreateProyecto">
                <v-card>
                  <v-card-title>
                    <span class="headline">Usuarios</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="CR" id="txt_cr" v-model="txt_cr" hint="Ej: 3028" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>

                          <v-list two-line v-if="dialog_anadirUsuario">
                            <v-subheader>Usuarios</v-subheader>
                            <template v-for="(item, index) in proyecto">
                              <v-divider :key="index"></v-divider>
                              <v-list-tile avatar :key="index" >
                                <v-list-tile-avatar>
                                  <img :src="item.users.foto">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title v-html="item.users.nombre"></v-list-tile-title>
                                  <v-list-tile-sub-title v-html="item.users.nombre"></v-list-tile-sub-title>
                                </v-list-tile-content>
                              </v-list-tile>
                            </template>
                          </v-list>

                        </v-flex>

                        <v-flex xs12 sm6 md6>
                          <small>*Campos obligatorios</small>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog_anadirUsuario = false">Cerrar</v-btn>
                    <v-btn color="blue darken-1" flat @click="anadirUsuario()">Añadir</v-btn>
                  </v-card-actions>
                </v-card>
              </form>
            </v-dialog>
          </v-layout>
        </template>

      </v-layout>

    </v-container>
  </v-slide-y-transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  /**
   *
   * == DATA
   *
   */
  data() {
    return {
      loading: false,
      states: [
        {
          id: "1",
          nombre: "prosyectos"
        },
        {
          id: "2",
          nombre: "loasading_proyectos"
        }
      ],
      items: [],
      search: null,
      select: [],

      //Dialog
      dialog: false,
      dialog_editarProyecto: false,

      dialog_anadirUsuario: false,
      proyecto: {},

      txt_nombrePyt: "",
      txt_cr: "",
      pyt_seleccionado: {},
      itemsBreadCumb: [
        {
          text: "Inicio",
          disabled: false,
          url: ""
        },
        {
          text: "Proyectos",
          disabled: true,
          url: "/"
        }
      ]
    };
  },

  /**
   *
   * == COMPUTED
   *
   */
  computed: {
    // getters importados de vuex
    ...mapGetters(["proyectos", "loading_proyectos"])
  },

  watch: {
    search(val) {
      val && this.querySelections(val);
    }
  },

  /**
   *
   * == METHODS
   *
   */
  methods: {
    onCreateProyecto() {
      // if (!this.formIsValid) {
      //   return;
      // }
      const proyecto = {
        cr: this.txt_cr,
        nombrePyt: this.txt_nombrePyt
      };
      this.$store.dispatch("crear_proyecto", proyecto);
      this.$router.push("/proyectos");
    },
    editarProyecto(proyecto) {
      this.dialog_editarProyecto = true;

      this.txt_nombrePyt = proyecto.nombrePyt;
      this.txt_cr = proyecto.cr;
      this.pyt_seleccionado = proyecto;
    },
    actualizarProyecto() {
      const newPyt = {
        id: this.pyt_seleccionado.id,
        nombrePyt: this.txt_nombrePyt,
        cr: this.txt_cr
      };
      console.log(newPyt);
      this.$store.dispatch("actualizarProyecto", newPyt);

      this.dialog_editarProyecto = false;
    },

    /**
     * @description Abrir dialogo AÑADIR USUSARIO
     * @param proyecto
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    openDialog_anadirUsuarios(proyecto) {
      this.proyecto = proyecto;
      this.dialog_anadirUsuario = true;
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (
            (e.nombre || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1
          );
        });
        this.loading = false;
      }, 500);
    }
  },

  /**
   *
   * == CREATED
   *
   */
  created() {
    //Cargar proyectos, según rol
    //========================================
    const user = this.$store.getters.user;
    const uid = user.id; // uid del usuario
    const administrador = user.administrador; // true o false

    if (administrador) {
      //Si es administrador carga todo los proyectos
      this.$store.dispatch("cargar_proyectos");
    } else {
      //Si no es administrador solo carga lo filtrado por el id
      this.$store.dispatch("cargar_proyectosByUid", user.id);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card_tittle-CR {
  text-decoration: none;
  color: black;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.two-lines {
  line-height: 1.5em;
  height: 3em;
  /* height is 2x line-height, so two lines will display */
  overflow: hidden;
  /* prevents extra lines from being visible */
}
</style>
