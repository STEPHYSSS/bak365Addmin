<template>
     <div class="satisfyAddEdit">
          <el-form ref="form" :model="form" label-width="120px">
               <el-form-item label="活动名称">
                    <el-input v-model="form.Name"></el-input>
               </el-form-item>
               <el-form-item label="时间">
                    <el-date-picker style="width:400px" v-model="PartTime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间">
                    </el-date-picker>
               </el-form-item>
               <p>限制条件</p>
               <el-form-item label="关键字">
                    <el-input v-model="Key" maxlength="20"></el-input>
               </el-form-item>
               <el-form-item label="活动类型">
                    <el-select v-model="acType" placeholder="请选择活动区域" :disabled="disabled">
                         <el-option label="用户关注" value="0"></el-option>
                         <!-- <el-option label="申请微卡" value="1"></el-option>
                         <el-option label="绑定实体卡" value="2"></el-option> -->
                         <el-option label="邀请充值" value="3"></el-option>
                         <el-option label="营销推广" value="4"></el-option>
                    </el-select>
               </el-form-item>
              <div v-if="acType ==0">
               <p>消息通知</p>
               <div v-for="(item) in form.TemplateList" :key="item.SID">
                    <el-form-item label="模板ID">
                         <el-input v-model="item.WeChatNo"></el-input>
                    </el-form-item>
                    <el-form-item label="模板内容">
                         <!-- <textarea v-model="TemplateList.TempText" cols="40" rows="2" maxlength="500"></textarea> -->
                         <el-input v-model="item.TempText" type="textarea" :autosize="{ minRows: 4}"></el-input>
                         <el-color-picker v-model="color1"></el-color-picker>
                    </el-form-item>
               </div>
               <el-form-item label="变量说明">
                    <div class="explain">
                         <span>{昵称}、{时间}、{奖励}、{活动名称}</span><br/>
                         <span>{邀请人数}</span>
                    </div>
               </el-form-item>
               <p class="explan">奖项说明</p>
               <div v-for="(item,index) in form.GiveList" :key="index" class="addDiv">
                    <el-form-item :key="index + 1"  :prop="'GiveList.' + index + '.Name'" label="奖品名称">
                         <el-input v-model="item.Name" class="inputwith"></el-input>
                    </el-form-item>
                    <el-form-item :key="index + 2"  :prop="'GiveList.' + index + '.GiveCnt'" label="发放总量">
                         <el-input v-model="item.GiveCnt" class="inputwith" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input> 
                    </el-form-item>
                    <el-form-item :key="index + 3"  :prop="'GiveList.' + index + '.MeetCnt'" label="邀请人数">
                         <el-input v-model="item.MeetCnt" class="inputwith" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input> 人
                    </el-form-item>
                    <el-form-item :key="index + 4"  :prop="'GiveList.' + index + '.LimitCnt'" label="每人限领">
                         <el-input v-model="item.LimitCnt" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input> 次
                    </el-form-item>
                    <el-form-item :key="index + 5"  :prop="'GiveList.' + index + '.GiveScore'" label="赠送积分：">
                         <el-input v-model="item.GiveScore" class="inputwith" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
                    </el-form-item>
                    <el-form-item :key="index + 6"  :prop="'GiveList.' + index + '.GiveInfo'" label="赠送电子券：">
                         <el-input v-model="item.GiveInfo" readonly :disabled="true"></el-input>
                         <el-button type="primary" style="margin-left: 10px" size="medium" @click="clickTicket(index)" >添加</el-button>
                    </el-form-item>
                    <p class="addInfo"><el-button @click.prevent="removeDomain(index)">删除</el-button></p>
               </div>
               <p @click="addDomain" class="addInfo">增加一条</p>
              </div>
               <p>个性化</p>
               <el-form-item label="背景图片" prop="Img">
                   <imgLoad :limit="1" :fileListUp="fileListUp" @upLoadImgs="upLoadImg" folder="PromImg"></imgLoad>
                    <span class="tips">(建议:使用自定义背景图片必须按照范例图片制作；大小，位置必须一样
                    二维码尺寸：宽214像素，高214像素
                    二维码位置：距离图片顶部225像素，距离图片左部105像素;格式:JPG,PNG,JPEG)
                    </span>
                    <!-- <img src="../../../../assets/img/defaultBerweima.png"><img> -->
                    <el-button @click="defaultImg">范例(默认)</el-button>
               </el-form-item>
               
          </el-form>
          <div class="preserveStyle">
               <el-button @click="cancelFun">取消</el-button>
               <el-button type="primary" style="margin-left: 20px" @click="preserveFun">保存</el-button>
          </div>
          <satisfyTicket :info="info" :info2 = "info2" :showTicket="showTicket" @changeDig="changeDig" @sureGood="sureGood(arguments)"></satisfyTicket>
     </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import imgLoad from "@/components/download/imgLoad";
import satisfyTicket from "@/components/Dialog/satisfyTicket";
import {replacePre,GetBaseImgUrl } from "@/config/publicFunction";
import _ from "lodash";
export default {
     name:"xifenAddEdit",     
     data(){
          return{
               form:{
                    Name:"",                                        
                    StartDate: "", //开始时间
                    EndDate: "", //结束时间
                    Img:"",
                    TemplateList:[{
                         TempText:"",
                         WeChatNo:"",
                         Type:'9'
                    }],
                    GiveList:[]//赠送信息
               },
               Start: "0", //状态  
               Audit: "",             
               Key:"",
               acType:"",
               PartTime: [], //开始时间数组
               color1:"#409EFF",
               fileListUp: [],
               goodsNormsIndex: null,
               showTicket: false, //控制电子劵信息弹框显示
               info:[],
               info2:'sign',
               // imgUrl:require("../../../../assets/img/defaultBerweima.png"),
               imgUrl:require("../../../../assets/img/extensionBg.jpg"),//营销推广
               imgUrl2:require("../../../../assets/img/followBg.jpg"),//邀请关注
               imgUrl3:require("../../../../assets/img/invitationBg.jpg"),//邀请充值
               disabled:false
          }
     },
     components:{
          imgLoad,
          satisfyTicket
          
     },
     created(){
          if(this.$route.query.SID){
               this.disabled = true
               this.getInfo();
          }
     },
     methods:{
          async getInfo() {
              
               let data = await getLists(
                    {
                         SID: this.$route.query.SID,
                         Action: "GetPromotion",
                         Type:'9'
                    },
                    "MPromotionOpera"
               );
               if (data.Data.GiveList) {
                    this.form.GiveList = data.Data.GiveList;
               }
               if(data.Data.TemplateList.length>0){
                    this.form.TemplateList=data.Data.TemplateList.map((item,index)=>{
                         return {
                              TempText: item.TempText.replace(/\|/g, '\n'),
                              WeChatNo: item.WeChatNo,
                              SID:item.SID,
                              Type:item.Type
                         }
                    })
               }else{
                    this.form.TemplateList=[{
                         TempText:"",
                         WeChatNo:"",
                         Type:'9'
                    }]
               }
               
               this.form.Name = data.Data.Promotion.Name;
               this.Start = data.Data.Promotion.Start;
               this.Audit = data.Data.Promotion.Audit;
               if(data.Data.Promotion.PromWhere){
                    let PromWhere = data.Data.Promotion.PromWhere.split(',')
                    this.acType = PromWhere[0];
                    this.Key = PromWhere[1];
               }
               this.PartTime.push(
                    data.Data.Promotion.StartDate,
                    data.Data.Promotion.EndDate
               );
               if (data.Data.Promotion) {
                    this.fileListUp = [{url: process.env.Prefix + data.Data.Promotion.Img}]                    
                    this.form.Img = this.fileListUp[0].url 
               }else {
                    this.fileListUp = []
               }
               
          },
          clickTicket(index) {
               // 选择赠送电子券
               this.showTicket = true;
               this.goodsNormsIndex = index;
               let result = []
               if (this.form.GiveList[this.goodsNormsIndex].GiveInfo) {
               let strSplit = this.form.GiveList[this.goodsNormsIndex].GiveInfo.split(';')
               for (const i of strSplit) {
                    if (i) {
                    result.push(i.split(','))
                    } 
               }
               }else {
               result = []
               }
               this.info = result
          },
          changeDig(bool) {
               //用于子组件控制关闭按钮
               this.showTicket = bool;
          },
          sureGood(val) {
               //电子券弹窗确定按钮
               this.showTicket = false;
               this.info = val[0];
               this.form.GiveList[this.goodsNormsIndex].GiveInfo = val[1];
               //  this.form.GiveInfo = val;
          },
          addDomain(){//增加一条
               this.$nextTick(()=>{
                    this.form.GiveList.push({
                         Name:'',//奖品名称
                         GiveCnt:'',//奖品数量
                         MeetCnt:'',//邀请人数
                         LimitCnt:'1',//每人限领
                         GiveInfo:'',//电子券
                         GiveScore:'',
                         Sort:''
                    });  
                    this.form.GiveList.forEach((item,index) => {
                         item.Sort = index
                    });    
               })
          },
          removeDomain(index) {//删除赠送
               this.form.GiveList.splice(index, 1);
          },
          upLoadImg(arr) {
               this.fileListUp = arr
               console.log(this.fileListUp)
               if (arr.length > 0) {
               this.form.Img = arr[0].url          
               } else {
               this.form.Img = ''
               }
          },
          async preserveFun(){
               let giveList = this.form.GiveList;
               if(giveList.length==0 && this.acType == 0){
                   this.$message.error('请添加奖项说明') 
                   return false;
               }
               if(this.Key==''){
                    this.$message.error('关键字不能为空')
                    return false;
               }
               for (const i of giveList) {
                    if(i.GiveInfo == '' && i.GiveScore == '') {
                         this.$message.error('请填写赠送方式')
                         return false;
                    }
               } 
               if(this.form.Img==''){
                    this.$message.error('请上传背景图片')
                    return false;
               }             
               try {
                    if (this.PartTime) {
                         this.form.StartDate = this.PartTime[0];
                         this.form.EndDate = this.PartTime[1];
                    }
                    let obj = _.cloneDeep(this.form);
                    if(this.$route.query.SID){
                         obj.SID = this.$route.query.SID
                         obj.Start=this.Start;
                         obj.Audit=this.Audit;
                    }
                    if (obj.Img) {
                         obj.Img = replacePre(obj, 'Img')
                    }
                    obj.TemplateList.forEach((item,index)=>{
                         if(item.TempText==''|| item.WeChatNo==''){
                              obj.TemplateList = []
                         }else {
                              obj.TemplateList = JSON.stringify(obj.TemplateList)
                         }
                    })

                    obj. PromWhere = this.acType + ',' + this.Key;                    
                    obj.GiveList  = JSON.stringify(obj.GiveList)
                    obj.Action = "SetPromotionInfo";   
                    obj.Type="9";
                    let data = await getLists(obj, "MPromotionOpera");
                    this.$message.success('操作成功')
                    this.$router.push({path:'/weChat/manager/activity/Act_SuctionPowder'})
               } catch (error) {
                    this.$message.error(error);
               }
          },
          defaultImg(){
               // 用户关注（imgUrl2） 0 邀请充值（imgUrl3） 3  营销推广4（imgUrl）
               if(this.acType == '0'){

               }
               // window.open(process.env.BASE_URL + this.imgUrl)
               // const url = GetBaseImgUrl()+'Admin/'+this.imgUrl
               // console.log(url,'0000')
          },
          cancelFun(){
               this.$router.push({path:'/weChat/manager/activity/Act_SuctionPowder'})
          }
          
     }
}

</script>
<style lang="less" scoped>
.explan{
     margin-bottom: 20px;
}
.addDiv{
     width: 600px;
     border-bottom: 1px solid #cadcf7;
     margin-bottom: 15px;
}
.addInfo{
     width: 110px;
     color: rgb(34, 153, 255);
     text-align: center;
     margin-bottom: 20px;
}
.el-input,.el-input__inner,.el-select,.explain,.el-textarea{
     width: 300px;
}
.explain{
     background-color: #cccccc;
     span{
          padding-left: 8px;
     }
}
.tips{
     display: block;
     font-size: 12px;
     color: #cccccc;
}
</style>