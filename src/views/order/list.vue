<template>
  <!-- 列表页面 -->
  <div class="container" v-if="!switchComponent">
    <div class="head">
      <div class="title">订单列表</div>
      <div class="search-group">
        <el-button type="primary" @click="dialogTableVisible=true">查看快递编码</el-button>
        <div class="input-search">
          <el-input v-model="input" placeholder="订单号/收货人姓名" size="medium">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList()"></el-button>
          </el-input>
        </div>
        <lin-date-picker @dateChange="handleDateChange" ref="searchDate" class="date"></lin-date-picker>
      </div>
    </div>
    <transition name="fade">
      <div class="search" v-if="searchDate.length">
        <p class="search-tip">
          找到
          <span class="search-num">{{total_nums}}</span>条信息
        </p>
        <button class="search-back" @click="backList">返回全部订单</button>
      </div>
    </transition>
    <div class="table-container">
      <el-table v-loading="loading" :data="recordList">
        <el-table-column label="序号" prop="id" width="100"></el-table-column>
        <el-table-column label="订单号" prop="order_no" width="180"></el-table-column>
        <el-table-column label="商品概要" prop="snap_name" width="160"></el-table-column>
        <el-table-column label="商品数量" prop="total_count" width="90"></el-table-column>
        <el-table-column label="订单金额" prop="total_price" width="90"></el-table-column>
        <el-table-column label="订单状态" width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==='1'" type="info">{{dealStatus(scope.row.status)}}</el-tag>
            <el-tag v-else-if="scope.row.status==='2'" type="warning">{{dealStatus(scope.row.status)}}</el-tag>
            <el-tag v-else-if="scope.row.status==='3'" type="success">{{dealStatus(scope.row.status)}}</el-tag>
            <el-tag v-else-if="scope.row.status==='4'" type="danger">{{dealStatus(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="收货人" prop="snap_address.name" width="100"></el-table-column>
        <el-table-column label="联系方式" prop="snap_address.mobile" width="120"></el-table-column>
        <el-table-column label="订单创建时间" prop="create_time" width="120"></el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <!-- <el-table-column>标签支持在标签内嵌套一个<template>标签实现复杂的页面元素 -->
          <template slot-scope="scope">
            <el-button plain size="mini" type="primary" @click="handleEdit(scope.row)"  v-auth="'订单详情'">详情</el-button>
            <el-button
              v-if="scope.row.status == 2"
              plain
              size="mini"
              type="success"
              @click="deliverConfirm(scope.row.id)"
               v-auth="'订单发货'"
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
    <el-dialog ref="sendForm" title="登记发货信息" :visible.sync="dialogFormVisible">
      <el-form :model="sendOrderForm" :rules="sendOrderFormRules">
        <el-form-item label="快递公司编码" :label-width="'120px'" prop="comp">
          <el-input v-model="sendOrderForm.comp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" :label-width="'120px'" prop="number">
          <el-input v-model="sendOrderForm.number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deliverGoods">确认发货</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="快递编码" :visible.sync="dialogTableVisible">
      <el-table :data="comp" width="300px">
        <el-table-column property="name" label="快递名称" width="150px"></el-table-column>
        <el-table-column property="number" label="编码" width="230px"></el-table-column>
        <el-table-column property="name1" label="快递名称" width="150px"></el-table-column>
        <el-table-column property="number1" label="编码"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
  <Info v-else :orderData="orderData" @close="close"></Info>
</template>

<script>
import order from '../../models/order.js'
import Info from './Info'
import LinDatePicker from '@/components/base/date-picker/lin-date-picker'
import error from '@/common/error'
import comp from '@/common/comp'
export default {
  components: {
    Info,
    LinDatePicker,
  },
  created() {
    this.getOrderList()
    this.comp = comp
  },
  data() {
    return {
      loading: true,
      recordList: [], //列表
      page: 0, //页码
      count: 10, //分页数量
      input: '', //输入查询内容
      total_nums: 0, //总数量
      showPage: true, //显示分页
      switchComponent: false, //关闭组件
      orderData: {}, //编辑订单数据
      dialogFormVisible: false, //发货表单开关
      dialogTableVisible: false, //快递表格开关
      searchDate: [], //时间搜索
      id: null, //发货id
      sendOrderForm: {
        //发货form
        comp: '',
        number: '',
      }, //发货数据
      comp: [], //快递编码
      sendOrderFormRules: {
        comp: [
          {
            required: true,
            message: '快递公司编码不能为空',
            trigger: 'blur',
          },
        ],
        number: [
          {
            required: true,
            message: '快递单号不能为空',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    //获取列表
    async getOrderList(input = '') {
      try {
        const recordList = await order.getOrder(this.page, this.count, this.input, this.searchDate)
        this.recordList = recordList.collection
        this.total_nums = recordList.total_nums
        this.loading = false
        this.showPage = true
      } catch (e) {
        console.log(e)
        this.recordList = []
        this.page = 0
        this.total_nums = 0
        this.showPage = false
        this.loading = false
        this.$message.error(error(e.data.msg))
      }
    },
    //发货
    async deliverGoods() {
      debugger
      try {
        const res = await order.shipment(this.id, this.sendOrderForm)
        this.$message.success(res.msg)
        this.loading = true
        this.dialogFormVisible = false
        this.getOrderList()
        this.sendOrderForm = {}
      } catch (e) {
        this.$message.error(error(e.data.msg))
        this.sendOrderForm = {}
      }
    },
    //发货确认
    deliverConfirm(val) {
      ;(this.dialogFormVisible = true), (this.id = val)
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
    //返回列表
    backList() {
      this.$refs.searchDate.clear()
      this.loading = true
      ;(this.searchDate = []), this.getOrderList()
    },
    dealStatus(status) {
      switch (status) {
        case '1':
          status = '未支付'
          break
        case '2':
          status = '已支付'
          break
        case '3':
          status = '已发货'
          break
        case '4':
          status = '已支付但库存不足'
          break
      }
      return status
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
    .search-group {
      margin-right: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-search {
        width: 250px;
        padding: 0 30px;
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
