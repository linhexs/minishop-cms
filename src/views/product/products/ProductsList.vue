<template>
  <!-- 列表页面 -->
  <div class="container">
    <div class="head">
      <div class="title">商品库</div>
      <lin-search placeholder="请输入商品" />
      <div class="title-btn">
        <el-button type="primary">新增商品</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="productsList">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand-container">
              <div v-for="(img, index) in scope.row.items" :key="index">
                <img class="img" :src="img.img.url" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id" width="80"></el-table-column>
        <el-table-column label="商品主图" width="180" align="center">
          <template slot-scope="scope">
            <div class="expand-container">
              <img class="img" :src="scope.row.main_img_url" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称"  width="150" prop="name"></el-table-column>
        <el-table-column label="所属分类" width="150" prop="category_id"></el-table-column>
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
              @click="handleEdit(scope.row.id)"
            >下架</el-button>
            <el-button v-else plain size="mini" type="info" @click="handleEdit(scope.row.id)">上架</el-button>
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
      <span>确定删除id为{{ id }}的轮播图？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteCategory">确 定</el-button>
        <el-button @click="showDialog = false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="pagination" v-show="showPage">
      <el-pagination
        background   
        @current-change="handleCurrentChange"
        :current-page= page+1
        :page-size= count
        layout="total, prev, pager, next, jumper"
        :total= total_nums
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import product from '../../../models/product'
import LinSearch from '@/components/base/search/lin-search'
export default {
  components: {
    LinSearch,
  },
  data() {
    return {
      productsList: [],
      showDialog: false,
      loading: true,
      dialogFormVisible: false,
      page: 0,
      total_nums:0,
      count: 10,
      showPage:true
    }
  },
  async created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      const productsList = await product.getProducts(this.page, this.count)
      this.productsList = productsList.collection
      this.total_nums = productsList.total_nums
      this.loading = false
    },
      handleCurrentChange(val){
          this.loading = true
        this.page = --val
        this.getProducts()
    },
    // handleDel(id) {
    //   // 数据绑定，用于显示对话框内容
    //   this.id = id
    //   // 数据绑定，显示对话框
    //   this.showDialog = true
    // },
    // // 执行删除分类请求
    // async deleteCategory() {
    //   // 关闭对话框
    //   this.showDialog = false
    //   this.loading = true
    //   try {
    //     const res = await product.delCategoryByIds([this.id])
    //     this.getCategory()
    //     this.loading = false
    //     this.$message({
    //       message: res.msg,
    //       type: 'success',
    //     })
    //   } catch (e) {
    //     this.loading = false
    //     this.$message({
    //       message: e.data.msg,
    //       type: 'error',
    //     })
    //   }
    // },
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
        width: 100%
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
