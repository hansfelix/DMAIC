<template fluid style="min-height: 0;" grid-list-lg>
  <v-layout row justify-center>
    <v-dialog v-model="show" max-width="500px" @keydown.esc="show = false">
      <v-form v-model="valid" ref="form" @submit.prevent="crearMedicion()">
        <v-card>
          <!-- CONTENT DIALOG -->
          <v-card-text>
              <v-layout wrap>
                <!-- STEP 1 -->
                <v-flex xs12 md12 text-xs-center v-if="step==1">
                    <img class="pa-3 img-introduction" src="https://firebasestorage.googleapis.com/v0/b/dmaic-b6e44.appspot.com/o/imgs%2Fdmaic_animation2.gif?alt=media&token=7b6d5107-b461-4fd6-85fb-91220b775537">
                    <br>
                    <h2 class="display-1">Bienvenidos al App DMAIC</h2>
                    <h4 class="subheading">Para comenzar, da clic en siguiente</h4>
                </v-flex>  
                <!-- STEP 2 -->
                  <v-flex xs12 md12 text-xs-center v-else-if="step==2">
                    <img class="pa-3 img-introduction" src="https://firebasestorage.googleapis.com/v0/b/dmaic-b6e44.appspot.com/o/imgs%2Fintro_proyectos.PNG?alt=media&token=b0df3c91-d502-47e9-8cc2-240739a6dc52">
                    <br>
                    <h4 class="subheading">Encontraras tu(s) proyectos en el menú de la izquierda de la página.</h4>
                </v-flex> 
                 <!-- STEP 3 -->
                  <v-flex xs12 md12 text-xs-center v-else-if="step==3">
                    <img class="pa-3 img-introduction" src="https://firebasestorage.googleapis.com/v0/b/dmaic-b6e44.appspot.com/o/imgs%2Fintro_proyectos.PNG?alt=media&token=b0df3c91-d502-47e9-8cc2-240739a6dc52">
                    <br>
                    <h4 class="subheading">Aquí pueden ir más detalles. ( construyendo...)</h4>
                </v-flex> 
              </v-layout>
          </v-card-text>
          <!-- FOOTER DIALOG -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click.native="show = false" v-if="this.step ==1">NO, GRACIAS</v-btn>
            <v-btn color="secondary" flat @click.native="anterior()" v-else>Anterior</v-btn>
            <v-btn color="secondary" flat @click.native="siguiente()">Siguiente <v-icon right>keyboard_arrow_right</v-icon></v-btn>
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
  props: ["visible"],

  /**
   * Data
   */
  data() {
    return {
      nombreMedicion: "",
      step: 1,
      valid: true
    };
  },

  /**
   * Methods
   */
  methods: {
    siguiente() {
      this.step++;
      console.log(this.step);
    },
    anterior() {
      this.step--;
      console.log(this.step);
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

<style>
.img-introduction {
  max-width: 100%;
}
</style>
