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

      <!-- progress -->
      <v-layout>
        <v-flex s12 class="text-xs-center">
          <v-progress-linear v-bind:indeterminate="true" v-if="loadingProyecto"></v-progress-linear>
        </v-flex>
      </v-layout>

      <!-- Proyectos cargados -->
      <v-layout row wrap>
        <v-flex xs12 md3 v-for="proyecto in proyectos" :key="proyecto.id" v-if="!loadingProyecto">
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
              <v-btn icon @click="editarProyecto(proyecto)">
                <v-icon color="primary"> mode_edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
export default {
  computed: {
    proyectos() {
      return this.$store.getters.proyectos;
    },
    loadingProyecto() {
      return this.$store.getters.loading_proyectos;
    }
  },
  data() {
    return {
      //Dialog
      dialog: false,
      dialog_editarProyecto: false,
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
  methods: {
    onCreateProyecto() {
      // if (!this.formIsValid) {
      //   return;
      // }
      const proyecto = {
        cr: this.txt_cr,
        nombrePyt: this.txt_nombrePyt
      };
      this.$store.dispatch("createProyecto", proyecto);
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

/* li {
  display: inline-block;
  margin: 0 10px;
} */

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
