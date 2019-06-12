<template>
<!-- 容器布局，参考element-ui -->
  <el-container style="height:100%">
    <!-- 侧边栏 -->
    
    <el-aside style="width:auto">
          <!-- :router="true"  动态切换路由 -->
    <!-- :collapse 收缩面板 接收true和false 
    default-active	当前激活菜单的index -->
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#2f3e4e"
        text-color="#fff"
        :router="true"
        active-text-color="yellow"
        :collapse="isCollapse"
        style="height:100%;"
      >
        <!-- 侧边头信息 -->
        <el-menu-item style="font-size:22px;">
          <i class="el-icon-menu" style="font-size:22px;"></i>
          <span>丁艾资产</span>
        </el-menu-item>
        <!-- 侧边栏内容 -->
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据,们只是能通过scope.row获得当前的行数据 -->
<!-- 动态路由为啥要用键值对 因为人家路由上的名字就是这样子定义的 当然也可以选择使用path的形式 -->
<!-- 如果有子元素，则遍历子元素，没有的话直接显示 
        动态路由可以实现单页面应用的的实时更新 -->
        <template v-for="v in menus">
          <el-menu-item v-if="!v.children && v.meta.ident == false" :index="v.name" :route="{name:v.name}">
            <i :class="v.meta.icon"></i>
            <span slot="title">{{v.meta.title}}</span>
          </el-menu-item>
          <el-submenu v-else-if="v.children" :index="v.name">
            <template slot="title">
              <i :class="v.meta.icon"></i>
              <span slot="title">{{ v.meta.title }}</span>
            </template>
            <el-menu-item
              v-for="item in v.children"
              :index="item.name"
              :route="{name:item.name}" >
              <i class="el-icon-menu"></i>
              {{item.meta.title}}
            </el-menu-item>  
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <!-- 中间部分 -->
    <el-container>
      <!-- 头信息 -->
      <el-header class="middleHeader">
        <span>
          <i
            class="el-icon-s-fold"
            :class="{'rotate':isCollapse,'':!isCollapse}"
            @click="isCollapse = !isCollapse"
          ></i>
        </span>
        <!-- 头部 -->
        <span>
          <headerItem/>
        </span>
      </el-header>
      <el-main class="middleMain">
        <!-- 在这里留一个坑  插入页面数据  -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import headerItem from "../components/header-box/headeritem";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      isCollapse: false,
      menus: [],
      activeMenu: 'dashboard'
    };
  },
  components: {
    headerItem,
  },
  created() {
    // console.log(this.$route);
    // 在控制台输出this.$router.option.routes[1].children可以找到index的子路由
    this.menus = this.$router.options.routes[1].children;
    this.activeMenu = this.$route.name;
    // this.activeMenu = 11111;
  },
  watch: {
    $route() {
      // console.log(this.$route)
    }
  },
  methods: {
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-icon-s-fold {
  font-size: 36px;
  transition: all 1s;
}
.rotate {
  transform: rotate(90deg);
}
.middleHeader{
            width:100%;
            background-color:#f0f0f0;
          }
.middleMain{
  height: 100%;
}
</style>
