<template>

</template>


<script>
  export default {
    computed: {
      procesoActual() {
        return this.$store.state.procesoActual;
      },
      pytActual() {
        return this.$store.state.pytActual;
      }
    },
    created() {
      var proyecto_uid = this.$route.params.proyecto_uid;
      var idproceso = this.$route.params.idproceso;
    }
  };

</script>
