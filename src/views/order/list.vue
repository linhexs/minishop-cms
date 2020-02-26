<template>
  <!-- 列表页面 -->
  <div class="container" v-if="!switchComponent">
    <div class="head">
      <div class="title">订单列表</div>
      <div class="search-group">
        <div class="input-search">
          <el-input v-model="input" placeholder="订单号/收货人姓名" size="medium">
            <el-button slot="append" icon="el-icon-search" @click="getRecord()"></el-button>
          </el-input>
        </div>
        <lin-date-picker @dateChange="handleDateChange" ref="searchDate" class="date"></lin-date-picker>
      </div>
    </div>
     <transition name="fade">
      <div class="search" v-if="searchDate.length">
        <p class="search-tip">找到<span class="search-num">{{total_nums}}</span>条信息
        </p>
        <button class="search-back" @click="backList">返回全部日志</button>
      </div>
    </transition>
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
        <el-table-column label="操作" fixed="right" width="160">
          <!-- <el-table-column>标签支持在标签内嵌套一个<template>标签实现复杂的页面元素 -->
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)">详情</el-button>
            <el-button
              v-if="scope.row.status == 2"
              plain
              size="mini"
              type="success"
              @click="handleStatus"
            >发货</el-button>
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
  <Info v-else :orderData="orderData" @close="close"></Info>
</template>

<script>
import order from '../../models/order.js'
import Info from './Info'
import LinDatePicker from '@/components/base/date-picker/lin-date-picker'
export default {
  components: {
    Info,
    LinDatePicker
  },
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
      switchComponent: false,
      orderData: {},
      searchDate: [],//时间搜索
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList(input = '') {
      try {
        const recordList = await order.getOrder(this.page, this.count, input,this.searchDate)
        this.recordList = recordList.collection
        this.total_nums = recordList.total_nums
        this.loading = false
        this.showPage = true
      } catch (e) {
        this.recordList = []
        this.page = 0
        this.total_nums = 0
        this.showPage = false
        this.$message.error(e.data.msg)
      }
    },
    //分页操作
    handleCurrentChange(val) {
      this.loading = true
      this.page = --val
      this.getOrderList()
    },
    //编辑订单详情
    handleEdit(val) {
      this.switchComponent = true
      this.orderData = val
    },
    //关闭订单详情
    close() {
      this.switchComponent = false
    },
    //根据时间筛选
    handleDateChange(date) {
      this.page = 0
      this.loading = true
      this.searchDate = date
      this.getOrderList()
    },
    backList(){
      this.$refs.searchDate.clear()
      this.loading = true
      this.searchDate=[],
      this.getOrderList()
    }
  }
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
   .search {
    height: 52px;
    width: 100%;
    background: rgba(57, 99, 188, 0.1);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 24px;

    .search-tip {
      margin-left: 40px;
      height: 52px;
      line-height: 52px;
      color: #354058;
      font-size: 14px;

      .search-keyword {
        color: $theme;
      }

      .search-num {
        color: #f4516c;
      }
    }
    .search-back {
      margin: 8px 20px;
      height: 32px;
      background: #f4516c;
      border: none;
      border-radius: 2px;
      color: #fff;
      padding: 0 13px;
      font-size: 14px;
      cursor: pointer;
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
