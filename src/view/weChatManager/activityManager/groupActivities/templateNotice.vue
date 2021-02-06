<template>
     <!-- 拼团通知消息模板 -->
     <div class="templateNotice">
          <p>拼团付款成功通知设置</p>
          <el-form-item label="模板ID：">
               <el-input v-model="ruleForm.WeChatNo"></el-input>
          </el-form-item>
          <el-form-item label="模板内容：" prop="TempText">
               <el-input v-model="ruleForm.TempText" placeholder="最长支持500个字符" maxlength="500"  type="textarea" :autosize="{ minRows: 4}"></el-input>
               <el-color-picker v-model="color1"></el-color-picker>
          </el-form-item>
          <el-form-item label="变量说明：">
               <div class="explain">
                    <span> {活动名称}、{参团人数}、{剩余人数}、{付款时间}</span><br/>
                    <span>{拼团价}</span>
               </div>
          </el-form-item>
          <p>拼团成功通知设置</p>
          <el-form-item label="模板ID：">
               <el-input v-model="ruleForm.WeChatNo"></el-input>
          </el-form-item>
          <el-form-item label="模板内容：" prop="TempText">
               <el-input v-model="ruleForm.TempText" type="textarea" placeholder="最长支持500个字符" maxlength="500"  :autosize="{ minRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="变量说明：">
               <div class="explain">
                    <span>{活动名称}、{昵称}、{人数}、{时间}</span><br/>
                    <span>{拼团价}</span>
               </div>
          </el-form-item>
          <p>拼团失败退款成功通知设置</p>
          <el-form-item label="模板ID：">
               <el-input v-model="ruleForm.WeChatNo"></el-input>
          </el-form-item>
          <el-form-item label="模板内容：" prop="TempText">
               <el-input v-model="ruleForm.TempText" type="textarea" placeholder="最长支持500个字符" maxlength="500"  :autosize="{ minRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="变量说明：">
               <div class="explain">
                    <span>{活动名称}、{时间}、{拼团价}</span><br/>
                    <span>{退款金额}</span>
               </div>
          </el-form-item>
          <p>拼团失败退款失败通知设置</p>
          <el-form-item label="模板ID：">
               <el-input v-model="ruleForm.WeChatNo"></el-input>
          </el-form-item>
          <el-form-item label="模板内容：" prop="TempText">
               <el-input v-model="ruleForm.TempText" type="textarea" placeholder="最长支持500个字符" maxlength="500"  :autosize="{ minRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="变量说明：">
               <div class="explain">
                    <span>{活动名称}、{订单号}、{时间}</span><br/>
                    <span>{拼团价}、{退款金额}</span><br/>
                    <span>{退款失败原因}</span>
               </div>
          </el-form-item>
          <p>页面分享设置</p>
          <el-form-item label="分享标题：">
               <el-input v-model="ruleForm.WeChatNo"></el-input>
          </el-form-item>
          <el-form-item label="分享描述：">
               <el-input v-model="ruleForm.WeChatNo"></el-input>
          </el-form-item>
          <div class="kong" @click="look">点击一下看看</div>
     </div>
</template>
<script>
export default {
     name:"",
     data(){
          return{
               ruleForm:{

               },
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
}
.explain{
     background-color: #cccccc;
     span{
          padding-left: 8px;
     }
}
</style>