<template>
  <div class="container">
    <div class="title">新增轮播图</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <Form @submit="handleSubmit"></Form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import error from '@/common/error'
import Form from './components/Form'
import banner from '@/models/banner'
export default {
  components: {
    Form,
  },
  methods: {
    async handleSubmit(formData) {
      formData.items = formData.items.map(item => ({
        img_id: item.img_id,
        key_word: item.key_word,
        type: item.type,
      }))
      // 调用模型方法新增轮播图
      try {
        const res = await banner.addBanner(formData)
        // 添加成功，弹出一条消息提示
        this.$message.success(res.msg)
        this.$router.push('/banner/list')
      } catch (e) {
        // 提示异常信息
        this.$message.error(e.data.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/title.scss';
.container {
  .title {
    border-bottom: 1px solid #dae1ec;
  }
  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
  .icon-jian1 {
    color: red;
    size: 18px;
    font-weight: bold;
  }
}
</style>
