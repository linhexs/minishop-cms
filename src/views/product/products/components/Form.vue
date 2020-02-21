<template>
  <div class="container">
    <el-row>
      <el-col :lg="16">
        <el-form label-width="100px">
          <el-form-item label="商品图片">
            <upload-imgs ref="uploadEle" :multiple="true" :max-num="1" />
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input autocomplete="off" placeholder="请填写商品名称"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价">
            <el-input autocomplete="off" placeholder="请填写商品单价"></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-input autocomplete="off" placeholder="请填写商品库存量"></el-input>
          </el-form-item>
          <el-form-item label="概述">
            <el-input type="textarea" placeholder="请输入商品概述" :autosize="{ minRows: 4, maxRows: 4 }"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="value3"
              active-color="#00C292"
              inactive-color="#E46A76"
              active-text="下架"
              inactive-text="上架"
            ></el-switch>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="product-item">
      <div class="product-title">商品介绍数据</div>
      <div class="product-child-title">商品介绍图</div>
      <upload-imgs ref="uploadEle" :multiple="true" :max-num="1" />
      <div class="product-child-title">商品属性</div>
      <el-button @click="dialogFormVisible=true">添加</el-button>
      <el-button type="primary">编辑</el-button>
      <el-button type="danger">删除</el-button>
      <el-table
        class="product-item-table"
        :data="productValue"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="属性名称"></el-table-column>
        <el-table-column prop="price" label="属性详情"></el-table-column>
      </el-table>
      <div class="save-product-btn">
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button>重置</el-button>
      </div>
    </div>
    <el-dialog title="新增商品属性" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="属性名称" :label-width="'90px'">
          <el-input  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性详情" :label-width="'90px'">
          <el-input  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import UploadImgs from '@/components/base/upload-imgs'
import img from '../../../../models/img'
export default {
  components: {
    UploadImgs,
  },
  data(){
    return {
      dialogFormVisible:false
    }
  }
}
</script>
<style lang="scss">
.container {
  .product-item {
    width: 60%;
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
      margin-top: 20px;
    }
    .save-product-btn {
      margin: 30px 0;
      text-align: center;
    }
  }
}
</style>