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
      <span>Banner-Item列表</span>
      <el-button type="primary" plain @click="dialogFormVisibleAdd=true">添加BannerItem</el-button>
    </div>
     <!--Banner-Item表格-->
    <div class="table-container">
      <el-table :data="form.items">
        <el-table-column label="id" prop="id" width="120"></el-table-column>
        <el-table-column label="轮播图" align="center" prop="img_id">
          <template slot-scope="scope">
            <div class="expand-container">
              <img class="img" :src="scope.row.img.url" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="关键字" prop="key_word"></el-table-column>
        <el-table-column label="导向类型" prop="type">
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
     <!--删除Banner-Item-->
    <delete-dialog
      :showDialog="showDialog"
      :id="itemId"
      :text="deleteText"
      @submit="deleteBannerItem"
      @cancel="showDialog=false"
    ></delete-dialog>
    <!--新增Banner-Item-->
    <el-dialog title="新增Banner-Item" :visible.sync="dialogFormVisibleAdd">
      <el-form label-width="100px" :model="form">
        <el-form-item label="关键字" prop="key_word">
          <el-input v-model="formItem.key_word" autocomplete="off" placeholder="请填写关键字"></el-input>
        </el-form-item>
        <el-form-item label="导向类型" prop="itemType">
          <el-select v-model="formItem.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轮播图">
          <upload-imgs
            ref="uploadEle3"
            :rules="rules"
            :multiple="true"
            :max-num="1"
            @func="getImgPath"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="addBannerItem">确 定</el-button>
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import banner from '../../../models/banner'
import DeleteDialog from '../../../components/base/delete-dialog/delete-dialog'
import img from '../../../models/img'
import UploadImgs from '@/components/base/upload-imgs'
export default {
  components: {
    DeleteDialog,
    UploadImgs,
  },
  props: {
    editBannerData: Object,
  },
  watch: {
    /**
     * 监听数据变化
     */
    editBannerData: {
      handler(newValue, oldValue) {
        // console.log(newValue)
        // console.log(oldValue)
        this.form.items = newValue.items
        // console.log(this.form.items)
      },
      deep: true,
    },
  },
  data() {
    return {
      deleteText: 'Banner-Item',
      showDialog: false,//删除框
      itemId: null,//bannerItem的id
      dialogFormVisibleAdd: false,//新增bannerItem
      dialogFormVisibleEdit: false,//修改bannerItem
      form: {
        name: this.editBannerData.name,
        description: this.editBannerData.description,
        items: this.editBannerData.items,
      },
      formItem: {
        key_word:'',
        type:null,
        img_id:null,
        banner_id:this.editBannerData.id
      },
      formRules: {
        trigger: ['blur', 'change'],
        required: true,
        message: '请输入轮播图名',
      },
      options: [
        {
          value: 0,
          label: '无导向',
        },
        {
          value: 1,
          label: '导向商品',
        },
        {
          value: 2,
          label: '导向专题',
        },
      ],
      rules: {
        minWidth: 100,
        minHeight: 100,
        maxSize: 1,
      },
    }
  },
  methods: {
    /**
     * 修改bannerItem主体信息
     */
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
    /**
     * 处理表格type
     */
    getTypeText(type) {
      let res
      switch (type) {
        case 0:
          res = '无导向'
          break
        case 1:
          res = '导向商品'
          break
        case 2:
          res = '导向专题'
          break
      }
      return res
    },
    /**
     * 返回父组件
     */
    back() {
      this.$emit('editClose')
    },
    resetForm(formName) {
        this.form.name = ''
        this.form.description = ''

    },
    handleDel(id) {
      // 数据绑定，用于显示对话框内容
      this.itemId = id
      // 数据绑定，显示对话框
      this.showDialog = true
    },
    /**
     * 删除banner-item
     */
    async deleteBannerItem() {
      // 关闭对话框
      this.showDialog = false
      try {
        const res = await banner.delBannerItemByIds([this.itemId])
        this.$emit('getBanner', this.editBannerData.id)
        this.$message({
          message: res.msg,
          type: 'success',
        })
      } catch (e) {
        this.$message({
          message: e.data.msg,
          type: 'error',
        })
      }
    },
    /**
     * 添加bannerItem
     */
    async addBannerItem(){
      try {
        const res = await banner.addBannerItem(this.formItem)
        this.$message({
          message: res.msg,
          type: 'success',
        })
         this.$emit('getBanner', this.editBannerData.id)
         this.formItem = {}
        this.dialogFormVisibleAdd = false
      }catch (e) {
         this.$message({
          message: e.data.msg,
          type: 'error',
        })
      }
    },
    /**
     * 获取图片地址
     */
    async getImgPath(path) {
      const res = await img.addImage(path)
       this.formItem.img_id = res.result.imgId
    },
    handleEdit(val) {
      this.editBannerItemData = val
      this.showEdit = true
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
    span {
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
