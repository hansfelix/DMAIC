<template>
  <v-slide-y-transition mode="out-in">         
     <v-container fluid  grid-list-lg>

      <v-layout row align-center wrap>
        <!-- BreadCumb -->
        <v-flex xs12>
        <v-breadcrumbs>
            <v-icon slot="divider">chevron_right</v-icon>
            <v-breadcrumbs-item 
              v-for="item in itemsBreadCumb" :key="item.text"
              :disabled="item.disabled" 
              :to="item.url"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-flex>

        <v-flex xs12 md9 align-center>
          <h1 display-3 class="tittle_H">Mediciones</h1>
          <p>Se listan las mediciones que tiene del proyecto <strong>{{pytActual.cr}} - {{pytActual.nombrePyt}} </strong>, para añadir una nueva medición de click en el botón <strong>AÑADIR MEDICIÓN</strong>:</p>
          <v-spacer></v-spacer>              
        </v-flex>
        <v-flex xs12 md3 class="text-xs-center text-md-right">
          <v-btn color="secondary" dark @click.stop="dialog = true" >                   
            Añadir Medición
          <v-icon right dark>queue</v-icon></v-btn>
        </v-flex>
      </v-layout>

           <!-- dialog New Medicion -->
     
          <template fluid style="min-height: 0;" grid-list-lg>
            <v-layout row justify-center>
              <v-dialog v-model="dialog"  max-width="500px">
                <form @submit.prevent="onCreateMedicion">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Nueva Medición</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 md12>
                            <v-text-field label="Nombre del proceso" id="txt_nombreProceso" v-model="txt_nombreProceso" hint="Ej: Armado de gaviones" required></v-text-field>
                          </v-flex>
                          
                          <v-flex xs12 md12>
                            <!-- <v-text-field label="Nombre del proceso" id="txt_nombreProceso" v-model="txt_nombreProceso" hint="Ej: Carta de Balance" required></v-text-field> -->
                             <v-select
                              v-bind:items="itemsHerramientaUsada"
                              v-model="txt_herramientaUsada"
                              label="Herramienta usada"
                              single-line
                              bottom
                            ></v-select>
                          </v-flex>
                           <v-flex xs12 md6>
                            <v-text-field label="Ingeniero de Campo" id="txt_ingenieroCampo" v-model="txt_ingenieroCampo" hint="Ej: Ing. Jhonthan Barboza" required></v-text-field>
                          </v-flex>
                           <v-flex xs12 md6>
                            <v-text-field label="Jefe de Grupo" id="txt_jefeGrupo" v-model="txt_jefeGrupo" hint="Ej: Seiko Yong" required></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*Campos obligatorios</small>
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


             <!-- dialog Generar Reporte -->     
          <template fluid style="min-height: 0;" grid-list-lg>
            <v-layout row justify-center>
              <v-dialog v-model="dialog_generarReporte"  max-width="500px">
                <form @submit.prevent="onCalcularData">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Generar Reporte</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 md12>
                             <v-select
                              v-bind:items="itemsTipoReporte"
                              v-model="txt_tipoReporte"
                              label="Tipo de Reporte"
                              single-line
                              bottom
                            ></v-select>
                          </v-flex>

                          <v-text-field label="HH" id="txt_idMedicion" v-model="txt_idMedicion" ></v-text-field>

                          <v-flex xs12 md6>
                            <v-text-field label="Metrados en m3" id="txt_metrados" v-model="txt_metrados" hint="Ej: 30" required></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field label="HH Real" id="txt_hhReal" v-model="txt_hhReal" hint="Ej: 50" required></v-text-field>
                          </v-flex>
                          
                           <v-flex xs12 md6>
                            <v-text-field label="Nro Obreros" id="txt_nroObreros" v-model="txt_nroObreros" hint="Ej: 2" required></v-text-field>
                          </v-flex>
                           <v-flex xs12 md6>
                            <v-text-field label="Ratio prev en hh/m3" id="txt_ratioPrevisto" v-model="txt_ratioPrevisto" hint="Ej: 6" required></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*Campos obligatorios</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click.native="dialog_generarReporte = false">Cerrar</v-btn>
                      <v-btn color="blue darken-1" flat @click.native="dialog_generarReporte = false" type="submit">Añadir</v-btn>
                    </v-card-actions>
                  </v-card>
                </form>
              </v-dialog>
            </v-layout>
          </template>


          <v-layout row align-center wrap>              
                <v-flex xs12 sm8 offset-sm2>

                <!-- progress -->
                <v-layout>
                    <v-flex s12 class="text-xs-center">               
                        <v-progress-linear 
                        v-bind:indeterminate="true"
                        v-if="loadingMediciones"
                        ></v-progress-linear>            
                    </v-flex>
                </v-layout>

                <!-- Lista de mediciones -->
                <v-card v-if="!loadingMediciones">
                    <v-list two-line subheader>
                      <!-- <v-subheader inset>Mediciones</v-subheader>
                      <v-divider inset></v-divider> -->
                      <v-list-tile v-for="medicion in mediciones" v-bind:key="medicion.id" avatar class="medicionItem">
                          <v-list-tile-avatar>
                            <v-icon v-bind:class="medicion.dashboard ? 'green lighten-1 white--text':'grey lighten-1 white--text'">{{ medicion.dashboard ? "assessment":"input" }}</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                          <v-list-tile-title>{{ medicion.nombreProceso }}</v-list-tile-title>
                          <v-list-tile-sub-title>{{ medicion.herramientaUsada }}</v-list-tile-sub-title>
                          </v-list-tile-content>

                          <!-- Toma de datos -->
                          <!-- <v-list-tile-action v-if="medicion.configurado">
                             <v-tooltip top>                              
                            <v-btn slot="activator" icon ripple :href="'https://dmaic-db196.firebaseapp.com/dmaic.html?cr='+ pytActual.id +'&medicion=' +medicion.id " target="blank">
                              <v-icon color="grey lighten-1">assignment</v-icon>
                          </v-btn>
                             <span>Toma de datos</span>
                            </v-tooltip>
                          </v-list-tile-action> -->

                          <!-- Ver reporte -->
                          <!-- <v-list-tile-action v-if="medicion.dashboard"> -->
                          <v-list-tile-action v-if="medicion.dashboard">
                             <v-tooltip top>
                                <v-btn slot="activator" icon ripple :to="'/Reporte/' +pytActual.id +'/' +medicion.id " >
                                  <v-icon color="grey lighten-1">insert_drive_file</v-icon>
                                </v-btn>
                                <span>Ver Reporte</span>
                            </v-tooltip>
                          </v-list-tile-action>

                          <!-- Generar Reporte
                          <v-list-tile-action v-if="medicion.tomaDatos">
                            <v-tooltip top>
                            <v-btn slot="activator" icon ripple  @click="openDialogGenerarReporte(medicion.id)" >
                              <v-icon color="grey lighten-1">insert_drive_file</v-icon>
                            </v-btn>
                            <span>Generar Reporte</span>
                            </v-tooltip>
                          </v-list-tile-action> -->
                          

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
import * as firebase from "firebase";

export default {
  data() {
    return {
      dialog_generarReporte: false,
      dialog: false,
      txt_herramientaUsada: "",
      txt_ingenieroCampo: "",
      txt_jefeGrupo: "",
      txt_nombreProceso: "",
      itemsHerramientaUsada: [
        { text: "Carta Balance" },
        { text: "Estudio de Tiempos" }
      ],
      txt_tipoReporte: "",
      txt_idMedicion: "",
      txt_metrados: "",
      txt_hhReal: "",
      txt_nroObreros: "",
      txt_ratioPrevisto: "",

      itemsTipoReporte: [{ text: "Manual" }, { text: "Automático" }],
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
    mediciones() {
      return this.$store.getters.mediciones;
    },
    pytActual() {
      return this.$store.getters.pytActual;
    },
    loadingMediciones() {
      return this.$store.getters.loading_mediciones;
    }
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
  destroyed(){
 console.log("se destruyo")
  },
  methods: {
    onCreateMedicion() {
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
          configurado:false
        }
      };
      this.$store.dispatch("createMedicion", payload);
      // this.$router.push("/proyectos");
    },
    openDialogGenerarReporte(idMedicion) {
      this.dialog_generarReporte = true;
      this.txt_idMedicion = idMedicion;
    },
    onCalcularData() {
      const payload = {
        idPyt: this.$route.params.idPyt,
        idMedicion: this.txt_idMedicion,
        reporte: {
          tipoReporte: this.txt_tipoReporte.text,
          ados: this.txt_metrados,
          hhReal: this.txt_hhReal,
          nroObreros: this.txt_nroObreros,
          ratioPrevisto: this.txt_ratioPrevisto
        }
      };
      console.log(
        this.$route.params.idPyt,
        this.txt_idMedicion,
        this.txt_tipoReporte.text,
        this.txt_metrados,
        this.txt_hhReal,
        this.txt_nroObreros,
        this.txt_ratioPrevisto
      );

      // var totalIntervaloHoras = ;

      var idPyt = this.$route.params.idPyt;
      var idMedicion = this.txt_idMedicion;
      //inputs
      var input_tipoReporte = this.txt_tipoReporte.text;
      var input_metrado = this.txt_metrados;
      var input_hhReal = this.txt_hhReal;
      var input_nroObreros = this.txt_nroObreros;
      var input_ratioPrevisto = this.txt_ratioPrevisto;

      this.$store.dispatch("createReporte", payload); //mover para abajo

      //OBREROS
      var arrayObreros = [];
      var arrayObrerosTP = [];
      var arrayObrerosTC = [];
      var arrayObrerosTNC = [];
      var arrayObrerosSuma = [];
      //percent
      var arrayObrerosPerTP = [];
      var arrayObrerosPerTC = [];
      var arrayObrerosPerTNC = [];

      //ACTIVIDADES
      var arrayActividades = [];
      var arrayActividadesTotal = [];
      var arrayActividadesColores = [];
      var contadorActividades = 0;
      //percent
      var arrayActividadesPercent = [];

      //TIPO DE ACTIVIDAD
      var arrayTipoActividad = ["TP", "TC", "TNC"];
      var arrayTipoActividad_color = ["#4251c1", "#42c02d", "#ec0000"];
      var arraytotalTipoActividad = [0, 0, 0];
      var totalTipoActividad = 0;
      //percent
      var arraytotalTipoActividadPercent = [0, 0, 0];

      firebase
        .database()
        .ref(
          "datos-proyecto/" +
            this.$route.params.idPyt +
            "/" +
            this.txt_idMedicion +
            "/datos"
        )
        .once("value")
        .then(data => {
          //==================================================
          //OBREROS
          //==================================================

          //var objRegistro = data.val();

          var arrayRegistro = Object.values(data.val());

          arrayRegistro.forEach(function(element) {
            var objRegistro = element;

            //1 Existe objRegistro.nombre? "nombre del obrero"
            // posicion del obrero , si no esta retorna -1
            var nombreObrero = objRegistro.obrero;
            var tipoActividad = objRegistro.tipoActividad;
            var posicion = arrayObreros.indexOf(nombreObrero);
            var nombreActividad = objRegistro.actividad;

            //No considerar si no se ha registrado una ctividad, considerar expandirlo hacia arriba
            if (nombreActividad != "") {
              //si no esta añadirlo al array y tener el index en el que se guardo
              if (posicion === -1) {
                posicion = arrayObreros.push(nombreObrero) - 1; // posicion deja de ser -1
                //añadir una nueva comuna con todos los valores 0 a los array
                arrayObrerosTP.push(0);
                arrayObrerosTC.push(0);
                arrayObrerosTNC.push(0);
                arrayObrerosSuma.push(0);
                arrayObrerosPerTP.push(0);
                arrayObrerosPerTC.push(0);
                arrayObrerosPerTNC.push(0);
              }

              //Verificar que tipo de actividad es ¿TNC, TP o TC?
              switch (tipoActividad) {
                case "TP":
                  arrayObrerosTP[posicion]++;
                  arrayObrerosSuma[posicion]++; // Siempre añadir a la suma
                  arraytotalTipoActividad[0]++;
                  totalTipoActividad++;
                  break;

                case "TC":
                  arrayObrerosTC[posicion]++;
                  arrayObrerosSuma[posicion]++; // Siempre añadir a la suma
                  arraytotalTipoActividad[1]++;
                  totalTipoActividad++;
                  break;

                case "TNC":
                  arrayObrerosTNC[posicion]++;
                  arrayObrerosSuma[posicion]++; // Siempre añadir a la suma
                  arraytotalTipoActividad[2]++;
                  totalTipoActividad++;
                  break;

                default:
                  break;
              }

              //actualizar porcentajes
              arrayObrerosPerTP[posicion] = (
                arrayObrerosTP[posicion] /
                arrayObrerosSuma[posicion] *
                100
              ).toFixed(2); //Calculo del porcentaje
              arrayObrerosPerTC[posicion] = (
                arrayObrerosTC[posicion] /
                arrayObrerosSuma[posicion] *
                100
              ).toFixed(2); //Calculo del porcentaje
              arrayObrerosPerTNC[posicion] = (
                arrayObrerosTNC[posicion] /
                arrayObrerosSuma[posicion] *
                100
              ).toFixed(2); //Calculo del porcentaje

              //TP
              arraytotalTipoActividadPercent[0] = (
                arraytotalTipoActividad[0] /
                totalTipoActividad *
                100
              ).toFixed(2);

              //TC
              arraytotalTipoActividadPercent[1] = (
                arraytotalTipoActividad[1] /
                totalTipoActividad *
                100
              ).toFixed(2);

              //TNC
              arraytotalTipoActividadPercent[2] = (
                arraytotalTipoActividad[2] /
                totalTipoActividad *
                100
              ).toFixed(2);

              console.log("Obreros:");
              console.log(arrayObreros);
              console.log(arrayObrerosTP);
              console.log(arrayObrerosTC);
              console.log(arrayObrerosTNC);
              console.log(arrayObrerosSuma);
              console.log("porcentaje:");
              console.log(arrayObrerosPerTP);
              console.log(arrayObrerosPerTC);
              console.log(arrayObrerosPerTNC);
              console.log("pie:");
              console.log(arrayTipoActividad);
              console.log(arraytotalTipoActividad);
              console.log(arraytotalTipoActividadPercent);
              console.log(arrayTipoActividad_color);

              //==================================================
              // ACTIVIDADES
              //==================================================

              //1 Existe objRegistro.actividad? "nombre de la actividad"
              // posicion de la actividad , si no esta retorna -1
              var posicionActividad = arrayActividades.indexOf(nombreActividad);

              //si no esta añadirlo al array y tener el index en el que se guardo
              if (posicionActividad === -1) {
                posicionActividad = arrayActividades.push(nombreActividad) - 1; // posicion deja de ser -1
                //añadir una nueva comuna con todos los valores 0 a los array
                arrayActividadesTotal.push(0);

                //Verificar que color le toca dependiendo de ¿TNC, TP o TC?
                switch (tipoActividad) {
                  case "TP":
                    arrayActividadesColores[posicionActividad] = "#4251c1"; // azul

                    break;
                  case "TC":
                    arrayActividadesColores[posicionActividad] = "#42c02d"; // verde

                    break;
                  case "TNC":
                    arrayActividadesColores[posicionActividad] = "#ec0000"; // Rojo

                    break;
                  default:
                    break;
                }
              }
              //Actualizar el contador de actividades
              arrayActividadesTotal[posicionActividad]++;
              contadorActividades++;

              //actualizar porcentajes
              for (var i = 0; i < arrayActividadesTotal.length; i += 1) {
                arrayActividadesPercent[i] = (
                  arrayActividadesTotal[i] /
                  contadorActividades *
                  100
                ).toFixed(2); //Calculo del porcentaje
              }

              console.log("Actividades:");
              console.log(arrayActividades);
              console.log(arrayActividadesTotal);
              console.log("porcentaje:");
              console.log(arrayActividadesPercent);
              console.log("colores:");
              console.log(arrayActividadesColores);
            }
          });

          //CALCULAR LOS DATOS DEL CUADRO DE RENDIMIENTO

          var intervalo = 20; //saacar de db;/////////////////////////
          var numeroObreros = arrayObreros.length;
          var TNCPercent = arraytotalTipoActividadPercent[2] / 100; //el 2 es el TNC

          //valores que iran al reporte
          var metrado = 0;
          var hhReal = 0;
          var hhSinTNC = 0;
          var hhMuestra = 0;
          var nroObreros = 0;
          var ratioReal = 0;
          var ratioSinTNC = 0;
          var ratioPrev = 0;

          if (input_tipoReporte === "Manual") {
            metrado = input_metrado;
            hhReal = input_hhReal;
            hhSinTNC = (hhReal * (1 - TNCPercent)).toFixed(2);;
            hhMuestra = intervalo * numeroObreros;
            nroObreros = input_nroObreros;
            ratioReal = (hhReal / metrado).toFixed(2);
            ratioSinTNC = (hhSinTNC / input_metrado).toFixed(2);;
            ratioPrev = input_ratioPrevisto;
          } else {
            //Automatica
            metrado = input_metrado;
            hhReal = intervalo * numeroObreros;
            hhSinTNC = (hhReal * (1 - TNCPercent)).toFixed(2);;
            nroObreros = numeroObreros;
            ratioReal = (hhReal / metrado).toFixed(2);
            ratioSinTNC = (hhSinTNC / metrado).toFixed(2);;
            ratioPrev = input_ratioPrevisto;
          }

          console.log(metrado);
          console.log(hhReal);
          console.log(hhSinTNC);
          console.log(hhMuestra);
          console.log(nroObreros);
          console.log(ratioReal);
          console.log(ratioSinTNC);
          console.log(ratioPrev);

          //Generar Reporte
          var reporte = {
            pieNGA: {
              arrayTipoActividad: arrayTipoActividad,
              arraytotalTipoActividad: arraytotalTipoActividad,
              arrayTipoActividad_color: arrayTipoActividad_color
            },
            barNGA: {
              arrayActividades: arrayActividades,
              arrayActividadesPercent: arrayActividadesPercent,
              arrayActividadesColores: arrayActividadesColores
            },
            cuadroResumen: {
              arrayObreros: arrayObreros,
              arrayObrerosPerTP: arrayObrerosPerTP,
              arrayObrerosPerTC: arrayObrerosPerTC,
              arrayObrerosPerTNC: arrayObrerosPerTNC,
              arrayObrerosSuma: arrayObrerosSuma
            },
            cuadroProductividad: {
              tipoReporte: input_tipoReporte,
              metrado: metrado,
              hhReal: hhReal,
              hhSinTNC: hhSinTNC,
              hhMuestra: hhMuestra,
              nroObreros: nroObreros,
              ratioReal: ratioReal,
              ratioSinTNC: ratioSinTNC,
              ratioPrev: ratioPrev
            }
          };

          const payload = {
            idPyt:idPyt,
            idMedicion: idMedicion,
            reporte: reporte
          };

          this.$store.dispatch("crear_reporte", payload);
        });
    }
  }
};
</script>

<style scoped>
.medicionItem{
 background-color: rgb(255, 255, 255);
 transition: .2s ease
}
.medicionItem:hover{
 background-color: rgb(241, 241, 241);
 transition: .2s ease
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
