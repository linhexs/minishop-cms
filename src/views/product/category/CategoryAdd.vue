<template>
  <el-dialog :title="formTitle" :visible.sync="visible" :before-close="modalClose">
    <control-form @submit="addCategory"></control-form>
  </el-dialog>
</template>
<script>
import ControlForm from './components/Form'
import error from '../../../common/error'
import product from '../../../models/product'
export default {
  components: {
    ControlForm,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    console.log('我add初始化了')
  },
  data() {
    return {
      showFormDialog: false,
      formTitle: '新增分类',
    }
  },
  methods: {
    modalClose() {
      console.log(111)
      this.handleClose()
      this.$emit('update:visible', false) // 直接修改父组件的属性
    },
    /**
     * 添加分类
     */
    async addCategory(val) {
      try {
        const res = await product.addCategory(val)

        this.$message({
          message: res.msg,
          type: 'success',
        })
       this.handleClose()
      } catch (e) {
        console.log(e)
        this.$message({
          message: error(e.data.msg),
          type: 'error',
        })
      }
    },
    handleClose(){
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
</style>