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

          <!-- Adminstrador -->
          <span v-if="administrador">Se listan a los proyectos resgistrados, para añadir uno nuevo, de click en el botón
            <strong>AÑADIR PROYECTO</strong>:</span>
          <!-- Ususario de Proyecto -->
          <span v-if="!administrador">Se listan los proyectos en el que se encuentra registrado. dé click en alguno para ver su información.</span>

        </v-flex>

        <!-- Se muestra solo si es administrador -->
        <v-flex xs12 md4 class="text-xs-center text-md-right" v-if="administrador">
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
          <v-card class="card-proyecto">

            <router-link :to="'/procesos/' + proyecto.id">
              <v-card-title primary-title>
                <div class="blue-grey--text darken-1">
                  <h2 class="headline mb-0 card_tittle-CR">{{proyecto.cr}}</h2>
                  <div class="grey--text two-lines">{{proyecto.nombrePyt}}</div>
                </div>
              </v-card-title>
            </router-link>
            <v-divider></v-divider>

            <v-card-actions>
              <v-btn flat color="primary" :to="'/procesos/' + proyecto.id">PROCESOS</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="opendialog_anadirUsuarios(proyecto)" v-if="administrador">
                <v-icon color="primary">group_add</v-icon>
              </v-btn>
              <v-btn icon @click="opendialog_verUsuarios(proyecto)">
                <v-icon color="primary">group</v-icon>
              </v-btn>
              <v-btn icon @click="opendialog_editarProyecto(proyecto)">
                <v-icon color="primary"> mode_edit</v-icon>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>

        <!-- dialog CREAR PROYECTO -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog" max-width="500px">
              <v-form v-model="valid" ref="form">
                <v-card>
                  <v-card-title>
                    <span class="headline">Nuevo Proyecto</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="CR" v-model="txt_cr" hint="Ej: 3028" :rules="[v => !!v || 'Rellene este campo']" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Nombre" v-model="txt_nombrePyt" hint="Ej: Descolmatación del río Piura" :rules="[v => !!v || 'Rellene este campo']"
                            required></v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <small>*Campos obligatorios</small>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" flat @click.native="dialog = false">Cerrar</v-btn>
                    <v-btn color="secondary" flat @click.native="crearProyecto()">Añadir</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-layout>
        </template>

        <!-- dialog EDITAR PROYECTO -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog_editarProyecto" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Editar Proyecto</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="CR" v-model="txt_cr" hint="Ej: 3028" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Nombre" v-model="txt_nombrePyt" hint="Ej: Descolmatación del río Piura" required></v-text-field>
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
            </v-dialog>
          </v-layout>
        </template>

        <!-- dialog VER USUARIOS -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog_verUsuarios" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="headline">Usuarios</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <!-- progress LOADING PROYECTOS-->
                      <v-flex xs12 class="text-xs-center" v-if="loading_proyectos">
                        <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
                      </v-flex>

                      <v-flex xs12>

                        <div fill-height v-if="noUsers">
                          Aún no hay usuarios registrados en este proyecto
                        </div>

                        <v-list two-line v-if="!loadingUsers">
                          <div v-for="(user, index) in users" :key="index">
                            <v-list-tile avatar>
                              <v-list-tile-avatar>
                                <img :src="user.foto">
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title v-html="user.nombre"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="user.correo"></v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </div>
                        </v-list>

                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" flat @click.native="dialog_verUsuarios = false">Cerrar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </template>

        <!-- dialog AÑADIR USUARIOS -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog_anadirUsuarios" max-width="600px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Añadir usuarios</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 md9>
                          <v-text-field label="Busqueda por nombre" v-model="txt_busqueda" hint="Ej: Seiko Yong" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3 class="pt-3">
                          <v-btn block dark color="secondary" @click="buscarUsuarios()">Buscar</v-btn>
                        </v-flex>

                        <v-flex xs12>
                          <v-list two-line v-if="!loadingUsers">
                            <div v-for="(user, index) in usersBusqueda" :key="index">
                              <v-list-tile avatar>
                                <v-list-tile-avatar>
                                  <img :src="user.foto">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title v-html="user.nombre"></v-list-tile-title>
                                  <v-list-tile-sub-title v-html="user.correo"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn icon @click="anadirUsuario(user.id)">
                                    <v-icon>person_add</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                            </div>
                          </v-list>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" flat @click.native="dialog_anadirUsuarios = false">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>
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
      // search: null,
      select: [],

      //Dialog
      //Validación del formulario
      valid: true,
      dialog: false,
      dialog_editarProyecto: false,

      dialog_verUsuarios: false,
      noUsers: false,

      dialog_anadirUsuarios: false,
      txt_busqueda: "",

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
    ...mapGetters([
      "proyectos",
      "loading_proyectos",
      "user",
      "users",
      "administrador",
      "usersBusqueda",
      "loadingUsers"
    ])
  },

  watch: {
    user(val) {
      if (val != undefined) {
        const user = val;
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
    }
  },

  /**
   *
   * == METHODS
   *
   */
  methods: {
    crearProyecto() {
      if (this.$refs.form.validate()) {
        const proyecto = {
          cr: this.txt_cr,
          nombrePyt: this.txt_nombrePyt
        };
        this.$store.dispatch("crear_proyecto", proyecto);
        this.dialog = false;
      }
    },
    opendialog_editarProyecto(proyecto) {
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
      this.$store.dispatch("actualizar_proyecto", newPyt);
      this.dialog_editarProyecto = false;
    },

    /**
     * @description Abrir dialogo AÑADIR USUSARIO
     * @param proyecto
     * @returns -
     * @author Hans Felix
     * @created 20/02/0218
     */
    opendialog_verUsuarios(proyecto) {
      this.proyecto = proyecto;
      this.dialog_verUsuarios = true;
      this.noUsers = false;

      //Limpiar los users
      this.$store.commit("set_users", []);

      //Obtiene un arreglo con los keys (uids) del objeto
      if (proyecto.users) {
        const arrayUidUsers = Object.keys(proyecto.users);
        this.$store.dispatch("cargar_usuarios_ByUid", arrayUidUsers);
      } else {
        this.noUsers = true;
      }
    },
    opendialog_anadirUsuarios(proyecto) {
      this.$store.commit("set_userBusqueda", []);
      this.proyecto = proyecto;
      this.dialog_anadirUsuarios = true;
    },
    buscarUsuarios() {
      this.$store.dispatch("cargar_usuarios_busqueda", this.txt_busqueda);
    },
    anadirUsuario(user_uid) {
      const payload = {
        user_uid: user_uid,
        proyecto_uid: this.proyecto.id
      };

      this.$store.dispatch("actualizar_proyecto_anadirUsuario", payload);

      // Dismiss Dialog anadirUsuarios
      this.dialog_anadirUsuarios = false;
      this.txt_busqueda = "";
    }
  },

  /**
   *
   * == CREATED
   *
   */
  created() {},

  /**
   *
   * == MOUNTED
   *
   */
  mounted() {
    let self = this;

    //Detecta si presiona enter en un diálogo
    window.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        if (self.dialog == true) {
          self.crearProyecto();
        }
        if (self.dialog_editarProyecto == true) {
          self.actualizarProyecto();
        }
        if (self.dialog_anadirUsuarios == true) {
          self.buscarUsuarios();
        }
      }
    });
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.card-proyecto {
  transition: all 0.2s ease;
  border-top: 2px solid #ffffff;
}

.card.card-proyecto:hover {
  border-top: 2px solid #5c6bc0;
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
}

.card_tittle-CR {
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
  text-decoration: none;
}

.two-lines {
  line-height: 1.5em;
  height: 3em;
  /* height is 2x line-height, so two lines will display */
  overflow: hidden;
  /* prevents extra lines from being visible */
}
</style>
