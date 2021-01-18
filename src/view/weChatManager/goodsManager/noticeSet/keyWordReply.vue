<template>
  <div class="keyWordReply">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="关键词自动回复" name="first">
        <div class="keyword">
          <p class="tips title">关键字自动回复</p>
          <p class="tips">设置一次回复多条图文消息，请以相同关键字+‘,_1’,‘,_2’,‘,_3’格式结尾。</p>
          <p class="tips">例如：回复一：测试 回复二：测试,_1 回复二：测试,_2</p>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="关键词" prop="Name">
            <el-input v-model="ruleForm.Name" placeholder="关键字最长支持50个字符"></el-input>
          </el-form-item>
          <el-form-item label="回复类型" prop="ReplyType">
            <el-select v-model="ruleForm.ReplyType" placeholder="请选择回复类型">
              <el-option label="文本回复" value="1"></el-option>
              <el-option label="图文回复" value="2"></el-option>
              <el-option label="图片回复" value="3"></el-option>
            </el-select>
          </el-form-item>
          <div v-show="ruleForm.ReplyType === '2'">
            <el-form-item label="回复标题" prop="Title" :rules="{required:true,message:'请输入回复标题',trigger:'blur'}" v-if="ruleForm.ReplyType === '2'|| ruleForm.ReplyType==='3'">
              <el-input v-model="ruleForm.Title" placeholder="回复标题最长支持200个字符"></el-input>
            </el-form-item>
            <el-form-item label="回复内容" prop="Contents">
              <el-input type="textarea" v-model="ruleForm.Contents"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="Url">
              <el-input type="text" v-model="ruleForm.Url"></el-input>
              <el-button @click="chooseUrl">选择链接</el-button>
            </el-form-item>
            <el-form-item label="图片" prop="Img">
              <imgLoad
                style="margin-top:10px"
                :limit="1"
                @upLoadImgs="upLoadImg"
                :fileListUp="fileListUp"
                folder="ShopImg"
                ref="imgLoad"
              ></imgLoad>
            </el-form-item>
          </div>
          <div v-show="ruleForm.ReplyType === '1'">
            <el-form-item label="回复内容" prop="Contents">
              <el-input type="textarea" v-model="ruleForm.Contents" :autosize="{ minRows: 4}"></el-input>
              <div style="display:inline-block">
                <el-button @click="intoUrl">插入链接</el-button><br/>
                <el-button @click="OpenEmotions">插入表情</el-button>
              </div>
            </el-form-item>
          </div>
          <div v-show="ruleForm.ReplyType === '3'">
            <el-form-item label="图片" prop="Img">
              <imgLoad
                style="margin-top:10px"
                :limit="1"
                @upLoadImgs="upLoadImg"
                :fileListUp="fileListUp"
                folder="ShopImg"
                ref="imgLoad"
              ></imgLoad>
            </el-form-item>
          </div>
        </el-form>
        <div class="preserveStyle">
          <el-button @click="cancelFun">取消</el-button>
          <el-button type="primary" style="margin-left: 20px" @click="preserveFun('ruleForm')" :disabled="isDisabled">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注后自动回复" name="second" v-if="!this.noticeSid"></el-tab-pane>
      <el-tab-pane label="消息托管" name="three" v-if="!this.noticeSid"></el-tab-pane>
      <el-tab-pane label="小尾巴" name="four" v-if="!this.noticeSid"></el-tab-pane>
    </el-tabs>
    <autoHomeUrl ref="homeUrl" :showUrl = "showUrl" @sureUrl="sureUrl" @closeUrl="closeUrl"></autoHomeUrl>
    <SetUrlDialog ref="SetUrlD" :dialogShow="dialogShow" @closeSetUrl="closeSetUrl" @sureConserve="sureConserve"></SetUrlDialog>
    <Emotion ref="EmotionB" @AppendInputValue="AppendMessageText"></Emotion>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import imgLoad from "@/components/download/imgLoad";
import _ from "lodash";
import { GetBaseImgUrl } from "@/config/publicFunction";
import autoHomeUrl from '@/components/autoHomeUrl/homeUrl.vue';
import Emotion from './emoji.vue'
import SetUrlDialog from './urlDialog'
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      ruleForm: {
        Name: "",
        Type: "1",
        ReplyType: "1",
        Title: "",
        Contents: "",
        Url: "",
        Img: ""
      },
      showUrl:false,
      formLabelWidth:'120',
      fileListUp: [],
      rules: {
        Name: [{ required: true, message: "请输入关键字", trigger: "blur" }],
        ReplyType: [
          { required: true, message: "请选择回复类型", trigger: "change" }
        ]
        // Title: [{ required: true, message: "请输入回复标题", trigger: "blur" }]
      },
      noticeSid: this.$route.query.noticeSID,
      // noticeSid:sessionStorage.getItem('noticeSID'),
      dialogShow:false,
      form:{
        name:'',
        url:''
      },
      isDisabled:false
    };
  },
  created() {
    if(this.noticeSid){
      this.GetOrderTemplate();
    }
  },
  components: { imgLoad ,autoHomeUrl,Emotion,SetUrlDialog},
  methods: {
    handleClick() {
      if (this.activeName === "second") {
        this.$router.push({ path: "/weChat/manager/autoReply" });
      } else if (this.activeName === "three") {
        this.$router.push({ path: "/weChat/manager/msgHosting" });
      } else if (this.activeName === "four") {
        this.$router.push({ path: "/weChat/manager/tails" });
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
          this.isDisabled = true;
          setTimeout(() => {
            this.isDisabled = false;
          }, 5000)
          try {
            let obj = _.cloneDeep(this.ruleForm);
            obj.Type = '1';
            obj.Action = "SetReply";
            let data = await getLists(obj, "MBaseOpera");
            this.$message.success("操作成功");
            this.$router.push({path:"/weChat/manager/noticeList"})
          } catch (error) {
            this.$message.error(error);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancelFun() {
      this.$router.push("/weChat/manager/noticeList");
    },
    async GetOrderTemplate() {
      let { Data } = await getLists(
        {
          Action: "GetReply",
          Type: "1",
          SID: this.noticeSid
        },
        "MBaseOpera"
      );
      this.ruleForm = Data.Reply;
      if(this.ruleForm.Img){
        this.fileListUp = GetBaseImgUrl()+this.ruleForm.Img ? [{ url: GetBaseImgUrl() + this.ruleForm.Img }] : [];  
      }
      
    },
    addEmoji(e) {
      console.log(e)
      this.ruleForm.Contents += e.native;
    },
    OpenEmotions() {
      this.$refs.EmotionB.OpenEmotion(true);
    },
    //表情选中后追加在input
    AppendMessageText(EmotionChinese) {
      this.ruleForm.Contents += EmotionChinese;
    },
    chooseUrl(){//选择链接地址
      this.showUrl = true;
    },
    closeUrl(bool){
      this.showUrl = bool;
    },
    sureUrl(val){
      this.showUrl = false;
      // console.log(val)
      this.ruleForm.Url = val.url;
    },
    intoUrl(){//插入链接
      this.dialogShow = true;
      this.form = this.form
    },
    closeSetUrl(bool){
      this.dialogShow = bool;
    },
    sureConserve(val){
      this.dialogShow = false;
      this.ruleForm.Contents += `<a href ='${val.url}'>${val.name}</a>`
    }
  }
};
</script>
<style lang="less" scoped>
.keyWordReply {
  margin-bottom: 20px;
  // background: #fff;
  .keyword {
    width: 50%;
    background: #f3f3f3;
    padding-left: 20px;
    margin-bottom: 15px;
    .title {
      padding-top: 5px;
      font-size: 16px;
    }
    .tips {
      padding-bottom: 4px;
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
    border-color: #409eff;
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
.el-input,
.explain,
.el-textarea {
  width: 300px;
}
.explain {
  background-color: #cccccc;
  span {
    padding-left: 8px;
  }
}
</style>
