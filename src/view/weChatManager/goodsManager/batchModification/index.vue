<template>
  <div class="batchMode">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px">          
          <el-form-item label="商品类别" prop="CateSID">
               <goodType @changeGoodType="changeGoodType" ref="goodType" :isBatch = "isBatch"></goodType>
          </el-form-item>
          <el-form-item label="供货门店" prop="ShopInfo">  
               <el-checkbox v-model="assistForm.checkedShopInfo">修改</el-checkbox>             
               <div v-if="assistForm.checkedShopInfo">
                    <el-input readonly v-model="ruleForm.PickShopName" placeholder="请选择门店"></el-input>
                    <el-button type="primary" style="margin-left: 10px" size="medium" @click="PickShopFun">添加</el-button>
                    <p style="color: #999">不填为全选</p>
               </div>
          </el-form-item>
          <el-form-item label="状态" prop="State">
               <el-checkbox v-model="assistForm.checkedState">修改</el-checkbox>
               <p v-if="assistForm.checkedState">
                    <el-radio v-model="ruleForm.State" label="1">上架</el-radio>
                    <el-radio v-model="ruleForm.State" label="0">下架</el-radio>
               </p>
          </el-form-item>
          <el-form-item label="评论数量" prop="CommentCnt">
               <el-checkbox v-model="assistForm.checkedCommentCnt">修改</el-checkbox>
               <br/>
               <el-input v-model="ruleForm.CommentCnt" v-if="assistForm.checkedCommentCnt" 
               oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"></el-input>
          </el-form-item>
          <el-form-item label="商城库存" prop="StoreQty">
               <el-checkbox v-model="assistForm.checkedStoreQty">修改</el-checkbox>
               <p v-if="assistForm.checkedStoreQty">
                    <el-input v-model="ruleForm.StoreQty" oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"></el-input>个(仅对商城库存有效)
               </p>
          </el-form-item>
          <el-form-item label="销售数量" prop="SaleCnt">
               <el-checkbox v-model="assistForm.checkedSaleCnt">修改</el-checkbox>
               <br/>
               <el-input v-model="ruleForm.SaleCnt" oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}" v-if="assistForm.checkedSaleCnt"></el-input>
          </el-form-item>
          <el-form-item label="配送方式" prop="DeliveryType">
               <el-checkbox v-model="assistForm.checkDeliveryType">修改</el-checkbox>
               <div v-if="assistForm.checkDeliveryType">
                    <el-checkbox-group v-model="DeliveryType" @change="changeCheckbox">
                         <el-checkbox label="1">门店自取</el-checkbox>
                         <el-checkbox label="2" :disabled="disabledTakeout">外卖配送</el-checkbox>
                         <el-checkbox label="3" :disabled="disabledLogistics">物流配送</el-checkbox>
                    </el-checkbox-group>
                    <div style="color: #999">物流与配送冲突</div>
               </div>
          </el-form-item>
          <el-form-item label="支付类型" prop="PayType">
               <el-checkbox v-model="assistForm.checkedPayType">修改</el-checkbox>
               <div v-if="assistForm.checkedPayType">
                    <el-checkbox-group v-model="PayType">
                         <el-checkbox label="1">微卡支付</el-checkbox>
                         <el-checkbox label="2">微信支付</el-checkbox>
                    </el-checkbox-group>
               </div>
          </el-form-item>
          <el-form-item label="预留备货时间" prop="FinHour">
               <el-checkbox v-model="assistForm.checkedFinHour">修改</el-checkbox>
               <div v-if="assistForm.checkedFinHour">
                    <el-select v-model="isAdvanceTime" placeholder="请选择" @change="ruleForm.FinHour = ''">
                         <el-option v-for="(item, index) in optionsAdvanceTime" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input-number :step="1" v-model="ruleForm.FinHour" controls-position="right" :min="0"
                         @change="setInputDec(ruleForm.FinHour)"
                    ></el-input-number> {{ isAdvanceTime == "1" ? "天" : "小时" }}预定
               </div>
          </el-form-item>
          <el-form-item label="提货日期(配送)" prop="PickDate">
               <el-checkbox v-model="assistForm.checkedPickDate">修改</el-checkbox>
               <br/>
               <el-date-picker
                    v-if="assistForm.checkedPickDate"
                    v-model="ruleForm.PickDate"
                    type="daterange"
                    :editable="false"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
               ></el-date-picker>
          </el-form-item>
          <el-form-item label="提货时间(配送)" prop="PickTime">
               <el-checkbox v-model="assistForm.checkedPickTime">修改</el-checkbox>
               <br/>
               <el-time-picker
                    v-if="assistForm.checkedPickTime"
                    is-range
                    v-model="ruleForm.PickTime"
                    :editable="false"
                    value-format="HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
               ></el-time-picker>
          </el-form-item>
          <el-form-item>
               <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </el-form-item>
     </el-form>
     <!-- 选择门店弹窗 -->
     <pickShopName :storeList="storeList" :showShop="showShop" @changeDig="changeDig" @sureGood="sureGood(arguments)"></pickShopName>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import goodType from "@/components/selector/goodType";//商品类别
import pickShopName from "@/components/Dialog/pickShopName";
import { stockTypeList } from "@/config/utils";//商品库存
import * as ruleText from "@/view/wechatManager/rulesFrom";
export default {
  name: "batchMode",
  data() {
    return {
          ruleForm:{},
          PayType: ["1", "2"],
          DeliveryType: ["2", "1"],
          showShop: false,// 控制门店弹框显示
          storeList:[],//门店列表
          stockTypeList: stockTypeList,//库存类型
          disabledLogistics: true,//物流
          disabledTakeout: false,//外卖
          assistForm: {
               checkedShopInfo:false,
               checkedState: false,
               checkedCommentCnt: false,
               checkedStoreQty: false,
               checkedSaleCnt: false,
               checkedBuyTime: false,
               checkDeliveryType: false,
               checkedPayType: false,
               checkedFinHour: false,
               checkedPickDate: false,
               checkedPickTime: false
          },
          optionsAdvanceTime: [
               {
                    value: "1",
                    label: "按天数"
               },
               {
                    value: "2",
                    label: "按小时"
               }
          ],
          isAdvanceTime: "1",
          isBatch:'isBatch',
          rules:{
               CateSID: [ruleText.CateSID(this)],
          }
    };
  },
  components:{ goodType, pickShopName },
  created() {
       this.getAllShop();
  },
  methods: {   
     changeGoodType(arr){//商品系列SID
          this.ruleForm.CateSID = arr;
     },
     async getAllShop(){//获取门店列表
          try {
               let res = await getLists({Action:'GetShopList'},"MShopOpera");
               this.storeList = res.Data.ShopInfoList;
          } catch (error) {
               this.$message.error(error)
          }
     },
     PickShopFun(){//打开门店弹窗
          this.showShop = true;
     },
     changeDig(bool){ //用于子组件控制关闭按钮
          this.showShop = bool;
     },
     sureGood(val){//门店弹窗确定按钮 
          this.showShop = false;     
          this.ruleForm.ShopInfo = val[0];
          this.ruleForm.PickShopName = val[1]        
     },
     changeCheckbox(val) {
      // 1门店 2外卖 3物流
      //配送方式 点击外卖的时候，物流不可选，选择物流，那么外卖不可选
      if (val.indexOf("3") > -1) {
        //选择了物流
        this.disabledTakeout = true;
      } else if (val.indexOf("2") > -1) {
        this.disabledLogistics = true;
      } else {
        this.disabledTakeout = false;
        this.disabledLogistics = false;
      }
     },
     setInputDec(FinHour) {
      //不让填写小数
          if (!FinHour) return;
          this.ruleForm.FinHour = FinHour.toString().split(".")[0];
          if(this.isAdvanceTime === "2" &&FinHour>23)
          this.ruleForm.FinHour = '23'
     },
     async submitForm() {//保存
          let obj = _.cloneDeep(this.ruleForm);
          if(this.assistForm.checkDeliveryType){
               obj.DeliveryType = typeof this.DeliveryType !== "string" && this.DeliveryType ? this.DeliveryType.join(","): this.DeliveryType;
          }
          if(this.assistForm.checkedPayType){
               obj.PayType = typeof this.PayType !== "string" && this.PayType ? this.PayType.join(","): this.PayType;
          }
          if(obj.CateSID){
               obj.CateSID = typeof obj.CateSID !== "string" && obj.CateSID ? obj.CateSID.join(",") : obj.CateSID;
          }else return this.$message.error('分类不能为空')
          if(this.assistForm.checkedShopInfo == false
               && this.assistForm.checkedState == false
               && this.assistForm.checkedCommentCnt == false
               && this.assistForm.checkedStoreQty == false
               && this.assistForm.checkedSaleCnt == false
               && this.assistForm.checkedBuyTime == false
               && this.assistForm.checkDeliveryType == false
               && this.assistForm.checkedPayType == false
               && this.assistForm.checkedFinHour == false
               && this.assistForm.checkedPickDate == false
               && this.assistForm.checkedPickTime == false) return this.$message.error('至少有一个修改内容')
          if(this.assistForm.checkedShopInfo && this.showShop == false && this.ruleForm.PickShopName == undefined){
               obj.ShopInfo = '全部门店'
          }
          if(this.assistForm.checkedShopInfo == false){
              obj.ShopInfo = "";
              obj.PickShopName = ""
              this.$delete(obj,'ShopInfo')              
              this.$delete(obj,'PickShopName')
          }
          if(this.assistForm.checkedState == false && obj.State!=''){
              this.$delete(obj,'State')
          }
          if(this.assistForm.checkedCommentCnt == false && obj.CommentCnt!=''){
              this.$delete(obj,'CommentCnt')
          }
          if(this.assistForm.checkedStoreQty == false && obj.StoreQty!=''){
              this.$delete(obj,'StoreQty')
          }
          if(this.assistForm.checkedSaleCnt == false && obj.SaleCnt!=''){
              this.$delete(obj,'SaleCnt')
          }
          if(this.assistForm.checkedFinHour == false && obj.FinHour!=''){
              this.$delete(obj,'FinHour')
              this.$delete(obj,'FinType')
          }
          if(this.assistForm.checkedPickDate == false && obj.PickDate!=''){
              this.$delete(obj,'PickDate')
          }
          if(this.assistForm.checkedPickTime == false && obj.PickTime!=''){
              this.$delete(obj,'PickTime')
          }
          if(this.assistForm.checkedFinHour){
               if(this.isAdvanceTime === '1'){
                    obj.FinType = '1'
               }else if(this.isAdvanceTime === '2'){              
                    obj.FinType = '2'
               }
               if(obj.FinHour){
                    obj.FinHour = String(obj.FinHour)
               }
          }
          if (this.assistForm.checkedPickDate) {
              if (!obj.PickDate) {
                this.$message.info("填写提货日期");
                return;
              }
              obj.PickDate = obj.PickDate.join(",");
            }
            if (this.assistForm.checkedPickTime) {
              if (!obj.PickTime) {
                this.$message.info("填写提货时间");
                return;
              }
              obj.PickTime = obj.PickTime.join(",");
            }
          try {
               Object.assign(obj, { Action: "SetCateProd" });
               await getLists(obj, "MProdOpera");
               this.$message.success('操作成功');
          } catch (error) {
          this.$message.error(error)
          }
    },
  },
};
</script>
<style lang="less" scoped>
     .el-input{
          width: 217px;
     }
</style>