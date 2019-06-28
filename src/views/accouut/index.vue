<template>
  <el-card>
    <div slot="header"
         class="clearfix">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled
                      :value="userInfo.id && userInfo.id.toString()"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled
                      :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleUpdadate"
                       type="primary">更新账户信息</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4"
              :offset="2">
        <el-upload v-loading="loadingimg"
                   class="avatar-uploader"
                   action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
                   :show-file-list="false"
                   :http-request="handleupdateimg">
          <img v-if="userInfo.photo"
               :src="userInfo.photo"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'userinfo',
  data () {
    return {
      userInfo: {},
      loadingimg: false
    }
  },
  created () {
    this.$http({
      method: 'GET',
      url: '/user/profile'
    }).then(data => {
      console.log(data)
      this.userInfo = data
    })
  },
  methods: {
    handleupdateimg (Upload) {
      this.loadingimg = true
      const formData = new FormData()
      formData.append('photo', Upload.file)
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then(data => {
        this.userInfo.photo = data.photo
        this.loadingimg = false
        this.$message({
          message: '用户头像更新成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.loadingimg = false
        this.$message.error('用户头像更新失败')
      })
    },
    handleUpdadate () {
      const { name, intro, email } = this.userInfo
      this.$http({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(data => {
        this.$message({
          message: '更改成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更改失败')
      })
    }
  }
}
</script>

<style scope>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
