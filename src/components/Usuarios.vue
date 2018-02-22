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

              <v-flex xs12 md8 align-center>
                <h1 display-3>Usuarios</h1>
                <span>Se listan a los ususarios resgistrados, para añadir uno nuevo, de click en el botón <strong>AÑADIR USUARIO</strong>:</span>
                <v-spacer></v-spacer>              
              </v-flex>
              <v-flex xs12 md4 class="text-xs-center text-md-right">
                <v-btn color="secondary" dark @click.stop="dialog = true" >                   
                    Añadir USUARIO
                     <v-icon right dark>account_circle</v-icon></v-btn>
              </v-flex>
          </v-layout>        

          <v-layout row align-center wrap>
             <v-flex xs12>
              <v-data-table :headers="mainHeaders"
                :items="Users"
                item-key="nombre"
                hide-actions               
                class="elevation-1">
                  <template slot="items" slot-scope="props">
                      <tr>
                          <td class="text-xs">{{ props.item.nombre }}</td>
                          <td class="text-xs">{{ props.item.correo }}</td>
                          <td class="text-xs">{{ props.item.administrador ? "Si":"No" }}</td>
                          <td class="text-xs"> 
                              <v-btn flat icon color="green"><v-icon>edit</v-icon> </v-btn>
                              <v-btn flat icon color="pink"><v-icon>clear</v-icon> </v-btn>
                          </td>
                      </tr>
                  </template>
              </v-data-table> 
            </v-flex>
          </v-layout>

          <!-- dialog -->
          <template>
            <v-layout row justify-center>
              <v-dialog v-model="dialog"  max-width="500px">
                <form @submit.prevent="onCreateUser">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Nuevo Proyecto</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Nombre y apellido" id="txt_userNombre" v-model="txt_userNombre" hint="Ej: Hans Felix" required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Correo" id="txt_userCorreo" v-model="txt_userCorreo" hint="Ej: hfelix@cosapi.com.pe" required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Contraseña" id="txt_userContrasena" v-model="txt_userContrasena" hint="Use una contraseña conveniente" required></v-text-field>
                          </v-flex>
                          <v-flex xs12> 
                               <v-switch
                                :label="`Modo adminstrador: ${(switchAdministrador)? 'activado': ''}`"
                                v-model="switchAdministrador"
                                ></v-switch>
                          </v-flex>
                          <v-flex xs12>
                            <small>*Campos obligatorios</small>
                          </v-flex>   
                        </v-layout>
                      </v-container>
                    
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

        </v-container>
    </v-slide-y-transition>
</template>


<script>
export default {
  data() {
    return {
      dialog: false,
      txt_nombrePyt: "",
      txt_cr: "",

      //dialog Create User
      txt_userNombre: "",
      txt_userCorreo: "",
      txt_userContrasena: "cosapi",
      switchAdministrador: false,

      // datatble
      mainHeaders: [
        { text: "Nombre y apellido", value: "nombre", align: "left" },
        { text: "Correo", value: "correo", align: "left" },
        { text: "Administrador", value: "administrador", align: "left" },
        { text: "Acciones", value: "Acciones", align: "left" }
      ],

      //BREADCUMBS
      itemsBreadCumb: [
        {
          text: "Inicio",
          disabled: false,
          url: ""
        },
        {
          text: "Usuarios",
          disabled: true,
          url: "/"
        }
      ]
    };
  },
  computed: {
    Users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    onCreateUser() {
      const user = {
        userNombre: this.txt_userNombre,
        userCorreo: this.txt_userCorreo.toString().trim(),
        userContrasena: this.txt_userContrasena,
        administrador: this.switchAdministrador
      };
      this.$store.dispatch("signUserUp", user);
      this.$router.push("/Usuarios");
    }
  },
  created() {
    this.$store.dispatch("loadUsers");
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
