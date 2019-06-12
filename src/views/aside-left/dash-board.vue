
<template>
  <div>
    <breadCrumb></breadCrumb>
    <!-- 待签字 -->
    <div class="signWait">
      <signWord/>
    </div>
    <!-- 表格 -->
    <div style="width:100%;height:400px;background:#fff;margin-bottom:10px;">
      <div style="width:48%;height:100%;float:left;">
        <chartItemOne/>
      </div>
      <div style="width:48%;height:100%;float:right;">
        <chartItemTwo/>
      </div>
    </div>
    <div>
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