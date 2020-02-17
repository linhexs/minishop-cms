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
              v-auth="'删除轮播图'"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog title="提示" :visible.sync="showDelDialog" width="30%" center>
      <span>确定删除id为{{ id }}的分类？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteCategory">确 定</el-button>
        <el-button @click="showDelDialog = false">取 消</el-button>
      </span>
    </el-dialog> -->

      <delete-dialog
      :showDialog="showDelDialog"
      :id="id"
      :text="deleteText"
      @submit="deleteCategory"
      @cancel="showDelDialog=false"
    ></delete-dialog>
    <category-add v-if="hackAdd"  @getCategory="getCategory"  :visible.sync="addVisible"></category-add>
    <category-edit  v-if="hackEdit"  :editData="editData" @getCategory="getCategory"  :visible.sync="editVisible"></category-edit>
  </div>
</template>

<script>
import DeleteDialog from '../../../components/base/delete-dialog/delete-dialog'
import product from '../../../models/product'
import error from '../../../common/error'
import banner from '../../../models/banner'
import ControlForm from './components/Form'
import CategoryAdd from './CategoryAdd'
import CategoryEdit from './CategoryEdit'
export default {
  components: {
    ControlForm,
    CategoryAdd,
    CategoryEdit,
    DeleteDialog
  },
  data() {
    return {
      categoryList: [],
      showDelDialog: false, //删除弹框
      showFormDialog: false, //表单弹框
      loading: true,
      id:null,//删除商品id
      hackEdit: false,
      hackAdd:false,
      editData: {},
      deleteText:'分类',
      addVisible:false,
      editVisible:false
    }
  },
  async created() {
    this.getCategory()
  },
  methods: {
    /**
     * 修改分类信息
     */
    handleEdit(val) {
      //this.getTimer1(),
      this.hackEdit = true
      this.editData = val
      this.editVisible = true;
    },
    // getTimer1(){
    //   console.log(new Date().getMonth())
    //     this.timer1 = new Date().getMonth()
    // },
    //  getTimer2(){
    //    console.log(new Date().getTime())
    //     this.timer2 = new Date().getTime()
    // },
    /**
     * 增加分类表单
     */
    handleAdd() {
      this.hackAdd = true
       this.addVisible = true;
    },
    /**
     * 获取分类列表
     */
    async getCategory() {
      this.categoryList = await product.getCategory()
      this.loading = false
      this.hackEdit = false
      this.hackAdd = false
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
    /**
     * 添加分类
     */
    async addCategory(val) {
      try {
        const res = await product.addCategory(val)
        this.getCategory()
        this.$message({
          message: res.msg,
          type: 'success',
        })
        this.showFormDialog = false
        this.hackReset = false
        this.$nextTick(() => {
          this.hackReset = true
        })
      } catch (e) {
        this.$message({
          message: error(e.data.msg),
          type: 'error',
        })
      }
    },
  }
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
