<template>
   <v-container fill-height >
        <v-layout row wrap justify-center align-center>
          <v-flex xs12 sm6>
           <v-card class="elevation-4">
               <form lazy-validation @submit.prevent="onSignin">

                <v-toolbar color="primary" class="elevation-0">
                  <v-toolbar-title>Log in </v-toolbar-title>
                  <v-spacer></v-spacer>

                  <v-tooltip top>
                    <v-btn icon slot="activator" @click="cambiarModoCosapi()" :color="modocosapi? 'primary':'white'">
                      <v-icon>people</v-icon>
                    </v-btn>          
                     <span>Ingresar como trabajador {{modocosapi? 'externo':'COSAPI'}}</span>
                  </v-tooltip> 
                </v-toolbar>

                <v-card-text> 
                  <v-container fluid>    
                    <v-layout row wrap> 


                      <v-flex xs12>   
                        <h2>{{(modocosapi? 'Personal COSAPI':'Personal externo')}}</h2> 
                        <span> Ingresa con tu <strong> {{(modocosapi? 'usuario cosapi':'correo')}}</strong> y contraseña.</span>
                        <br><br>
                      </v-flex>


                      
                      <v-flex xs12 >                             
                        <v-text-field                            
                          :label="modocosapi? 'Usuario cosapi':'Correo electrónico'" 
                          v-model="correo"
                          :rules="correoRules"
                          class="input-group--focused"
                          required
                          >
                        </v-text-field>
                      
                        <v-text-field                            
                            label="Contraseña"
                            v-model="password"
                            :type="e4 ?  'text' : 'password' "
                               :append-icon="e4 ? 'visibility' : 'visibility_off'"
                            :append-icon-cb="() => (e4 = !e4)"
                            class="input-group--focused"
                            required
                            >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <!-- <v-divider></v-divider> -->
                    <v-layout>
                      <v-flex>
                        <v-btn flat color="secondary">Olvidé mi contraseña</v-btn>
                      </v-flex>

                      <v-flex class="text-xs-right">                        
                        <v-btn type="submit" flat color="secondary">Ingresar</v-btn>
                      </v-flex>
                    </v-layout>
                </v-card-actions>

              </form>
            </v-card>
          </v-flex>

           <v-snackbar
            :timeout=3000
            :top="true"
            :right="true"
            v-model="snackbar"
            v-if="snackbar && !ErrorIngreso"
          >
            Ingresando al aplicativo
            <v-btn flat color="primary" @click.native="snackbar = false">Cerrar</v-btn>
          </v-snackbar>


            <v-snackbar
            :timeout=3000
            :top="true"
            :right="true"
            v-model="ErrorIngreso"
          >
            Correo y contraseña no válidos
            <v-btn flat color="primary" @click.native="ErrorIngreso = false">Cerrar</v-btn>
          </v-snackbar>

        </v-layout>
      </v-container>
</template>


<script>
export default {
  data() {
    return {
      e4: false,      
      modocosapi: true,
      ex11: true,
      //SnackBAR
      snackbar: false,

      correo: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    ErrorIngreso(){
return this.$store.getters.ErrorIngreso;
    },
    correoRules() {
      var rule = [];
      if (!this.modocosapi) {
        rule = [
          v => !!v || "Se necesita ingresar un correo",
          v =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Ingrese un correo válido"
        ];
      }
      return rule;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignin() {
      var email = this.modocosapi ? this.correo + "@cosapi.com.pe" : this.correo;

      this.$store.dispatch("signUserIn", {
        email: email,
        password: this.password
      });

      this.snackbar = true;
    },
    cambiarModoCosapi() {
      this.modocosapi = !this.modocosapi;
    }
  }
};
</script>
