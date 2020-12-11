<template>
  <el-form ref="form" :model="form" label-width="180px" class="vaccaeParamn" v-loading="loading">
    <el-form-item label="微卡背景图片">
      <imgLoad :limit="1" :fileListUp="fileListUp" @upLoadImgs="upLoadImg" folder="CardImg"></imgLoad>
      <!--      默认200kb-->
    </el-form-item>
    <!-- <el-form-item label="卡类别">
      <cardCategory ref="cardCategory" @changeValue="changeValue"></cardCategory>
    </el-form-item> -->
    <el-form-item label="微卡名称">
      <el-input v-model="form.Name" maxlength="25"></el-input>
    </el-form-item>
    <!-- <el-form-item label="微卡申请信息" class="MicroAppliy">
      <el-checkbox-group v-model="form.ApplyMsg" v-for="item in ApplyMsgList" :key="item.value">
        <el-checkbox :label="item.value">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="微卡支付是否需要填写密码">
      <el-switch
        v-model="form.IsPass"
        active-text="是"
        inactive-text="否"
        active-value="1"
        inactive-value="0">
      </el-switch>
    </el-form-item> -->
    <el-form-item label="会员卡说明" class="ueditor-style">
      <ueditor1 v-if="!loading" ref="ueditorDom" :valText="ueditorDomText"></ueditor1>
    </el-form-item>
    <el-form-item label="条款" class="ueditor-style">
      <ueditor1 v-if="!loading" ref="ueditorClause" :valText="ueditorClauseText"></ueditor1>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitFun">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import imgLoad from '@/components/download/imgLoad'
// import ueditor from '@/components/ueditor/index'
import ueditor1 from '@/components/ueditor1/index'
// import cardCategory from '@/components/selector/cardCategory'
import {getLists} from '@/api/vipCard'
import _ from 'lodash'
import '@/config/jquery.base64.js'
import {bindList} from '@/config/utils'
import {replacePre} from '@/config/publicFunction'

export default {
  name: "vaccaeParam",
  components: {imgLoad, ueditor1},
  data() {
    return {
      form: {
        Name:'',
        // 条款
        Clause: '',
        // 图片
        CardImg: '',
        // 说明
        Explain: '',
        // 微卡申请信息
        // ApplyMsg: [],
        // IsPass: 0
      },
      ApplyMsgList: bindList,
      // 默认图片
      fileListUp: [],
      // SID: '',
      // 说明默认值
      ueditorDomText: '',
      // 条款默认值
      ueditorClauseText: '',
      loading: false
    }
  },
  created() {
    this.infoObj()
  },
  methods: {
    async infoObj() {
      this.loading = true
      try {
        let data = await getLists({Action: 'GetCardBase'}, 'WeChatCardOpera')
        this.form = data.Data.CardBaseInfo || {}
        if (typeof this.form.ApplyMsg === 'string' && this.form.ApplyMsg) {
          this.form.ApplyMsg = this.form.ApplyMsg.split(',')
        }
        // if (this.form.TypeNo) {
        //   this.$refs.cardCategory.value = this.form.TypeNo
        // }
        // console.log(this.form, 666)
        this.ueditorDomText = $.base64.atob(this.form.Explain, 'utf8')

        this.ueditorClauseText = $.base64.atob(this.form.Clause, 'utf8')
        if (this.form.CardImg) {
          this.fileListUp = [{url: process.env.Prefix + this.form.CardImg}]
        }
        this.loading = false
      } catch (e) {
        // console.log(e, 999)
        if (typeof e !== 'string') {
          this.$message.error('页面加载错误，可刷新页面重试')
        } else {
          this.$message.error(e)
        }
        this.loading = false
      }
    },
    async submitFun() {
      let newForm = _.clone(this.form)
      // 条款
      let newClause = $.base64.btoa(this.$refs.ueditorClause.getUEContent(), 'utf8');
      // 说明
      let newExplain = $.base64.btoa(this.$refs.ueditorDom.getUEContent(), 'utf8');
      newForm.Clause = newClause
      newForm.Explain = newExplain

      if (newForm.ApplyMsg) {
        newForm.ApplyMsg = newForm.ApplyMsg.join(',')
      }
      Object.assign(newForm, {Action: 'SetCardBase'})
      if (newForm.CardImg) {
        newForm.CardImg = replacePre(newForm, 'CardImg')
      }

      try {
        await getLists(newForm, 'WeChatCardOpera')
        this.$message.success('修改成功')
      } catch (e) {
        this.$message.error(e)
      }
    },
    changeValue(val) {
      this.form.TypeNo = val
    },
    upLoadImg(arr) {
      this.fileListUp = arr
      if (arr.length > 0) {
        this.form.CardImg = arr[0].url
      } else {
        this.form.CardImg = ''
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/numberInput.less';

  .vaccaeParamn {
    .el-input-number {
      margin: 0 10px;
    }

    .el-input {
      width: 250px;
    }

    .ueditor-style {
      .el-form-item__content {
        line-height: 20px !important;
      }

      .edui-arrow {
        width: 12px !important;
      }
    }

    .MicroAppliy {
      .el-checkbox-group {
        display: inline-block;
        line-height: 20px;
        margin-right: 30px;
      }
    }
  }
</style>
