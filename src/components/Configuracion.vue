<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm8 offset-sm2>
          <v-toolbar>
            <v-toolbar-title>Texturas</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog_nuevaTextura= true">
              <v-icon>library_add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card>

            <!-- List -->
            <v-list subheader>
              <v-subheader>Texturas guardadas</v-subheader>
              <v-list-tile avatar v-for="(item,index) in texturas" :key="index" @click="abrirModalTextura(item)">
                <v-list-tile-avatar>
                  <img :src="item.url">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.nombre"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>chat_bubble</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

          </v-card>
        </v-flex>

        <!-- dialog CREAR TEXTURA -->
        <template>
          <v-layout row justify-center>
            <v-dialog v-model="dialog_nuevaTextura" max-width="500px">
              <form @submit.prevent="crear_textura()">
                <v-card>
                  <v-card-title>
                    <span class="headline">Nueva Textura</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Nombre de la textura" id="txt_nombreTextura" v-model="txt_nombreTextura" hint="Ej: 3028" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <file-input accept="image/*" ref="fileInput" @input="getUploadedFile"></file-input>
                        </v-flex>

                        <v-flex xs12>
                          <small>*Campos obligatorios</small>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog_nuevaTextura = false">Cerrar</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="dialog_nuevaTextura = false" type="submit">Añadir</v-btn>
                  </v-card-actions>
                </v-card>
              </form>
            </v-dialog>
          </v-layout>
        </template>

        <!-- dialog VER TEXTURA -->
        <template>
          <v-layout row justify-center v-if="dialog_pruebaTextura">
            <v-dialog v-model="dialog_pruebaTextura" max-width="500px">
              <form @submit.prevent="crear_textura()">
                <v-card>
                  <v-card-title>
                    <span class="headline">Prueba Textura</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 align-center>
                    
                                  <div class="text-xs-center">
                            100 x 30 px
                            <div :style="'height:30px; margin: 0 auto; width: 100px; background: no-repeat center url('+ textura.url +');'"></div>
                            <div :style="'height:30px; margin: 0 auto; width: 100px; background: no-repeat center url('+ textura.url +');'"></div>
                            <div :style="'height:30px; margin: 0 auto; width: 100px; background: no-repeat center url('+ textura.url +');'"></div>
                          </div>
                        </v-flex>

                        <v-flex xs12>
                          <!-- <small>*Campos obligatorios</small> -->
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog_pruebaTextura = false">Cerrar</v-btn>
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
  import FileInput from "./File-input.vue";
  import * as firebase from "firebase";

  export default {
    components: {
      FileInput
    },
    data() {
      return {
        dialog_nuevaTextura: false,
        dialog_pruebaTextura: false,
        txt_nombreTextura: "",
        image: "",
        textura: {}
      };
    },
    methods: {
      crear_textura() {
        const textura = {
          nombre: this.txt_nombreTextura,
          url: this.image
        };

        this.$store.dispatch("crear_textura", textura);
      },
      getUploadedFile(e) {
        this.image = e;
      },
      abrirModalTextura(textura) {
        this.textura = textura;
        this.dialog_pruebaTextura = true;
      }
    },
    computed: {
      texturas() {
        return this.$store.getters.texturas;
      }
    },
    created() {
      this.$store.dispatch("cargar_texturas");
    }
  };

</script>
