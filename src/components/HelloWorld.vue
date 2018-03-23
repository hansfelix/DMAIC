<template>
    <v-container fluid grid-list-xl>
      <v-layout row wrap id="home">
        <v-flex xs12 sm9 class="flex_cont">
          <div class="tituloApp">
            <h1>Aplicativo DMAIC</h1>
            <h4>Versión 0.0.1 - alpha</h4>
          </div>
          <v-alert color="alert_info" icon="info" :value="true">
            El presente aplicativo tiene por objetivo brindar información relevante que contribuirá a mejorar la toma de datos para la
            generación de reportes y cartas d ebalance en los proyectos en los que participa Cosapi.
            <br>
            <br> Para mayo infromación, puede contactar a :
            <strong>
              <a href="mailto:jbarboza@cosapi.com.pe"> Ing. Jhonatan Barboza </a>
            </strong>
          </v-alert>

          <!-- Botones -->
          <v-layout row wrap class="container_bnt-bienvenida">
            <v-flex class="xs12 sm4 cont_bnt-bienvenida">
              <v-btn block color="primary" class="btn-bienvenida" to="Proyectos/">
                <v-icon left>domain</v-icon>
                Proyectos</v-btn>
            </v-flex>
            <v-flex class="xs12 sm4 cont_bnt-bienvenida">
              <v-btn block color="primary" class="btn-bienvenida" to="FAQ/">
                <v-icon left>info</v-icon>
                FAQ</v-btn>
            </v-flex>
            <v-flex class="xs12 sm4 cont_bnt-bienvenida">
              <v-btn block color="primary" class="btn-bienvenida" to="Profile/">
                <v-icon left>person</v-icon>
                mi perfil</v-btn>
            </v-flex>
          </v-layout>

          <!-- Novedades -->
          <br>
          <v-layout row>
            <v-flex>
              <h2>Novedades</h2>
              <p>Novedades acerca del aplicativo.</p>
            </v-flex>
            <v-flex text-xs-right>
              <v-btn icon>
                <v-icon>mode_edit</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
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
          <v-layout row>
            <v-flex>
              <h2>Recursos</h2>
              <p>Recursos útiles.</p>
            </v-flex>
            <v-flex text-xs-right>
              <v-btn icon>
                <v-icon>mode_edit</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>

          <v-card>
            <v-list three-line subheader v-if="ultimasModificaciones!= null">
              <v-divider></v-divider>
              <v-list-tile avatar ripple v-for="(ultimaModificacion,index) in ultimasModificaciones" :key="index" @click="">
                <v-list-tile-avatar>
                  <v-icon>description</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <!-- <v-list-tile-title>{{ultimaModificacion.accion}}</v-list-tile-title> -->
                  <v-list-tile-sub-title>{{ultimaModificacion.accion}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

            </v-list>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    ultimasModificaciones() {
      if(this.$store.getters.user != null){
        return this.$store.getters.user.ultimasModificaciones;
      }
      else{
        return [];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home.layout.row {
  align-items: baseline;
}

.tituloApp {
  margin: auto auto 15px auto;
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

.alert_info a {
  color: white;
}

.alert_info {
  background-color: #5ea8e3;
}
</style>
