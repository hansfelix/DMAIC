// No implementado aun
// Revisar de ahi
<template>
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
                    <v-list-tile v-for="(medicion,index) in proceso.mediciones" :key="index" avatar class="procesoItem" :to="'/Medicion/' +proyectoActual.id +'/' +proceso.id">
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


    <!-- Dialog Crear Medición -->
    <DialogMedicion :visible="dialog_crearMedicion" :proyecto_uid="this.proyecto_uid" :proceso_uid="this.proceso_uid" v-on:close="dialog_crearMedicion=!dialog_crearMedicion">
    </DialogMedicion>

  </v-layout>
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

  props: ["procesos"],

  /**
   * Data
   */
  data() {
    return {
      // Formulario
      nombreMedicion: "",
      valid: true
    };
  },

  /**
   * Methods
   */
  methods: {},

  /**
   * Computed
   */
  computed: {},

  /**
   * Mounted
   */
  mounted() {
    let self = this;
    //Detecta si presiona enter en un diálogo
    window.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        if (self.visible == true) {
          self.crearMedicion();
        }
      }
    });
  }
};
</script>
