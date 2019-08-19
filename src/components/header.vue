<template>
  <div class="header">
    <img class="title" src="../assets/BMW Sales.svg">
    <Button v-if="$route.name !='home'" @click="$router.back()">返回</Button>
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
    methods: {
      goBack() {
        this.$router.push({ path: '/' });
      }
    },
    created() {
      console.log(this.$route);
      // api.getData().then(res => {
      //   console.log(res.data);
      // })
    },
  }

</script>

<style lang="scss" scoped>
  .header {
    height: 60px;
    background-color: #171717;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #282828;

    .title {
      width: 110px;
      height: 30px;
      margin-left: 30px;
    }

    button {
      margin-right: 30px;
    }
  }

</style>
