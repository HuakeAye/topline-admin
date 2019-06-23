<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <div class="login-head">
        <img src="./logo_index.png"
             alt="">
      </div>
      <div class="login-form">
        <el-form :model="form"
                 :rules="rules"
                 ref="ruleForm">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-col :span="10">
              <el-input v-model="form.code"
                        placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="10"
                    :offset="2">
              <el-button @click="handleSendCode">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleLogin"
                       :loading="loginloading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '18330606912',
        code: ''
      },
      loginloading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度必须11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须6位', trigger: 'blur' }
        ]
      },
      captchaObj: null
    }
  },
  methods: {
    handleLogin () {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return
        }
        this.sublogin()
      })
    },

    sublogin () {
      this.loginloading = true
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginloading = false
        this.$router.push({ name: 'home' })
      }).catch(err => {
        if (err.response.status >= 400) {
          this.$message.error('登录失败')
        }
        this.loginloading = false
      })
    },

    handleSendCode () {
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return
        }

        if (this.captchaObj) {
          return this.captchaObj.verify()
        }
        const { mobile } = this.form
        console.log(mobile)
        axios({
          method: 'GET',
          url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
        }).then(res => {
          const data = res.data.data
          console.log(data)
          window.initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
            product: 'bind'
          }, (captchaObj) => {
            this.captchaObj = captchaObj
            captchaObj.onReady(function () {
              captchaObj.verify()
            }).onSuccess(function () {
              const {
                geetest_challenge: challenge,
                geetest_seccode: seccode,
                geetest_validate: validate } =
                captchaObj.getValidate()
              console.log(challenge)
              axios({
                method: 'GET',
                url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                params: {
                  challenge,
                  seccode,
                  validate
                }
              }).then(res => {
                console.log(res.data)
              })
            })
          })
        })
      })
    }
  }
}
</script>

<style lang='less'>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  .login-head {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .login-form-wrap {
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
    .btn-login {
      width: 100%;
    }
  }
}
.el-form-item__content {
  padding: 0;
}
</style>
