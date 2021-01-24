<template>
     <div class="satisfyAddEdit">
          <el-form ref="form" :model="form" label-width="120px">
               <el-form-item label="活动名称">
                    <el-input v-model="Name"></el-input>
               </el-form-item>
               <el-form-item label="时间">
                    <el-date-picker v-model="PartTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
               </el-form-item>
               <el-form-item label="触发类型">
                    <el-select v-model="PromWhere" @change="changeProm" placeholder="请选择">
                         <el-option label="请选择触发类型" value=""></el-option>
                         <el-option label="用户关注" value="0"></el-option>
                         <!-- <el-option label="用户申请卡" value="1"></el-option>
                         <el-option label="用户绑定卡" value="2"></el-option> -->
                    </el-select>
               </el-form-item>
               <publicFunction ref="formInfo" :chooseType = "chooseType" :editInfo = "editInfo"></publicFunction>
               <!-- <el-form-item label="模板ID">
                    <el-input v-model="TemplateInfo.WeChatNo"></el-input>
               </el-form-item>
               <el-form-item label="模板内容">
               <el-input v-model="TemplateInfo.TempText" :autosize="autosize" type="textarea"></el-input>
               </el-form-item> -->
          </el-form>
          
          <div class="preserveStyle">
               <el-button @click="cancelFun">取消</el-button>
               <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
          </div>
          <!-- <satisfyTicket :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood"></satisfyTicket> -->
     </div>
     
     <!-- 当触发类型是用户关注时，不展示赠送积分、赠送充值 和 参与次数-->
</template>
<script>
// import satisfyTicket from "@/components/Dialog/satisfyTicket";
import publicFunction from "@/components/Dialog/satisfyComm/publicTemplate";
import { getLists } from "@/api/vipCard"; //调用接口引用
export default {
     name:"satisfyAddEdit",
     data(){
          return{
               form:{
                    GiveInfo:'',
                    GiveScore:'',
                    GiveMoney:'',
                    GiveCnt:'',
                    LimitCnt:''
               },
               // TemplateInfo: {
               //      WeChatNo: "",
               //      TempText: ""
               // },
               autosize: { minRows: 2, maxRows: 6 },
               Name:'',
               PromWhere:'',
               PartTime: [], //开始时间数组
               StartDate: "", //开始时间
               EndDate: "", //结束时间
               chooseType:'',
               editInfo:{},
               Start: "0", //状态
               Audit: "",
               
          }
     },
     components:{publicFunction},
     created(){
          if(this.$route.query.SID){
               this.getAddEditInfo();
          }
     },
     methods:{
          changeProm(){
               this.chooseType = this.PromWhere;
          },
          async getAddEditInfo(){
               let SID = this.$route.query.SID;
               let data = await getLists({
                    SID: SID,
                    Action: "GetPromotion",
                    Type:'6'
               },"MPromotionOpera");
               this.editInfo = data.Data.GiveList[0];
               this.Name = data.Data.Promotion.Name;
               this.chooseType = data.Data.Promotion.PromWhere;
               this.Start = data.Data.Promotion.Start;
               this.Audit = data.Data.Promotion.Audit;
               // if (data.Data.TemplateList) {
               //      this.TemplateInfo = data.Data.TemplateList[0];
               // }
               this.PromWhere = data.Data.Promotion.PromWhere;
               this.PartTime.push(
                    data.Data.Promotion.StartDate,
                    data.Data.Promotion.EndDate
               );
          },
          async preserveFun(){
               try {
                    if (this.PartTime) {
                         this.StartDate = this.PartTime[0];
                         this.EndDate = this.PartTime[1];
                    }
                    let GiveList = [];
                    // let TemplateList = [];
                    // TemplateList.push(this.TemplateInfo);
                    GiveList.push(this.$refs.formInfo.formInfo);                    
                    let data = await getLists({
                         Name: this.Name,
                         Type: "6",
                         PromWhere:this.PromWhere,
                         StartDate: this.StartDate,
                         EndDate: this.EndDate,
                         SID: this.$route.query.SID ? this.$route.query.SID : "",
                         GiveList: JSON.stringify(GiveList),
                         Start:this.$route.query.SID?this.Start:'',
                         Audit:this.$route.query.SID?this.Audit:'',
                         // TemplateList: JSON.stringify(TemplateList),
                         Action: "SetPromotionInfo",
                         },
                         "MPromotionOpera"
                    );
                    this.$message.success('操作成功')
                    setTimeout(() => {
                         this.$router.push("/weChat/manager/activity/satisfyList");
                    }, 300);
               } catch (error) {
                    this.$message.error(error)
               }
          },
          cancelFun(){
               this.$router.push("/weChat/manager/activity/satisfyList");
          }
     }
}
</script>
<style lang="less" scoped>
.el-input,.el-input__inner,.el-select,.el-textarea{
     width: 300px;
}
</style>