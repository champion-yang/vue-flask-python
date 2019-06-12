<template>
<div class="bgimg">
  <div class="box">
    <div class="left">
      <img src="../assets/login02.png">
    </div>
    <div class="right">
      <h3>用户登录</h3>
      <el-form :model="numberValidateForm"  status-icon ref="numberValidateForm">
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
          <el-input v-model.number="numberValidateForm.pass" type="pass" ></el-input>
        </el-form-item>
        
        <el-row >
          <el-button type="primary"  style="width:100%"  @click="submitForm('numberValidateForm')">登陆</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</div>
  <!-- <el-button :plain="true" @click="open4">错误</el-button> -->
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 后台的验证
        fetch("/api/login",{
          method:"post",
          headers:{
            'content-type':'application/x-www-form-urlencoded'
          },
          body:`name=${this.numberValidateForm.name}&pass=${this.numberValidateForm.pass}`
        }).then((r) => {
          return r.json()  //
        }).then((data) => {
          if (data.status == 'ok'){
              // this.$store.dispatch('login', this.numberValidateForm);
              // this.$store.state.username =  this.numberValidateForm.name;
              // this.$message({message: '登录成功',type: 'success'});
              this.$message.success(data.info)
              sessionStorage.setItem('accessToken',data.session)
              this.$router.push({name:'indexPage'})
          }else{
              this.$message.error(data.info);
              return false;
          }
        })
        // if(valid){
        //   return 'ok'
        // }
        // else {
        //   return 'no'
        // }

        // vue写的验证
        // if (valid) {
        //   this.$store.dispatch('login', this.numberValidateForm);
        //   this.$store.state.username =  this.numberValidateForm.name;
        //   this.$message({message: '登录成功',type: 'success'});
        //   this.$router.push({name:'indexPage'})
        // } else {
        //   this.$message.error('登录失败');
        //   return false;
        // }
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



