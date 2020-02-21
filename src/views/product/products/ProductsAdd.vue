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
        <Form></Form>
    </div>
  </div>
</template>
<script>
import Form from './components/Form'
export default {
  name: 'productAdd',
  components:{
    Form
  },
  methods: {
      handleBack(){
          this.$router.push('/product/list')
      }
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