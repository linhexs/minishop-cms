<template>
  <div class="container">
    <div class="title">新增主题</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16">
          <el-form
            :model="form"
            :rules="rules"
            status-icon
            ref="form"
            label-width="100px"
            @submit.native.prevent
          >
            <el-form-item label="名称" prop="name">
              <el-input placeholder="请输入主题名称" size="medium" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
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
                :multiple="true"
                :max-num="1"
                :remote-fuc="uploadImage"
              />
            </el-form-item>
            <el-form-item label="详情页头图">
              <upload-imgs
                ref="uploadEle2"
                :multiple="true"
                :max-num="1"
                :remote-fuc="uploadImage"
              />
            </el-form-item>
          </el-form>
          <div class="product-title">关联商品</div>
          <div class="product-btn">
            <el-button @click="addProduct">选择关联商品</el-button>
          </div>
          <el-table :data="productValue" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="200"></el-table-column>
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
            <el-button @click="back">取消</el-button>
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
  data() {
    return {
      showDialog: false,
      loading: true,
      products: [], //全部可用的关联商品
      productData: [], //transfer中渲染数据
      productByName: [], //所有商品name
      productByStatus: 0, //transfer渲染数据状态
      productKey: [], //transfer选定的数据索引
      productValue: [], //商品表格数据
      form: {
        name: '',
        description: '',
        topic_img_id: null,
        head_img_id: null,
      },
      filterMethod(query, item) {
        return item.product.indexOf(query) > -1
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入主题名称',
            trigger: 'blur',
          },
        ],
        description: [
          {
            required: true,
            message: '请输入主题简介',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
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
            key: index,
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
      this.productValue = []
      this.productKey.forEach(index => {
        this.productValue.push(this.products[index])
      })
      this.showDialog = false
    },
    /**
     * 获取图片
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
        this.form.topic_img_id = img1[0].imgId
        this.form.head_img_id = img2[0].imgId
      }
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const res = await theme.addTheme(this.form)
            var ids = []
            this.productValue.forEach((value, key) => {
              ids.push(value.id)
            })
            if (res.error_code === 0) {
              await theme.addRelProduct(res.result.id, { products: ids })
              this.$message.success(`${res.msg}`)
             this.back()
            }
          } catch (e) {
            this.$message({
              message: error(e.data.msg),
              type: 'error',
            })
          }
        } else {
          this.$message.error('信息不完整')
        }
      })
    },
    back(){
      this.$router.push('/theme/list')
    }
  }
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
