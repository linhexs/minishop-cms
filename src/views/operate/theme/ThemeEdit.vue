<template>
  <div class="container">
    <div class="title">
      <span>编辑主题</span>
      <span class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
    </div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="名称">
              <el-input placeholder="请输入主题名称" size="medium" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input
                type="textarea"
                placeholder="请输入主题简介"
                :autosize="{ minRows: 4, maxRows: 4 }"
                v-model="form.description"
              ></el-input>
            </el-form-item>
            <el-form-item label="主题图">
              <upload-imgs
                ref="uploadEle1"
                :remote-fuc="uploadImage"
                :multiple="true"
                :max-num="1"
                :value="topic_img"
              />
            </el-form-item>

            <el-form-item label="详情页头图">
              <upload-imgs
                ref="uploadEle2"
                :remote-fuc="uploadImage"
                :multiple="true"
                :max-num="1"
                :value="head_img"
              />
            </el-form-item>
          </el-form>
          <div class="product-title">关联商品</div>
          <div class="product-btn">
            <el-button @click="addProduct">选择关联商品</el-button>
          </div>
          <el-table :data="productValue" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
            <el-table-column prop="price" label="单价" width="200"></el-table-column>
            <el-table-column prop="stock" label="商品库存" width="200"></el-table-column>
            <el-table-column prop="summary" label="商品摘要" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-dialog title="添加关联商品" :visible.sync="showDialog">
            <template>
              <el-transfer
                v-loading="loading"
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入商品名称"
                v-model="productKey"
                :data="productData"
              ></el-transfer>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sendToProductTable">确 定</el-button>
                <el-button @click="showDialog = false">取 消</el-button>
              </span>
            </template>
          </el-dialog>
          <div class="save-theme-btn">
            <el-button type="primary" @click="submitForm('form')">保存</el-button>
            <el-button>重置</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import UploadImgs from '@/components/base/upload-imgs'
import banner from '../../../models/banner'
import img from '../../../models/img'
import theme from '../../../models/theme'
import error from '../../../common/error'
export default {
  components: {
    UploadImgs,
  },
  props: {
    id: String,
  },
  created() {
    this.getIninData(this.id)
  },
  data() {
    return {
      showDialog: false,
      topic_img: [], //话题图片
      loading: true,
      head_img: [], //头图
      products: [], //全部可用的关联商品
      productData: [], //transfer中渲染数据
      productByName: [], //所有商品name
      productByStatus: 0, //transfer渲染数据状态
      productKey: [], //transfer选定的数据索引
      productValue: [], //商品表格数据
      form: {},
      productByIds: [], //初始化编辑主题关联商品
      filterMethod(query, item) {
        return item.product.indexOf(query) > -1
      },
    }
  },
  methods: {
    /**
     * 获取初始化数据
     */
    async getIninData(id) {
      const res = await theme.getThemeById(id)
      this.form = {
        name: res.name,
        description: res.description,
        topic_img_id: res.topic_img.id,
        head_img_id: res.head_img.id,
      }
      this.topic_img = [
        {
          id: res.topic_img.id,
          display: res.topic_img.url,
        },
      ]
      this.head_img = [
        {
          id: res.head_img.id,
          display: res.head_img.url,
        },
      ]
      const ids = []
      res.products.map(item => {
        ids.push(item.id)
      })
      this.productByIds = ids
      this.productKey = ids
      this.productValue = res.products
    },
    /**
     * 向transfer中添加商品逻辑
     */
    async addProduct() {
      this.showDialog = true
      const resByProducts = await theme.getProducts()
      this.products = resByProducts
      if (this.productByStatus === 0) {
        resByProducts.forEach((element, index) => {
          this.productByName.push(element.name)
          this.productData.push({
            label: element.name,
            key: element.id,
            product: this.productByName[index],
          })
          this.loading = false
          this.productByStatus = 1
        })
      }
    },
    /**
     * 将数据渲染到表格上
     */
    sendToProductTable() {
      const products = this.products
      const productKey = this.productKey
      const productTable = []
      products.forEach(item => {
        const val = productKey.includes(item.id)
        if (val) {
          productTable.push(item)
        }
      })
      this.productValue = productTable
      this.showDialog = false
    },
    /**
     * 图片url
     */
    async uploadImage(file) {
      // 调用自定义图片上传的接口
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
     * 提交表单
     */
    async submitForm(formName) {
      const img1 = await this.$refs.uploadEle1.getValue()
      const img2 = await this.$refs.uploadEle2.getValue()
      if (img1.length > 0 && img2.length > 0) {
        this.form.topic_img_id = img1[0].id
        this.form.head_img_id = img2[0].id
      }
      try {
        const res = await theme.editTheme(this.id, this.form)
        await this.updateProduct()
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.back()
        }
      } catch (e) {
        this.$message({
          message: error(e.data.msg),
          type: 'error',
        })
      }
    },
    async updateProduct() {
      let addProduct = []
      let delProduct = []
      if (JSON.stringify(this.productKey) !== JSON.stringify(this.productByIds)) {
        addProduct = this._processAddArray(this.productKey)
        if (addProduct.length > 0) {
          const productByIdsobj = {products:addProduct.map(item=>parseInt(item))}
          await theme.addRelProduct(this.id,productByIdsobj)
        }
        delProduct = this._processDelArray(this.productKey)
        if(delProduct.length> 0){
          const productByIdsobj = {products:delProduct.map(item=>parseInt(item))}
          await theme.delRelProduct(this.id,productByIdsobj)
        }
      }
    },
    //删除关联商品
    _processDelArray(productKey) {
      // 如果原bannerItem被删除了，那么在表单数据里面肯定是找不到的
      // find()函数在找不到条件的结果时会返回一个undefined
      return this.productByIds.filter(item => {
        const res = productKey.find(items => item === items)
        return typeof res === 'undefined'
      })
    },
    //处理增加关联商品
    _processAddArray(productKey) {
      return productKey.filter(item =>{
        const res = this.productByIds.find(items => items != item)
        return res
      })
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>
<style lang="scss" scoped>
@import './../../../assets/styles/title.scss';
@import './../../../assets/styles/realize/mixin.scss';
.container {
  .title {
    @include bottom-line();
  }
  .wrap {
    padding: 20px;
    .product-title {
      color: $parent-title-color;
      margin: 20px 0px;
    }
    .product-btn {
      margin: 20px 0px;
    }
    .save-theme-btn {
      margin: 30px 0;
      text-align: center;
    }
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
