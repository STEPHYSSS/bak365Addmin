<template>
     <div class="tails">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
               <el-tab-pane label="关键词自动回复" name="first"></el-tab-pane>
               <el-tab-pane label="关注后自动回复" name="second"></el-tab-pane>
               <el-tab-pane label="消息托管" name="three"></el-tab-pane>
               <el-tab-pane label="小尾巴" name="four">
                    <div class="keyword">
                         <p class="tips title">小尾巴</p>
                         <p class="tips">启用后，自动回复给粉丝的文本消息末尾都会自动加上“小尾巴”里的内容</p>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                         <el-form-item label="关键词" prop="Name">
                         <el-input v-model="ruleForm.Name" :readonly="true" :disabled="true"></el-input>
                         </el-form-item>         
                         <el-form-item label="回复内容" prop="Contents">
                         <el-input type="textarea" v-model="ruleForm.Contents"></el-input>
                         </el-form-item>
                         <el-button>插入链接</el-button> 
                         <el-button>插入表情</el-button> 
                    </el-form>
                    <div class="preserveStyle">
                         <el-button type="primary" style="margin-left: 20px" @click="preserveFun('ruleForm')">保存</el-button>
                    </div>
               </el-tab-pane>
          </el-tabs>          
     </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import imgLoad from "@/components/download/imgLoad";
import _ from "lodash";
export default {
     name:'',
     data(){
          return{ 
               activeName: "four",   
               ruleForm: {
                    Name:'小尾巴',
                    Type:'1',
                    ReplyType:'1',
                    Title:'',
                    Contents:'',
                    Url:'',
                    Img:''

               },
               fileListUp: [],
               rules: {
                    Name: [
                    { required: true, message: '请输入关键字', trigger: 'blur' }
                    ],
                    ReplyType: [
                    { required: true, message: '请选择回复类型', trigger: 'change' }
                    ],
                    Title: [
                    { required: true, message: '请输入回复标题', trigger: 'blur' }
                    ]
               }            
          }
     },
     created(){
          this.GetOrderTemplate()
     },
     components: { imgLoad }, 
     methods:{
          handleClick() {
               if (this.activeName === "second") {
                    this.$router.push({path:'/weChat/manager/autoReply'})
               }else if(this.activeName === "three"){
                    this.$router.push({path:'/weChat/manager/msgHosting'})
               }else if(this.activeName === "first"){
                    this.$router.push({path:'/weChat/manager/keyWordReply'})
               }
          },
          upLoadImg(imgs) {
               let arr = [];
               let ti = imgs;
               for (let i = 0; i < ti.length; i++) {
               arr.push(ti[i].url);
               }
               this.ruleForm.Img = arr.join(",");
          },
          preserveFun(formName) {
               this.$refs[formName].validate(async valid => {
                    if (valid) {
                         try {
                              let obj = _.cloneDeep(this.ruleForm);   
                              console.log(obj)   
                              obj.Action = "SetReply";
                              let data = await getLists(obj, "MBaseOpera");
                              this.$message.success('操作成功')
                         } catch (error) {
                              this.$message.error(error);
                         }
                    } else {
                    console.log('error submit!!');
                    return false;
                    }
               });
          },          
          async GetOrderTemplate() {
               let { Data } = await getLists(
               {
                    Action: "GetReply",
                    Type: "1",
               },
               "MBaseOpera"
               );
               console.log(Data,'555')
          },
     }
}
</script>
<style lang="less" scoped>
.tails{
     margin-bottom: 20px;
     // background: #fff;
     .keyword{
          width: 50%;
          background: #f3f3f3;
          padding-left: 20px;
          margin-bottom: 15px;
          .title{
               padding-top:5px ;
               font-size: 16px;
          }
          .tips{
               padding-bottom:4px ;
          }
     }
     .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
     }
     .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
     }
     .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
     text-align: center;
     }
     .avatar {
          width: 178px;
          height: 178px;
          display: block;
     }
     
}
.el-input,.explain,.el-textarea{
     width: 300px;
}
.explain{
     background-color: #cccccc;
     span{
          padding-left: 8px;
     }
}
</style>