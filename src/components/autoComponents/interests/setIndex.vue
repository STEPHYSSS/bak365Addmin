<template>
  <div class="imgNav-style">
    <div class="rc-design-editor-component-title">权益</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">      
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
              :coverImg = "coverImg"
            ></imgLoad>
          </div>
          <div class="add-img-right">
            <el-form ref="form" :model="item" label-width="80px">
              <el-form-item label="标题：" style="margin-bottom: 5px !important;">
                <el-input v-model="item.name" placeholder="建议10个字以内"></el-input>
              </el-form-item>
              <el-form-item label="链接：">
                <aDropdwnLink :currentItem="item.urlObj" @clickDropdown="clickDropdown($event,index)"></aDropdwnLink>
                  <!-- <dropMenu :currentItem="currentImg" @clickDropdown="clickDropdown($event,index)"></dropMenu> -->
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
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
import imgLoad from "@/components/download/imgLoad";
import aDropdwnLink from "../a-dropdwn-link/index";
import draggable from "vuedraggable";
import dropMenu from "../a-dropdwn-link/dropLink"
export default {
  mixins: [Mixins],
  components: { imgLoad, aDropdwnLink,draggable,dropMenu},
  data() {
    return {
      drag:false,
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
      coverImg:"isCover",
      currentImg: {
        img: "",
        urlObj:''
      },
      form: {
        // text,image
        navStyle: "image",
        // 是否滚动0否，1是
        isScroll: "0",
        backGColor: "rgb(255,255,255)",
        fontColor: "rgb(0,0,0)",
        listNav: [
          {name:'权益一', url: ''}
        ],
        pageShowNum: 1
      },
      rules: {},
      currentIEel: ""
    };
  },
  created() {
    // console.log(this.form,'creatererdfd')
    if (this.form.navStyle === "image") {
      this.currentIndex = 0;
    } else {
      this.currentIndex = 1;
    }
    
  },
  mounted() {
    this.form.pageShowNum = Number(this.form.pageShowNum);
    this.form.listNav.forEach((item,index)=>{
      this.currentImg = item
    });
  },
  methods: {
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
    width: 80px;
    height: 80px;
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
  // height: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
</style>