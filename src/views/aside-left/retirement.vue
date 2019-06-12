
<template>
  <div>
    <breadCrumb/>
    <div>
      <el-tabs>
        <el-tab-pane label="领用">
          <el-row class="btn">
            <!-- 弹窗表格 -->
            <el-dialog title="领用单" :visible.sync="dialogTableVisible" width="1000px">
              <el-row>
                <el-form label-width="80px" :data="formData">
                  <el-col :span="8">
                    <el-form-item label="领用人">
                      <el-input v-model="formData.people"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="领用时间">
                      <el-date-picker
                        type="date"
                        placeholder="选择领用日期"
                        v-model="formData.time"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="预计退库">
                      <el-date-picker
                        type="date"
                        placeholder="选择预计退库日期"
                        v-model="sizeForm.date2"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="领用公司">
                      <el-select v-model="formData.company" placeholder="请选择领用公司">
                        <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="领用部门">
                      <el-select v-model="value" placeholder="请选择领用公司再选择部门">
                        <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="存放地点">
                      <el-input placeholder="领用后存放地点" v-model="formData.date"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="处理人">
                      <el-input placeholder="处理人" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="说明">
                      <el-input type="textarea" :rows="2" placeholder="领用备注" v-model="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20" class="margin-value">
                    <el-button size="small" @click="dialogTableVisible2=true">选择资产</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                    <!-- ----------------------弹窗2--------------------------------- -->

                    <el-dialog
                      width="70%"
                      height="50%"
                      title="选择资产"
                      :visible.sync="dialogTableVisible2"
                      append-to-body
                    >
                      <el-container>
                        <el-aside width="20%" class="tan2_aside" >
                          <div class="" style="border:1px solid #f0f0f0;width: 100%;">
                            <el-tree :data="asidedata"></el-tree>
                          </div>
                        </el-aside>
                        <el-main width="70%" >
                          <!--更换tableData的数据就行 在prop中写tableData中的字段-->
                          <el-table  style="width: 100%;"  border :data="tableData">
                            <el-table-column type="selection" fixed/>
                            <!--<el-table-column  label="资产条码" ></el-table-column>-->
                            <el-table-column prop="people" label="资产条码"></el-table-column>
                            <el-table-column  label="资产名称" ></el-table-column>
                            <el-table-column  label="资产类型"></el-table-column>
                            <el-table-column  label="规格型号"></el-table-column>
                            <el-table-column  label="产品序列"></el-table-column>
                            <el-table-column  label="计量单位"></el-table-column>
                            <el-table-column  label="金额"></el-table-column>
                            <el-table-column  label="使用公司"></el-table-column>
                            <el-table-column  label="使用部门"></el-table-column>
                            <el-table-column  label="购买时间"></el-table-column>
                            <el-table-column  label="使用人"></el-table-column>
                            <el-table-column  label="管理员"></el-table-column>
                            <el-table-column  label="存放地点"></el-table-column>
                            <el-table-column  label="使用期限"></el-table-column>
                            <el-table-column  label="来源"></el-table-column>
                          </el-table>
                          <el-row style="float: right;padding-top: 10px;">
                            <el-button :plain="true" @click="comfirm2" size="small">取消</el-button>
                            <el-button type="primary" :plain="true" @click="comfirm2" size="small">确定</el-button>
                          </el-row>
                        </el-main>
                      </el-container>
                    </el-dialog>

                  </el-col>
                  <el-col :span="24" class="margin-value">
                    <el-table
                      :data="tableData1"
                      border
                      style="width: 100%"
                      @select="checkSelect"
                      @select-all="checkSelectAll"
                    >
                      <el-table-column type="selection" fixed></el-table-column>
                      <el-table-column prop="people" label="资产条码"></el-table-column>
                      <el-table-column prop="company" label="资产名称"></el-table-column>
                      <el-table-column prop="department" label="资产类型"></el-table-column>
                      <el-table-column prop="storeroomTime" label="使用公司"></el-table-column>
                      <el-table-column prop="storeroomTime" label="使用部门"></el-table-column>
                      <el-table-column prop="storeroomTime" label="使用人"></el-table-column>
                      <el-table-column prop="storeroomTime" label="管理员"></el-table-column>
                      <el-table-column prop="storeroomTime" label="存放地点"></el-table-column>
                      <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-form>
              </el-row>

              <el-row style="padding-left:800px">
                <el-button :plain="true" @click="comfirm">取消</el-button>
                <el-button type="primary" :plain="true" @click="comfirm">确定</el-button>
              </el-row>
            </el-dialog>

            <el-button
              class="margin-value"
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="dialogTableVisible=true"
            >新增</el-button>
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
            <el-table-column type="selection" fixed></el-table-column>
            <el-table-column prop="people" label="领用人"></el-table-column>
            <el-table-column prop="company" label="领用使用公司"></el-table-column>
            <el-table-column prop="department" label="领用部门"></el-table-column>
            <el-table-column prop="storeroomTime" label="预计退库时间"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="退库">
          <el-row class="btn">
            <!-- ------------------退库一级弹窗表格----------------------- -->
            <el-dialog title="退库单" :visible.sync="dialogTableVisible3" width="1000px">
              <el-row>
                <el-form label-width="100px" :data="formData">
                  <el-col :span="12">
                    <el-form-item label="退库处理人">
                      <el-input v-model="formData.people"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="退库时间">
                      <el-date-picker
                              type="date"
                              placeholder="选择退库日期"
                              v-model="formData.time"
                              style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="退库使用公司" >
                      <el-select v-model="formData.company" placeholder="请选择公司">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="退库仓库">
                      <el-select v-model="formData.company" placeholder="请选择仓库">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="退库说明">
                      <el-input type="textarea" :rows="2" placeholder="退库备注" v-model="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="20" class="margin-value">
                    <el-button size="small" @click="dialogTableVisible4=true">选择资产</el-button>
                    <el-button type="danger" size="small">删除</el-button>

                    <!-- ----------------------弹窗2--------------------------------- -->

                    <el-dialog
                            width="70%"
                            height="50%"
                            title="选择资产"
                            :visible.sync="dialogTableVisible4"
                            append-to-body
                    >
                      <el-container>
                        <el-aside width="20%" class="tan2_aside" >
                          <div class="" style="border:1px solid #f0f0f0;width: 100%;">
                            <el-tree :data="asidedata"></el-tree>
                          </div>
                        </el-aside>
                        <el-main width="70%" >
                          <!--更换tableData的数据就行 在prop中写tableData中的字段-->
                          <el-table  style="width: 100%;"  border :data="tableData">
                            <el-table-column type="selection" fixed/>
                            <!--<el-table-column  label="资产条码" ></el-table-column>-->
                            <el-table-column prop="people" label="资产条码"></el-table-column>
                            <el-table-column  label="资产名称" ></el-table-column>
                            <el-table-column  label="资产类型"></el-table-column>
                            <el-table-column  label="规格型号"></el-table-column>
                            <el-table-column  label="产品序列"></el-table-column>
                            <el-table-column  label="计量单位"></el-table-column>
                            <el-table-column  label="金额"></el-table-column>
                            <el-table-column  label="使用公司"></el-table-column>
                            <el-table-column  label="使用部门"></el-table-column>
                            <el-table-column  label="购买时间"></el-table-column>
                            <el-table-column  label="使用人"></el-table-column>
                            <el-table-column  label="管理员"></el-table-column>
                            <el-table-column  label="存放地点"></el-table-column>
                            <el-table-column  label="使用期限"></el-table-column>
                            <el-table-column  label="来源"></el-table-column>
                          </el-table>
                          <el-row style="float: right;padding-top: 10px;">
                            <el-button :plain="true" @click="comfirm2" size="small">取消</el-button>
                            <el-button type="primary" :plain="true" @click="comfirm2" size="small">确定</el-button>
                          </el-row>
                        </el-main>
                      </el-container>
                    </el-dialog>

                  </el-col>
                  <el-col :span="24" class="margin-value">
                    <el-table
                            :data="tableData1"
                            border
                            style="width: 100%"
                            @select="checkSelect"
                            @select-all="checkSelectAll"
                    >
                      <el-table-column type="selection" fixed></el-table-column>
                      <el-table-column prop="people" label="资产条码"></el-table-column>
                      <el-table-column prop="company" label="资产名称"></el-table-column>
                      <el-table-column prop="department" label="资产类型"></el-table-column>
                      <el-table-column prop="storeroomTime" label="使用公司"></el-table-column>
                      <el-table-column prop="storeroomTime" label="使用部门"></el-table-column>
                      <el-table-column prop="storeroomTime" label="使用人"></el-table-column>
                      <el-table-column prop="storeroomTime" label="管理员"></el-table-column>
                      <el-table-column prop="storeroomTime" label="存放地点"></el-table-column>
                      <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-form>
              </el-row>

              <el-row style="padding-left:800px">
                <el-button :plain="true" @click="comfirm">取消</el-button>
                <el-button type="primary" :plain="true" @click="comfirm">确定</el-button>
              </el-row>
            </el-dialog>
            <el-button
                    class="margin-value"
                    type="primary"
                    icon="el-icon-search"
                    size="small"
                    @click="dialogTableVisible3=true"
            >新增</el-button>
            <el-button icon="el-icon-search" size="small">打印</el-button>
            <el-button icon="el-icon-search" size="small">导出</el-button>
          </el-row>
          <el-table
                  :data="tuikubiao1"
                  border
                  style="width: 100%"
                  @select="checkSelect"
                  @select-all="checkSelectAll"
          >
            <el-table-column type="selection" fixed></el-table-column>
            <el-table-column prop="people" label="退库单号"></el-table-column>
            <el-table-column prop="company" label="退库时间"></el-table-column>
            <el-table-column prop="department" label="仓库名称"></el-table-column>
            <el-table-column prop="storeroomTime" label="退库使用公司"></el-table-column>
            <el-table-column prop="storeroomTime" label="处理人"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
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
  // get请求json数据
  mounted() {
    this.$axios.get("/api/retirement").then(res => {
      // console.log(res);
      if (res.data.code == "200") {
        this.tableData = res.data.tableData;
      }
    });
  },
  data() {
    return {
      value1: "",
      dialogTableVisible: false,
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      dialogTableVisible4: false,
      tableData: [],
      tableData1: [],
      tuikubiao1:[],
      formData: [],
      options1: [
        {
          value: "选项一",
          label: "华为"
        },
        {
          value: "选项二",
          label: "小米"
        }
      ],
      options2: [
        {
          value: "选项一",
          label: "研发部"
        },
        {
          value: "选项二",
          label: "人事部"
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
      asidedata:[
        {label: '土地房屋及构筑物'},
        {label: '电器设备'}]
    };
  },
  components: {
    breadCrumb,
    dividePage,
    statusItem
  },
  methods: {
    //关闭弹窗
    comfirm() {
      this.dialogTableVisible = false;
      this.dialogTableVisible3 = false;
    },
    comfirm2() {
      this.dialogTableVisible2 = false;
      this.dialogTableVisible4 = false;
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
    },
    // 查看
    handleClick(row){
      console.log(row)
      this.dialogTableVisible = true
    }
  }
};
</script>
<style>
.picker {
  float: right;
}
.margin-value {
  margin-bottom: 10px;
}

  .tan2_aside{
    padding: 20px 30px 20px 10px;
  }
</style>