
<template>
  <div>
    <breadCrumb/>
    <div>
      <el-tabs>
        <el-tab-pane label="资产列表"></el-tab-pane>
      </el-tabs>
      <el-row class="btn">

        <el-dropdown split-button type="primary" size="small" style="margin-left:10px;">
          <i class="el-icon-search"></i>
          使用公司
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button>导出</el-button>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @select="checkSelect"
      @select-all="checkSelectAll"
    >
      <!-- 固定表格列 fixed -->
      <!-- selection 多选框   -->
      <el-table-column type="selection" width="55" fixed></el-table-column>
      <!-- <el-table-column prop="dstatus" label="资产状态" width="120">
        <template slot-scope="scope">
          <statusItem :status="scope.row.dstatus"></statusItem>
        </template>
      </el-table-column> -->
      <el-table-column prop="num" label="领用单号" width="150"></el-table-column>
      <el-table-column prop="time" label="领用时间" width="120"></el-table-column>
      <!-- <el-table-column prop="money" label="资产" width="120">
        <template scope="scope">
          <span>{{ scope.row.money | currency}}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="people" label="领用人" width="120"></el-table-column>
      <el-table-column prop="company" label="领用使用公司" width="150"></el-table-column>
      <el-table-column prop="department" label="领用部门" width="120"></el-table-column>
      <el-table-column prop="storeroomTime" label="预计退库时间" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <!-- <el-button type="text" size="small" @click="editTable(scope.row)">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
<!-- 退库 -->
    <dividePage></dividePage>
  </div>
</template>
<script>
import breadCrumb from "@/components/others/bread-crumb";
import statusItem from "@/components/registration/status-item";
import dividePage from "@/components/registration/divide-page";

export default {
  data() {
    return {
      value1: "",
      dialogTableVisible:false,
      tableData: [
        {
          num: "LY20180618003",
          time: 201900101,
          people: "张三",
          department: "研发部",
          company: "康达",
          storeroomTime: 20190606
        }
      ],
      formData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        options: [
        {
          value: "选项一",
          label: "好爸爸一号"
        },
        {
          value: "选项二",
          label: "好爸爸二号"
        },
        {
          value: "选项三",
          label: "好爸爸三号"
        }
      ],
      num: {},
      value: "",
      // 弹窗文本域
      textarea: "",
      // 弹窗选择时间
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

    };
  },
  components: {
    breadCrumb,
    dividePage,
    statusItem
  },
  methods:{
    comfirm(){
      this.dialogTableVisible = false
    },
    // 操作单选框选中时
    checkSelect(val) {
      this.num = val
      // console.log(val)
      // console.log(this.num)
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
    },
  }
};
</script>
<style>
.picker {
  float: right;
}
</style>