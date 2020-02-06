<template>
  <!-- 列表页面 -->
  <div class="container">
    <div class="head">
      <div class="title">商品分类列表</div>
      <div class="title-btn"><el-button type="primary" @click="dialogFormVisible=true">新增分类</el-button></div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="categoryList">
        <el-table-column label="id" prop="id" width="120"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="分类描述" prop="description"></el-table-column>
        <el-table-column label="操作" fixed="right" width="170">
          <!-- <el-table-column>标签支持在标签内嵌套一个<template>标签实现复杂的页面元素 -->
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              plain
              size="mini"
              type="danger"
              @click="handleDel(scope.row.id)"
              v-auth="'删除轮播图'"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="showDialog" width="30%" center>
      <span>确定删除id为{{ id }}的分类？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteCategory">确 定</el-button>
        <el-button @click="showDialog = false">取 消</el-button>
      </span>
    </el-dialog>
      <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
        <el-form label-width="100px" :model="form">
          <el-form-item label="分类名称">
            <el-input v-model="form.name" autocomplete="off" placeholder="请填写分类名称"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input
              size="medium"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入简介"
              v-model="form.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类图片">
            <upload-imgs
              ref="uploadEle3"
              :rules="rules"
              :multiple="true"
              :max-num="1"
              @func="getImgPath"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCategory">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import UploadImgs from '@/components/base/upload-imgs'
import product from '../../../models/product'
import banner from '../../../models/banner'

export default {
  components: {
    UploadImgs,
  },
  data() {
    return {
      categoryList: [],
      showDialog: false,
      // 轮播图id
      id: null,
      loading: true,
      dialogFormVisible: false,
      form: {
        name: '',
        description: '',
        topic_img_id: null,
      },
    }
  },
  async created() {
    this.getCategory()
  },
  methods: {
    async getCategory() {
      this.categoryList = await product.getCategory()
      this.loading = false
    },
    handleDel(id) {
      // 数据绑定，用于显示对话框内容
      this.id = id
      // 数据绑定，显示对话框
      this.showDialog = true
    },
    // 执行删除分类请求
    async deleteCategory() {
      // 关闭对话框
      this.showDialog = false
      this.loading = true
      try {
        const res = await product.delCategoryByIds([this.id])
        this.getCategory()
        this.loading = false
        this.$message({
          message: res.msg,
          type: 'success',
        })
      } catch (e) {
        this.loading = false
        this.$message({
          message: e.data.msg,
          type: 'error',
        })
      }
    },
    async addCategory() {
      try {
        const res = await product.addCategory(this.form)
        this.getCategory()
        this.loading = false
        this.dialogFormVisible = false
        this.$message({
          message: res.msg,
          type: 'success',
        })
      } catch (e) {
        this.$message({
          message: e.data.msg,
          type: 'error',
        })
      }
    },
    /**
     * 获取图片id
     */
    async getImgPath(path) {
      const res = await banner.addImage(path)
      this.form.topic_img_id = res.result.imgId
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dae1ec;
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
      text-indent: 40px;
    }
    .title-btn{
      padding-right:30px;
    }
  }
  .table-container {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    .expand-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        margin: 10px;
        width: 200px;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
