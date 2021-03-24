<template>
<!-- 拼团 新增和编辑 -->
  <div class="addEditGood">
    基本信息
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" v-loading="loading">
      <el-form-item label="活动类型" :key="6">
        <el-select v-model="ruleForm.Type" placeholder="请选择"  :disabled="this.$route.query.SID ? true : false"> 
          <el-option label="拼团活动" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品选择">
        <el-button type="primary" size="medium" @click="selectGoods(null)">选择商品</el-button>        
        <!-- 选择商品之后展示的表格 -->
        <el-table style="margin-top: 10px; width: 850px" ref="ProdNoList" :data="ruleForm.ProdList">
          <el-table-column prop="Name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
          <el-table-column prop="Stock" label="商品库存" align="center">
          <template slot-scope="scoped">
            <span v-if="scoped.row.StockType==='1'">{{scoped.row.Stock }}</span>
            <span v-else-if="scoped.row.StockType==='2'">门店库存</span>
            <span v-else>不限</span>
          </template>
          </el-table-column>
          <el-table-column label="商品原价" align="center">
            <template slot-scope="scope">¥{{scope.row.OldPrice}}</template>
          </el-table-column>
          <el-table-column prop="SalePrice" label="活动价格" align="center">
            <template slot-scope="{ row }">
              <input style="width: 100%; text-align: center;border: 1px solid #c1c1c1" maxlength="10"
                class="number" type="text"
                oninput="value=value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                v-model="row.SalePrice"
              />
            </template>
          </el-table-column>
          <el-table-column prop="StoreQty" label="活动数量" align="center">
            <template slot-scope="{ row }">
              <input
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number" style="width: 100%; text-align: center;border: 1px solid #c1c1c1"
                type="text"
                v-model="row.StoreQty"
              />
            </template>
          </el-table-column>
          <el-table-column  prop="SurplusQty" label="剩余数量" align="center" v-if="this.$route.query.SID">
            <template slot-scope="{ row }">
              <input style="width: 100%; text-align: center;color:red;border: 1px solid #c1c1c1"
                v-model="row.SurplusQty"/>
            </template>
          </el-table-column>
          <el-table-column prop="MaxBuyCnt" label="限购数量" align="center">
            <template slot-scope="{ row }">
              <input
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number" style="width: 100%; text-align: center;border: 1px solid #c1c1c1"
                type="text"
                v-model="row.MaxBuyCnt"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scoped">
              <!-- <el-popover placement="left" v-model="scoped.row.visibleUrl">
                <el-input v-model="scoped.row.codeUrlShop" readonly placeholder="商品链接">
                  <el-button slot="append" @click="copyUrl(scoped.row)">复制</el-button>
                </el-input>
                <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
              </el-popover> -->
              <el-button type="text" @click="delGoodsNorms(scoped.$index)">删除</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="SurplusQty" label="剩余数量" align="center">
            <template slot-scope="{ row }">
              <input style="width: 100%; text-align: center;border: 1px solid #c1c1c1"
                oninput="value=value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')"
                maxlength="10"
                class="number"
                type="text"
                v-model="row.SurplusQty"/>
            </template>
          </el-table-column> -->
        </el-table>
      </el-form-item>
      <el-form-item label="活动名称" prop="Name">
        <el-input v-model="ruleForm.Name" maxlength="25" placeholder="请填写活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动日期" prop="activityDate">
        <el-date-picker :editable="false" v-model="ruleForm.StartDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="开始日期" style="width: 200px;">
        </el-date-picker> - 
        <el-date-picker :editable="false" v-model="ruleForm.EndDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="结束日期" style="width: 200px;">
        </el-date-picker>
      </el-form-item>      
      <el-form-item label="提货日期" prop="PickDate">
        <el-date-picker :editable="false" v-model="PickDate" value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="团上限" prop="MaxGroupCnt">
        <em class="elText">最多可开</em>
        <p class="Inpwidth">
          <el-input v-model="ruleForm.MaxGroupCnt" maxlength="6" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" ></el-input>
        </p><em class="elText">个团</em>
      </el-form-item>
      <el-form-item label="拼团条件" prop="GroupNum">
        <em class="elText">凑齐</em>
        <p class="Inpwidth">
          <el-input v-model="ruleForm.GroupNum" :disabled="isSID" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
        </p><em class="elText">人可成团</em>
        <span class="fontColor">成团人数只可设置一次，请谨慎填写</span>
      </el-form-item>
      <el-form-item label="有效期" prop="ValidTime">
        <em class="elText">个人拼团有效期</em>
        <p class="Inpwidth">
          <el-input v-model="ruleForm.ValidTime" maxlength="6" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" ></el-input>
        </p><em class="elText">小时</em>
      </el-form-item>
      <el-form-item label="虚拟成团" prop="Virtual">
        <el-radio v-model="ruleForm.Virtual" label="0">未开启</el-radio>
        <el-radio v-model="ruleForm.Virtual" label="1">开启</el-radio>
        <span class="fontColor">开启虚拟成团后，活动结束以后，已开团但人数未满的团不进行退款，默认拼团成功</span>
      </el-form-item>
       <el-form-item label="待支付订单过期时限" prop="AutoCancelOrder">
        <el-input type="text" v-model="ruleForm.AutoCancelOrder" onkeyup="value=value.replace(/\D/g, '').replace(/^0{1,}/g, '')" class="inputSty"></el-input>&nbsp;&nbsp;分钟
      </el-form-item>
      <el-form-item label="支付方式" prop="PayType">
        <el-checkbox-group v-model="ruleForm.PayType" style="display:inline-block">
          <el-checkbox label="1">微卡支付</el-checkbox>
          <el-checkbox label="2">微信支付</el-checkbox>
          <el-checkbox label="4" v-if="isTicketType.ProdType !='1' && isStockType != '0'">券支付</el-checkbox>
        </el-checkbox-group>
        <span class="Spancolor" v-if="isTicketType.ProdType !='1' && isStockType != '0'">（勾选券支付，表示在拼团活动可以使用电子券）</span>
        <!-- 勾选券支付，表示在拼团活动可以使用电子券 -->
      </el-form-item>
      <el-form-item label="是否支持退货" prop="PayType">
        <el-checkbox-group v-model="ruleForm.PayType" style="display:inline-block">
          <el-checkbox label="5">不允许退货</el-checkbox>
        </el-checkbox-group>
      </el-form-item>    
      
      <template-notice ref="temNotice"></template-notice>   
      <!-- <el-form-item label="重要提示" prop="ImportantNotes" class="FeaturesStyle">
        <el-button
          type="text"
          @click="ImportantNotesShow = true"
          v-if="ImportantNotesShow === false"
        >+编辑</el-button>
        <ueditor1 v-if="ImportantNotesShow" ref="ImportantNotes"></ueditor1>
        <el-button
          type="text"
          @click="ImportantNotesShow = false"
          v-if="ImportantNotesShow === true"
        >隐藏</el-button>
      </el-form-item> -->

    </el-form>
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
    </div>
    <mall-goods :goodsShow="goodsShow" @changeDig="changeDig" :isGroup="isGroup" @sureGood="sureGood" :prodList="prodListArr"></mall-goods>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import mallGoods from "@/components/Dialog/mallGoods";
import ueditor1 from "@/components/ueditor1/";
import "@/config/jquery.base64.js";
import _ from "lodash";
import * as ruleText from "@/view/wechatManager/rulesFrom";
import TemplateNotice from './templateNotice.vue';
export default {
  name:"addEditGood",
  data(){
    return{
      isGroup:true,
      isSID:this.$route.query.SID?true:false,
      ruleForm:{
        Type: "5",
        ProdList: [],
        StartDate:"",//活动日期开始
        EndDate:"",//活动日期结束
        PayType: ["1", "2"],
        AutoCancelOrder:'10',//自动取消时间
        Name:"",
        MaxGroupCnt:'',//最大开团数量
        GroupNum:'' ,//成团人数
        ValidTime:'' ,//有效时间（小时）
        Virtual:'1' ,//虚拟成团开启（0未开启，1开启）        
      },
      activityDate: [],
      PickDate: [],//提货日期
      isTicketType:{},
      isStockType:"",
      rules: {
        ProdNo: [ruleText.ProdNo(this, "请选择活动商品")],
        Name: [ruleText.Name(this, "请填写活动名称")],
        StoreQty: [ruleText.StoreQty(this)],
        ShopInfo: [ruleText.ShopInfo(this)],
        PayType: [
          { required: true, message: "请选择支付方式", trigger: "change" },
        ],
        SalePrice: [
          { required: true, message: "请填写秒杀售价", trigger: "blur" },
        ],
        activityDate: [
          {
            required: true,
            message: "请选择活动日期",
            trigger: "change",
            validator: (rules, value, callback) => {
              if (!this.activityDate) {
                callback(new Error("请选择活动日期"));
              } else {
                callback();
              }
            },
          },
        ],
      },
      loading: false,
      goodsShow: false,
      prodListArr: [],
      ImportantNotesShow: true, // 显示隐藏 重要提示
    }
  },
  components:{mallGoods,ueditor1,TemplateNotice},
  created(){
    if(this.$route.query.SID){
      this.getActiveGoodInfo();
    }
  },
  methods:{
    async getActiveGoodInfo(){//获取详情
      try {
        let res = await getLists({
          Action:'GetPromotion',
          SID: this.$route.query.SID,
          Type:'5'
        },"MPromotionOpera")
          this.ruleForm = res.Data.Promotion;
          let cloneTemp = _.cloneDeep(this.$refs.temNotice.ruleForm);
          let arr = res.Data.TemplateList;
          let list = arr.reduce((pre,cur)=>{
            let target = pre.find(ee=>ee.TextType == cur.TextType);
            if(target){
              Object.assign(target,cur)
            }else{
              pre.push(cur)
            }
            return pre
          },cloneTemp)
          // this.$refs.temNotice.ruleForm = list;//模板消息
          this.$refs.temNotice.ruleForm=list.map((item,index)=>{
            return {
              TempText: item.TempText.replace(/\|/g, '\n'),
              TextType: item.TextType,
              Type: item.Type,
              WeChatNo: item.WeChatNo,
              SID:item.SID
            }
          })
          // console.log(this.$refs.temNotice.ruleForm,'111111')
          this.ruleForm.PayType = this.ruleForm.PayType ? this.ruleForm.PayType.split(",") : []; 
          // this.ruleForm.MaxGroupCnt = this.ruleForm.PromWhere.split(',')[0]//最大团
          this.ruleForm.GroupNum = this.ruleForm.PromWhere.split(',')[1]//
          // this.ruleForm.ValidTime = this.ruleForm.PromWhere.split(',')[2]//
          // this.ruleForm.Virtual = this.ruleForm.PromWhere.split(',')[3]//虚拟成团
          this.$set(this.ruleForm,'MaxGroupCnt',this.ruleForm.PromWhere.split(',')[0]);
          // this.$set(this.ruleForm,'MaxGroupCnt',this.ruleForm.PromWhere.split(',')[1]);
          this.$set(this.ruleForm,'ValidTime',this.ruleForm.PromWhere.split(',')[2]);
          this.$set(this.ruleForm,'Virtual',this.ruleForm.PromWhere.split(',')[3]);
          this.ruleForm.PickStartTime=this.ruleForm.PromWhere.split(',')[4]
          this.ruleForm.PickEndTime=this.ruleForm.PromWhere.split(',')[5];//提货时间
          this.PickDate = [this.ruleForm.PickStartTime, this.ruleForm.PickEndTime];//获取提货时间
          this.ruleForm.ProdList = res.Data.ItemList;
          this.isStockType = this.ruleForm.ProdList[0].SpecType;
          this.prodListArr = resData.ItemList;
          this.ruleForm.MaxBuyCnt = this.ruleForm.MaxBuyCnt ? Number(this.ruleForm.MaxBuyCnt) : 0;
          this.ruleForm.ProdNo = "";
          this.ruleForm.ProdList.forEach(D => {
            this.ruleForm.ProdNo +=
              D.ProdNo + (this.ruleForm.ProdList.length > 1 ? ";" : "");
          });
          if (this.ruleForm.SpecType === "1") {
            // 单规格
            let ProdArr = this.ruleForm.ProdList[0];
            this.ruleForm.SalePrice = ProdArr.SalePrice;
            this.ruleForm.StoreQty = ProdArr.StoreQty;
            let SurplusQty = Number(ProdArr.StoreQty) - Number(ProdArr.SurplusQty);
            this.ruleForm.SurplusQty = SurplusQty;
            // console.log(this.ruleForm, 888);
          }
      } catch (error) {
        
      }
    },
    selectGoods(index) {//点击添加的商品
      this.prodListArr = this.prodListArr;
      this.goodsShow = true;
      this.goodsNormsIndex = index;
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    sureGood(val) { // 获取的商品的名字和编号
      this.isTicketType = val
    console.log(val)
      let groupArr = []
      groupArr.push(val)
      this.goodsShow = false;
      // this.ruleForm.ProdList = val;
      let arr = [];
      if(this.$route.query.SID){
        arr = groupArr.map((item,index)=>{
          return {
            Name: item.Name,
            SID:item.SID,
            OldPrice: item.OldPrice,
            SalePrice: item.SalePrice,
            Stock: item.Stock,
            StockType:item.StockType,
            StoreQty: item.StoreQty,
            // SurplusQty:item.SurplusQty,
            SurplusQty:item.SurplusQty,
            MaxBuyCnt:item.MaxBuyCnt?item.MaxBuyCnt:'1',//限购数量
            ProdSID: item.ProdSID,
            SpecSID: item.SpecSID,
            ProdNo: item.ProdNo,
            SpecType: item.SpecType,
          }
        })
      }else{
        arr = groupArr.map((item,index)=>{
          return {
            Name: item.Name,
            SID:item.SID,
            OldPrice: item.OldPrice,
            SalePrice: item.SalePrice,
            Stock: item.Stock,
            StockType:item.StockType,
            StoreQty: item.StoreQty,
            // SurplusQty:item.SurplusQty,
            SurplusQty:item.StoreQty,
            MaxBuyCnt:item.MaxBuyCnt?item.MaxBuyCnt:'1',//限购数量
            ProdSID: item.ProdSID,
            SpecSID: item.SpecSID,
            ProdNo: item.ProdNo,
            SpecType: item.SpecType,
          }
        })
      }
      this.ruleForm.ProdList = arr;  
      console.log(arr,'看剩余数量和库存')
    },
    cancelFun(){//取消
      this.$router.push("/weChat/manager/activity/groupGoodSetting");
    },
    preserveFun(){
      for(let i = 0;i<this.ruleForm.ProdList.length;i++){
          if(this.ruleForm.ProdList[i].SalePrice===undefined){
            this.$message.error("请填写活动价格")
            return false;
          }
          if(this.ruleForm.ProdList[i].StockType==='1'){
            if(Number(this.ruleForm.ProdList[i].StoreQty) > Number(this.ruleForm.ProdList[i].Stock)){
              this.$message.error("活动数量不能大于商品库存")
              return false;
            }
            
          }
          if(Number(this.ruleForm.ProdList[i].SurplusQty) > Number(this.ruleForm.ProdList[i].StoreQty)){
            this.$message.error("剩余数量不能大于活动数量")
            return false;
          }
          if(Number(this.ruleForm.ProdList[i].MaxBuyCnt) > Number(this.ruleForm.ProdList[i].StoreQty)){
            this.$message.error("限购数量不能大于活动数量")
            return false;
          }
      }
      if(this.ruleForm.PayType.indexOf("4")>-1&&this.ruleForm.PayType.length==1){
       return this.$message.error('支付方式必须包含微信或微卡支付')
      }
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            // obj.TemplateList = this.$refs.temNotice.ruleForm;
            let temRuleArr = _.cloneDeep(this.$refs.temNotice.ruleForm);
            let TempArr = []
            temRuleArr.forEach((item,index)=>{
              if(item.TempText && item.WeChatNo){
               TempArr.push(item)
              }
            })
            obj.TemplateList = JSON.stringify(TempArr)
            // obj.ProdList = JSON.stringify(obj.ProdList);
            if(this.$route.query.SID){
              let arr = obj.ProdList.map((item,index)=>{
              return {
                Name: item.Name,
                SID:item.SID,
                OldPrice: item.OldPrice,
                SalePrice: item.SalePrice,
                Stock: item.Stock,
                StockType:item.StockType,
                StoreQty: item.StoreQty,
                SurplusQty:item.SurplusQty,
                // SurplusQty:item.StoreQty,
                MaxBuyCnt:item.MaxBuyCnt,//限购数量
                ProdSID: item.ProdSID,
                SpecSID: item.SpecSID,
                ProdNo: item.ProdNo,
                SpecType: item.SpecType,
              }
            })
            obj.ProdList = JSON.stringify(arr);
            }else{
              let arr = obj.ProdList.map((item,index)=>{
              return {
                Name: item.Name,
                SID:item.SID,
                OldPrice: item.OldPrice,
                SalePrice: item.SalePrice,
                Stock: item.Stock,
                StockType:item.StockType,
                StoreQty: item.StoreQty,
                // SurplusQty:item.SurplusQty,
                SurplusQty:item.StoreQty,
                MaxBuyCnt:item.MaxBuyCnt?item.MaxBuyCnt:'1',//限购数量
                ProdSID: item.ProdSID,
                SpecSID: item.SpecSID,
                ProdNo: item.ProdNo,
                SpecType: item.SpecType,
              }
            })
            obj.ProdList = JSON.stringify(arr);
            }
            const PromWhere = [];          
            PromWhere.push(obj.MaxGroupCnt,obj.GroupNum,obj.ValidTime,obj.Virtual,this.PickDate[0],this.PickDate[1])               
            obj.PromWhere = PromWhere.toString()
            obj.PayType = typeof obj.PayType !== "string" && obj.PayType ? obj.PayType.join(",") : obj.PayType;
            obj.Action = "SetPromotionInfo";
            let data = await getLists(obj, "MPromotionOpera");
            setTimeout(() => {
              this.$router.push("/weChat/manager/activity/groupGoodSetting");
            }, 300);
            this.$message.success('操作成功');
          } catch (e) {
            this.$message.error(e);
          }
        } else {
          return false;
        }
      });
    },
    delGoodsNorms(index){//删除
      this.ruleForm.ProdList.splice(index, 1);
    }
  }
}
</script>
<style lang="less">
.addEditGood {
  padding-bottom: 20px;
  .el-input,.el-range-editor.el-input__inner {
    width: 300px;
  }
  .el-input-number {
    .el-input {
      width: auto;
    }
  }
  .FeaturesStyle {
    .el-form-item__content {
      line-height: 20px;
    }
  }
  .active-code-style {
    position: fixed;
    top: 150px;
    right: 150px;
    .active-code-style-title {
      text-align: center;
      padding: 8px;
      color: #409eff;
    }
  }
  .Inpwidth {
    width: 80px;
    display: inline-block;
    margin: 0 5px;
    .el-input {
      width: 100% !important;
    }
  }
  .fontColor {
    color: #cfcfcf;
  }
}
</style>