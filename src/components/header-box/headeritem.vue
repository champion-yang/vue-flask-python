<template>
<!-- 
  头信息组件  下拉菜单的实现
 -->
    <span>
        <el-menu style="float:right"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-submenu index="1" class="titleOne">
            <template slot="title" >
              <i class="el-icon-video-pause"></i>
              消息
              </template>
            <el-menu-item index="2-1">新功能上线通知1</el-menu-item>
            <el-menu-item index="2-2">新功能上线通知2</el-menu-item>
            <el-menu-item index="2-3">新功能上线通知</el-menu-item>
          </el-submenu>
          <el-submenu index="2" class="titleOne" >
            <template slot="title">
              <i class="el-icon-female"></i>
              管理员
            </template>
            <el-menu-item index="2-1">
              <router-link to="changePassword">修改密码</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">修改资料</el-menu-item>
            <el-menu-item index="2-3" @click="quit">退出登录</el-menu-item>
          </el-submenu>
          <el-submenu index="3" class="titleOne" >
            <template slot="title">
              <i class="el-icon-female"></i>
              帮助
            </template>
            <el-menu-item index="2-1">帮助中心
            </el-menu-item>
            <el-menu-item index="2-2">使用手册</el-menu-item>
          </el-submenu>
          
        </el-menu>
        <div class="line"></div>
    </span>
</template>
<script>
export default {
  data() {
    return {
        activeIndex: '1',
        activeIndex2: '1',
    };
  },
  components:{
  },
  methods:{
    handleSelect(key, keyPath) {
      },
    quit: function () {
      sessionStorage.clear('accessToken')
      this.$router.push({name:'login'})
    }
  }
}
</script>
<style>
  .titleOne{
    background: #f0f0f0;
  }
</style>