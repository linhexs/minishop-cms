<template>
  <div class="container">
     <el-dialog title="提示" :visible.sync="showDialog" width="30%" center>
      <span>确定删除id为{{ id }}的{{text}}？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$emit('submit')">确 定</el-button>
        <el-button @click="$emit('cancel')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    props:{
        showDialog:Boolean,
        id:Number,
        text:String
    },
  data() {
    return {}
  },
}
</script>

<style scoped lang="stylus"></style>
