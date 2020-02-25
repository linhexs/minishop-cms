<template>
  <!-- 列表页面 -->
  <div class="container" v-if="!switchComponent">
    <div class="head">
      <div class="title">商品库</div>
      <lin-search @query="onQueryChange" placeholder="请输入商品" />
      <div class="title-btn">
        <el-button type="primary" @click="addProduct">新增商品</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="productsList">
        <el-table-column label="id" prop="id" width="80"></el-table-column>
        <el-table-column label="商品主图" width="180" align="center">
          <template slot-scope="scope">
            <div class="expand-container">
              <img class="img" :src="scope.row.main_img_url" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="150" prop="name"></el-table-column>
        <el-table-column label="所属分类" width="150" prop="category.name"></el-table-column>
        <el-table-column label="商品单价" width="150" prop="price"></el-table-column>
        <el-table-column label="商品库存" width="150" prop="stock"></el-table-column>
        <el-table-column label="商品状态" width="150" prop="status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '1'" type="success">上架中</el-tag>
            <el-tag v-else type="danger">下架了</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180" prop="summary"></el-table-column>
        <el-table-column label="操作" fixed="right" width="210">
          <!-- <el-table-column>标签支持在标签内嵌套一个<template>标签实现复杂的页面元素 -->
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === '1'"
              plain
              size="mini"
              type="warning"
              @click="handleByProductStatus(scope.row.id)"
            >下架</el-button>
            <el-button
              v-else
              plain
              size="mini"
              type="success"
              @click="handleByProductStatus(scope.row.id)"
            >上架</el-button>
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
      <span>确定删除id为{{ id }}的商品？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteProduct">确 定</el-button>
        <el-button @click="showDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="pagination" v-show="showPage">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page+1"
        :page-size="count"
        layout="total, prev, pager, next, jumper"
        :total="total_nums"
      ></el-pagination>
    </div>
  </div>
  <product-edit 
  v-else 
  :productEdit="productEdit" 
  @editClose="editClose">
  </product-edit>
</template>

<script>
import product from '../../../models/product'
import LinSearch from '@/components/base/search/lin-search'
import  ProductEdit from './ProductEdit'
export default {
  components: {
    ProductEdit,
    LinSearch,
  },
  data() {
    return {
      productsList: [],
      showDialog: false,
      loading: true,
      switchComponent: false,//组件开关
      page: 0,
      total_nums: 0,
      id:null,
      count: 10,
      searchKeyword: '',//关键字
      showPage: true, //显示分页
      productEdit:{}, //编辑数据
    }
  },
  async created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      try {
        const productsList = await product.getProducts(this.page, this.count, this.searchKeyword)
        this.productsList = productsList.collection
        this.total_nums = productsList.total_nums
        this.showPage = true
        this.loading = false
      } catch (error) {
        this.productsList = []
        this.page = 0
        this.total_nums = 0
        this.showPage = false
        this.loading = false
        this.$message.error(`未查询到相关商品信息`)
      }
    },
    handleCurrentChange(val) {
      this.loading = true
      this.page = --val
      this.getProducts()
    },
    handleDel(id) {
      // 数据绑定，用于显示对话框内容
      this.id = id
      // 数据绑定，显示对话框
      this.showDialog = true
    },
    // 执行删除商品请求
    async deleteProduct() {
      // 关闭对话框
      this.showDialog = false
      this.loading = true
      try {
        const res = await product.delProductById([this.id])
        this.getProducts()
        this.$message({
          message: res.msg,
          type: 'success',
        })
      } catch (error) {
        this.loading = false
        this.$message({
          message: e.data.msg,
          type: 'error',
        })
      }
    },
    /**
     * 修改商品状态
     */
    async handleByProductStatus(id) {
      try {
        this.loading = true
        const res = await product.modifyStatus(id)
        this.getProducts()
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
    /**
     * 搜索
     */
    onQueryChange(query) {
      this.loading = true
      this.searchKeyword = query.trim()
      setTimeout(() => {
        this.getProducts()
      }, 1000)
    },
    //添加商品
    addProduct(){
      this.$router.push('/product/add')
    },
    //修改商品信息
    handleEdit(val){
      this.switchComponent = true,
      this.productEdit = val
      if(val.status == 1){
        this.productEdit.status = true
      }else{
        this.productEdit.status = false
      }
      //console.log(this.productEdit)
    },
    //关闭修改界面
    editClose(){
      this.getProducts()
      this.switchComponent = false
    }
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
        display: block;
        height: auto;
        width: 100%;
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
