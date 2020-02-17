<template>
  <el-form label-width="100px" ref="form" :model="form" :rules="rules">
    <el-form-item label="分类名称" prop="name">
      <el-input v-model="form.name" autocomplete="off" placeholder="请填写分类名称"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="description">
      <el-input
        size="medium"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8 }"
        placeholder="请输入简介"
        v-model="form.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="分类图片" :prop="form.topic_img_id">
      <upload-imgs
        ref="uploadEle"
        :value="img"
        :multiple="true"
        :max-num="1"
        :remote-fuc="uploadImage"
      />
    </el-form-item>
    <div class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="resetForm">重 置</el-button>
    </div>
  </el-form>
</template>
<script>
import UploadImgs from '@/components/base/upload-imgs'
import img from '../../../../models/img'
//生成随机数
function createId() {
  return Math.random()
    .toString(36)
    .substring(2)
}

export default {
  components: {
    UploadImgs,
  },
  props: {
    data: Object,
  },
  created() {
    //如果有传入props就覆盖form，没有就保持原来的form，对应新增和编辑的场景
    this.form = this.data || this.form
    // 存在图片元素，初始图片元素组件
    if (this.data !== undefined) {
      this.initImage()
    }
  },
  data() {
    return {
      form: {},
      img: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入分类名',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入分类描述',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    /**
     * 初始化图片
     */
    initImage() {
      const img = {
        id: createId(),
        imgId: '' + this.data.img.id,
        display: this.data.img.url,
      }
      this.img.push(img)
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    /**
     * 图片上传
     */
    async uploadImage(file) {
      const res = await img.imageUpload(file)
      for (let i = 0; i < res.length; i++) {
        // 固定用法，返回一个promise
        return Promise.resolve({
          id: res[i].id,
          url: res[i].url,
        })
      }
    },
    /**
     * 提交
     */
    async handleSubmit() {
      const img = await this.$refs.uploadEle.getValue()
      console.log(img)
      if (img.length === 1) {
        this.form.topic_img_id = img[0].imgId
      } else {
        this.form.topic_img_id = ''
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.form)
        }
      })
    },
  },
}
</script>
<style lang="scss">
.dialog-footer {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>