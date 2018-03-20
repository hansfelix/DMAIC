<template fluid style="min-height: 0;" grid-list-lg>
  <v-layout row justify-center>
    <v-dialog v-model="this.visible" max-width="500px">
      <v-form v-model="valid" ref="form" @submit.prevent="crearMedicion()">
        <v-card>
          <v-card-title>
            <span class="headline">Nueva Medición</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                  
                <v-flex xs12 md12>
                  <v-text-field label="Nombre de la medición" v-model="txt_nombreMedicion" hint="Ej: Armado de gaviones" :rules="[v => !!v || 'Rellene este campo']"
                    required></v-text-field>
                </v-flex>

              </v-layout>
              <small>*Campos obligatorios</small>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="cerrarDialog()">Cerrar</v-btn>
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
    props: ["visible", "idMedi", "options"],
    data() {
      return {
        // Formulario
        txt_nombreMedicion: "",
        valid: true
      };
    },
    methods: {
      crearMedicion() {
        if (this.$refs.form.validate()) {

        }
        console.log("s");
      },
      cerrarDialog() {
        console.log("cerradi")
        this.$emit("close");
      }
    },

    /**
     * Mounted
     */
    mounted() {
      let self = this;
      //Detecta si presiona enter en un diálogo
      window.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          if (self.visible == true) {
            self.crearMedicion();
          }
        }
      });
    }
  };

</script>
