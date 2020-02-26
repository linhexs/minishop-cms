<template>
  <!-- 列表页面 -->
  <div class="container">
    <div class="head">
      <div class="title">发货记录</div>
      <div class="input-search" v-if="switchSearch">
        <el-input v-model="input" placeholder="请输入内容" size="medium" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="订单号" value="1"></el-option>
            <el-option label="快递单号" value="2"></el-option>
            <el-option label="发货人" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getRecord(select,input)"></el-button>
        </el-input>
      </div>
      <div v-else>
        <span class="back" @click="handleBack">
        <i class="iconfont icon-fanhui" /> 返回
      </span>
      </div>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="recordList">
        <el-table-column label="序号" prop="id" width="120"></el-table-column>
        <el-table-column label="订单号" prop="order_no"></el-table-column>
        <el-table-column label="快递公司" prop="comp"></el-table-column>
        <el-table-column label="快递单号" prop="number"></el-table-column>
        <el-table-column label="发货人" prop="operator"></el-table-column>
        <el-table-column label="发货时间" prop="create_time"></el-table-column>
      </el-table>
    </div>
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
import record from '../../models/record.js'
import error from '@/common/error'
export default {
  data() {
    return {
      loading: true,
      recordList: [],
      page: 0,
      count: 10,
      select: '',
      input: '',
      total_nums:0,
      showPage:true,
      switchSearch:true
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getRecord(select, input) {
      if(input === ''){
        this.$message.error('请输入查询内容');return;
      }
      if(select === ''){
        this.$message.error('请选择查询内容');return;
      }
      switch (select) {
        case '1':
          this.getData('order_no', input)
          break
        case '2':
          this.getData('number', input)
          break
        case '3':
          this.getData('operator', input)
          break
      }
    },
    async getData(select = '', input = '') {
      try {
        const recordList = await record.getRecord(this.page, this.count, select, input)
        this.recordList = recordList.collection
        this.total_nums = recordList.total_nums
        this.loading = false
        this.showPage = true
      } catch (e) {
        this.recordList = []
        this.page = 0
        this.total_nums = 0
        this.showPage = false
        this.$message.error(error(e.data.msg))
        this.switchSearch = false
      }
    },
    handleCurrentChange(val){
        this.page = --val
        this.getData()
    },
    handleBack(){
      this.loading=true
      this.select= '',
      this.input= '',
      this.switchSearch = true
      this.getData()
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
    .input-search {
      width: 350px;
      padding-right: 30px;
    }
    .back {
      color: $parent-title-color;
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
      width: 60px;
      border-top: 1px solid #dcdfe6;
      border-left: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      border-right: none;
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
