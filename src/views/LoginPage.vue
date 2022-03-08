<template>
  <div class="login-bg">
    <div class="login-block">
      <div class="login-block__info-box">
        <h4>welcom</h4>
        <h5>后台管理系统</h5>
      </div>
      <div class="login-block__form-box">
        <el-form
          label-position="top"
          label-width="100px"
          :model="loginForm"
          style="max-width: 460px"
        >
          <el-form-item label="User Name">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="loginForm.password" />
          </el-form-item>
          <el-form-item label="Code">
            <div class="row">
              <el-input v-model="loginForm.code" />
              <validate-code @get-result="codeResult" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.isRemberPwd" label="记住密码" name="type" size="large" />
          </el-form-item>
          <el-form-item>
            <mi-captcha theme-color="#409eff" width="100%" @onCaptchaInit="onCaptchaSuccess" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" round size="large" :loading="loading" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

import ValidateCode from '@/components/ValidateCode.vue'
export default {
  components: { ValidateCode },
  data() {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        code: '',
        isRemberPwd: true
      }
    }
  },
  methods: {
    submit() {
      this.loading = true
      setTimeout(() => {
        this.logding = false
        this.$router.replace('/')
      }, 1500)
    },
    codeResult(val) {
      this.loginForm.resultCode = val
      console.log(val)
    },
    onCaptchaSuccess(res) {
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.row{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
