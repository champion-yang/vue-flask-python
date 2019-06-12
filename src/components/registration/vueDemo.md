# 项目名称
- 丁爱资产管理系统

## 前端技术栈
- HTML/css/javascript
- vue/node.js/ES6
- 网络请求原理

> 对vue的要求略高，其他技术会用就行

### 项目运行环境

- node版本  v10.15.2  (10以下不能运行)
- vue版本 3.7.0

### vue项目运行依赖

- axios
    -  基于promise用于浏览器和node.js的http客户端
    -  https://www.kancloud.cn/yunye/axios/234845
- v-charts
    - 基于echarts的图表
    - https://v-charts.js.org/#/
- element-ui
    - 饿了么开发的开源桌面端组件库
    - https://element.eleme.cn/#/zh-CN
- vue-router
    - vue.js的官方路由管理器，方便构建单页面应用
    - https://router.vuejs.org/zh/

### Vue项目的开发流程，如下：

- 利用命令行工具创建项目
- 项目开发前配置
- 项目开发阶段
- 项目打包与优化阶段
- 项目上线

> 主要在这里我会详细阐述登录页面和首页，数据页

#### 目录结构
![我的目录结构](https://note.youdao.com/yws/public/resource/79c9a8b75ebb2df33d8c940558a9a29c/xmlnote/4A68B264E51A49EA8DBAB5C54E730E87/4565)

目录结构说明  
```
│
├── node_modules/            # 自动生成，包含Node生产依赖以及开发依赖
│
├── public/                  # 纯静态资源，不会被wabpack构建。
│      ├── index.html        # 入口页面
│      └── favicon.ico       # 网站站标
│                     
├── src/                     # 项目源码目录    
│   ├── main.js              # 入口js文件
│   ├── app.vue              # 根组件
│   ├── components           # 公共组件目录 (可自由定义)
│   │   ├── dashboard           # 仪表盘组件存放目录  
│   │   ├── heard-box           # 头组件存放目录
│   │   ├── others              # 其他组件存放目录
│   │   └── registration        # 资产登记存放目录
│   ├── views/               # 页面目录
│   │   ├── aside-left       # 侧边栏页面存放目录
│   │   ├── login.vue
│   │   └── indexPage.vue
│   ├── assets/              # 资源目录，这里的资源会被wabpack构建
│   │   └── images/
│   │       └── logo.png
│   ├── routes/              # 前端路由
│   │   └── index.js
│   └── store/               # 应用级数据（state）
│       └── index.js                    
│
├── .gitignore               # git排除文件
│
├── babel.config.js
│
├── vue.config.js            # vue配置文件
│
├── package.json             # npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
│
└── README.md
```
--------------------------------

## 登录页面的构建以及表单验证  
> login.vue
![image](https://note.youdao.com/yws/public/resource/79c9a8b75ebb2df33d8c940558a9a29c/xmlnote/82190C3017394412BCF9483FC3552B76/4557)

> 所有的vue文件都是由结构，样式，逻辑组成。template存放结构，style存放样式，script存放逻辑

> tips:
> 所有以el开头的都是element-ui组件库的内容，大部分直接套过来用就行，建议先把element-ui组件库的内容看一遍，再来看代码就没啥问题了

**难点：表单验证**  
**难度系数：一颗星**

```html
<template>
<div class="bgimg">
  <div class="box">
    <div class="left">
      <img src="../assets/login02.png">
    </div>
    <div class="right">
      <h3>用户登录</h3>
<!-- 
    :model  表单数据对象
    status-icon  使用status-icon属性为输入框添加了表示校验结果的反馈图标
    ref  我们在 rules 这里写了对表单的验证规则，但是我们如何在methods 里对指定的表单进行认证，所以一开始在 el-form 里写了 ref ,然后在 methods 里就可以用 this.$refs[formName].validate(valid => {}
     -->
      <el-form :model="numberValidateForm"  status-icon ref="numberValidateForm">
<!-- 
    prop 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
    rules 表单验证规则
    autocomplete  可以进行密码二次验证  我这里没做
    trigger  触发方式 失去焦点时触发
     -->
        <el-form-item prop="name" 
            :rules = "[ 
            {required:true,message:'账号不能为空'},{type:'string',message:'账号一定为字符串'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]"
        >
          <el-input v-model="numberValidateForm.name" type="name" ></el-input>
        </el-form-item>
        <el-form-item prop="pass" 
            :rules = "[ 
            {required:true,message:'密码不能为空'},{type:'number',message:'密码一定为数字'}
            ]"
        >
        <!-- input默认得到的值为字符串 要进行数字验证 需要转化为number -->
          <el-input v-model.number="numberValidateForm.pass" type="pass" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-row >
          <el-button type="primary"  style="width:100%"  @click="submitForm('numberValidateForm')">登陆</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      numberValidateForm: {
        name: "",
        pass: ""
      }
    };
  },
// 验证成功后通过切换路由的方式进行页面切换 this.$router.push会向history栈添加一条记录，所以可以点击回退  
// 调用 Message 或 this.$message 会返回当前 Message 的实例
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({name:'indexPage'})
        } else {
          // error为消息提示的样式
          this.$message.error('傻玩意，滚去工作');
        }
      });
    }
  }
};
</script>

<style>
.bgimg {
  width: 100%;
  height:100%;
  background: url("../assets/login01.jpg") no-repeat;
  background-size: 100%;
}
.box {
  width: 550px;
  height: 226px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  color: aliceblue;
}
.left {
  width: 240px;
  height: 100%;
  border-right: 1px solid hsla(0, 0%, 100%, 0.2);
}
.left img {
  width: 230px;
  margin-top: 20px;
}
.right {
  width: 280px;
  margin-left: 26px;
}
.right input {
  display: block;
}
.right h3 {
  font-weight: 400;
  margin: 0;
  padding: 0;
  line-height: 40px;
}
</style>
```

## 首页
> indexPage.vue

![image](https://note.youdao.com/yws/public/resource/79c9a8b75ebb2df33d8c940558a9a29c/xmlnote/3BF6F41D1D8B4EA791DC11A8389B39F4/4570)

> 主页布局：
> 侧边栏部分：每一栏都是一个页面
> 头部：组件
> main：对应着侧边栏页面内容 默认显示仪表盘的内容
------
> tips:
> 这部分内容较为庞大，请做好心理准备。

**难点：**        组件化思想  |  路由使用  
**难度系数：**    三颗星|两颗星

```html
<template>
<!-- 容器布局，参考element-ui -->
  <el-container style="height:100%">
    <!-- 侧边栏 -->
    
    <el-aside style="width:auto">
          <!-- :router="true"  动态切换路由 -->
    <!-- :collapse 收缩面板 接收true和false -->
      <el-menu
        default-active="1-4-1"
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
          <el-menu-item v-if="!v.children" :index="v.name" :route="{name:v.name}">
            <i :class="v.meta.icon"></i>
            <span slot="title">{{v.meta.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="v.name">
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
    <el-container>
      <el-header>
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
      <el-main>
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
      menus: []
    };
  },
  components: {
    headerItem,
  },
  created() {
    // 在控制台输出this.$router.option.routes[1].children可以找到index的子路由
    this.menus = this.$router.options.routes[1].children;
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
</style>
```

> tips：  
> 模块化编程：es6的新语法模块化编程，提供给我们很多的便利。
> 1. 导入Vue和VueRouter然后使用
> import Vue from 'vue'  
> import Router from 'vue-router'  
> Vue.use(Router)  
> 2. 定义组件
> 3. 定义路由  
> 每个路由映射一个组件  component
> 4. 创建 router 实例，然后传 `routes` 配置
> 5. 创建和挂载实例。
> 
https://router.vuejs.org/zh/guide/#javascript

### 动态面包屑导航栏
面包屑组件：bread-crumb.vue
```html
<template>
  <el-breadcrumb separator="/">
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
    },
};
</script>
```
定义好面包屑组件之后我们要使用它  
在侧边栏页面中  我们通过仪表盘页面来举例子说明其使用方式  
dash-board.vue(不完整版)
```html
<template>
  <div>
  <!-- 使用面包屑 -->
    <breadCrumb></breadCrumb>
  </div>
</template>
<script>
// 导入面包屑组件 @代表src
import breadCrumb from "@/components/others/bread-crumb"
export default {
  components: {//声明要使用的组件
    breadCrumb // 将面包屑组件挂载到当前页面
  },
};
</script>
```
> 简单来讲就是导入，挂载，使用

### 待签字组件
![image](https://note.youdao.com/yws/public/resource/79c9a8b75ebb2df33d8c940558a9a29c/xmlnote/3B6BD8E0493940E98E6F13181D66EC26/4573)

> 使用了element-ui的Layout 布局 把当前位置分为24份  按照比例进行页面布局
> 或者可以使用弹性布局 `display: flex;` `justify-content:space-around;`

### 页面内容
> 基本上页面内容相差无几，所以只展示两个页面，分别进行对图表和表格的讲解
#### 仪表盘页面(表格)

**难点**：vue表格的使用
**难度**：三颗星

> 首先在仪表盘页面中进行图表组件的引用挂载和使用  
dash-board.vue
```html
<template>
  <div>
    <breadCrumb></breadCrumb>
    <!-- 待签字 -->
    <div class="signWait">
      <signWord/>
    </div>
    <!-- 表格 -->
    <div style="width:100%;height:400px;margin-bottom:80px;background:#fff;">
      <div style="width:48%;height:100%;float:left;">
        <chartItemOne/>
      </div>
      <div style="width:48%;height:100%;float:right;">
        <chartItemTwo/>
      </div>
    </div>
    <div style>
      <chartItemThree/>
    </div>
    <!-- 图表区 -->
  </div>
</template>
<script>
import signWord from "@/components/dashboard/signworld";
import chartItemOne from "@/components/dashboard/charts-items/chart-one";
import chartItemTwo from "@/components/dashboard/charts-items/chart-two";
import chartItemThree from "@/components/dashboard/charts-items/chart-three";
import breadCrumb from "@/components/others/bread-crumb"
export default {
  data() {
    return {
    };
  },
  components: {
    signWord,
    chartItemOne,
    chartItemTwo,
    chartItemThree,
    breadCrumb
  },
  methods: {
  }
};
</script>
```
![image](https://note.youdao.com/yws/public/resource/79c9a8b75ebb2df33d8c940558a9a29c/xmlnote/72C005CBB81049A989CFC8E85AE8CDF3/4576)
> 针对这张表来说一下图表的制作

> 1. 引入v-charts  
> import VCharts from 'v-charts'
> Vue.use(VCharts)
> 2. 


chart-two.vue
```html
<template>
  <!-- 卡片布局 -->
  <el-card class="box-card">
    <!-- Card 组件包括header和body部分，header部分需要有显式具名 slot 分发，同时也是可选的。 -->
    <div slot="header" class="clearfix">
      <span>
        <i class="el-icon-eleme">资产概括</i>
      </span>
    </div>
    <div class="item">
    <!-- v-charts引入饼图v-pie -->
      <!-- legend(eharts的方法)调整位置 -->
      <ve-pie
        :legend=" {
        type: 'scroll',
        orient: 'vertical',
        right: 20,
        top: 20,
        bottom: 20,
        data: chartData.columns,
        }"
        :series="{
          name: '姓名',
            type: 'pie',
            radius : '40%',
            center: ['50%', '30%'],
            data: chartData.rows,
        }"
      ></ve-pie>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      chartData: {
        columns: ["报废", "闲置", "在用"],
        rows: [
          { name: "报废", value: 1393 },
          { name: "闲置", value: 3530 },
          { name: "在用", value: 2923 }
        ]
      }
    };
  }
};
</script>
<style>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 100%;
  height: 350px;
}
</style>
```
> v-charts 的数据由指标和维度组成  
> “维度” 指的是数据的属性 折线图中可以理解为横坐标  
> “指标” 是量化衡量标准  折线图中可以理解为纵坐标  
> columns 中是维度和指标的集合，v-charts 中的大部分图表都是单维度多指标，所以默认第一个值为 维度，剩余的值为指标  
> rows 中是数据的集合。  
----
> 但是饿了么封装的v-charts里面的功能较为简单，所以我们需要匹配合echarts来使用
> 通过`:`在`<ve-pie>`中写属性。 `<ve-pie :legend="{type:'scroll', orient: 'vertical',right: 20,top: 20,bottom: 20,data: chartData.columns,}"`

### 资产登记页面(表格)
**难点**：vue表格使用，弹窗，判断有无选中数据进行删除，全局过滤器,全局拦截器  
**重点**：三颗星，两颗星，两颗星，三颗星，三颗星

#### 表格使用
```html
<template>
<!-- 
    当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据 border 显示边框
    @select 表格单选框事件 状态改变时触发 
    @select-all 表格复选框事件 -->
<el-table
      :data="tableData"
      border
      style="width: 100%"
      @select="checkSelect"
      @select-all="checkSelectAll"
    >
      <!-- 固定表格列 fixed -->
      <!-- selection 指定当前列为多选框   -->
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <el-table-column prop="dstatus" label="资产状态" width="120">
        <!-- 引入状态信息组件  prop为自己填入的数据   -->
        <template slot-scope="scope">
          <statusItem :status="scope.row.dstatus"></statusItem>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="资产" width="120">
        <template scope="scope">
        <!-- 这里用到过滤器 -->
          <span>{{ scope.row.money | currency}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="editTable(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default{
    // 定义局部过滤器 要想定义全局过滤器  需要在main.js(入口js文件)中引入或设置
    filters: {
    currency: function(value = "0", currencyType = "￥", limit = 2) {
      value = Number(value)
      let res;
      value = value.toFixed(limit);
      let prev = value.toString().split(".")[0]; //获取整数部分
      let next = value.toString().split(".")[1];
      res = prev.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + "." + next;
      return currencyType + res;
    }
  },
}
</script>
```

#### 弹窗
点击新增按钮使`dialogTableVisible=true`显示弹窗 

```html
<template>
<el-row class="btn">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="dialogTableVisible=true"
        >新增</el-button>
        <!-- 弹窗表格 -->
        <el-dialog title="资产登记" :visible.sync="dialogTableVisible" width="1000px">
          <!-- tab标签页设置 上下移动的效果-->
          <el-tabs :tab-position="tabPosition">
            <el-tab-pane label="基本信息">
              <el-row :gutter="20">
                <!-- 把右边所有数据放在from中 方便显示label 输入框前面的标题 -->
                <el-form label-width="80px" :data="formData">
                  <el-col :span="8">
                    <el-form-item label="资产条码">
                      <!-- disabled=true 禁用状态 -->
                      <el-input placeholder="自动生成" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="资产类型">
                      <!-- select下拉选择器 v-model用来绑定选项值 下拉选项在options中 对象形式保存 -->
                      <el-select v-model="value" placeholder="请选择">
                      <!-- label标签文本的内容 value为选项值 -->
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="规格型号">
                      <el-input placeholder="请输入内容" v-model="formData.date" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="照片">
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                      >
                        <img class="avatar">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-dialog>
        <el-button
          type="danger"
          icon="el-icon-search"
          size="small"
          style="margin-left:10px;"
          :plain="true"
          @click="pop"
        >删除</el-button>
</el-row>
```

#### 判断单选框或多选框有无选中数据进行删除
> 思路最重要
> 单选框选中会触发`checkSelect`事件，全选框选中会触发`checkSelectAll`事件。在控制台输出选中状态时的输出为一个数组，并且每多点一次，会在数组中新增一条当前选中的数据。  
> 所以首先定义一个空对象，当checkSelect函数被触发时，`this.num=val`,即：将选中时候输出的信息保存在num对象身上，从而我们可以通过判断num的长度来判断是否有选择框被选中。如果有选中，则执行删除事件，如果没有，则提示用户没有选中数据。  
```html
<script>
export default{
    methods:{
        checkSelect(val) {
            this.num = val
            },
        checkSelectAll(val) {
            this.num = val;
        },
            // 删除按钮
        pop() {
        // console.log(this.num.length)
        if (this.num.length > 0) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
            })
            .then(() => {
                this.$message({
                type: "success",
                message: "删除成功!"
                });
            })
            .catch(() => {
                this.$message({
                type: "info",
                message: "已取消删除"
                });
            });
        }
        else {
            this.$alert("对不起，您没有选中任何数据");
        }
            }
    }
}
</script>
```
#### 全局过滤器
> 难点主要在于过滤器的定而非过滤器的引入
> 引入：在main.js中定义全局过滤器，然后在tamplate标签内`{{ scope.row.money | currency}}`使用过滤器
> 
当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据
```html 
<template>
    <el-table>
        <el-table-column prop="money" label="资产" width="120">
                <template scope="scope">
                <span>{{ scope.row.money | currency}}</span>
                </template>
        </el-table-column>
    <el-table>
</template>
```
#### 全局拦截器
```javascript
<script>
export default{
    mounted() {
    this.$axios.get("/api/assetRegis").then(res => {
      console.log(res);
      if (res.data.code == "200") {
        this.tableData = res.data.tableData;
      }
    });
  },
}
</script>
```
以下是在`main.js`中定义的全局过滤器和全局拦截器

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from "v-charts";
import axios from "axios"
Vue.use(ElementUI);
Vue.use(VCharts)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// 过滤器
Vue.filter('currency', function(value = '0', currencyType = '￥',limit=2) {
  value = Number(value)
  let res;
  value = value.toFixed(limit);
  let prev = value.toString().split('.')[0]; //获取整数部分
  let next = value.toString().split('.')[1];
  res = prev.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + next;
  return currencyType + res
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
//全局拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.code == "500" || response.data.code == "404"){
      alert("获取数据失败")
    }else{
      return response;
    }
  },
  function(error){
    return Promise.reject(error)
  }
)
```




