<template>


    <iframe id="myframe" width="100%" style="height: 100%; border: 0;" :src="'https://dmaic-db196.firebaseapp.com/dmaic.html?cr='+ this.$route.params.idPyt +'&medicion=' +this.$route.params.idMedicion " fill-height></iframe>

</template>

<script>
import VueFrame from "vue-frame";
export default {
  components: { VueFrame },
  computed: {},
  created() {}
};
</script>
