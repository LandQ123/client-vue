<template>
  <div class="home">
    <div class="banner">
      home页
      <el-button type='primary' @click="toLogin">to login</el-button>
      <el-button type='primary' @click="toCustomer">to customerList</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    toCustomer() {
      this.$router.push('/customerList')
    }
  }
};
</script>
<style lang='scss' scoped>
.home{
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .banner{
    margin: 20px 0;
  }
}
</style>
