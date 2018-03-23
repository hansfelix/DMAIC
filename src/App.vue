<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed
      app v-if="this.autenticado">
      <v-layout class="text-xs-center background_navigationDrawer" align-end justify-end>
        <v-toolbar flat class="transparent" align-end justify-end>
          <v-list class="pa-0 transparent " align-end justify-end>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="user.foto" class="avatar_navigationDrawer elevation-3" />
              </v-list-tile-avatar>
              <v-list-tile-content>
                <h4>{{user.nombre}}</h4>
                <v-list-tile-title class="navDrawer_email">
                  <small>{{user.correo}}</small>
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
      </v-layout>

      <!-- MENÚ -->
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in menuItems" :key="i" v-bind:to="item.url">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <!-- MENÚ ADMINISTADOR -->
      <v-divider v-if="this.user.administrador"></v-divider>
      <v-subheader v-if="this.user.administrador">Admin</v-subheader>
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in itemsAdminstrador" :key="i" v-bind:to="item.url">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <!-- ToolBar -->
    <v-toolbar app :clipped-left="clipped" dark color="primary" v-if="this.autenticado">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="onLogout">Log OUT</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- contenido -->
    <v-content>
  <v-slide-y-transition mode="out-in">
      <router-view/>
  </v-slide-y-transition>
    </v-content>

    <!-- FOOTER -->
    <v-footer :fixed="fixed" app>
      <span>&copy; COSAPI 2018
        <small>- DERECHOS RESERVADOS</small>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "DMAIC"
    };
  },
  name: "App",
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/LogIn");
    }
  },
  computed: {
    itemsAdminstrador() {
      let menuItems = [];
      if (this.user.administrador) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "Usuarios",
            url: "/Usuarios"
          },
          {
            icon: "settings",
            title: "Configuración",
            url: "/Configuracion"
          }
        ];
      }
      return menuItems;
    },
    // getters importados de vuex
    ...mapGetters(["menuItems", "user", "autenticado"])
  },

  watch: {
    user(val) {
      if (val != undefined) {
        const user = val;
        const uid = user.id; // uid del usuario
        const administrador = user.administrador; // true o false

        if (administrador) {
          //Si es administrador carga todo los proyectos
          this.$store.dispatch("cargar_proyectos");
        } else {
          //Si no es administrador solo carga lo filtrado por el id
          this.$store.dispatch("cargar_proyectosByUid", user.id);
        }
      }
    }
  },
  created() {
    this.$store.commit("set_proyectos", []);
  }
};
</script>

<style>
h1,
h2 {
  font-weight: normal;
}

.navDrawer_email {
  margin-top: -4px;
}

.tittle_H {
  margin-bottom: 10px;
}

.img_background_navigationDrawer {
  height: auto;
  width: 100%;
}

.background_navigationDrawer {
  background-image: url("./assets/background_navigationDrawer.jpg");
  min-height: 158px;
}

.avatar_navigationDrawer {
  /* border: 1px solid white */
}

.list__tile--active {
  background-color: whitesmoke;
}

::selection {
  background: #ffb7b7; /* WebKit/Blink Browsers */
}
::-moz-selection {
  background: #ffb7b7; /* Gecko Browsers */
}
</style>
