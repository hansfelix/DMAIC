<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid >
      <v-layout row align-center>
        <v-flex xs12 sm9>

          <h1>Información del DMAIC</h1>
          <v-alert outline color="info" icon="info" :value="true">
            El presente aplicativo tiene por objetivo brindar información relevante que contribuirá a mejorar la toma de datos
            para la gneración de reportes y cartas d ebalance en los proyectos en los que participa Cosapi.
          </v-alert>
        </v-flex>

        <v-flex xs12 sm3>
        </v-flex>
        <!-- <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;Programar es un arte.&#8221;
          <footer>
            <small>
              <em>&mdash;Hans Felix</em>
            </small>
          </footer>
        </blockquote> -->
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
