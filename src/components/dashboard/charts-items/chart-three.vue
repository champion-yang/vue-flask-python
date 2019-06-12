<template>
  <el-card class="box-card card3">
    <div slot="header" class="clearfix">
      <span>
        <i class="el-icon-eleme">资产概括</i>
      </span>
    </div>
    <div class="item">
      <ve-histogram
        :colors="['#67c23a']"
        :data="chartData"
        :tooltip="{
            axisPointer:{
              type:'none'
            }
          }"
      ></ve-histogram>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      dataType: function(v) {
        return v + " ￥";
      }
    };
    return {
      chartData: {
        columns: ["比例", "数量"],
        rows: [
          { 比例: "土地、房屋及建筑物", 数量: 1393 },
          { 比例: "", 数量: 3530 },
          { 比例: "电气设备", 数量: 2923 },
          { 比例: "", 数量: 1393 },
          { 比例: "文艺体育设备", 数量: 3530 },
          { 比例: "", 数量: 2923 },
          { 比例: "家居用具及其他类", 数量: 923 }
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

.card3 {
  width: 100%;
  height: 500px;
}
</style>
