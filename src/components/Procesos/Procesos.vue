<template>
  <v-container fluid grid-list-lg fill-height style="flex-direction: column;">

    <v-layout row align-center wrap style="height: 100%;">
      <!-- BreadCumb -->
      <v-flex xs12>
        <v-breadcrumbs>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item v-for="item in itemsBreadCumb" :key="item.text" :disabled="item.disabled" :to="item.url">
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>

      <v-flex xs12 md9 align-center v-if="!loading_proyectoActual">
        <h1 display-3 class="tittle_H">Procesos</h1>
        <p>Se listan los procesos que tiene del proyecto
          <strong>{{proyectoActual.cr}} - {{proyectoActual.nombrePyt}} </strong>, para añadir un nuevo proceso de click en el botón
          <strong>AÑADIR PROCESO</strong>:</p>
        <v-spacer></v-spacer>
      </v-flex>
      <v-flex xs12 md3 class="text-xs-center text-md-right">
        <v-btn color="secondary" dark @click.stop="dialog = true">
          Añadir Proceso
          <v-icon right dark>queue</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <!-- dialog New proceso -->
    <template fluid style="min-height: 0;" grid-list-lg>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="500px">
          <v-form v-model="valid" ref="form">
            <v-card>
              <v-card-title>
                <span class="headline">Nuevo Proceso</span>
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
                <v-btn color="blue darken-1" flat @click.native="crearProceso()">Añadir</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-layout>
    </template>


    <v-layout row align-center wrap fill-height style="width: 100%;">
      <v-flex xs12 sm8 offset-sm2>

        <!-- progress -->
        <v-layout>
          <v-flex s12 class="text-xs-center">
            <v-progress-linear v-bind:indeterminate="true" v-if="loading_procesos"></v-progress-linear>
          </v-flex>
        </v-layout>

        <!-- Lista de Procesos -->
        <v-layout>
          <v-flex s12 class="text-xs-center">
            <v-expansion-panel v-if="!loading_procesos">
              <v-expansion-panel-content v-for="proceso in procesos" :key="proceso.id">
                <div slot="header">
                  <h3>{{ proceso.nombreProceso }}</h3>
                  <span>{{ proceso.herramientaUsada }}</span>
                </div>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <v-layout>
                      <v-flex s12 class="text-xs-right">
                        <v-btn color="secondary" right @click="anadirMedicion(proceso.id)">Nueva Medición</v-btn>
                      </v-flex>
                    </v-layout>

                    <!-- Lista de procesos dentro del proceso -->
                    <v-layout>
                      <v-flex s12 class="text-xs-center">
                        <v-list two-line subheader>
                          <v-list-tile v-for="(medicion,index) in proceso.mediciones" :key="index" avatar class="procesoItem" :to="'/Medicion_configuracion/' +proyectoActual.id +'/' +proceso.id">
                            <!-- <v-list-tile-avatar>
                          <v-icon v-bind:class="proceso.dashboard ? 'green lighten-1 white--text':'grey lighten-1 white--text'">{{ proceso.dashboard ? "assessment":"input" }}</v-icon>
                        </v-list-tile-avatar> -->
                            <v-list-tile-content>
                              <v-list-tile-title>{{ medicion.nombreMedicion }}</v-list-tile-title>
                              <v-list-tile-sub-title>{{ medicion.nombreMedicion }}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action v-if="medicion.nombreMedicion">
                              <v-tooltip top>
                                <v-btn slot="activator" icon ripple :to="'/Reporte/' +proyectoActual.id +'/' +proceso.id ">
                                  <v-icon color="grey lighten-1">insert_drive_file</v-icon>
                                </v-btn>
                                <span>Ver Reporte</span>
                              </v-tooltip>
                            </v-list-tile-action>

                            <v-list-tile-action>
                              <v-tooltip top>
                                <v-btn slot="activator" icon ripple :to="'/proceso_configuracion/' +proyectoActual.id +'/' +proceso.id">
                                  <v-icon color="grey lighten-1">settings</v-icon>
                                </v-btn>
                                <span>Configuración</span>
                              </v-tooltip>
                            </v-list-tile-action>
                          </v-list-tile>

                        </v-list>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>

        <!-- EMPTY-STATE -->
        <v-flex v-if="!this.procesos.length" fill-height class="text-xs-center empty-state" >
          <v-icon style="font-size: 7rem;">devices_other</v-icon>
          <h2 class="headline">Crea un nuevo proceso</h2>
          <h2 class="subheading">Para comenzar crea un nuevo proceso dando clic en el botón AÑADIR PROCESO.</h2>
        </v-flex>
        
      </v-flex>
    </v-layout>


    <!-- Dialog Crear Medición -->
    <DialogMedicion :visible="dialog_crearMedicion" :proyecto_uid="this.proyecto_uid" :proceso_uid="this.proceso_uid" v-on:close="dialog_crearMedicion=!dialog_crearMedicion">
    </DialogMedicion>

  </v-container>
</template>


<script>
/**
 * Import Dependency
 */
import { mapGetters } from "vuex";
import DialogMedicion from "./DialogMedicion.vue";

/**
 * Export
 */
export default {
  components: {
    DialogMedicion
  },
  data() {
    return {
      //Validación del formulario
      valid: true,

      dialog_crearMedicion: false,
      proyecto_uid: "",
      proceso_uid: "",

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
      txt_idproceso: "",
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
          text: "procesos",
          disabled: true,
          url: "/"
        }
      ]
    };
  },
  computed: {
    // getters importados de vuex
    ...mapGetters([
      "procesos",
      "loading_procesos",
      "proyectos",
      "proyectoActual",
      "loading_proyectos",
      "loading_proyectoActual"
    ])
  },
  methods: {
    crearProceso() {
      // verificar si el formulario esta llenado correctamente
      if (this.$refs.form.validate()) {
        var proyecto_uid = this.$route.params.proyecto_uid;
        const payload = {
          proyecto_uid: proyecto_uid,
          proceso: {
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
        // Crear proceso
        this.$store.dispatch("crear_proceso", payload);
        // reiniciar formulario
        this.$refs.form.reset();
        // cerrar dialogo
        this.dialog = false;
      }
    },
    anadirMedicion(proceso_uid) {
      (this.proceso_uid = proceso_uid), (this.dialog_crearMedicion = true);
      console.log(proceso_uid);
    }
  },
  watch: {
    proyectos(val) {
      if (val != undefined) {
        this.proyecto_uid = this.$route.params.proyecto_uid;
        this.$store.dispatch("cargar_proyectoActual", this.proyecto_uid);
      }
    }
  },
  created() {
    this.proyecto_uid = this.$route.params.proyecto_uid;
    // Si se han cargado los proyectos, se carga el proyecto actual
    // - this.$store.getters.proyectos.length = 0 no hay proyectos FALSE
    // - this.$store.getters.proyectos.length != 0 si hay proyectos TRUE
    // si no hya proyectos lo carga del watch
    if (this.$store.getters.proyectos.length) {
      this.$store.dispatch("cargar_proyectoActual", this.proyecto_uid);
    }
    this.$store.dispatch("cargar_procesos", this.proyecto_uid);
  },

  /**
   * Mounted
   */
  mounted() {
    let self = this;

    //Detecta si presiona enter en un diálogo
    window.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        if (self.dialog == true) {
          self.crearProceso();
        }
      }
    });
  }
};
</script>

<style scoped>
.procesoItem {
  background-color: rgb(255, 255, 255);
  transition: 0.2s ease;
}

.procesoItem:hover {
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

.empty-state {
  color: rgba(0, 0, 0, 0.54);
}
</style>
