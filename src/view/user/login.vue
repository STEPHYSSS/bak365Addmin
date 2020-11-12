<template>
  <div class="loginContent">
    <div class="loginGuard">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label prop="UserName">
          <el-input v-model="loginForm.UserName" placeholder="请输入账号" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label prop="PassWord">
          <el-input
            v-model="loginForm.PassWord"
            placeholder="请输入密码"
            @keyup.enter.native="login"
            type="password"
            width="250px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="btnStyle"
            type="blue"
            @click="login"
            style="margin-top:20px"
            :loading="loading"
          >登录</el-button>
        </el-form-item>
        <div style="color:#fff;position:absolute;bottom:-25px;right:0">
          Copyright {{new Date().getFullYear()}}-{{new
          Date().getFullYear()+1}} by BAK365
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetQueryString } from "@/config/publicFunction";

export default {
  data() {
    return {
      loginForm: {},
      loading: false,
      rules: {
        UserName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        PassWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // this.$router.push({path: '/login' + '?AppNo=001'})    //记得删除，模拟商户编号
    // this.loginForm.BusinNo = GetQueryString('BusinNo')
    this.loginForm.AppNo = GetQueryString("AppNo");
  },
  computed: {},
  methods: {
    login() {
      this.loginForm.AppNo = GetQueryString("AppNo");
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          this.loading = true;
          try {
            await this.$store.dispatch("LoginBy", this.loginForm);
            this.loading = false;
            this.$router.push("/weChat/manager");
          } catch (e) {
            this.loading = false;
            this.$message.error(e);
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.loginContent {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/pin1.jpg") no-repeat;
  background-size: cover;

  .loginGuard {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .demo-ruleForm {
    position: absolute;
    margin: auto;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    padding-top: 50px;
    width: 500px;
    border: 2px solid #eee;
    height: 300px;
    text-align: center;

    .btnStyle {
      width: 300px;
      border-radius: 22px;
    }

    .el-form-item {
      width: 400px;
    }

    .el-input__inner {
      border-radius: 22px;
      background: transparent;
      color: #fff;
    }
  }
}
</style>
