<template>
  <div class="admin_login">
    <div class="content">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">xxxx管理后台</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width: 283px;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <a href="#" class="forget">忘记密码？</a>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    name: 'Login',
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    created () {
      var lett = this
      document.onkeyup = function(e) {
        var key=window.event.keyCode
        if(key === 13) {
          lett.handleSubmit2()
        }
      }
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/table' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style scoped>
  .header_img{
    width: 100%;
    height: 120px;
    background-color: #fff;
  }
  .header_img img{
    width: 340px;
    margin-left: 360px;
    margin-top: 25px;
  }
  .content{
    width: 100%;
    height: 735px;
    margin: 0;
    overflow: hidden;
    background-image: url("../../static/img/bg_houtai.jpg");
  }
  .login-container {
    width: 363px;
    height: 359px;
    font-family: PingFang-SC-Medium;
    margin: 126px auto;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden;
  }
  .title {
    margin: 30px auto;
    font-size: 21px;
    font-weight: normal;
    font-stretch: normal;
    text-align: center;
    color: #fff;
  }
  .el-form-item {
    width: 283px;
    margin: 30px 40px;
  }
  .remember {
    float: left;
    color: #ffffff;
    margin-left: 40px;
  }
  .forget{
    text-decoration: none;
    float: right;
    margin-right: 40px;
    color: #fff;
  }
  .el-button--primary {
    color: #fff;
    font-size: 18px;
    background-color: #408fc5;
    border-color: #408fc5;
    border-radius: 0;
  }
  .el-footer {
    width: 550px;
    font-size: 15px;
    margin: 32px auto;
    color: #333333;
  }
  .el-footer div:nth-child(1) {
    width: 390px;
    margin: 10px auto;
  }
  .el-footer div span{
    border-bottom: 1px solid #333333;
  }
</style>