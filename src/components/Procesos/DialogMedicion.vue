<template fluid style="min-height: 0;" grid-list-lg>
  <v-layout row justify-center>
    <v-dialog v-model="show" max-width="500px" @keydown.esc="show = false">
      <v-form v-model="valid" ref="form" @submit.prevent="crearMedicion()">
        <v-card>
          <!-- HEADER DIALOG -->
          <v-card-title>
            <span class="headline">Nueva Medición</span>
          </v-card-title>
          <!-- CONTENT DIALOG -->
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field label="Nombre de la medición" v-model="nombreMedicion" hint="Ej: Armado de gaviones" :rules="[v => !!v || 'Rellene este campo']"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <small>*Campos obligatorios</small>
            </v-container>
          </v-card-text>
          <!-- FOOTER DIALOG -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="show = false">Cerrar</v-btn>
            <v-btn color="blue darken-1" flat type="submit">Añadir</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
/**
 * Export
 */
export default {
  props: ["visible", "proyecto_uid", "proceso_uid"],

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
  methods: {
    crearMedicion() {
      if (this.$refs.form.validate()) {
        console.log(this.proyecto_uid, this.proceso_uid);
        const payload = {
          proyecto_uid: this.proyecto_uid,
          proceso_uid: this.proceso_uid,
          medicion: {
            nombreMedicion: this.nombreMedicion
          }
        };

        let cont = this;

        this.$store.dispatch("crear_medicion", payload).then(
          response => {
            console.log(response)
            cont.$emit("close");
          },
          error => {
            console.error(
              "Got nothing from server. Prompt user to check internet connection and try again"
            );
          }
        );
      }
    }
  },

  /**
   * Computed
   */
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },

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
