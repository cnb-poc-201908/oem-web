<template>
  <div class="header">
    <img class="logo" src="../assets/bmw_logo.png">
  </div>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'
  import api from '@/http'

  export default {
    name: "Header",
    components: {
      HelloWorld
    },
    created() {
      console.log(this.$moment().format('YYYY-MM-DD'));
      api.getData().then(res => {
        console.log(res.data);
      })
    },
  }

</script>

<style lang="scss" scoped>
.header {
  height: 70px;

  .logo {
    width: 60px;
    height: 60px;
  }
}
</style>