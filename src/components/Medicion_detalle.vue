<template>

</template>


<script>
  export default {
    computed: {
      procesoActual() {
        return this.$store.state.procesoActual;
      },
      proyectoActual() {
        return this.$store.state.proyectoActual;
      }
    },
    created() {
      var proyecto_uid = this.$route.params.proyecto_uid;
      var idproceso = this.$route.params.idproceso;
    }
  };

</script>
