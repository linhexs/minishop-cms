<template>
  <div class="container">
    <el-row>
      <el-col :lg="16">
        <el-form label-width="100px" ref="form" :rules="rules" :model="form">
          <el-form-item label="商品图片">
            <upload-imgs
              ref="uploadEle"
              :value="mainImage"
              :multiple="true"
              :max-num="1"
              :remote-fuc="uploadImage"
            />
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input autocomplete="off" v-model="form.name" placeholder="请填写商品名称"></el-input>
          </el-form-item>
          <el-form-item label="所属分类" prop="category_id">
            <el-select placeholder="请选择" v-model="form.category_id">
              <el-option
                v-for="item in category"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input v-model="form.price" autocomplete="off" placeholder="请填写商品单价"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model.number="form.stock" autocomplete="off" placeholder="请填写商品库存量"></el-input>
          </el-form-item>
          <el-form-item label="概述" prop="summary">
            <el-input
              v-model="form.summary"
              type="textarea"
              placeholder="请输入商品概述"
              :autosize="{ minRows: 4, maxRows: 4 }"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.status"
              active-color="#00C292"
              inactive-color="#E46A76"
              active-text="上架"
              inactive-text="下架"
            ></el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="product-item">
      <div class="product-title">商品介绍数据</div>
      <div class="product-child-title">商品介绍图</div>
      <upload-imgs
        ref="uploadEle1"
        :value="propertyImage"
        :multiple="true"
        :max-num="8"
        :remote-fuc="uploadImage"
      />
      <div class="product-child-title">商品属性</div>
      <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
      <el-button type="danger" @click="deleteTable">删除</el-button>
      <div class="product-item-table">
        <el-table
          ref="multipleTable"
          :data="form.property"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="属性名称"></el-table-column>
          <el-table-column prop="detail" label="属性详情"></el-table-column>
        </el-table>
      </div>
      <div class="save-product-btn">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <el-dialog title="新增商品属性" :visible.sync="dialogFormVisible">
      <el-form :model="propertyForm" :rules="propertyFormRules">
        <el-form-item label="属性名称" :label-width="'90px'" prop="name">
          <el-input v-model="propertyForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性详情" :label-width="'90px'" prop="detail">
          <el-input v-model="propertyForm.detail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addProperty">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
function createId() {
  return Math.random()
    .toString(36)
    .substring(2)
}

import UploadImgs from '@/components/base/upload-imgs'
import img from '@/models/img'
import imgDeal from '@/common/imgDeal'
import product from '@/models/product'
export default {
  components: {
    UploadImgs,
  },
  created() {
    this.initCategory()
    this.form = this.productEdit || this.form
    if (this.form.img_id !== null && this.form.main_img_url !== '') {
      this.initMainImage()
    }
    if (this.form.image.length > 0) {
      this.initPropertyImage()
    }
  },
  props: {
    productEdit: Object,
  },
  data() {
    return {
      productImg: [], //添加商品图
      dialogFormVisible: false,
      form: {
        name: '',
        price: '',
        category_id: null,
        main_img_url: '',
        img_id: null,
        stock: '',
        summary: '',
        status: true,
        image: [],
        property: [],
      },
      mainImage: [], //修改商品初始化主图
      propertyImage: [], //修改商品初始化介绍图
      //商品属性
      propertyForm: {
        name: '',
        detail: '',
      },
      //商品分类数据
      category: [],
      //表格选中数据
      selectData: [],

      //验证表单
      rules: {
        name: [
          {
            required: true,
            message: '商品名称不能为空',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: '商品价格不能为空',
            trigger: 'blur',
          },
        ],
        stock: [
          {
            required: true,
            message: '商品库存不能为空',
            trigger: 'blur',
          },
          { type: 'number', message: '商品库存必须为数字', trigger: 'blur' },
        ],
        category_id: [
          {
            required: true,
            message: '请选择分类',
            trigger: 'blur',
          },
        ],
      },
      //验证property
      propertyFormRules: {
        name: [
          {
            required: true,
            message: '属性名称不能为空',
            trigger: 'blur',
          },
        ],
        detail: [
          {
            required: true,
            message: '属性详情不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    //初始化分类信息
    async initCategory() {
      const res = await product.getCategory()
      this.category = res
    },
    //上传图片
    async uploadImage(file) {
      // 调用自定义图片上传的接口
      return await imgDeal.imgFuc(file)
    },
    /**
     * 提交表单
     */
    async submitForm() {
      //商品主图
      const mainImg = await this.$refs.uploadEle.getValue()
      if (mainImg.length > 0) {
        this.form.img_id = mainImg[0].imgId
        this.form.main_img_url = mainImg[0].display
      }
      //商品介绍图
      const imgItem = await this.$refs.uploadEle1.getValue()
      const propertyImg = []
      imgItem.forEach(item => {
        const img = {
          img_id: item.imgId,
          order: 1,
          product_id: this.form.id,
          id: item.id,
        }
        propertyImg.push(img)
      })
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.status = this.form.status === true ? 1 : 0
          this.form.image = propertyImg
          this.$emit('submit', this.form)
        } else {
          this.$message.error('信息不完整')
        }
      })
    },
    //添加property
    addProperty() {
      if (this.propertyForm.name !== '' || this.propertyForm.detail !== '') {
        this.form.property.push(this.propertyForm)
      }
      this.propertyForm = {}
      this.dialogFormVisible = false
    },
    //表格选中
    handleSelectionChange(val) {
      this.selectData = val
    },
    //删除表格选中
    deleteTable() {
      const selectData = this.selectData
      // console.log(selectData)
      let index = 0
      if (selectData) {
        selectData.forEach(item => {
          this.form.property.forEach((val, i) => {
            if (val == item) {
              index = i
            }
          })
          this.form.property.splice(index, 1)
        })
      }
    },
    //初始化主图
    initMainImage() {
      this.mainImg = []
      const img = {
        id: createId(),
        imgId: this.form.img_id,
        display: this.form.main_img_url,
      }
      this.mainImage.push(img)
    },
    //初始化property图片
    initPropertyImage() {
      this.propertyImage = []
      const items = this.form.image
      //console.log(items)
      items.forEach(item => {
        const img = {
          id: item.id ? item.id : '',
          imgId: item.img.id,
          display: item.img.url,
        }
        this.propertyImage.push(img)
      })
    },
  },
}
</script>
<style lang="scss">
.container {
  .product-item {
    border-top: 1px solid #dae1ec;
    .product-title {
      color: $parent-title-color;
      margin: 20px 0px;
    }
    .product-child-title {
      color: rgb(14, 161, 100);
      font-size: 15px;
      margin: 20px 0px;
    }
    .product-item-table {
      width: 60%;
      margin-top: 20px;
    }
    .save-product-btn {
      width: 60%;
      margin: 30px 0;
      text-align: center;
    }
  }
}
</style>