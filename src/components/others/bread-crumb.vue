<template>
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item v-for="v in lists" :to="{ path:v.path }">
      {{ v.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
    data(){
        return {
            lists:[]
        }
    },
    created() {
      // this.$route  代表当前路由
        this.lists = this.$route.matched;
        // console.log(this.$route.matched)
    },
};
</script>
<style>
  .bread{
    height: 30px;
  }
</style>
