<template>
  <div class="container">
    <div class="header">
      <span>修改商品信息</span>
      <span class="back" @click="handleBack">
        <i class="iconfont icon-fanhui" /> 返回
      </span>
    </div>
    <el-divider />
    <div class="form-container">
      <Form @submit="handleSubmit" :productEdit="productEditData"></Form>
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
  props: {
    productEditData: Object,
  },
  created() {
    this.initData()
  },
  data() {
    return {
      img: [],
      property: [],
    }
  },
  methods: {
    handleBack() {
      this.$emit('editClose')
    },
    initData() {
      const image = this.productEditData.image
      const property = this.productEditData.property
      const id = this.productEditData.id
      if (image.length > 0) {
        const imgData = image.map(item => {
          return {
            img_id: item.img_id,
            order: 1,
            product_id: id,
            id: item.id,
          }
        })
        this.img = imgData
      }
      if (property.length > 0) {
        this.property = this.productEditData.property
      }
    },
    /**
     * 提交表单
     */
    async handleSubmit(formData) {
      try {
        const res = await product.editProduct(formData)
        // 添加成功，弹出一条消息提示
        await this.updateProductItem(formData.image, formData.property)
        this.$message.success(res.msg)
        this.handleBack()
      } catch (e) {
        this.$message.error(error(e.data.msg))
      }
    },
    /**
     * 处理商品介绍逻辑
     */
    async updateProductItem(image, property) {
      let addProductItems = []
      let editProductItems = []
      let delProductItems = []
      if (JSON.stringify(this.img) !== JSON.stringify(image)) {
        addProductItems = this._processAddItemsArray(image)
        delProductItems = this._processDelItemsArray(image)
        editProductItems = this._processEditItemsArray(image)
      }
      try {
        if (delProductItems.length > 0) {
          const ids = delProductItems.map(item => item.id)
          await product.delProductImg(ids)
        }
        if (addProductItems.length > 0) {
          const addpropertyImg = addProductItems.map(item => {
            return {
              img_id: item.img_id,
              order: item.order,
              product_id: item.product_id,
            }
          })
         await product.addProductImg(addpropertyImg)
        }
        if (editProductItems.length > 0) {
          await product.editProductImg(editProductItems)
        }
      } catch (e) {
        throw Object.values(e.data.msg).join('；')
      }
    },
    //处理介绍图片修改
    _processEditItemsArray(image) {
      return image.filter(item => {
        const res = this.img.find(i => i.id === item.id)
        if (typeof res !== 'undefined') {
          // 比对两个元素的各项值是否存在差异，只要其中一个有变化，就是属于待修改的
          return item.img_id !== res.img_id
        }
      })
    },
    //处理介绍图片删除
    _processDelItemsArray(image) {
      // 如果原bannerItem被删除了，那么在表单数据里面肯定是找不到的
      // find()函数在找不到条件的结果时会返回一个undefined
      return this.img.filter(oriItem => {
        const res = image.find(item => item.id === oriItem.id)
        return typeof res === 'undefined'
      })
    },
      //处理介绍图片新增
    _processAddItemsArray(image) {
      return image.filter(item => item.id === '')
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