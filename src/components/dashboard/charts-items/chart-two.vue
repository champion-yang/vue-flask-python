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
      <!-- legend调整 -->
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
            color:['#67c23a','#409eff','#f56c6c'],
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