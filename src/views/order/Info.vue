<template>
  <div class="container">
    <div class="header">
      <span>订单详情</span>
      <span class="back" @click="handleBack">
        <i class="iconfont icon-fanhui" /> 返回
      </span>
    </div>
    <el-divider />
    <div class="wrap">
      <el-card style="margin-bottom: 50px;">
        <div slot="header" class="clearfix">
          <span>基础信息</span>
        </div>
        <div class="order">
          <el-form>
            <el-form-item label="订单编号">
              <span>{{orderInfo.order_no}}</span>
            </el-form-item>
            <el-form-item label="商品数量">
              <span>{{orderInfo.total_count}}</span>
            </el-form-item>
            <el-form-item label="订单金额">
              <span>{{orderInfo.total_price}}元</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{orderInfo.status}}</span>
            </el-form-item>
            <el-form-item label="订单创建时间">
              <span>{{orderInfo.create_time}}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card style="margin-bottom: 50px;">
        <div slot="header" class="clearfix">
          <span>商品清单</span>
        </div>
        <div class="product-item" v-for="item in orderInfo.snap_items" :key="item.id">
          <div class="img">
            <img :src="item.main_img_url" />
          </div>
          <div class="text">
            <span>数量:{{item.counts}}</span>
            <span>商品金额:{{item.price}}元</span>
          </div>
        </div>
      </el-card>
      <el-card style="margin-bottom: 50px;">
        <div slot="header" class="clearfix">
          <span>收货人信息</span>
        </div>
        <div class="address">
          <el-form>
            <el-form-item label="收货人">
              <span>{{orderInfo.snap_address.name}}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{orderInfo.snap_address.mobile}}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{address}}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card style="margin-bottom: 50px;">
        <div slot="header" class="clearfix">
          <span>物流信息</span>
        </div>
        <div class="send">
          <el-button type="primary" icon="el-icon-search" @click="openLogistics">查看物流信息</el-button>
        </div>
      </el-card>
    </div>
    <el-drawer title="快递信息" size="100%" :visible.sync="drawer" :direction="direction">
      <div class="time-line">
        <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
          <li v-for="i in count" class="infinite-list-item" :key="i"> -->
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in Logistics"
                :key="index"
                :color="datetimeColor"
                :timestamp="activity.datetime"
                placement="top"
              >
                <el-card>
                  <p>{{activity.remark}}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          <!-- </li>
        </ul> -->
      </div>
    </el-drawer>
  </div>
</template>

<script>
import order from '@/models/order.js'
export default {
  name: 'orderInfo',
  props: {
    orderData: Object,
  },
  created() {
    this.initData()
  },
  data() {
    return {
      datetimeColor: '#0bbd87',
      orderInfo: {},
      drawer: false,
      direction: 'btt',
      Logistics: [],
      count: 0,
    }
  },
  computed: {
    address() {
      return `${this.orderInfo.snap_address.province}
          ${this.orderInfo.snap_address.city}
          ${this.orderInfo.snap_address.country}
          ${this.orderInfo.snap_address.detail}
          `
    },
  },
  methods: {
    initData() {
      const order = this.orderData
      switch (order.status) {
        case '1':
          order.status = '未支付'
          break
        case '2':
          order.status = '已支付'
          break
        case '3':
          order.status = '已发货'
          break
        case '4':
          order.status = '已支付但库存不足'
          break
      }
      this.orderInfo = order
    },
    load() {
      this.count += 2
    },
    handleBack() {
      this.$emit('close')
    },
    /**
     * 获取物流
     */
    async openLogistics() {
      try {
        const res = await order.Logistics(this.orderInfo.order_no)
        this.Logistics = res
        this.drawer = true
      } catch (e) {
        this.$message.error(e.data.msg)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/title.scss';
.el-form-item__content {
  margin-left: 120px;
}
.container {
  .time-line {
    padding: 0 40px;
    height: 17%;
    overflow: scroll

  }
  .header {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px 60px;
    .order-item {
      font-size: 14px;
      padding: 18px 0;
      span {
        padding: 0 50px;
      }
    }
    .product-item {
      padding-bottom: 10px;
      border-bottom: 1px solid #edf1f7;
      display: flex;
      align-items: center;
      .img {
        width: 120px;
        padding-right: 40px;
      }
      .text {
        display: flex;
        flex-direction: column;
        span {
          padding: 10px 0;
        }
      }
    }
    .send {
      text-align: center;
    }
  }
  .submit {
    float: left;
  }
  .icon-jian1 {
    color: red;
    size: 18px;
    font-weight: bold;
  }
}
</style>