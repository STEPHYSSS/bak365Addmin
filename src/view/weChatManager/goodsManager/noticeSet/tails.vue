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
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="关键词" prop="Name">
            <el-input v-model="ruleForm.Name" :readonly="true" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="回复内容" prop="Contents">
            <el-input type="textarea" v-model="ruleForm.Contents" :autosize="{ minRows: 4}"></el-input>
            <div style="display:inline-block">
              <el-button @click="intoUrl">插入链接</el-button><br/>
              <el-button @click="OpenEmotions">插入表情</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div class="preserveStyle">
          <el-button type="primary" style="margin-left: 20px" @click="preserveFun('ruleForm')">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="设置链接" :visible.sync="dialogFormVisible" width="500px">
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
    </el-dialog>

  <Emotion ref="EmotionB" @AppendInputValue="AppendMessageText"></Emotion>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import imgLoad from "@/components/download/imgLoad";
import _ from "lodash";
import Emotion from './emoji.vue'
import { Picker } from "emoji-mart-vue"; //引入组件
export default {
  name: "",
  data() {
    return {
      activeName: "four",
      ruleForm: {
        Name: "小尾巴",
        Type: "4",
        Contents: ""
      },
      formLabelWidth:'120',
      rules: {
        Name: [{ required: true, message: "请输入关键字", trigger: "blur" }],
      },
      // noticeSid: this.$route.query.noticeSID,
      noticeSid:sessionStorage.getItem('noticeSID'),
      dialogFormVisible:false,
      form:{
        name:'',
        url:''
      }
    };
  },
  created() {
    if(this.noticeSid){
      this.GetOrderTemplate();
    }
  },
  components: { imgLoad,Picker,Emotion },
  methods: {
    handleClick() {
      if (this.activeName === "second") {
        this.$router.push({ path: "/weChat/manager/autoReply" });
      } else if (this.activeName === "three") {
        this.$router.push({ path: "/weChat/manager/msgHosting" });
      } else if (this.activeName === "first") {
        this.$router.push({ path: "/weChat/manager/keyWordReply" });
      }
    },    
    preserveFun(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let obj = _.cloneDeep(this.ruleForm);
            obj.Action = "SetReply";
            let data = await getLists(obj, "MBaseOpera");
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
    async GetOrderTemplate() {
      let { Data } = await getLists(
        {
          Action: "GetReply",
          Type: "4",
          SID: this.noticeSid
        },
        "MBaseOpera"
      );
      this.ruleForm = Data.Reply;
      // console.log(Data, "555");
    },
    intoUrl(){
      this.dialogFormVisible = true;
      this.form = this.form
    },
    addEmoji(e) {
      console.log(e)
      this.ruleForm.Contents += e.native;
    },
    conserve(){//保存链接地址和名称
      this.ruleForm.Contents += `<a href ='${this.form.url}'>${this.form.name}</a>`
      this.dialogFormVisible = false;
    },
    OpenEmotions() {
      this.$refs.EmotionB.OpenEmotion(true);
    },
    //表情选中后追加在input
    AppendMessageText(EmotionChinese) {
      this.ruleForm.Contents += EmotionChinese;
    }
  }
};
</script>
<style lang="less" scoped>
.tails {
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
.emoji-mart[data-v-7bc71df8] {
  // font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
  // display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 420px;
  color: #ffffff !important;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: #fff;
}
.text {
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 400px;
  resize: none;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 8px;
}
.text-place {
  height: 80px;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius: 8px;
  background: #ddd5d5;
}
.text-place p {
  display: flex;
  align-items: center;
  margin: 0;
}

</style>
