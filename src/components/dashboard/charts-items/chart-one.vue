<template>
  <!-- 仪表盘页图表的实现 
    box-card卡片的使用使布局更加方便
  -->
  <el-card class="box-card" body-style="width:100%">
    <div slot="header" class="clearfix">
      <span>
        <i class="el-icon-eleme">资产概括</i>
      </span>
    </div>
    <div>
      <div class="item">
        <div style="text-align:center;width:48%;float:left">
          <p style="margin-bottom:10px">在用</p>
          <el-progress
            type="circle"
            :percentage="46"
            :width="180"
            :stroke-width="16"
          ></el-progress>
        </div>
        <div style="text-align:center;width:48%;float:right;margin-right:20px;">
          <p style="margin-bottom:10px">闲置</p>
          <el-progress type="circle" :percentage="54" :width="180" :stroke-width="16" color="#67c23a"></el-progress>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style>
.text {
  font-size: 14px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>