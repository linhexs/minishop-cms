<template>
  <div class="container">
    <div class="title">新增轮播图</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16">
          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="名称">
              <el-input placeholder="请输入轮播图名称" size="medium" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input
                type="textarea"
                placeholder="可选，轮播图简介"
                :autosize="{ minRows: 4, maxRows: 4 }"
                v-model="form.desc"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div class="block-box">
                <el-link type="primary" v-if="!list.length" @click="addContent">
                  添加
                  <i class="iconfont icon-jia plus"></i>
                </el-link>
                <el-row class="input-row" v-for="(item, index) in list" :key="index">
                  <el-form-item>
                    <el-link type="primary" v-if="list.length" @click="removeContent">
                      轮播图{{ index + 1 }}
                      <i class="iconfont icon-jian1 minus"></i>
                    </el-link>
                  </el-form-item>
                  <el-col :lg="12">
                    <el-form-item label="关键字">
                      <el-input
                        v-model="item.text"
                        placeholder="请输入内容"
                        size="medium"
                        class="input-detail"
                      ></el-input>
                    </el-form-item>
                    <div class="function">
                      <el-link type="primary" v-if="index === list.length - 1" @click="addContent">
                        添加
                        <i class="iconfont icon-jia plus"></i>
                      </el-link>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      form: {
        name: '',
        desc: '',
      },
    }
  },
  methods: {
    addContent() {
      this.list.push({
        text: '',
        type: 'plus',
      })
    },
    removeContent(index) {
      this.list.splice(index, 1)
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
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
