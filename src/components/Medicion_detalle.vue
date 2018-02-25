<template>

</template>


<script>
  export default {
    computed: {
      medicionActual() {
        return this.$store.state.medicionActual;
      },
      pytActual() {
        return this.$store.state.pytActual;
      }
    },
    created() {
      var idPyt = this.$route.params.idPyt;
      var idMedicion = this.$route.params.idMedicion;
    }
  };

</script>
