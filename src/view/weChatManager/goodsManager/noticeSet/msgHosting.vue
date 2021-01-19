<template>
  <div class="msgHosting">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="关键词自动回复" name="first" v-if="!this.noticeSid"></el-tab-pane>
      <el-tab-pane label="关注后自动回复" name="second" v-if="!this.noticeSid"></el-tab-pane>
      <el-tab-pane label="消息托管" name="three">
        <div class="keyword">
          <p class="tips title">信息托管</p>
          <p class="tips">消息托管模式开启后，不管粉丝给你发什么信息，未触发其他自动回复规则时就会回复以下你设置的内容。</p>
          <p class="tips">设置一次回复多条图文消息，请以相同关键字+‘,_1’,‘,_2’,‘,_3’格式结尾。</p>
          <p class="tips">例如：回复一：测试 回复二：测试,_1 回复二：测试,_2</p>
        </div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div>
            <p>设置开启条件</p>
            <el-form-item label="分时段开启">
              <el-time-picker v-model="TimeStart" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="任意时间点" value-format="HH:mm:ss"></el-time-picker> 至 
              <el-time-picker v-model="TimeEnd" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="任意时间点" value-format="HH:mm:ss"></el-time-picker>
            </el-form-item>
            <el-form-item label="周几生效">
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="(item,index) in optionsWeek" :label="item.value" :key="index">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="不重复回复">
              <el-input type="number" v-model="ruleForm.Minute" min="0" class="inputSty"></el-input>&nbsp;&nbsp;分钟内只答复一次
            </el-form-item>
          </div>
          <!-- <el-form-item label="关键词" prop="Name">
            <el-input v-model="ruleForm.Name" placeholder="关键字最长支持50个字符"></el-input>
          </el-form-item> -->
          <el-form-item label="回复类型" prop="ReplyType">
            <el-select v-model="ruleForm.ReplyType" placeholder="请选择回复类型">
              <el-option label="文本回复" value="1"></el-option>
              <el-option label="图文回复" value="2"></el-option>
              <el-option label="图片回复" value="3"></el-option>
            </el-select>
          </el-form-item>
          <div v-show="ruleForm.ReplyType === '2'">
            <el-form-item label="回复标题" prop="Title" :rules="{required:true,message:'请输入回复标题',trigger:'blur'}" v-if="ruleForm.ReplyType === '2'">
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
      <el-tab-pane label="小尾巴" name="four" v-if="!this.noticeSid"></el-tab-pane>
    </el-tabs>
    <!-- <el-dialog title="设置链接" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="链接名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址：" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="conserve">保 存</el-button>
      </div>
    </el-dialog> -->
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
      activeName: "three",
      ruleForm: {
        // Name: "",
        Type: "3",
        ReplyType: "2",
        Title: "",
        Contents: "",
        Url: "",
        Img: "",
        Weeks: "",
        Time:""
      },
      TimeStart:"",
      TimeEnd:"",
      checkAll: false,
      checkedCities: [],
      optionsWeek: [
        { value: "1", label: "星期一" },
        { value: "2", label: "星期二" },
        { value: "3", label: "星期三" },
        { value: "4", label: "星期四" },
        { value: "5", label: "星期五" },
        { value: "6", label: "星期六" },
        { value: "0", label: "星期天" }
      ],
      isIndeterminate: true,
      formLabelWidth:'120',
      fileListUp: [],
      rules: {
        // Name: [{ required: true, message: "请输入关键字", trigger: "blur" }],
        ReplyType: [
          { required: true, message: "请选择回复类型", trigger: "change" }
        ]
        // Title: [{ required: true, message: "请输入回复标题", trigger: "blur" }]
      },
      noticeSid: this.$route.query.noticeSID,
      // noticeSid:sessionStorage.getItem('noticeSID'),
      dialogFormVisible:false,
      form:{
        name:'',
        url:''
      },
      isDisabled: false,
      showUrl:false,
       dialogShow:false,
    };
  },
  created() {
    if(this.noticeSid){
      this.GetOrderTemplate();
    }
  },
  components: { imgLoad,Emotion,autoHomeUrl,SetUrlDialog },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.optionsWeek.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.optionsWeek.length;
      // this.ruleForm.Weeks = value
      this.ruleForm.Weeks = value.join(",");
      // this.ruleForm.Weeks = this.checkedCities.value;
      // if (Array.isArray(this.ruleForm.Weeks)) {
      //   this.ruleForm.Weeks = checkedCount.join(",");
      // }
    },
    handleClick() {
      if (this.activeName === "second") {
        this.$router.push({ path: "/weChat/manager/autoReply" });
      } else if (this.activeName === "first") {
        this.$router.push({ path: "/weChat/manager/keyWordReply" });
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
            obj.Time = this.TimeStart+','+this.TimeEnd;
            obj.Type = '3';
            obj.Action = "SetReply";
            if(obj.Img){
               obj.Img = obj.Img.indexOf(process.env.Prefix) !== -1
                         ? obj.Img.replace(process.env.Prefix, "")
                         : obj.Img;
               }
            await getLists(obj, "MBaseOpera");
            this.$message.success("操作成功");
            this.$router.push({path:"/weChat/manager/noticeList"})
          } catch (error) {
            this.$message.error(error);
          }
        } else {          
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
          Type: "3",
          SID: this.noticeSid
        },
        "MBaseOpera"
      );
      this.ruleForm = Data.Reply;
      if(this.ruleForm.Time){
        let time = this.ruleForm.Time.split(',')
        this.TimeStart = time[0];
        this.TimeEnd = time[1];
      }
      this.checkedCities = this.ruleForm.Weeks.split(",");
      if(this.ruleForm.Img.length>0){
        this.fileListUp = GetBaseImgUrl()+this.ruleForm.Img ? [{ url: GetBaseImgUrl() + this.ruleForm.Img }] : [];
      }
    },
    // intoUrl(){
    //   this.dialogFormVisible = true;
    //   this.form = this.form
    // },
    addEmoji(e) {
      console.log(e)
      this.ruleForm.Contents += e.native;
    },
    // conserve(){//保存链接地址和名称
    //   this.ruleForm.Contents += `<a href ='${this.form.url}'>${this.form.name}</a>`
    //   this.dialogFormVisible = false;
    // },
    OpenEmotions:function () {
      this.$refs.EmotionB.OpenEmotion(true);
    },
    //表情选中后追加在input
    AppendMessageText:function (EmotionChinese) {
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
.msgHosting {
  margin-bottom: 20px;
  // background: #fff;
  .keyword {
    width: 70%;
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
.el-textarea,.el-select {
  width: 300px;
}
.explain {
  background-color: #cccccc;
  span {
    padding-left: 8px;
  }
}

</style>
