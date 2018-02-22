<template>
    <v-slide-y-transition mode="out-in"> 
        <v-container fluid grid-list-lg fill-height>
                <v-layout row wrap justify-center align-center>
                    <v-flex xs12 sm8 >
                        <v-card class="elevation-2">
                            <v-card-text> 
                                <v-container fluid>    
                                    <v-layout row wrap> 
                                        <v-flex xs6>  
                                            <img src="https://randomuser.me/api/portraits/men/85.jpg"  class="avatar_navigationDrawer elevation-3"/> 
                                        </v-flex>
                                        <v-flex xs6>  
                                            <h3>{{user.nombre}}</h3> 
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
        </v-container>   
    </v-slide-y-transition>
</template>



<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style>

</style>
