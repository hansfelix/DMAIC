<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 sm9 class="flex_cont">
          <div class="tituloApp">
            <h1>Aplicativo DMAIC</h1>
            <h4>Versión 0.0.1 - alpha</h4>
          </div>
          <v-alert outline color="info" icon="info" :value="true">
            El presente aplicativo tiene por objetivo brindar información relevante que contribuirá a mejorar la toma de datos para la
            generación de reportes y cartas d ebalance en los proyectos en los que participa Cosapi.
          </v-alert>

          <!-- Botones -->
          <v-layout row wrap class="container_bnt-bienvenida">
            <v-flex class="xs12 sm4 cont_bnt-bienvenida">
              <v-btn block color="primary" class="btn-bienvenida">Proyectos</v-btn>
            </v-flex>
            <v-flex class="xs12 sm4 cont_bnt-bienvenida">
              <v-btn block color="primary" class="btn-bienvenida">FAQ</v-btn>
            </v-flex>
            <v-flex class="xs12 sm4 cont_bnt-bienvenida">
              <v-btn block color="primary" class="btn-bienvenida">mi perfil</v-btn>
            </v-flex>
          </v-layout>

          <!-- Recursos -->
          <h2>Novedades</h2>
          <p>Novedades acerca del aplicativo.</p>
          <v-card>
            <v-list three-line subheader>

              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Nueva versión 0.0.2 aplha</v-list-tile-title>
                  <v-list-tile-sub-title>Nueva versión por lanzar el día de hoy 27/02/2018.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Nuevas pruebas</v-list-tile-title>
                  <v-list-tile-sub-title>Nuevas pruebas programadas para hoy 27/02/2018.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>

        </v-flex>
        <v-flex xs12 sm3 class="flex_cont">
          <!-- Recursos -->
          <h2>Recursos</h2>
          <p>Recursos útiles relacionados al aplicativo.</p>
          <v-card>
            <v-list three-line subheader>
              <v-divider></v-divider>
              <v-list-tile avatar ripple @click="toggle(index)">
                <v-list-tile-avatar>
                  <v-icon>description</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>2. Formato DMAIC</v-list-tile-title>
                  <v-list-tile-sub-title>Formato adjunto de ayuda.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

            </v-list>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout.row {
    align-items: baseline;
  }

  .tituloApp {
    margin: 15px auto;
  }

  .btn-bienvenida {
    height: 100px;
  }

  .container_bnt-bienvenida {
    margin: auto -10px;
  }

  .cont_bnt-bienvenida {
    padding: 10px;
  }

  h1,
  h2 {
    font-weight: normal;
  }



  a {
    color: #42b983;
  }

</style>
