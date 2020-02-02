<template>
  <!-- 列表页面 -->
  <div class="container">
    <div class="header">
      <div class="title">主题列表</div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="themeList">
        <el-table-column label="id" prop="id" width="120"></el-table-column>
        <el-table-column label="主题名称" prop="name"></el-table-column>
        <el-table-column label="主题描述" prop="description"></el-table-column>
        <el-table-column label="主题图片">
          <template slot-scope="scope">
            <div class="expand-container">
              <img class="img" :src="scope.row.topic_img.url" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="主题详情头图">
          <template slot-scope="scope">
            <div class="expand-container">
              <img class="img" :src="scope.row.head_img.url" />
            </div>
          </template>
        </el-table-column>
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
      <span>确定删除id为{{ id }}的轮播图？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteTheme">确 定</el-button>
        <el-button @click="showDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import theme from '../../../models/theme'

export default {
  // components: {
  //   LinTable,
  // },
  data() {
    return {
      themeList: [],
      showDialog: false,
      // 轮播图id
      id: null,
      loading: true,
    }
  },
  async created() {
    this.getThemes()
  },
  methods: {
    async getThemes() {
      this.themeList = await theme.getThemes()
      this.loading = false
    },
    handleDel(id) {
      // 数据绑定，用于显示对话框内容
      this.id = id
      // 数据绑定，显示对话框
      this.showDialog = true
    },
    // 执行删除轮播图请求
    async deleteTheme() {
      // 关闭对话框
      this.showDialog = false
      this.loading = true
      try {
        const res = await theme.delThemeByIds([this.id])
        this.getThemes()
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
  .header {
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
      text-indent: 40px;
      border-bottom: 1px solid #dae1ec;
    }
  }
  .table-container {
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 30px;
    padding-right: 30px;
    .expand-container {
      .img {
        margin: 10px;
        height: 120px;
        width: auto;
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
