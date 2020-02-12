<template>
  <div class="container">
    <div class="title">
      <span>修改Banner</span>
      <span class="back" @click="back">
        <i class="iconfont icon-fanhui"></i> 返回
      </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" :rules="formRules" status-icon ref="form" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input placeholder="请输入轮播图名称" size="medium" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
              <el-input
                type="textarea"
                placeholder="轮播图简介"
                :autosize="{ minRows: 4, maxRows: 4 }"
                v-model="form.description"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div class="title">
      <span>Banner-Item列表
</span>
 <el-button type="primary" plain>添加BannerItem</el-button>
    </div>
       <div class="table-container">
      <el-table v-loading="loading" :data="form.items">
        <el-table-column label="id" prop="id" width="120"></el-table-column>
        <el-table-column label="轮播图" align="center"  prop="img_id">
          <template slot-scope="scope">
            <div class="expand-container">
              <img class="img" :src="scope.row.img.url" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="关键字"  prop="key_word"></el-table-column>
        <el-table-column label="导向类型"  prop="type">
          <template slot-scope="scope">
            <div class="expand-container">
             <div>{{getTypeText(scope.row.type)}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="170">
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
  </div>
</template>

<script>
import banner from '../../../models/banner'
export default {
  props: {
    editBannerData: Object,
  },
  data() {
    return {
      loading: false,
      form: {
        name: this.editBannerData.name,
        description: this.editBannerData.description,
        items:this.editBannerData.items,
      },
      formRules: {
        trigger: ['blur', 'change'],
        required: true,
        message:'请输入轮播图名'
      },
    }
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await banner.editBannerInfo(this.editBannerData.id, this.form)
        if (res.error_code === 0) {
          this.$message.success(`${res.msg}`)
          this.back()
        }
      } catch (e) {
        this.$message({
          message: e.data.msg,
          type: 'error',
        })
      }
    },
    getTypeText(type){
      let res
      switch (type){
        case 0: res="无导向";break
        case 1: res="导向商品";break
        case 2: res="导向专题";break
      }
      return res
    },
    back() {
      this.$emit('editClose')
    },
    resetForm(formName) {
      this.form = {}
      this.form.items = []
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}
.container {
  .title {
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
    span{
          padding-right: 20px;
    }
  }
  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
  .table-container {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
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
}
</style>
