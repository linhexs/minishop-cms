<template>
  <div class="container">
    <div class="title">新增轮播图</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" :rules="formRules" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input placeholder="请输入轮播图名称" size="medium" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
              <el-input
                type="textarea"
                placeholder="轮播图简介"
                :autosize="{ minRows: 4, maxRows: 4 }"
                v-model="form.description"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="block-box">
                <el-link type="primary" v-if="!form.items.length" @click="addContent">
                  添加
                  <i class="iconfont icon-jia plus"></i>
                </el-link>
                <el-row class="input-row" v-for="(item, index) in form.items" :key="index">
                  <el-form-item>
                    <el-link type="primary" v-if="form.items.length" @click="removeContent">
                      轮播图{{ index + 1 }}
                      <i class="iconfont icon-jian1 minus"></i>
                    </el-link>
                  </el-form-item>
                  <el-col :lg="12">
                    <el-form-item label="关键字" prop="key_word">
                      <el-input
                        v-model="item.key_word"
                        placeholder="请输入内容"
                        size="medium"
                        class="input-detail"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="导向类型" prop="itemType">
                      <el-select v-model="item.type" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="轮播内容" prop="upImg">
                      <upload-imgs ref="uploadEle3" :rules="rules" :max-num="1" @func="getImgPath" />
                    </el-form-item>
                    <div class="function">
                      <el-link
                        type="primary"
                        v-if="index === form.items.length - 1"
                        @click="addContent"
                      >
                        添加
                        <i class="iconfont icon-jia plus"></i>
                      </el-link>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import UploadImgs from '@/components/base/upload-imgs'
import banner from '../../../models/banner'
import img from '../../../models/img'
import error from '../../../common/error'

export default {
  components: {
    UploadImgs,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        items: [],
      },
      /**
       * select类型
       */
      options: [
        {
          value: 0,
          label: '无导向',
        },
        {
          value: 1,
          label: '导向商品',
        },
        {
          value: 2,
          label: '导向专题',
        },
      ],
      /**
       * 图片规则
       */
      rules: {
        minWidth: 100,
        minHeight: 100,
        maxSize: 5,
      },
      /**
       * 验证表单
       */
      formRules: {
        name: [
          {
            required: true,
            message: '请输入轮播图名称',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入轮播图简介',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    /**
     * 添加item
     */
    addContent() {
      this.form.items.push({
        key_word: '',
        type: null,
        img_id: null,
      })
    },
    /**
     * 减少item
     */
    removeContent(index) {
      this.form.items.splice(index, 1)
    },
    /**
     * 提交到服务器
     */
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const res = await banner.addBanner(this.form)
            if (res.error_code === 0) {
              this.$message.success(`${res.msg}`)
              this.resetForm(formName)
            }
          } catch (e) {
            this.$message({
              message: error(e.data.msg),
              type: 'error',
            })
          }
        } else {
          this.$message({
            message: '请将信息填写完整',
            type: 'error',
          })
        }
      })
    },
    /***
     * 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.form.items = []
    },
    /**
     * 获取上传图片id
     */
    async getImgPath(path) {
      const res = await img.addImage(path)
      const itemsLength = this.form.items.length - 1
      this.form.items[itemsLength].img_id = res.result.imgId
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
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
