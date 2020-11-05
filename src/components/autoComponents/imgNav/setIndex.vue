<template>
  <div class="imgNav-style">
    <div class="rc-design-editor-component-title">图文导航</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="选择模板:">
        <div
          :class="['rc-design-select-templates',currentIndex===index?'active':'']"
          @click="changeMode(index)"
          v-for="(item,index) in selectTemplates"
          :key="index"
        >
          <div class="rc-design-select-templates__image-block">
            <img :src="item.url" alt width="90px" height="64px" />
          </div>
          <div class="rc-design-select-templates__title">{{item.title}}</div>
        </div>
      </el-form-item>
      <el-form-item label="滑动设置:" style="margin-top:20px;">
        <el-radio-group v-model="form.isScroll" @change="changeStyleSearch">
          <el-radio label="0">固定</el-radio>
          <el-radio label="1">横向滑动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.isScroll=='1'" label="一屏显示:" style="margin-top:20px;">
        <el-select v-model="form.pageShowNum" placeholder="请选择" @change="changeNavNum">
          <el-option v-for="item in 7" :key="item" :label="(item+3)+' 个导航'" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <div class="styleFlex">
        <el-form-item label="背景颜色:">
          <el-color-picker
            @change="changeStyleSearch"
            v-model="form.backGColor"
            style="vertical-align: middle;"
          ></el-color-picker>
          <a class="btnReset" @click="colorReset('backGColor','rgb(255,255,255)')">重置</a>
        </el-form-item>
      </div>
      <div class="styleFlex">
        <el-form-item label="文字颜色:">
          <el-color-picker
            @change="changeStyleSearch"
            v-model="form.fontColor"
            style="vertical-align: middle;"
          ></el-color-picker>
          <a class="btnReset" @click="colorReset('fontColor','rgb(0,0,0)')">重置</a>
        </el-form-item>
      </div>
      <div class="editor-bottom-help-desc">最多添加10个导航，拖动选中的导航可对其排序</div>
      <vuedraggable v-model="form.listNav" @change="changeDrag">
      <div
        class="rc-design-editor-card-item editor-card-add"
        style="margin:0px 0 20px 0;height:118px;padding:"
        v-for="(item,index) in form.listNav"
        :key="index"
        @mouseleave="currentIEel = null"
        @mouseenter="currentIEel = index"
      >
        <div class="imgLoad-style" v-if="form.navStyle==='image'">
          <imgLoad
            id="imgLoad"
            folder="CustomImg"
            :isAutoFixed="true"
            @upLoadImgs="upLoadImgsMain($event,item)"
            :fileListUrl="item.url | SetImage"
            :limit="1"
            :enlarge="1"
            :showFileList="true"
            imgWidth="80px"
            imgHeight="80px"
          ></imgLoad>
        </div>
        <div class="add-img-right">
          <el-form ref="form" :model="item" label-width="80px">
            <el-form-item label="标题：" style="margin-bottom: 5px !important;">
              <el-input v-model="item.name" placeholder="建议10个字以内"></el-input>
            </el-form-item>
            <el-form-item label="链接：">
              <aDropdwnLink :currentItem="item.urlObj" @clickDropdown="clickDropdown($event,index)"></aDropdwnLink>
            </el-form-item>
          </el-form>
        </div>
        <i
          v-if="currentIEel === index"
          @click="clickEdlete(index)"
          class="el-icon-error cardEelete"
          style="color: rgb(0, 0, 0, 0.3)"
        ></i>
      </div>
      </vuedraggable>
      <div
        v-if="form.listNav.length<10"
        class="rc-design-editor-card-item editor-card-add"
        style="margin:0px 0 20px 0;justify-content: center;"
        @click="addImg"
      >
        <i class="el-icon-plus rc-design-editor-card-add-icon"></i>
        <span style="color:#38f">添加一个背景图</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
import imgLoad from "@/components/download/imgLoad";
import aDropdwnLink from "../a-dropdwn-link/index";
import vuedraggable from "vuedraggable";
export default {
  mixins: [Mixins],
  components: { imgLoad, aDropdwnLink, vuedraggable},
  data() {
    return {
      currentIndex: 0,
      selectTemplates: [
        {
          title: "图片导航",
          url:
            "https://img.yzcdn.cn/public_files/2018/03/05/529cce58887e92027398cae070cb1a09.png"
        },
        {
          title: "文字导航",
          url:
            "https://img.yzcdn.cn/public_files/2018/03/05/570bc12622847a5a100e4697c88065ef.png"
        }
      ],
      form: {
        // text,image
        navStyle: "image",
        // 是否滚动0否，1是
        isScroll: "0",
        backGColor: "rgb(255,255,255)",
        fontColor: "rgb(0,0,0)", //rgb(0,0,0)
        // { img: "", name: "", urlObj: { name: "", url: "" } }
        listNav: [
          {name:'导航一', url: ''},
          {name:'导航二', url: ''},
          {name:'导航三', url: ''},
          {name:'导航四', url: ''}
        ],
        pageShowNum: 1
      },
      rules: {},
      currentIEel: ""
    };
  },
  created() {
    if (this.form.navStyle === "image") {
      this.currentIndex = 0;
    } else {
      this.currentIndex = 1;
    }
  },
  mounted() {
    this.form.pageShowNum = Number(this.form.pageShowNum);
  },
  methods: {
    changeDrag(e){
      console.log(e,'图文导航里拖拽change事件')
    },
    changeMode(index) {
      if (index !== this.currentIndex) {
        this.form.navStyle = index === 0 ? "image" : "text";
        this.$emit("setModeVal", this.form);
      }
      this.currentIndex = index;
    },
    changeStyleSearch() {
      this.$emit("setModeVal", this.form);
    },
    colorReset(params, color) {
      this.form[params] = color;
      this.$emit("setModeVal", this.form);
    },
    upLoadImgsMain(url, row) {
      // 图片
      row.url = url.replace(process.env.Prefix, "");
      this.$emit("setModeVal", this.form);
    },
    clickDropdown(val, index) {
      // console.log(val,index)
      this.form.listNav[index].urlObj = val;
      this.$emit("setModeVal", this.form);
    },
    clickEdlete(index) {
      this.form.listNav.splice(index, 1);
    },
    addImg() {
      if (!this.form.listNav || this.form.listNav == "") {
        this.form.listNav = [];
      }
      this.form.listNav.push({});
      this.$emit("setModeVal", this.form);
    },
    changeNavNum() {
      this.$emit("setModeVal", this.form);
    }
  },
  watch: {
    "form.navStyle"() {
      if (this.form.navStyle === "image") {
        this.currentIndex = 0;
      } else {
        this.currentIndex = 1;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";
/* .el-form-item__content {
  line-height: 0 !important;
} */

.imgNav-style {
  // .el-form-item__content {
  //   margin-left: 0 !important;
  // }
  .styleFlex .el-form-item__content {
    line-height: 40px !important;
  }

  .editor-card-add {
    height: 80px;
    line-height: 80px;
    display: flex;
    align-items: center;
    padding: 15px;
  }
  .imgLoad-style {
    .el-upload--picture-card {
      width: 80px;
      height: 80px;
      line-height: 80px;
    }
  }
  .add-img-right {
    height: 100%;
    margin-left: 14px;
  }
}

.rc-design-select-templates__title {
  line-height: initial;
  margin-top: 6px;
}
.editor-bottom-help-desc {
  color: #999;
  margin-top: 10px;
  margin-bottom: 10px;
}
img {
  position: relative;
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
</style>