<template>
  <!-- 列表页面 -->
  <div class="container" v-if="!switchComponent">
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
            <el-button plain size="mini" type="primary" ref="inputResult" @click="handleEdit(scope.row)" v-auth="'编辑轮播图'">编辑</el-button>
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
    <delete-dialog
      :showDialog="showDialog"
      :id="id"
      :text="deleteText"
      @submit="deleteBanner"
      @cancel="showDialog=false"
    ></delete-dialog>
  </div>
  <component  v-else :is="targetComponent" :banner="row" @back="handleBack" />
</template>

<script>
import Add from './Add'
import Edit from './Edit'
import banner from '@/models/banner'
import DeleteDialog from '@/components/base/delete-dialog/delete-dialog'
export default {
    name: 'List',
  // 注册组件
  components: { Add, Edit,DeleteDialog },
   data() {
    return {
      deleteText:'删除banner',
      bannerList: [],
      // 控制对话框显示/隐藏，默认不显示
      showDialog: false,
      // 轮播图id
      id: null,
      // 显示加载状态
      loading: true,
      // 是否切换组件
      switchComponent: false,
      // 切换的目标组件
      targetComponent: '',
      // 点击的行数据
      row: null,
    }
  },
  async mounted() {
    this.loading
    this.getBanners()
  },
  methods: {
    async getBanners() {
      const bannerList =await banner.getBanners()
      this.bannerList = bannerList
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
    /**
     * 编辑按钮
     */
    handleEdit(row) {
      this.switchComponent = true
      this.targetComponent = 'Edit'
      this.row = row
    },
    /**
     * 返回
     */
    handleBack(){
      this.switchComponent = false
      this.getBanners()
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/title.scss';
.container {
  .header {
    .title{
        border-bottom: 1px solid #dae1ec;
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
