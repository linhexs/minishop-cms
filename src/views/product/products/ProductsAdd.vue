<template>
  <div class="container">
    <div class="header">
      <span>新增商品</span>
      <span class="back" @click="handleBack">
        <i class="iconfont icon-fanhui" /> 返回
      </span>
    </div>
    <el-divider />
    <div class="form-container">
      <Form @submit="handleSubmit"></Form>
    </div>
  </div>
</template>
<script>
import Form from './components/Form'
import product from '@/models/product'
import error from '@/common/error'
export default {
  name: 'productAdd',
  components: {
    Form,
  },
  methods: {
    handleBack() {
      this.$router.push('/product/list')
    },
    async handleSubmit(formData) {
      try {
        const res = await product.addProduct(formData)
        // 添加成功，弹出一条消息提示
        this.$message.success(res.msg)
        this.handleBack()

      } catch (e) {
        console.log(e)
        // 提示异常信息
        this.$message.error(error(e.data.msg))
      }
    },
  },
}
</script>
<style lang="scss">
.el-divider--horizontal {
  margin: 0;
}
.container {
  .header {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }
  .form-container {
    margin: 30px;
  }
}
</style>