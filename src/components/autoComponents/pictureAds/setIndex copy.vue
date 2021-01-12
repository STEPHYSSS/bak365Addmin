<template>
  <div class="magicCubeFun">
    <div class="rc-design-editor-component-title">图片广告</div>
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="选择模板:">
        <div
          :class="['rc-design-select-templates',currentIndex===index?'active':'']"
          @click="changeModeFun(index)"
          v-for="(item,index) in selectTemplates"
          :key="index"
        >
          <div class="rc-design-select-templates__image-block">
            <img :src="item.url" alt width="90px" height="64px" />
          </div>
          <div class="rc-design-select-templates__title">{{item.title}}</div>
        </div>
      </el-form-item>
      <!-- //添加图片 -->
      <el-form-item label="添加图片:" style="margin-bottom:0 !important">
        <span style="margin-bottom: 5px;color: #999;">最多添加10个广告，鼠标拖拽调整广告顺序</span>
      </el-form-item>
      <div
        class="rc-design-editor-card-item editor-card-add"
        style="margin:0px 0 20px 0;height:118px;padding:"
        v-for="(item,index) in form.imgList"
        :key="index"
        @mouseleave="currentIEel = null"
        @mouseenter="currentIEel = index"
      >
        <div class="imgLoad-style">
          <imgLoad
            id="imgLoad"
            folder="CustomImg"
            :isAutoFixed="false"
            @upLoadImgs="upLoadImgsMain($event,item)"
            :fileListUrl="item.img |SetImage"
            :limit="1"
            :enlarge="1"
            :showFileList="true"
            imgWidth="80px"
            imgHeight="80px"
          ></imgLoad>
        </div>
        <div class="add-img-right">
          <el-form ref="form" :model="item" label-width="80px">
            <el-form-item label="图片标题：" style="margin-bottom: 5px !important;">
              <el-input v-model="item.name" placeholder="建议10个字以内，可不填"></el-input>
            </el-form-item>
            <el-form-item label="跳转路径：">
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
      <div
        v-if="form.imgList.length<10"
        class="rc-design-editor-card-item editor-card-add"
        style="margin:0px 0 20px 0;justify-content: center;"
        @click="addImg"
      >
        <i class="el-icon-plus rc-design-editor-card-add-icon"></i>
        <span style="color:#38f">添加一个背景图</span>
      </div>
      <!-- 添加图片end -->

      <div class="styleFlex sliderAlign">
        <el-form-item label="页面边距:">
          <div class="height-slider">
            <el-slider
              v-model="form.pageGap"
              :max="10"
              :min="0"
              input-size="mini"
              style="flex:1;margin:0 14px 0 6px;"
              @input="changeStyleSearch"
            ></el-slider>
            <el-input-number
              class="numInput"
              style="width:60px"
              controls-position="right"
              v-model="form.pageGap"
              @change="changeStyleSearch"
              :min="0"
              :max="10"
            ></el-input-number>
          </div>
        </el-form-item>
      </div>
      <div class="styleFlex sliderAlign">
        <el-form-item label="图片间距:" v-if="form.changeMode!='2'">
          <div class="height-slider">
            <el-slider
              v-model="form.imgGap"
              :max="10"
              :min="0"
              input-size="mini"
              style="flex:1;margin:0 14px 0 6px;"
              @input="changeStyleSearch"
            ></el-slider>
            <el-input-number
              class="numInput"
              style="width:60px"
              controls-position="right"
              v-model="form.imgGap"
              @change="changeStyleSearch"
              :min="0"
              :max="10"
            ></el-input-number>
          </div>
        </el-form-item>
        <el-form-item v-if="form.changeMode=='5'" label="一屏显示:" style="margin-top:20px;">
          <el-radio-group v-model="form.imgNum" @change="changeStyleSearch">
            <el-radio label="4">4张图片</el-radio>
            <el-radio label="5">5张图片</el-radio>
            <el-radio label="6">6张图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片样式:" style="margin-top:20px;">
          <el-radio-group v-model="form.imgShadow" @change="changeStyleSearch">
            <el-radio label="0">常规</el-radio>
            <el-radio label="1">投影</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图片倒角:" style="margin-top:20px;">
          <el-radio-group v-model="form.imgRadius" @change="changeStyleSearch">
            <el-radio label="0">直角</el-radio>
            <el-radio label="1">圆角</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.changeMode=='2'" label="指示器:" style="margin-top:20px;">
          <el-radio-group v-model="form.indicator" @change="changeStyleSearch">
            <el-radio label="1">样式一</el-radio>
            <el-radio label="2">样式二</el-radio>
            <el-radio label="3">样式三</el-radio>
            <el-radio label="4">样式四</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
import imgLoad from "@/components/download/imgLoad";
import aDropdwnLink from "../a-dropdwn-link/index";
export default {
  mixins: [Mixins],
  components: { imgLoad, aDropdwnLink },
  data() {
    return {
      currentIndex: 0,
      selectTemplates: [
        {
          title: "一行一个",
          url:
            "https://img.yzcdn.cn/public_files/2018/10/16/53de703992f6bf2e6f02af1141a01e28.png"
        },
        {
          title: "轮播海报",
          url:
            "https://img.yzcdn.cn/public_files/2018/10/16/b0278c2049020fa553715ff6f7693e35.png"
        },
        {
          title: "大图横向滑动",
          url:
            "https://img.yzcdn.cn/public_files/2018/10/16/84f845b6bb88de38ba20ad4d1d367de0.png"
        },
        {
          title: "小图横向滑动",
          url:
            "https://img.yzcdn.cn/public_files/2018/10/16/84f845b6bb88de38ba20ad4d1d367de0.png"
        },
        {
          title: "导航横向滑动",
          url:
            "https://img.yzcdn.cn/public_files/2018/10/16/84f845b6bb88de38ba20ad4d1d367de0.png"
        }
        // {
        //   title: "绘制热区",
        //   url:
        //     "https://img.yzcdn.cn/public_files/2018/10/16/84f845b6bb88de38ba20ad4d1d367de0.png"
        // }
      ],
      currentIEel: null,
      form: {
        changeMode: "1",
        // 图片间隙
        imgGap: 0,
        // 页面间距
        pageGap: 0,
        imgShadow: "0",
        imgRadius: "0",
        // 导航滚动的时候多一个 一屏显示 4，5，6张
        imgNum: "6",
        // 1,2,3,4
        indicator: "4",
        //图片
        imgList: [
          // {
          //   img:
          //     "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1713396441,1487163637&fm=26&gp=0.jpg",
          //   name: "333",
          //   //关联的链接，名称和url
          //   urlObj: {
          //     name: "商品",
          //     url: "54545665"
          //   }
          // }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.currentIndex = Number(this.form.changeMode) - 1;
    this.form.imgNum = this.form.imgNum.toString();
  },
  methods: {
    changeModeFun(index) {
      if (index !== this.currentIndex) {
        this.form.changeMode = Number(index) + 1;
        if (this.form.changeMode == 2) {
          this.form.imgGap = 0;
        }
        this.$emit("setModeVal", this.form);
      }

      this.currentIndex = index;
    },
    changeStyleSearch() {
      this.$emit("setModeVal", this.form);
      // this.$emit("pictureAdsFun", this.form, "pictureAds");
    },
    upLoadImgsMain(url, row) {
      // 图片
      row.img = url.replace(process.env.Prefix, "");
      this.form.imgList = this.form.imgList.slice()

      this.$emit("setModeVal", this.form);
    },
    clickEdlete(index) {
      this.form.imgList.splice(index, 1);
    },
    addImg() {
      if (!this.form.imgList || this.form.imgList == "") {
        this.form.imgList = [];
      }
      this.form.imgList.push({});
      this.$emit("setModeVal", this.form);
    },
    clickDropdown(val,index) {
      this.form.imgList[index].urlObj = val;
      this.$emit("setModeVal", this.form);
    }
  },
  watch: {
    "form.imgList"() {}
  }
};
</script>
<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";

.magicCubeFun {
  .rc-design-select-templates__title {
    /* margin-top: 6px; */
    line-height: initial;
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
</style>