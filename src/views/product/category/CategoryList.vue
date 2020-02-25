<template>
  <!-- 列表页面 -->
  <div class="container">
    <div class="head">
      <div class="title">商品分类列表</div>
      <div class="title-btn">
        <el-button type="primary" @click="handleAdd">新增分类</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="categoryList">
        <el-table-column label="id" prop="id" width="120"></el-table-column>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="分类描述" prop="description"></el-table-column>
        <el-table-column label="操作" fixed="right" width="170">
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              plain
              size="mini"
              type="danger"
              @click="handleDel(scope.row.id)"
              v-auth="'删除分类'"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <delete-dialog
      :showDialog="showDelDialog"
      :id="id"
      :text="deleteText"
      @submit="deleteCategory"
      @cancel="showDelDialog=false"
    ></delete-dialog>
    <category-add
      v-if="addForm"
      @getCategory="getCategory"
      @close="addClose"
      :visible.sync="addVisible"
    ></category-add>
    <category-edit
      v-if="editForm"
      :editData="editData"
      @getCategory="getCategory"
      @close="editClose"
      :visible.sync="editVisible"
    ></category-edit>
  </div>
</template>
<script>
import DeleteDialog from '../../../components/base/delete-dialog/delete-dialog'
import product from '../../../models/product'
import error from '../../../common/error'
import banner from '../../../models/banner'
import CategoryAdd from './CategoryAdd'
import CategoryEdit from './CategoryEdit'
export default {
  components: {
    CategoryAdd,
    CategoryEdit,
    DeleteDialog,
  },
  data() {
    return {
      categoryList: [],
      showDelDialog: false, //删除弹框
      loading: true,
      id: null, //删除商品id
      editData: {},
      deleteText: '分类',
      addVisible: false,
      editVisible: false,
      editForm: false,
      addForm: false,
    }
  },
  // watch: {
  //   editData() {
  //     this.reFresh = false
  //     this.$nextTick(() => {
  //       this.reFresh = true
  //     })
  //   },
  // },
  async created() {
    this.getCategory()
  },
  methods: {
    /**
     * 修改分类信息
     */
    handleEdit(val) {
      this.editData = val
      this.editForm = true
      this.editVisible = true
    },
    /**
     * 增加分类表单
     */
    handleAdd() {
      this.addVisible = true
      this.addForm = true
    },
    /**
     * 获取分类列表
     */
    async getCategory() {
      this.categoryList = await product.getCategory()
      ;(this.addVisible = false), (this.editVisible = false), (this.loading = false)
    },
    /**
     * 显示删除对话框
     */
    handleDel(id) {
      this.id = id
      this.showDelDialog = true
    },
    /**
     * 执行删除分类请求
     */
    async deleteCategory() {
      this.showDelDialog = false
      this.loading = true
      try {
        const res = await product.delCategoryByIds([this.id])
        this.getCategory()
        this.$message({
          message: res.msg,
          type: 'success',
        })
      } catch (e) {
        this.$message({
          message: error(e.data.msg),
          type: 'error',
        })
      }
    },
    editClose() {
      ;(this.loading = true), (this.editForm = false)
      this.getCategory()
    },
    addClose() {
      ;(this.loading = true), (this.addForm = false)
      this.getCategory()
    },
  },
}
</script>
<style lang="scss" scoped>
@import './../../../assets/styles/title.scss';
.container {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dae1ec;
    .title-btn {
      padding-right: 30px;
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
