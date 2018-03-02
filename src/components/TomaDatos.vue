<template>
<div  width="100%" style="height: 100%; border: 0;" >

          <v-btn color="green darken-1" flat="flat" @click.native="haciaAtras()" style="position: absolute;right: 0;">TERMINAR proceso</v-btn>
    <iframe id="myframe" width="100%" style="height: 100%; border: 0;" 
    :src="'https://dmaic-db196.firebaseapp.com/dmaic.html?cr='+ this.$route.params.proyecto_uid 
    +'&proceso=' +this.$route.params.idproceso
    +'&tomaDatos=' +this.$route.params.idTomaDatos " fill-height></iframe>

</div>
         
</template>

<script>
import VueFrame from "vue-frame";
export default {
  components: { VueFrame },
  computed: {},
  created() {},
  methods:{
    haciaAtras(){
     this.$router.go(-1)
    }
  }
};
</script>
