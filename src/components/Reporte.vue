<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid>

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

        <!-- procesos -->
        <template>
          <v-tabs left>
            <v-tabs-bar>
              <v-tabs-slider></v-tabs-slider>
              <v-tabs-item href="#tab-1">
                REPORTE
              </v-tabs-item>
              <v-tabs-item href="#tab-2">
                CARTA BALANCE
              </v-tabs-item>
              <v-tabs-item href="#tab-3">
                DATOS
              </v-tabs-item>

            </v-tabs-bar>
            <!-- CONTENIDO TABS -->
            <v-tabs-items>

              <!-- TAB REPORTE -->
              <v-tabs-content id="tab-1">
                <v-card flat v-if="!loadingReporte">
                  <v-card-text row>

                    <!-- REPORTE -->
                    <!-- <v-flex xs12 class="text-xs-center text-md-right">
                        <v-btn color="primary" dark @click="descargarReporte()" >                   
                          Descargar Reporte
                        <v-icon right dark>queue</v-icon></v-btn>
                      </v-flex> -->

                    <v-flex xs12>
                      <v-container fluid>
                        <v-layout column>
                          <table class="tablaCabecera elevation-1" cellspacing="0" id="elementoPDF">
                            <tbody>
                              <tr>
                                <td class="tablaCabecera_Logo" style="width: 20%">
                                  <img src="http://solinac.pe/assets/_img/_logo/09.jpg" alt="" style="height: 80px" class="responsive-img">
                                </td>
                                <td colspan="4" style="width: 80%" class="bold">GERENCIA DE GESTIÓN DE OPERACIONES CONTROL DE PROYECTOS - PRODUCTIVIDAD</td>
                              </tr>
                              <tr>
                                <td colspan="2" style="width: 40%" class="bold">FORMATO PARA MEJORA DE PROCESOS CON LA METODOLOGÍA DMAIC</td>
                                <td style="width: 20%">Código: IT-PRD-01-F1</td>
                                <td style="width: 20%">Revisión: 1</td>
                                <td style="width: 20%">Página: 1 de 1</td>
                              </tr>
                            </tbody>
                          </table>
                        </v-layout>
                      </v-container>
                    </v-flex>



                    <v-flex xs12>
                      <v-container fluid>
                        <v-layout column>
                          <table class="tablaCabecera elevation-1" cellspacing="0">
                            <tbody>
                              <tr>
                                <td colspan="2" class="bold cyancell">MEDIR</td>
                              </tr>
                              <tr>
                                <td class="bold greycell">Proyecto</td>
                                <td>{{proyectoActual.nombrePyt}}</td>
                              </tr>
                              <tr>
                                <td class="bold greycell">Proceso</td>
                                <td>{{procesoActual.dataprocesoActual.nombreProceso}}</td>
                              </tr>
                              <tr>
                                <td class="bold greycell">Herramienta Usada</td>
                                <td>{{procesoActual.dataprocesoActual.herramientaUsada}}</td>
                              </tr>
                              <tr>
                                <td class="bold greycell">Fecha de Medición</td>
                                <td>{{procesoActual.dataprocesoActual.fecha}}</td>
                              </tr>
                              <tr>
                                <td class="bold greycell">Ingeniero de Campo</td>
                                <td>{{procesoActual.dataprocesoActual.ingenieroCampo}}</td>
                              </tr>
                              <tr>
                                <td class="bold greycell">Jefe de Grupo</td>
                                <td>{{procesoActual.dataprocesoActual.jefeGrupo}}</td>
                              </tr>
                            </tbody>
                          </table>
                        </v-layout>
                      </v-container>
                    </v-flex>

                    <br>


                    <v-layout row wrap>

                      <!-- Chart PIE NGA -->
                      <v-flex xs6 class="mh200">
                        <v-container fluid>
                          <v-layout column>
                            <h3>DISTRIBUCIÓN NGA</h3>
                            <br>
                            <NgaPieChart :options="options" :data="dataPie" class="containerGraph" :height="200" />
                          </v-layout>
                        </v-container>
                      </v-flex>

                      <!-- Chart BAR NGA -->
                      <v-flex xs6 class="mh200">
                        <v-container fluid>
                          <v-layout column>
                            <h3>GRÁFICO DE DISTRIBUCIÓN DEL TIEMPO</h3>
                            <br>
                            <NgaBarChart :options="options" :data="{
                    labels: reporte.barNGA.arrayActividades,
                    datasets: [
                      {
                        backgroundColor: reporte.barNGA
                          .arrayActividadesColores,
                        data: reporte.barNGA.arrayActividadesPercent
                      }
                    ]
                  }" class="containerGraph" :height="200" />
                          </v-layout>
                        </v-container>
                      </v-flex>

                      <!-- Cuadro Rendimiento -->

                      <v-flex xs12>

                        <v-container fluid>
                          <v-layout column>
                            <br>
                            <h3>CUADRO RENDIMIENTO</h3>
                            <br>
                            <div class="rowCuadro">
                              <div class="bold cell greycell">Tipo</div>
                              <div v-for="item in reporte.cuadroResumen.arrayObreros" :key="item" class="cell">
                                {{item}}
                              </div>
                            </div>

                            <div class="rowCuadro">
                              <div class="bold cell greycell">TC</div>
                              <div v-for="item in reporte.cuadroResumen.arrayObrerosPerTC" :key="item" class="cell">
                                {{item}} %
                              </div>
                            </div>

                            <div class="rowCuadro">
                              <div class="bold cell greycell">TNC</div>
                              <div v-for="item in reporte.cuadroResumen.arrayObrerosPerTNC" :key="item" class="cell">
                                {{item}} %
                              </div>
                            </div>

                            <div class="rowCuadro">
                              <div class="bold cell greycell">TP</div>
                              <div v-for="item in reporte.cuadroResumen.arrayObrerosPerTP" :key="item" class="cell">
                                {{item}} %
                              </div>
                            </div>

                            <div class="rowCuadro">
                              <div class="bold cell greycell">HH</div>
                              <div v-for="item in reporte.cuadroResumen.arrayObrerosSuma" :key="item" class="cell">
                                {{item}}
                              </div>
                            </div>

                          </v-layout>
                        </v-container>
                      </v-flex>


                      <!-- Cuadro Prouccion -->
                      <v-flex xs6>
                        <v-container fluid>
                          <v-layout column>
                            <br>
                            <h3>CUADRO PRODUCCIÓN ({{reporte.cuadroProductividad.tipoReporte}})</h3>
                            <br>

                            <table class="tablaCabecera elevation-1" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td class="bold greycell">Metrado</td>
                                  <td>{{reporte.cuadroProductividad.metrado}} m
                                    <sup>3</sup>
                                  </td>
                                  <td class="bold greycell">Ratio Real</td>
                                  <td>{{reporte.cuadroProductividad.ratioReal}} hh/m
                                    <sup>3</sup>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="bold greycell">HH Real</td>
                                  <td>{{reporte.cuadroProductividad.hhReal}} hh</td>
                                  <td class="bold greycell">Ratio sin TNC</td>
                                  <td>{{reporte.cuadroProductividad.ratioSinTNC}} hh/m
                                    <sup>3</sup>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="bold greycell">HH sin TNC</td>
                                  <td>{{reporte.cuadroProductividad.ratioSinTNC}} hh</td>
                                  <td class="bold greycell">Ratio Prev</td>
                                  <td>{{reporte.cuadroProductividad.ratioPrev}} hh/m
                                    <sup>3</sup>
                                  </td>
                                </tr>
                                <tr v-if="reporte.cuadroProductividad.tipoReporte ==='Manual'">
                                  <td class="bold greycell">HH Muestra</td>
                                  <td>{{reporte.cuadroProductividad.hhMuestra}} hh</td>
                                </tr>
                                <tr>
                                  <td class="bold greycell">Nro. Obreos</td>
                                  <td>{{reporte.cuadroProductividad.nroObreros}}</td>
                                </tr>
                              </tbody>
                            </table>
                          </v-layout>
                        </v-container>
                      </v-flex>

                      <v-flex x6>
                        <v-container fluid>
                          <v-layout column>
                            <br>
                            <h3>NOTAS
                              <v-btn flat icon color="pink" @click="abrirDialogNota()">
                                <v-icon>favorite</v-icon>
                              </v-btn>
                            </h3>
                            <br>
                            <blockquote>
                              {{reporte.nota}}
                            </blockquote>
                          </v-layout>
                        </v-container>
                      </v-flex>



                      <!-- dialog NOTA -->
                      <v-dialog v-model="dialog" max-width="320px">
                        <v-card>
                          <v-card-title class="headline">Editar nota</v-card-title>
                          <!-- <v-card-text>Ingrese la nota del reporte.</v-card-text> -->
                          <v-flex xs12>
                            <v-text-field box multi-line v-model="txt_nota" label="Nota"></v-text-field>
                          </v-flex>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">CANCELAR</v-btn>
                            <v-btn color="green darken-1" flat="flat" @click.native="actualizarNota()">GUARDAR</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-layout>
                  </v-card-text>
                </v-card>

              </v-tabs-content>

              <v-tabs-content id="tab-2">
                <v-layout row wrap>
                  <v-flex xs12>
                    <div v-for='(tomaDato,key) in tomaDatosActual_modificado' :key="key" class="rowCuadro_cartaBalance">
                      <div class="bold cell_cartaBalance greycell">
                        {{key}}
                      </div>
                      <div v-for='element in tomaDato' :key="element" :class="'cell_cartaBalance '+element.actividad "> </div>
                    </div>
                    <div class="rowCuadro_cartaBalance">
                      <div class="bold cell_cartaBalance_obrero"></div>
                      <div v-for="item in reporte.cuadroResumen.arrayObreros" :key="item" :class="'cell_cartaBalance cell_cartaBalance_obrero'">
                        {{item}}
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-tabs-content>

              <v-tabs-content id="tab-3">
                <v-layout row wrap>
                  <v-flex xs12>
                    <div class="rowCuadro">
                      <div class="bold cell greycell">Obrero</div>
                      <div v-for="item in reporte.cuadroResumen.arrayObreros" :key="item" class="cell">
                        {{item}}
                      </div>
                    </div>
                    <div v-for='(tomaDato,index) in tomaDatosActual_modificado' :key="index" class="rowCuadro">
                      <div class="bold cell greycell">
                        {{index}}
                      </div>
                      <div v-for='element in tomaDato' :key="element" class="cell">
                        {{ element.actividad}}
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-tabs-content>
            </v-tabs-items>
          </v-tabs>
        </template>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>


<script>
import NgaPieChart from "../Charts/NgaPieChart";
import NgaBarChart from "../Charts/NgaBarChart";
import {} from "../pdf/html2pdf.bundle.min";
export default {
  components: {
    NgaPieChart,
    NgaBarChart
  },
  data() {
    return {
      // BreadCumbs
      dialog: false,
      txt_nota: "",
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
      ],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Calories",
          value: "valor"
        }
      ],
      items: this.$store.getters.reporteTablaMedir,

      options: {}
    };
  },
  computed: {
    proyectoActual() {
      return this.$store.getters.proyectoActual;
    },
    reporte() {
      return this.$store.getters.reporte;
    },
    loadingReporte() {
      return this.$store.getters.LoadingReporte;
    },
    procesoActual() {
      return this.$store.getters.procesoActual;
    },
    tomaDatosActual() {
      return this.$store.getters.tomaDatosActual;
    },
    
    tomaDatosActual_modificado() {
      let arrayTomaDatos = [];
      let result = [];

      arrayTomaDatos = this.$store.getters.tomaDatosActual;

      //en una primera instancia el array es nulo, hasta que termine de cargar los datos del reporte
      if (arrayTomaDatos.length) {
        result = arrayTomaDatos.reduce(function(r, a) {
          r[a.hora] = r[a.hora] || [];
          r[a.hora].push(a);
          return r;
        }, Object.create(null));
      }

      return result;

      console.log("tomaDatosActual_modificado es : " + result);
    },

  
    //BORRAAAAAAAAAAAR
    dataPie() {
      return this.$store.getters.dataPie;
    },
    dataBar() {
      return {
        labels: this.$store.getters.reporte.barNGA.arrayActividades,
        datasets: [
          {
            backgroundColor: this.$store.getters.reporte.barNGA
              .arrayActividadesColores,
            data: this.$store.getters.reporte.barNGA.arrayActividadesPercent
          }
        ]
      };
    }
  },
  methods: {
    descargarReporte() {
      // var element = document.getElementById("elementoPDF");
      // html2pdf(element, {
      //   margin: 1,
      //   filename: "myfile.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { dpi: 192, letterRendering: true },
      //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      // });
    },
    abrirDialogNota() {
      this.dialog = true;
      this.txt_nota = this.reporte.nota;
    },
    actualizarNota() {
      const payload = {
        proyecto_uid: this.$route.params.proyecto_uid,
        idproceso: this.$route.params.idproceso,
        nota: this.txt_nota
      };
      this.$store.dispatch("actualizar_reporte_nota", payload);
      this.dialog = false;
    }
  },

  created() {
    const payload = {
      proyecto_uid: this.$route.params.proyecto_uid,
      idproceso: this.$route.params.idproceso,
      idTomaDatos: this.$route.params.idTomaDatos
    };
    this.$store.dispatch("cargar_reporte", payload);
    this.$store.dispatch("loadprocesoActual", payload);
    this.$store.dispatch("cargar_tomaDatosActual", payload);
  }
};
</script>

<style>
.mh200 {
}

.greycell {
  background-color: #f5f5f5;
}

.cyancell {
  background-color: #b5cfff;
}

.rowCuadro {
  /* height: 55px; */
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(70px, 1fr);
}

.containerGraph {
  width: 100%;
  padding: 0px 40px;
}

.tablaCabecera td,
.cell {
  padding: 5px;
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  color: #3f4144;
  text-align: center;
  /* background-color: white; */
}

.tablaCabecera {
  width: 100%;
}

.bold {
  font-weight: bold;
}

.rowCuadro_cartaBalance {
  /* height: 55px; */
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(70px, 1fr);
}

.cell_cartaBalance {
  padding: 5px;
  /* border: 0.5px solid rgba(0, 0, 0, 0.12); */
  color: #3f4144;
  text-align: center;
  margin: 0 15px;
  /* background-color: white; */
}

.cell_cartaBalance_obrero {
  margin: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
}

.RL {
  background-image: url("https://1.bp.blogspot.com/-J-PT7yxd4gM/U7g1b0YdHZI/AAAAAAAAGaA/_o83vZXouBs/s1600/striped-fabric-pattern.jpg");
}

.M {
  background-image: url("https://4.bp.blogspot.com/-WjdfVcDAuv4/U_Bm-bWHcuI/AAAAAAAAGdk/jHkG35om5uA/s1600/gray-textile-background.jpg");
}

.TB {
  background-image: url("http://www.goaleisure.com/blog/wp-content/uploads/2016/08/corner-pattern-background-light-grey-color-squared-90-degrees-lines-seamless-wallpaper-texture.jpg");
}

.R {
  background-image: url("https://s-media-cache-ak0.pinimg.com/originals/ce/41/06/ce4106d3c0d4b0573b4b2917cf7a0c5e.jpg");
}

.P {
  background-image: url("https://1.bp.blogspot.com/-fk69YKLvVz0/UYFGiUnWTCI/AAAAAAAAFK0/u3FvFC4fKWY/s1600/wide-stripe-wallpaper-seamless-pattern.jpg");
}

.f {
  background-image: url("https://2.bp.blogspot.com/-EMxv2y0VND0/V31zB1ujaCI/AAAAAAAAG_Y/NcSp76GGbzczPTihK-1XU5CWxHfKK4tSgCLcB/s1600/seamless-vector-with-faded-diagonal-stripes.jpg");
}
</style>
