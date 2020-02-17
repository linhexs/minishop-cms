<template>
  <el-dialog :title="formTitle" :visible.sync="visible" :before-close="modalClose">
    <control-form :data="formData" @submit="editCategory"></control-form>
  </el-dialog>
</template>
<script>
import ControlForm from './components/Form'
import product from '../../../models/product'
import error from '../../../common/error'
export default {
  components: {
    ControlForm,
  },
  props: {
    editData: Object,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.formData = this.editData
    console.log('我edit初始化了')
  },
  data() {
    return {
      //showFormDialog: true,
      formTitle: '修改分类信息',
      formData: {},
    }
  },
  methods: {
    modalClose() {
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    async editCategory(val) {
      const id = this.formData.id
      try {
        const res = await product.editCategory(id, val)
        this.$message({
          message: res.msg,
          type: 'success',
        })
        this.$emit('getCategory')
      } catch (e) {
        this.$message({
          message: error(e.data.msg),
          type: 'error',
        })
      }
    },
  },
}
</script>
<style lang="scss">
</style>