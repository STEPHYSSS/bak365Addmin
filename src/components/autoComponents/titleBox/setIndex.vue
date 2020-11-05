<template>
  <div>
    <div class="rc-design-editor-component-title">标题</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <div class="styleFlex">
        <el-form-item label="标题名:" prop="title">
          <el-input v-model="form.title" placeholder @input="inputText"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="标题模板:" style="margin-top:20px;">
        <el-radio-group v-model="form.traditionStyle" @change="changeStyleSearch">
          <el-radio label="0">传统样式</el-radio>
          <el-radio label="1">模仿微信图文页样式</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示位置:" style="margin-top:20px;">
        <el-radio-group v-model="form.textAlign" @change="changeStyleSearch">
          <el-radio label="left">居左显示</el-radio>
          <el-radio label="center">居中显示</el-radio>
          <el-radio label="right">居右显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.traditionStyle==0">
        <div class="styleFlex">
          <el-form-item label="副标题:">
            <el-input v-model="form.subtitle" placeholder></el-input>
          </el-form-item>
        </div>
        <div class="styleFlex">
          <el-form-item label="背景颜色:" prop="backGColor">
            <el-color-picker
              @change="changeStyleSearch"
              v-model="form.backGColor"
              style="vertical-align: middle;"
            ></el-color-picker>
            <a class="btnReset" @click="colorReset('backGColor','rgb(249, 249, 249)')">重置</a>
          </el-form-item>
        </div>
      </div>
      <div v-else>
        <div class="styleFlex">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="form.dataTitle"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="styleFlex">
          <el-form-item label="作者:">
            <el-input v-model="form.authorTitle" placeholder></el-input>
          </el-form-item>
        </div>
        <div class="styleFlex">
          <el-form-item label="链接标题:">
            <el-input v-model="form.titleUrlName" placeholder></el-input>
          </el-form-item>
        </div>
        <div class="styleFlex">
          <el-form-item label="链接:">
            <el-input v-model="form.titleUrl" placeholder></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
export default {
  mixins: [Mixins],
  data() {
    return {
      form: {
        viewComponets:"titleBox",
        title: "",
        //0==>传统样式,1==>模仿微信图文页样式
        traditionStyle: "0",
        //left,center,right
        textAlign: "left",
        //   副标题
        subtitle: "",
        backGColor: "rgb(249, 249, 249)",
        //   导航名称
        navName: "",
        //   导航名称链接
        navNameUrl: "",
        //   日期
        dataTitle: "",
        authorTitle: "",
        titleUrlName: "",
        //   链接标题url
        titleUrl: ""
      },
      rules: {
        title: [{ required: true, message: "请填写标题名", trigger: "blur" }],
        titleUrlName: [
          { required: true, message: "请填写链接标题", trigger: "blur" }
        ],
        backGColor: [
          { required: true, message: "请选择背景色", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    changeStyleSearch() {
      this.$emit("setModeVal",this.form)
    },
    colorReset(params, color) {
      this.form[params] = color;
      this.$emit("setModeVal",this.form)
    },
    inputText(){
      this.$emit("setModeVal",this.form)
    }
  }
};
</script>

<style>
@import "../../../assets/css/autoComponents/pubilc.less";
</style>