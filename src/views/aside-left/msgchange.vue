
<template>
  <div>
    <breadCrumb/>
    <div>
      <el-tabs>
        <el-tab-pane label="基本信息变更">
          <el-row class="btn">
            <!-- 弹窗表格 -->
            <el-dialog title="资产登记" :visible.sync="dialogTableVisible" width="1000px">
              <!-- tab标签页设置 上下移动的效果-->
              <el-tabs>
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
                        <el-form-item label="资产名称">
                          <el-input placeholder="请输入内容" v-model="formData.name"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="资产类型">
                          <!-- select下拉选择器 v-model用来绑定选项值 选项在optionns中 对象形式保存 -->
                          <el-select v-model="value" placeholder="请选择">
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
                          <el-input placeholder="请输入内容" v-model="formData.date"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="SN号">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="计量单位">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="金额">
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="使用公司">
                          <el-select v-model="value" placeholder="请选择">
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
                          <el-select v-model="value" placeholder="请选择">
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
                        <el-form-item label="购买时间">
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
                          <el-select v-model="value" placeholder="请选择">
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
                          <el-select v-model="value" placeholder="请选择">
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
                        <el-form-item label="存放地点">
                          <el-select v-model="value" placeholder="请选择">
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
                          <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="来源">
                          <el-select v-model="value" placeholder="请选择">
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
                          <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="textarea"
                          ></el-input>
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
              <el-row style="padding-left:800px">
                <el-button :plain="true" @click="comfirm">确定</el-button>
                <el-button type="primary" :plain="true" @click="comfirm">取消</el-button>
              </el-row>
            </el-dialog>
            <el-button icon="el-icon-search" type="primary"
              size="small"
              @click="dialogTableVisible=true">新增</el-button>
            <el-button icon="el-icon-search" size="small">打印</el-button>
            <el-button icon="el-icon-search" size="small">导出</el-button>
          </el-row>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @select="checkSelect"
            @select-all="checkSelectAll"
          >
            <el-table-column type="selection" width="55" fixed></el-table-column>
            <el-table-column prop="num" label="领用单号" width="150"></el-table-column>
            <el-table-column prop="time" label="领用时间" width="120"></el-table-column>
            <el-table-column prop="people" label="领用人" width="120"></el-table-column>
            <el-table-column prop="company" label="领用使用公司" width="150"></el-table-column>
            <el-table-column prop="department" label="领用部门" width="120"></el-table-column>
            <el-table-column prop="storeroomTime" label="预计退库时间" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="维保信息变更"></el-tab-pane>
      </el-tabs>
    </div>

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
      dialogTableVisible: false,
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
      formData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
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
      }
    };
  },
  components: {
    breadCrumb,
    dividePage,
    statusItem
  },
  methods: {
    comfirm() {
      this.dialogTableVisible = false;
    },
    // 操作单选框选中时
    checkSelect(val) {
      this.num = val;
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
      } else {
        this.$alert("对不起，您没有选中任何数据");
      }
    }
  }
};
</script>
<style>
.picker {
  float: right;
}
.btn{
  margin-bottom: 10px;
}
</style>