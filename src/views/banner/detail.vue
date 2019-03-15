<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="上传图片">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleAvatarError"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/">
          <img v-if="form.img" :src="form.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="form.url"/>
      </el-form-item>
      <el-input v-model="form.id" type="hidden"/>
      <el-form-item>
        <el-button :loading="isLoading" type="primary" @click="onSubmit()">{{ isEdit ? '编辑' : '新增' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editBanner } from '@/api/banner'
export default {
  data() {
    return {
      form: {
        url: '',
        img: '',
        id: 0
      },
      isEdit: false,
      isLoading: false
    }
  },
  watch: {
    '$route'(to, from) {
      var id = Number(to.params.id)
      this.isEdit = id > 0
      this.form.id = id
    }
  },
  created() {
    var id = this.$route.params.id
    this.form.id = id
    this.isEdit = id > 0
  },
  methods: {
    onSubmit() {
      var message = ''
      console.log(this.form)
      if (!this.form.img) {
        message = '请先上传图片'
      }
      if (!this.form.url) {
        message = '请输入链接地址'
      }
      if (message) {
        this.$message.error(message)
        return
      }
      this.isLoading = true
      this.editBanner(this.form)
    },
    editBanner(options) {
      editBanner(options).then(res => {
        if (res.data.success) {
          this.$message('编辑成功')
          this.$router.push({ name: 'list', params: { id: 1 }})
        }
      })
    },
    beforeAvatarUpload(file) {
      this.isLoading = true
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.form.img = URL.createObjectURL(file.raw)
      this.isLoading = false
    },
    handleAvatarError(err, file) {
      console.log(err)
      this.$message.error('上传头像失败，请重新上传或联系管理员!')
      this.isLoading = false
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>
<style scoped>
.line{
  text-align: center;
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

