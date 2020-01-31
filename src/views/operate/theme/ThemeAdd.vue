<template>
  <div class="container">
    <div class="title">新增轮播图</div>
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
              <upload-imgs ref="uploadEle3" :multiple="true" :max-num="1" @func="getTopicImgPath" />
            </el-form-item>
            <el-form-item label="详情页头图">
              <upload-imgs ref="uploadEle3" :multiple="true" :max-num="1" @func="getHeadImgPath" />
            </el-form-item>
          </el-form>
          <div class="product-title">关联商品</div>
          <div class="product-btn">
            <el-button @click="addProduct">添加</el-button>
            <el-button>删除</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
          </el-table>
          <el-dialog title="添加关联商品" :visible.sync="showDialog">
            <template>
              <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入城市名称"
                v-model="value"
                :data="productData"
              ></el-transfer>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
                <el-button @click="showDialog = false">取 消</el-button>
              </span>
            </template>
          </el-dialog>
          <div class="save-theme-btn">
            <el-button type="primary">保存</el-button>
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

export default {
  components: {
    UploadImgs,
  },
  data() {
    return {
      list: [],
      showDialog: false,
      productData: [],
      product: ['shanghai', 'beijing'],
      form: {
        name: '',
        description: '',
        topic_img_id: null,
        head_img_id: null,
      },
      value: [],
      filterMethod(query, item) {
        return item.product.indexOf(query) > -1
      },
    }
  },
  methods: {
    addProduct() {
      this.showDialog = true
      this.productData.push({
        label: 'asdas',
        key: 1,
        product: this.product[0],
      })
    },
    async getHeadImgPath(path) {
      const res = await banner.addImage(path)
      this.form.head_img_id = res.result.imgId
    },
    async getTopicImgPath(path) {
      const res = await banner.addImage(path)
      this.form.topic_img_id = res.result.imgId
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
