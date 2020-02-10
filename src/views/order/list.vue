<template>
  <!-- 列表页面 -->
  <div class="container">
    <div class="head">
      <div class="title">订单列表</div>
      <div class="search-group">
        <div class="input-search">
          <el-input v-model="input" placeholder="订单号/收货人姓名" size="medium">
            <el-button slot="append" icon="el-icon-search" @click="getRecord()"></el-button>
          </el-input>
        </div>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="recordList">
        <el-table-column label="序号" prop="id" width="100"></el-table-column>
        <el-table-column label="订单号" prop="order_no" width="180"></el-table-column>
        <el-table-column label="商品概要" prop="snap_name" width="120"></el-table-column>
        <el-table-column label="商品数量" prop="total_count" width="120"></el-table-column>
        <el-table-column label="订单金额" prop="total_price" width="120"></el-table-column>
        <el-table-column label="收货人" prop="snap_address.name" width="120"></el-table-column>
        <el-table-column label="联系方式" prop="snap_address.mobile" width="120"></el-table-column>
        <el-table-column label="订单状态" prop="status" width="120"></el-table-column>
        <el-table-column label="订单创建时间" prop="create_time" width="120"></el-table-column>
          <el-table-column label="操作" fixed="right" width="210">
          <!-- <el-table-column>标签支持在标签内嵌套一个<template>标签实现复杂的页面元素 -->
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">查看详情信息</el-button>
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
</template>

<script>
import order from '../../models/order.js'
export default {
  data() {
    return {
      loading: true,
      recordList: [],
      page: 0,
      count: 10,
      select: '',
      input: '',
      total_nums: 0,
      showPage: true,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      value1: '',
      value2: '',
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList(input = '') {
      try {
        const recordList = await order.getOrder(this.page, this.count, input)
        this.recordList = recordList.collection
        this.total_nums = recordList.total_nums
        this.loading = false
        this.showPage = true
      } catch (error) {
        this.recordList = []
        this.page = 0
        this.total_nums = 0
        this.showPage = false
        this.$message.error(`未查询到相关订单`)
      }
    },
    handleCurrentChange(val) {
      this.loading = true
      this.page = --val
      this.getOrderList()
    },
  },
}
</script>
<style lang="scss">
.container {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dae1ec;
    .search-group {
      margin-right: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-search {
        width: 250px;
        padding-right: 30px;
      }
    }
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
      text-indent: 40px;
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
    margin: 30px;
  }
}
</style>
