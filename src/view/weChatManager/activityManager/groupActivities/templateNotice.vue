<template>
     <!-- 拼团通知消息模板 -->
     <div class="templateNotice">
          <div v-for="(item,index) in ruleForm" :key="index">
               <p v-if="item.TextType==='1'">拼团付款成功通知设置</p>
               <p v-if="item.TextType==='2'">拼团成功通知设置</p>
               <p v-if="item.TextType==='3'">拼团失败退款成功通知设置</p>
               <p v-if="item.TextType==='4'">拼团失败退款失败通知设置</p>
               <el-form-item label="模板ID：">
                    <el-input v-model="item.WeChatNo"></el-input>
               </el-form-item>
               <el-form-item label="模板内容：" prop="TempText">
                    <el-input v-model="item.TempText" placeholder="最长支持500个字符" maxlength="500"  type="textarea" :autosize="{ minRows: 4}"></el-input>
                    <el-color-picker v-model="color1" v-if="item.TextType===1">></el-color-picker>
               </el-form-item>
               <el-form-item label="变量说明：">
                    <div class="explain" v-if="item.TextType==='1'">
                         <span> {活动名称}、{参团人数}、{剩余人数}</span><br/>
                         <span>{付款时间}、{拼团价}</span>
                    </div>
                    <div class="explain"  v-if="item.TextType==='2'">
                         <span>{活动名称}、{昵称}、{人数}、{时间}</span><br/>
                         <span>{拼团价}</span>
                    </div>
                    <div class="explain"  v-if="item.TextType==='3'">
                         <span>{活动名称}、{时间}、{拼团价}</span><br/>
                         <span>{退款金额}</span>
                    </div>
                    <div class="explain"  v-if="item.TextType==='4'">
                         <span>{活动名称}、{订单号}、{时间}、{拼团价}</span><br/>
                         <span>{退款金额}、{退款失败原因}</span><br/>
                    </div>
               </el-form-item>
          </div>
     </div>
</template>
<script>
export default {
     name:"",
     data(){
          return{
               ruleForm:[{
                    WeChatNo:'',
                    TempText:'',
                    TextType:'1',
                    Type:'5'
               },{
                    WeChatNo:'',
                    TempText:'',
                    TextType:'2',
                    Type:'5'
               },{
                    WeChatNo:'',
                    TempText:'',
                    TextType:'3',
                    Type:'5'
               },{
                    WeChatNo:'',
                    TempText:'',
                    TextType:'4',
                    Type:'5'
               }],
               color1:'#409EFF',
               
          }
     },
     methods:{
          look(){
               console.log(this.ruleForm)
          }
     }
}
</script>
<style  lang="less" scoped>
.el-textarea,.explain{
     width: 300px;
}
.kong{
     padding-bottom: 10px;
     height: 30px;
}
.explain{
     background-color: #cccccc;
     span{
          padding-left: 8px;
     }
}
</style>