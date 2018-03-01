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

        <v-flex xs12 md9 align-center>
          <h1 display-3 class="tittle_H">Procesos</h1>
          <p>Se listan los procesos que tiene del proyecto
            <strong>{{pytActual.cr}} - {{pytActual.nombrePyt}} </strong>, para añadir una nueva medición de click en el botón
            <strong>AÑADIR MEDICIÓN</strong>:</p>
          <v-spacer></v-spacer>
        </v-flex>
        <v-flex xs12 md3 class="text-xs-center text-md-right">
          <v-btn color="secondary" dark @click.stop="dialog = true">
            Añadir Medición
            <v-icon right dark>queue</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>

      <!-- dialog New Medicion -->

      <template fluid style="min-height: 0;" grid-list-lg>
        <v-layout row justify-center>
          <v-dialog v-model="dialog" max-width="500px">
            <v-form v-model="valid" ref="form">
              <v-card>
                <v-card-title>
                  <span class="headline">Nueva Medición</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 md12>
                        <v-text-field label="Nombre del proceso" v-model="txt_nombreProceso" hint="Ej: Armado de gaviones" :rules="[v => !!v || 'Rellene este campo']"
                          required></v-text-field>
                      </v-flex>

                      <v-flex xs12 md12>
                        <v-select v-bind:items="itemsHerramientaUsada" v-model="txt_herramientaUsada" label="Herramienta usada" single-line bottom
                          :rules="[v => !!v || 'Seleccione una herramienta']" required=""></v-select>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-text-field label="Ingeniero de Campo" v-model="txt_ingenieroCampo" hint="Ej: Ing. Jhonthan Barboza" :rules="[v => !!v || 'Rellene este campo']"
                          required></v-text-field>
                      </v-flex>

                      <v-flex xs12 md6>
                        <v-text-field label="Jefe de Grupo" v-model="txt_jefeGrupo" hint="Ej: Seiko Yong" :rules="[v => !!v || 'Rellene este campo']"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*Campos obligatorios</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Cerrar</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="onCreateMedicion()">Añadir</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-layout>
      </template>


      <v-layout row align-center wrap>
        <v-flex xs12 sm8 offset-sm2>

          <!-- progress -->
          <v-layout>
            <v-flex s12 class="text-xs-center">
              <v-progress-linear v-bind:indeterminate="true" v-if="loadingMediciones"></v-progress-linear>
            </v-flex>
          </v-layout>

          <!-- Lista de mediciones -->
          <v-card v-if="!loadingMediciones">
            <v-list two-line subheader>
              <v-list-tile v-for="medicion in mediciones" v-bind:key="medicion.id" avatar class="medicionItem" :to="'/Medicion_configuracion/' +pytActual.id +'/' +medicion.id">
                <v-list-tile-avatar>
                  <v-icon v-bind:class="medicion.dashboard ? 'green lighten-1 white--text':'grey lighten-1 white--text'">{{ medicion.dashboard ? "assessment":"input" }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ medicion.nombreProceso }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ medicion.herramientaUsada }}</v-list-tile-sub-title>
                </v-list-tile-content>


                <v-list-tile-action v-if="medicion.dashboard">
                  <v-tooltip top>
                    <v-btn slot="activator" icon ripple :to="'/Reporte/' +pytActual.id +'/' +medicion.id ">
                      <v-icon color="grey lighten-1">insert_drive_file</v-icon>
                    </v-btn>
                    <span>Ver Reporte</span>
                  </v-tooltip>
                </v-list-tile-action>



                <v-list-tile-action>
                  <v-tooltip top>
                    <v-btn slot="activator" icon ripple :to="'/Medicion_configuracion/' +pytActual.id +'/' +medicion.id">
                      <v-icon color="grey lighten-1">settings</v-icon>
                    </v-btn>
                    <span>Configuración</span>
                  </v-tooltip>
                </v-list-tile-action>
              </v-list-tile>

            </v-list>
          </v-card>
        </v-flex>
      </v-layout>




    </v-container>
  </v-slide-y-transition>
</template>


<script>
import { mapGetters } from "vuex";
import * as firebase from "firebase";

export default {
  data() {
    return {
      //Validación del formulario
      valid: true,

      dialog_generarReporte: false,
      dialog: false,
      txt_herramientaUsada: "",
      txt_ingenieroCampo: "",
      txt_jefeGrupo: "",
      txt_nombreProceso: "",
      itemsHerramientaUsada: [
        {
          text: "Carta Balance"
        },
        {
          text: "Estudio de Tiempos"
        }
      ],
      txt_tipoReporte: "",
      txt_idMedicion: "",
      txt_metrados: "",
      txt_hhReal: "",
      txt_nroObreros: "",
      txt_ratioPrevisto: "",

      itemsTipoReporte: [
        {
          text: "Manual"
        },
        {
          text: "Automático"
        }
      ],
      itemsBreadCumb: [
        {
          text: "Inicio",
          disabled: false,
          url: ""
        },
        {
          text: "Proyectos",
          disabled: false,
          url: "/Proyectos"
        },
        {
          text: "Mediciones",
          disabled: true,
          url: "/"
        }
      ]
    };
  },
  computed: {
    // getters importados de vuex
    ...mapGetters(["pytActual", "loading_proyectos", "mediciones"])
  },
  created() {
    var idPyt = this.$route.params.idPyt;
    const payload = {
      idPyt: idPyt,
      Proyectos: this.$store.state.Proyectos
    };
    this.$store.dispatch("loadMediciones", payload);
    // this.$router.push("/Mediciones");

    this.$store.dispatch("loadPytActual", payload);
  },
  destroyed() {
    console.log("se destruyo");
  },
  methods: {
    onCreateMedicion() {
      // verificar si el formulario esta llenado correctamente
      if (this.$refs.form.validate()) {
        var idPyt = this.$route.params.idPyt;
        const payload = {
          idPyt: idPyt,
          medicion: {
            nombreProceso: this.txt_nombreProceso,
            herramientaUsada: this.txt_herramientaUsada.text,
            ingenieroCampo: this.txt_ingenieroCampo,
            jefeGrupo: this.txt_jefeGrupo,
            fecha: new Date().toLocaleDateString(),
            duracion: 60,
            dashboard: false,
            tomaDatos: false,
            configurado: false
          }
        };

        // Crear medicion
        this.$store.dispatch("createMedicion", payload);

        // reiniciar formulario
        this.$refs.form.reset();

        // cerrar dialogo
        this.dialog = false;
      }
    }
  }
};
</script>

<style scoped>
.medicionItem {
  background-color: rgb(255, 255, 255);
  transition: 0.2s ease;
}

.medicionItem:hover {
  background-color: rgb(241, 241, 241);
  transition: 0.2s ease;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

.list__tile:hover {
  background-color: rgb(245, 245, 245);
}
</style>
