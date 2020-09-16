<template>
  <div class="addEditGoods">
     <!-- 编辑，新增优惠券 -->
    基本信息
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">
      <el-form-item label="券类型">
        <couponList @changeValue="changeValue" ref="couponList" :defaultId="defaultId"></couponList>
      </el-form-item>
      <el-form-item label="商品名称" prop="Name">
        <el-input v-model="ruleForm.Name" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品售价" prop="SalePrice">
        <el-input-number v-model="ruleForm.SalePrice" controls-position="right" :min="0" :step="1"
                         step-strictly></el-input-number>
        ¥
      </el-form-item>
      <el-form-item label="库存" prop="StoreQty">
        <el-input-number v-model="ruleForm.StoreQty" controls-position="right" :min="0" :step="1"
                         step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片" prop="ProdImgList">
        <imgLoad folder="TicketImg" @upLoadImgs="upLoadImgs" :fileListUp="fileListUp" ref="imgLoad"  :isAutoFixed="true"></imgLoad>
        (建议尺寸:800*800;大小:小于500kb;格式:JPG,PNG,JPEG)
      </el-form-item>
      <el-form-item label="商品排序" prop="Sort">
        <el-input-number v-model="ruleForm.Sort" controls-position="right" :min="0" :step="1"
                         step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="销量基数" prop="SaleCnt">
        <el-input-number v-model="ruleForm.SaleCnt" controls-position="right" :min="0" :step="1"
                         step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="预定提示" prop="Tips">
        <el-input v-model="ruleForm.Tips" type="textarea" :autosize="{ minRows: 2, maxRows: 3}"
                  placeholder="最长可输入500个字符" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="支付方式" prop="PayType">
        <el-radio-group v-model="ruleForm.PayType">
          <el-radio label="1">不支持第三方支付</el-radio>
          <el-radio label="2">不支持微卡支付</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="购买时间" prop="Start" class="">
        <el-checkbox v-model="ruleForm.Start">启用</el-checkbox>
        <el-date-picker
          v-if="ruleForm.Start"
          v-model="assistRuleForm.BuyTime"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="每人限购" prop="LimitCnt">
        <el-input-number v-model="ruleForm.LimitCnt" controls-position="right" :min="1"></el-input-number>
      </el-form-item>
      <!--      <el-form-item label="商品描述" prop="ProdDescribe">-->
      <!--        <el-input-->
      <!--          type="textarea"-->
      <!--          :rows="3"-->
      <!--          placeholder="最长支持200个字符"-->
      <!--          maxlength="200"-->
      <!--          v-model="ruleForm.ProdDescribe">-->
      <!--        </el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="产品特色" class="FeaturesStyle">
        <el-button type="text" @click="FeaturesShow=true" v-if="FeaturesShow===false">+编辑</el-button>
        <ueditor1 v-if="FeaturesShow" :valText="ueditorProduct" ref="Features"></ueditor1>
        <el-button type="text" @click="FeaturesShow=false" v-if="FeaturesShow===true">隐藏</el-button>
      </el-form-item>
      <el-form-item label="重要提示" class="FeaturesStyle">
        <el-button type="text" @click="ImportantNotesShow=true" v-if="ImportantNotesShow===false">+编辑</el-button>
        <ueditor1 v-if="ImportantNotesShow" :valText="ueditorTip" ref="ImportantNotes"></ueditor1>
        <el-button type="text" @click="ImportantNotesShow=false" v-if="ImportantNotesShow===true">隐藏</el-button>
      </el-form-item>
    </el-form>

    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button @click="resetForm('ruleForm')" style="margin-left:20px" >重置</el-button>
      <el-button type="primary" style="margin-left:20px" @click="preserveFun" :loading="btnLoading">保存</el-button>
    </div>
  </div>
</template>

<script>
import couponList from '@/components/selector/couponList'
import imgLoad from '@/components/download/imgLoad'
import ueditor1 from '@/components/ueditor1/'
import {getLists} from '@/api/vipCard'
import '@/config/jquery.base64.js'
import {ImgList,replacePre} from '@/config/publicFunction'

export default {
  name: "addEditCoupon",
  components: {couponList, imgLoad, ueditor1},
  data() {
    return {
      btnLoading: false,
      ruleForm: {
        // 支付方式
        PayType: '',
        Start: 0
      },
      assistRuleForm: {
        // 购买时间
        BuyTime: []
      },
      rules: {
        Name: [
          {
            required: true, message: '商品名称未填', trigger: 'blur', validator: (rules, value, callback) => {
              if (!this.ruleForm.Name) {
                callback(new Error('商品名称未填'))
              } else {
                callback()
              }
            }
          }
        ],
        StoreQty: [{required: true, message: '请输入商品售价', trigger: 'blur'}],
        SalePrice: [{required: true, message: '请输入库存', trigger: 'blur'}]
      },
      // 显示隐藏 产品特色
      FeaturesShow: true,
      // 显示隐藏 重要提示
      ImportantNotesShow: true,
      // 产品特色默认值
      ueditorProduct: '',
      // 重要提示默认值
      ueditorTip: '',
      currentCouponList: '',
      defaultId: null,
      // 显示在页面的商品图片
      fileListUp: []
    }
  },
  created() {
    this.ruleForm = {}
    if (this.$route.query.SID) {
      this.getInfo()
    }
  },
  methods: {
    async getInfo() {
      try {
        let obj = {}
        Object.assign(obj, {SID: this.$route.query.SID})
        Object.assign(obj, {Action: 'GetTicket'})
        let data = await getLists(obj, 'MTicketOpera')
        // console.log(data, 999)
        this.ruleForm = data.Data.Ticket

        // console.log(this.ruleForm, 555)
        this.ueditorProduct = $.base64.atob(this.ruleForm.Features,'utf8')
        this.ueditorTip = $.base64.atob(this.ruleForm.ImportantNotes,'utf8')

        this.ruleForm.Start = Number(this.ruleForm.Start)
        if (this.ruleForm.BuyTime) {
          this.ruleForm.Start = true
          this.assistRuleForm.BuyTime = [this.ruleForm.BuyTime, this.ruleForm.EndTime]
        } else {
          this.ruleForm.Start = false
        }
        this.defaultId = this.ruleForm.Type


        this.fileListUp = this.ruleForm.ImgList?ImgList(this.ruleForm.ImgList):[]
      } catch (e) {
      }
    },
    changeValue(val) {
      this.$set(this.ruleForm, 'Type', val.TypeNo)
      this.currentCouponList = val
    },
    cancelFun() {
      this.$router.push('/weChat/manager/couponSetting')
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.changeValue({})
      this.$refs.couponList.value = ''
      this.$refs.imgLoad.currentImgs = []
      this.assistRuleForm.BuyTime = []
      this.ruleForm.Start = false
      this.$refs.ImportantNotes.setUEContent('')
      this.$refs.Features.setUEContent('')
      this.ruleForm.ImgList = ''
    },
    upLoadImgs(imgs) {
      let arr = []
      imgs.forEach(D => {
        arr.push(D.url)
      })
      this.ruleForm.ImgList = arr.join(',')
    },
    preserveFun() {
      if(this.ruleForm.ImgList){
        this.ruleForm.ImgList = replacePre(this.ruleForm,'ImgList')
      }
      // console.log(this.$refs.Features.getUEContent(), 5555)
      // console.log(this.$refs.ImportantNotes.getUEContent(), 5555)
      if (this.ruleForm.Start && this.assistRuleForm.BuyTime.length === 0) {
        this.$message.info('请选择购买时间')
        return
      }
      if (this.ruleForm.ImgList.length === 0) {
        this.$message.info('请选择商品图片')
        return
      }

      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            let obj = {}
            Object.assign(obj, {Action: 'SetTicket'})
            Object.assign(obj, this.ruleForm)

            if (this.ruleForm.Start) {
              obj.Start = 1
              obj.BuyTime = this.assistRuleForm.BuyTime[0]
              obj.EndTime = this.assistRuleForm.BuyTime[1]
            } else {
              obj.Start = 0
              obj.BuyTime = ''
              obj.EndTime = ''
            }

            obj.Features = $.base64.btoa(this.$refs.Features.getUEContent(), 'utf8')
            obj.ImportantNotes = $.base64.btoa(this.$refs.ImportantNotes.getUEContent(), 'utf8')
            this.btnLoading = true

            await getLists(obj, 'MTicketOpera')
            this.btnLoading = false
            this.$message.success('操作成功')
            this.$router.push('/weChat/manager/couponSetting')
          } catch (e) {
            this.btnLoading = false
            this.$message.error(e)
          }
        } else {
          return false;
        }
      })
    }
  },
  watch: {
    'ruleForm.Type'() {
      if (this.currentCouponList) {
        this.$set(this.ruleForm, 'Name', this.currentCouponList.TypeName)
        this.$set(this.ruleForm, 'SalePrice', this.currentCouponList.Price)
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../../assets/css/addEditGoods.less';
</style>
