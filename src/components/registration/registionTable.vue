<template>
  <el-card class="box-card">
    <!-- 表格头信息 -->
    <div>
      <el-tabs>
        <el-tab-pane label="资产登记"></el-tab-pane>
      </el-tabs>
      <el-row class="btn">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="editTable"
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
                      <el-input placeholder="自动生成"  v-model="formData.barcode" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="资产名称">
                      <el-input placeholder="请输入内容" v-model="formData.assetname" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="资产类型">
                      <!-- select下拉选择器 v-model用来绑定选项值 选项在optionns中 对象形式保存 -->
                      <el-select v-model="value" placeholder="请选择" :readonly="readonly">
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
                      <el-input placeholder="请输入内容" v-model="formData.model"  :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="SN号">
                      <el-input placeholder="请输入内容" v-model="formData.productseries" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="计量单位">
                      <el-input placeholder="请输入内容" v-model="formData.measurementunit" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="金额">
                      <el-input placeholder="请输入内容" v-model="formData.money" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="使用公司">
                      <el-select v-model="value" placeholder="请选择" :readonly="readonly">
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
                    <el-form-item label="使用部门">
                      <el-select v-model="value" placeholder="请选择" >
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
                    <el-form-item label="购买时间" >
                      <el-date-picker
                      
                        type="date"
                        placeholder="选择日期"
                        v-model="sizeForm.date1"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="使用人">
                      <el-select v-model="value" placeholder="请选择" >
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
                    <el-form-item label="管理员">
                      <el-select v-model="value" placeholder="请选择" >
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
                    <el-form-item label="存放地点" >
                      <el-select v-model="value" placeholder="请选择" >
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
                    <el-form-item label="使用期限">
                      <el-input placeholder="请输入内容" v-model="formData.servicelilfe" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="来源">
                      <el-select v-model="value" placeholder="请选择" >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="备注">
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" :readonly="readonly"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">

                    <el-form-item label="照片">
                      <el-upload
                          class="uploadimg"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove">
                          <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="维保信息">
              <el-row :gutter="20">
                <el-form label-width="80px">
                  <el-col :span="12">
                    <el-form-item label="供应商">
                      <!-- disabled=true 禁用状态 -->
                      <el-input placeholder="供应商"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系人">
                      <el-input placeholder="联系人"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="联系方式">
                      <el-input placeholder="联系方式"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="维保到期">
                      <el-date-picker
                        type="date"
                        placeholder="维保到期时间"
                        v-model="sizeForm.date1"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="备注">
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          <!-- :plain="true"鼠标移入效果 -->
          <el-row style="padding-left:800px">
            <el-button  @click="comfirm">确定</el-button>
            <el-button type="primary"  @click="comfirm">取消</el-button>
          </el-row>
        </el-dialog>
        <el-button
          type="danger"
          icon="el-icon-search"
          size="small"
          style="margin-left:10px;"
          @click="pop"
        >删除</el-button>

        <el-dropdown split-button type="primary" size="small" style="margin-left:10px;">
          <i class="el-icon-search"></i>
          导入/导出
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown split-button type="primary" size="small" style="margin-left:10px;">
          <i class="el-icon-search"></i>
          打印
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </div>
    <!-- 表格内容 select事件获取选中状态 select-all获取所有事件的选中状态 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @select="checkSelect"
      @select-all="checkSelectAll"
    >
      <!-- 固定表格列 fixed -->
      <!-- selection 多选框   -->
      <el-table-column type="selection" fixed></el-table-column>
      <el-table-column prop="dstatus" label="资产状态" >
        <!-- 引入状态信息组件  prop为自己的数据   -->
        <template slot-scope="scope">
          <statusItem :status="scope.row.dstatus"></statusItem>
        </template>
      </el-table-column>
      
      <el-table-column prop="barcode" label="资产条码" ></el-table-column>
      <el-table-column prop="assetname" label="资产名称" ></el-table-column>
      <el-table-column prop="assetype" label="资产类型" ></el-table-column>
      <el-table-column prop="model" label="规格型号" ></el-table-column>
      <el-table-column prop="productseries" label="产品序列" ></el-table-column>
      <el-table-column prop="measurementunit" label="计量单位" ></el-table-column>
      <el-table-column prop="money" label="金额" >
        <template scope="scope">
          <span>{{ scope.row.money | currency}}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="company" label="使用公司" ></el-table-column>
      <el-table-column prop="department" label="使用部门" ></el-table-column>
      <el-table-column prop="purchasetime" label="购买时间" >
        <template scope="scope">
          <span>
            <!-- {{purchasetime}} -->
            {{ scope.row.purchasetime | date}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="userpeople" label="使用人" ></el-table-column>
      <el-table-column prop="admin" label="管理员" ></el-table-column>
      <el-table-column prop="location" label="存放地点" ></el-table-column>
      <el-table-column prop="servicelilfe" label="使用期限" ></el-table-column>
      <el-table-column prop="source" label="来源" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!--  
          通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据
          点击获取当前行的数据scope.row
           -->
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="editTable(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dividePage></dividePage>
  </el-card>
</template>
<script>
// 引入组件
import statusItem from "@/components/registration/status-item";
import dividePage from "@/components/registration/divide-page";
import { type } from "os";

export default {
  // get请求json数据
  mounted() {
    this.$axios.get("/api/assetRegis").then(res => {
      // console.log(res);
      if (res.data.code == "200") {
        this.tableData = res.data.tableData;
        // console.log(this.tableData);
      }
    });
  },
  // 局部过滤器  这里采用的是全局过滤器
  // filters: {
  //   date: function(timestamp) {
  //     var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  //     var Y = date.getFullYear() + "-";
  //     var M =
  //       (date.getMonth() + 1 < 10
  //         ? "0" + (date.getMonth() + 1)
  //         : date.getMonth() + 1) + "-";
  //     var D = date.getDate() + " ";
  //     var h = date.getHours() + ":";
  //     var m = date.getMinutes() + ":";
  //     var s = date.getSeconds();
  //     // return Y+M+D+h+m+s;
  //     //这里返回时间的年月日时分秒，可按项目需求进行修改
  //     return Y + M + D;
  //   }
  // },
  methods: {
    // 点击事件  查看
    handleClick(row) {
      // console.log(row)
      let _val = JSON.parse(JSON.stringify(row));
      // console.log(_val)
      this.dialogTableVisible = true;
      this.readonly = true;
      this.formData = _val;
      console.log(this.formData)
    },
    // 编辑
    editTable(row) {
      this.dialogTableVisible = true;
      let _val = JSON.parse(JSON.stringify(row));
      this.formData = _val;
      this.readonly = false;
    },
    open() {
      this.$message("添加成功").close;
    },
    close() {
      this.$message("添加失败");
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
    comfirm(){
      this.dialogTableVisible = false
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  },
  //   注册组件
  components: {
    statusItem,
    dividePage
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      tabPosition: "left",
      tableData: [],
      dialogTableVisible: false,
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
      formData: {
        dstatus: "",
        date: "",
        name: "",
        province: "",
        city: "",
        address: "",
        money: 200333
      },
      readonly: true,
      num: {}
    };
  }
};
</script>

<style>
.box-card {
  width: 100%;
}
.dialog {
  width: 800px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-upload--picture-card{
  width: 180px;
  height: 100px;
  line-height: 100px;
}
.el-card{
  height: 100%;
}
</style>