<template>
  <v-app>
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



      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i" v-bind:to="item.url">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


      <!-- Opciones Administrador -->
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


    <v-toolbar app :clipped-left="clipped" dark color="primary" v-if="this.autenticado">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="onLogout">Log OUT
        </v-btn>

      </v-toolbar-items>

    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; COSAPI 2018
        <small>- DERECHOS RESERVADOS</small>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    autenticado() {
      return this.$store.getters.autenticado;
    },
    user() {
      return this.$store.getters.user;
    },
    items() {
      let menuItems = [
        {
          icon: "home",
          title: "Inicio",
          url: "/Inicio"
        },
        {
          icon: "domain",
          title: "Proyectos",
          url: "/Proyectos"
        },
        {
          icon: "person",
          title: "Mi perfil",
          url: "/Profile"
        }
      ];
      return menuItems;
    },
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
    }
  },
  // watch: {
  //   autenticado(value) {
  //     if (value === true) {
  //       this.$router.push("/Inicio");
  //     }
  //   }
  // },
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
</style>
