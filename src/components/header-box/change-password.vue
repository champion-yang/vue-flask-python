<template>
  <div>
    <breadCrumb/>
    <el-card>
      <el-tabs>
        <el-tab-pane label="修改密码"></el-tab-pane>
      </el-tabs>
      <!-- label-width增加宽度可以使label的值放输入框在前面 
      autocomplete 是否启用自动完成功能-->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input type="password" autocomplete="off" v-model.number="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.number="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetFrom('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import breadCrumb from "@/components/others/bread-crumb";
export default {
  data() {
     var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
      activeName: "second",
      ruleForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          {type:'number',message:'密码一定为数字'},
          { required: true, message: "密码不能为空", trigger: "blur" },
          {validator:validatePass,trigger: "blur"}
        ],
        checkPass: [
          {type:'number',message:'密码一定为数字'},
          { required: true, message: "密码不能为空", trigger: "blur" },
          {validator:validatePass2,trigger: "blur"}
        ]
      }
    };
  },
  components: {
    breadCrumb
  },
  methods: {
    handleClick(tab, event) {},
    submitForm(formName) {
      console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      },
    resetFrom(formName){
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    this.ruleForm.username = this.$store.state.username
  },
};
</script>