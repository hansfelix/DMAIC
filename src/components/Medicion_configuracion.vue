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

            <!-- Header -->
            <v-flex xs12 md12 align-center>
              <h1 display-3 class="tittle_H">Definición</h1>
              <p>Se muestra la configuración que tiene la medición del proceso 
                <strong>"{{medicionActual.dataMedicionActual.nombreProceso}}"</strong> 
                en el proyecto <strong>{{pytActual.cr}} - {{pytActual.nombrePyt}} </strong>.
              </p>
            </v-flex>
          
           <!-- Card Datos Generales -->
            <v-flex xs6 justify-start>
               <v-card>
                 <v-toolbar dense color="white" class="elevation-0">
                    <v-toolbar-title>Datos Generales </v-toolbar-title>
                    <v-spacer></v-spacer>
                      <v-btn icon @click="dialogs.dialog_datosGenerales.show = true" >
                        <v-icon>edit</v-icon>
                      </v-btn>           
                  </v-toolbar>

                  <v-card-title primary-title>
                    <v-layout row wrap>    
                      
                      <v-flex xs6>
                        <p>Duración de la medición: {{medicionActual.dataMedicionActual.duracion}} seg.</p>
                      </v-flex>    

                       <!-- Dialog Datos Generales -->
                      <template>
                        <v-layout row justify-center>
                          <v-dialog v-model="dialogs.dialog_datosGenerales.show"  max-width="600px">                           
                            <v-card>
                              <v-card-title>
                                <span class="headline">Editar Datos</span>
                              </v-card-title>
                              <v-card-text>
                                <v-container grid-list-md>
                                  <v-layout wrap>
                                      <v-flex xs12>
                                          <v-text-field
                                          name="input-3"
                                          label="Ingrese la nueva duración del intervalo (en segundos)"
                                          v-model="duracion"
                                          ></v-text-field>                                                                             
                                      </v-flex>
                                      <v-flex xs12>
                                        <small>*Campos obligatorios</small>
                                      </v-flex>

                                  </v-layout>
                                </v-container>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="secondary" flat @click.native="dialogs.dialog_datosGenerales.show = false">Cancelar</v-btn>
                                <v-btn color="secondary" flat @click="actualizarDuracion()">Añadir obrero</v-btn> 
                              </v-card-actions>
                            </v-card>                            
                          </v-dialog>
                        </v-layout>
                      </template> 

                    </v-layout>
                  </v-card-title>
                </v-card>
              </v-flex>

              <br>
 
              <!-- Card Obreros --> 
              <v-flex xs6>
                <v-card>
                  <v-toolbar dense color="white" class="elevation-0">
                    <v-toolbar-title>Obreros </v-toolbar-title>
                    <v-spacer></v-spacer>                    
                    <v-btn icon @click="dialogs.dialog_obreros.show = true" >
                      <v-icon >add_circle</v-icon>
                    </v-btn>         
                  </v-toolbar>

                  <v-card-title primary-title>
                    <v-layout row wrap>

                        <v-flex xs12 v-if="obreros.length===0">
                          Aún no se ha registrado ningun obrero.
                        </v-flex>                      
                       
                        <v-flex v-if="!(obreros.length===0)">
                            <v-chip close text-color="grey darken-2" v-for="obrero in obreros" :key="obrero.id"  @input="borrarObrero(obrero.id)">
                            <v-avatar>
                                <v-icon>account_circle</v-icon>
                            </v-avatar>
                            {{obrero.dataObrero.nombre}}
                            </v-chip>
                        </v-flex>      

                        <!-- Dialog Obreros -->  
                        <template>
                          <v-layout row justify-center>
                            <v-dialog v-model="dialogs.dialog_obreros.show"  max-width="600px">                           
                              <v-card>
                                <v-card-title>
                                  <span class="headline">Nuevo Obrero</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                          <v-text-field
                                          name="txt_nombreObrero"
                                          label="Nombre del Obrero"
                                          value=""
                                          v-model="txt_nombreObrero"
                                          ></v-text-field>                                                                                   
                                        </v-flex>
                                        <v-flex xs12>
                                          <small>*Campos obligatorios</small>
                                        </v-flex>

                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="secondary" flat @click.native="dialogs.dialog_obreros.show = false">Cancelar</v-btn>
                                  <v-btn color="secondary" flat @click="anadirObrero()">Añadir obrero</v-btn> 
                                </v-card-actions>
                              </v-card>                            
                            </v-dialog>
                          </v-layout>
                        </template> 

                    </v-layout>
                  </v-card-title>
                </v-card>
            </v-flex>

            <br>

            <!-- Card Actividades --> 
            <v-flex xs12>
              <v-card>
                <v-toolbar dense color="white" class="elevation-0">
                <v-toolbar-title>Actividades</v-toolbar-title>
                <v-spacer></v-spacer>
                  <v-btn icon @click="dialogs.dialog_actividades.show=true" >
                    <v-icon >add_circle</v-icon>
                  </v-btn>           
                </v-toolbar>

                  <v-card-title primary-title>
                    <v-layout row wrap>   
                      
                        <v-flex xs12 v-if="actividades.length===0">
                          Aún no se ha registrado ninguna actividad.
                        </v-flex>
                      
                        <v-flex xs12 md4 v-if="!(actividades.length===0)">
                          <p>Actividades productivas (TP)</p>
                          <v-divider></v-divider><br>

                          <v-chip color="indigo" text-color="white" v-for="actividad in actividadesTP" :key="actividad.id">
                            <v-avatar>
                                <v-icon>bubble_chart</v-icon>
                            </v-avatar>
                            {{actividad.nombre}}
                            </v-chip>
                        </v-flex>

                        <v-flex xs12 md4 v-if="!(actividades.length===0)">
                          <p>Actividades contributorias (TC)</p>
                          <v-divider></v-divider><br>

                          <v-chip color="teal" text-color="white" v-for="actividad in actividadesTC" :key="actividad.id">
                            <v-avatar>
                                <v-icon>bubble_chart</v-icon>
                            </v-avatar>
                            {{actividad.nombre}}
                          </v-chip>
                        </v-flex>

                        <v-flex xs12 md4 v-if="!(actividades.length===0)">                            
                          <p>Actividades no contributorias (TNC)</p>
                          <v-divider></v-divider><br>

                          <v-chip color="red" text-color="white" v-for="actividad in actividadesTNC" :key="actividad.id">
                            <v-avatar>
                                <v-icon>bubble_chart</v-icon>
                            </v-avatar>
                            {{actividad.nombre}}
                            </v-chip>
                        </v-flex>

                        <!-- Dialog Actividades -->  
                        <template>
                          <v-layout row justify-center>
                            <v-dialog v-model="dialogs.dialog_actividades.show"  max-width="600px">                           
                              <v-card>
                                <v-card-title>
                                  <span class="headline">Añadir Actividad</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                          <v-text-field
                                            name="input-3"
                                            label="Nombre de la actividad"
                                            value=""
                                            v-model="dialogs.dialog_actividades.txt_nombreActividad"
                                          ></v-text-field>

                                          <v-text-field
                                            name="input-3"
                                            label="Abreviatura de la actividad"
                                            value=""
                                            v-model="dialogs.dialog_actividades.txt_abreviaturaActividad"
                                          ></v-text-field>

                                          <v-select
                                            :items="dialogs.dialog_actividades.itemsActividad"
                                            v-model="dialogs.dialog_actividades.txt_tipoActividad"
                                            label="Tipo de la actividad"
                                            single-line
                                            bottom
                                          ></v-select>                                                                                
                                        </v-flex>
                                        <v-flex xs12>
                                          <small>*Campos obligatorios</small>
                                        </v-flex>
                                    </v-layout>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="secondary" flat @click.native="dialogs.dialog_actividades.show = false">Cancelar</v-btn>
                                  <v-btn color="secondary" flat @click="anadirActividad()">Añadir actividad</v-btn> 
                                </v-card-actions>
                              </v-card>                            
                            </v-dialog>
                          </v-layout>
                        </template> 

                    </v-layout>
                  </v-card-title>
                </v-card>
              </v-flex>

              <v-flex xs12 md9 align-center>
                <h1 display-3 class="tittle_H">Toma de datos</h1>
                <p>Dé click en el botón de abajo para iniciar la toma de datos.</p>
                <v-spacer></v-spacer>      
                <v-btn ripple color="primary" :to="'/TomaDatos/' +pytActual.id +'/' +medicionActual.id" >
                    Iniciar toma de datos
                  <v-icon right dark>update</v-icon>
                </v-btn>
              </v-flex>

             <v-flex xs12 md9 align-center>
            <h1 display-3 class="tittle_H">Generar Reporte</h1>
            <p>Dé click en el botón de abajo para generar/ver el reporte.</p>
            <v-spacer></v-spacer>    

            <v-btn ripple color="primary" @click="openDialogGenerarReporte(medicionActual.id)">
            Generar reporte
            </v-btn>

             <v-btn ripple color="primary" :to="'/Reporte/' +pytActual.id +'/' +medicionActual.id ">
            Ver reporte
            </v-btn> 
            
            </v-flex>



      </v-layout>

      

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
<!-- 
                          <v-text-field label="HH" id="txt_idMedicion" v-model="txt_idMedicion" v-if="false"></v-text-field> -->

                          <v-flex xs12 md6>
                            <v-text-field label="Metrados en m3" id="txt_metrados" v-model="txt_metrados" hint="Ej: 30" required></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6 v-if="txt_tipoReporte.text ==='Manual'">
                            <v-text-field label="HH Real" id="txt_hhReal" v-model="txt_hhReal" hint="Ej: 50" required></v-text-field>
                          </v-flex>
                          
                           <v-flex xs12 md6 v-if="txt_tipoReporte.text ==='Manual'">
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
     </v-container>

  </v-slide-y-transition>
</template>



<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      dialogs: {
        dialog_datosGenerales: {
          show: false
        },
        dialog_obreros: {
          show: false
        },
        dialog_actividades: {
          show: false,
          txt_nombreActividad: "",
          txt_abreviaturaActividad: "",
          txt_tipoActividad: "",
          itemsActividad: [{ text: "TC" }, { text: "TP" }, { text: "TNC" }]
        }
      },
      showanadirActividad: false,
      showanadirObrero: false,
      showEditarDatosMedicion: false,
      duracion: "",
      txt_nombreObrero: "",

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
      txt_tipoReporte: {
        text: "Automático"
      },
      txt_idMedicion: "",
      txt_metrados: "",
      txt_hhReal: "",
      txt_nroObreros: "",
      txt_ratioPrevisto: "",
      itemsTipoReporte: [{ text: "Manual" }, { text: "Automático" }],
      //
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
          disabled: false,
          url: "/"
        },
        {
          text: "Configuración",
          disabled: true,
          url: "/"
        }
      ]
    };
  },
  computed: {
    obreros() {
      return this.$store.getters.obreros;
    },
    medicionActual() {
      return this.$store.getters.medicionActual;
    },
    pytActual() {
      return this.$store.getters.pytActual;
    },
    actividades() {
      return this.$store.getters.actividades;
    },
    actividadesTP() {
      return this.$store.getters.actividadesTP;
    },
    actividadesTC() {
      return this.$store.getters.actividadesTC;
    },
    actividadesTNC() {
      return this.$store.getters.actividadesTNC;
    }
  },
  methods: {
    completarConfiguracion() {
      const obj = {
        idPyt: this.$store.state.pytActual.id,
        idMedicion: this.$store.getters.medicionActual.id
      };
      this.$store.dispatch("actualizar_medicion_configurado", obj);
    },
    anadirObrero() {
      const obj = {
        idPyt: this.pytActual.id,
        idMedicion: this.medicionActual.id,
        obrero: {
          nombre: this.txt_nombreObrero
        }
      };
      this.$store.dispatch("crear_obrero", obj);
      this.dialogs.dialog_obreros.show = false;
    },
    borrarObrero(idObrero) {
      const obj = {
        idPyt: this.pytActual.id,
        idMedicion: this.medicionActual.id,
        obrero: {
          idObrero: idObrero
        }
      };
      this.$store.dispatch("borrar_obrero", obj);
    },
    anadirActividad() {
      const obj = {
        idPyt: this.pytActual.id,
        idMedicion: this.medicionActual.id,
        actividad: {
          nombre: this.dialogs.dialog_actividades.txt_nombreActividad,
          TipoActividad: this.dialogs.dialog_actividades.txt_tipoActividad.text,
          abreviatura: this.dialogs.dialog_actividades.txt_abreviaturaActividad
        }
      };

      this.$store.dispatch("crear_actividad", obj);
      this.dialogs.dialog_actividades.show = false;

      //blanquear models
      this.dialogs.dialog_actividades.txt_nombreActividad = "";
      this.dialogs.dialog_actividades.txt_tipoActividad = "";
      this.dialogs.dialog_actividades.txt_abreviaturaActividad = "";
    },
    actualizarDuracion() {
      const payload = {
        idPyt: this.$route.params.idPyt,
        idMedicion: this.$route.params.idMedicion,
        nuevaDuracion: this.duracion
      };
      this.$store.dispatch("actualizarDuracion", payload);
      this.dialogs.dialog_datosGenerales.show = false;
    },
    openDialogGenerarReporte(idMedicion) {
      const payload = {
        idPyt: this.$route.params.idPyt,
        idMedicion: this.$route.params.idMedicion,
        nuevaDuracion: this.duracion
      };

      this.dialog_generarReporte = true;
      this.$store.dispatch("loadMedicionActual", payload);
      // this.txt_idMedicion = idMedicion;
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
      var idMedicion = this.medicionActual.id;
      var totalIntervaloHoras = this.medicionActual.dataMedicionActual
        .totalIntervaloHoras;

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
            idMedicion +
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

          var intervalo = totalIntervaloHoras; //saacar de db;/////////////////////////
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
            hhSinTNC = (hhReal * (1 - TNCPercent)).toFixed(2);
            hhMuestra = (intervalo * numeroObreros).toFixed(2);
            nroObreros = input_nroObreros;
            ratioReal = (hhReal / metrado).toFixed(2);
            ratioSinTNC = (hhSinTNC / input_metrado).toFixed(2);
            ratioPrev = input_ratioPrevisto;
          } else {
            //Automatica
            metrado = input_metrado;
            hhReal = intervalo * numeroObreros;
            hhSinTNC = (hhReal * (1 - TNCPercent)).toFixed(2);
            nroObreros = numeroObreros;
            ratioReal = (hhReal / metrado).toFixed(2);
            ratioSinTNC = (hhSinTNC / metrado).toFixed(2);
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
            idPyt: idPyt,
            idMedicion: idMedicion,
            reporte: reporte
          };

          this.$store.dispatch("crear_reporte", payload);

          const payload2 = {
            idPyt: idPyt,
            idMedicion: idMedicion,
            dashboard: true
          };

          this.$store.dispatch("actualizar_medicion_dashboard", payload2);
        });
    }
  },
  created() {
    const payload = {
      idPyt: this.$route.params.idPyt,
      idMedicion: this.$route.params.idMedicion
    };
    this.$store.dispatch("loadMedicionActual", payload).then(() => {
      // console.log(this.$store.state.medicionActual.dataMedicionActual.duracion)
    });

    this.$store.dispatch("loadObreros", payload);

    this.$store.dispatch("cargar_actividades", payload);
    //llenar la duración
    //this.duracion = this.$store.state.medicionActual.dataMedicionActual.duracion;
  }
};
</script>



<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
