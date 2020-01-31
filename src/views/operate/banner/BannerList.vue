<template>
  <!-- 列表页面 -->
  <div class="container">
    <div class="header">
      <div class="title">轮播图列表</div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="bannerList">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="expand-container">
              <div v-for="(img, index) in scope.row.items" :key="index">
                <img class="img" :src="img.img.url" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id" width="120"></el-table-column>
        <el-table-column label="轮播图名称" prop="name"></el-table-column>
        <el-table-column label="轮播图简介" prop="description"></el-table-column>
        <el-table-column label="操作" fixed="right" width="170">
          <!-- <el-table-column>标签支持在标签内嵌套一个<template>标签实现复杂的页面元素 -->
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button plain size="mini" type="danger" @click="handleDel(scope.row.id)" v-auth="'删除轮播图'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="showDialog" width="30%" center>
      <span>确定删除id为{{ id }}的轮播图？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteBanner">确 定</el-button>
        <el-button @click="showDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import banner from '../../../models/banner'

export default {
  // components: {
  //   LinTable,
  // },
  data() {
    return {
      bannerList: [],
      showDialog: false,
      // 轮播图id
      id: null,
      loading: true,
    }
  },
  async created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      this.bannerList = await banner.getBanners()
      this.loading = false
    },
    handleDel(id) {
      // 数据绑定，用于显示对话框内容
      this.id = id
      // 数据绑定，显示对话框
      this.showDialog = true
    },
    // 执行删除轮播图请求
    async deleteBanner() {
      // 关闭对话框
      this.showDialog = false
      this.loading = true
      try {
        const res = await banner.delBannerByIds([this.id])
        this.getBanners()
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
  },
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 30px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
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
