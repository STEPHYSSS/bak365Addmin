<template>
  <div class="magicCubeFun">
    <div class="rc-design-editor-component-title">魔方</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="70px">
      <el-form-item label="选择模板:" prop="changeMode">
        <div>
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
        </div>
      </el-form-item>
      <el-form-item label="布局:" prop="changeMode">
        <div class="rc-design-component-cube clearfix">
          <ul class="cube-row" v-for="(item,index) in layoutList[currentIndex]" :key="index">
            <li
              class="cube-item item-selected"
              :style="{'width': item.width+'px', 
            'height': item.height+'px'}"
            ></li>
          </ul>
          <div
            v-for="(item,i) in layoutList[currentIndex]"
            :key="i+'1'"
            :class="['cube-selected',i === layoutIndex?'cube-selected-click':'']"
            :style="{'width': item.width+'px', 'height': item.height+'px',
             'top': item.top+'px', 'left': item.left+'px'}"
            @click="clickLayout(i)"
          >
            <img
              v-if="form.imgList[i]&&form.imgList[i].hasOwnProperty('img')"
              :src="form.imgList[i].img |SetImage"
              alt
            />
            <div v-else class="cube-selected-text">
              {{item.hasOwnProperty('heightImg')?
              item.widthImg+'x'+item.widthImg+'像素':'宽度'+item.widthImg+'像素'}}
              <div v-if="item.hasOwnProperty('heightImg')">或同等比例</div>
            </div>
          </div>

          <!-- <div ref="test" @touchstart="touchstart" @touchmove="touchmove" style="width:200px;height:200px;border:1px solid #000"></div> -->
        </div>
        <div style="margin-top: 10px;color: #999;width:100%">选定布局区域，在下方添加图片，建议添加比例一致的图片</div>
      </el-form-item>
      <div class="styleFlex sliderAlign">
        <el-form-item label="图片间隙:">
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
      </div>
      <div class="styleFlex sliderAlign">
        <el-form-item label="页面间距:">
          <div class="height-slider">
            <el-slider
              v-model="form.pageGap"
              :max="30"
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
              :max="30"
            ></el-input-number>
          </div>
        </el-form-item>
      </div>
      <div
        class="rc-design-editor-card-item editor-card-add"
        style="margin:0px 0 20px 0;height:118px;padding:display:flex"
      >
        <div class="imgLoad-style">
          <imgLoad
            id="imgLoad"
            folder="CustomImg"
            :isAutoFixed="false"
            @upLoadImgs="upLoadImgsMain"
            :fileListUrl="currentImg.img | SetImage"
            :limit="1"
            :enlarge="1"
            :showFileList="true"
            imgWidth="80px"
            imgHeight="80px"
          ></imgLoad>
        </div>
        <div class="add-img-right">
          <el-form ref="form" label-width="80px">
            <el-form-item label="跳转路径：">
              <aDropdwnLink :currentItem="currentImg.urlObj" @clickDropdown="clickDropdown"></aDropdwnLink>
            </el-form-item>
          </el-form>
        </div>
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
      form: {
        //1:1行2个;   2:自定义的
        changeMode: 1,
        densityMode: 4,
        // 图片数组
        imgList: [
          // {
          //   img:
          //     "https://img.yzcdn.cn/upload_files/2014/12/05/043cc31769494d3d570543b893c9bce9.png!large.webp",
          //   urlObj: {
          //     name: "",
          //     url: ""
          //   }
          // }
        ],
        // 图片间隙
        imgGap: 0,
        // 页面间距
        pageGap: 0
      },
      selectTemplates: [
        {
          title: "1行2个",
          url:
            "https://img.yzcdn.cn/public_files/2017/11/03/60342dcc32a039ef613a14db0291f3ab.png"
        },
        {
          title: "1行3个",
          url:
            "https://img.yzcdn.cn/public_files/2017/11/03/6268ad7610bdc42ece83ac20379b28e9.png"
        },
        {
          title: "1行4个",
          url:
            "https://img.yzcdn.cn/public_files/2017/11/03/2781e737570549d45604867d8045aada.png"
        },
        {
          title: "2左2右",
          url:
            "https://img.yzcdn.cn/public_files/2017/11/09/83a31af68ff039a2a636151fa7fa9279.png"
        },
        {
          title: "1左2右",
          url:
            "https://img.yzcdn.cn/public_files/2017/11/09/ba54374788fe99d976963da2fa7eca6e.png"
        },
        {
          title: "1上2下",
          url:
            "https://img.yzcdn.cn/public_files/2017/11/09/7b4cdf2cc81d386c2ec316cde4d7c419.png"
        },
        {
          title: "1左3右",
          url:
            "https://img.yzcdn.cn/public_files/2017/11/09/baf20bd9462316851c81e47f8ae2cadf.png"
        }
        // {
        //   title: "自定义",
        //   url:
        //     "https://img.yzcdn.cn/public_files/2017/11/03/266e578c7470586e6be573cb0fc4d699.png"
        // }
      ],
      currentIndex: 0,
      rules: {},
      layoutIndex: 0,
      layoutList: [
        [
          { width: "161", height: "161", left: 0, top: 0, widthImg: 375 },
          { width: "161", height: "161", left: 162, top: 0, widthImg: 375 }
        ],
        [
          { width: "107", height: "107", left: 0, top: 0, widthImg: 250 },
          { width: "107", height: "107", left: 108, top: 0, widthImg: 250 },
          { width: "107", height: "107", left: 216, top: 0, widthImg: 250 }
        ],
        [
          { width: "80", height: "80", left: 0, top: 0, widthImg: 180 },
          { width: "80", height: "80", left: 81, top: 0, widthImg: 180 },
          { width: "80", height: "80", left: 162, top: 0, widthImg: 180 },
          { width: "80", height: "80", left: 243, top: 0, widthImg: 180 }
        ],
        [
          {
            width: "161",
            height: "161",
            left: 0,
            top: 0,
            widthImg: 375,
            heightImg: 375
          },
          {
            width: "161",
            height: "161",
            left: 162,
            top: 0,
            widthImg: 375,
            heightImg: 375
          },
          {
            width: "161",
            height: "161",
            left: 0,
            top: 162,
            widthImg: 375,
            heightImg: 375
          },
          {
            width: "161",
            height: "161",
            left: 162,
            top: 162,
            widthImg: 375,
            heightImg: 375
          }
        ],
        [
          {
            width: "161",
            height: "323",
            left: 0,
            top: 0,
            widthImg: 375,
            heightImg: 750
          },
          {
            width: "161",
            height: "161",
            left: 162,
            top: 0,
            widthImg: 375,
            heightImg: 375
          },
          {
            width: "161",
            height: "161",
            left: 162,
            top: 162,
            widthImg: 375,
            heightImg: 375
          }
        ],
        [
          {
            width: "323",
            height: "161",
            left: 0,
            top: 0,
            widthImg: 750,
            heightImg: 375
          },
          {
            width: "161",
            height: "161",
            left: 0,
            top: 162,
            widthImg: 375,
            heightImg: 375
          },
          {
            width: "161",
            height: "161",
            left: 162,
            top: 162,
            widthImg: 375,
            heightImg: 375
          }
        ],
        [
          {
            width: "161",
            height: "323",
            left: 0,
            top: 0,
            widthImg: 375,
            heightImg: 750
          },
          {
            width: "161",
            height: "161",
            left: 162,
            top: 0,
            widthImg: 375,
            heightImg: 375
          },
          {
            width: "80",
            height: "161",
            left: 162,
            top: 162,
            widthImg: 188,
            heightImg: 375
          },
          {
            width: "80",
            height: "161",
            left: 243,
            top: 162,
            widthImg: 188,
            heightImg: 375
          }
        ]
      ],
      currentImg: {
        img: ""
      }
    };
  },
  created() {},
  mounted() {
    this.changeImg();
    this.currentImg = this.form.imgList[0] || "";
    this.currentIndex = Number(this.form.changeMode)- 1;
  },
  methods: {
    changeMode(index) {
      if (index !== this.currentIndex) {
        this.form.changeMode = Number(index) + 1;
        this.form.changeMode = this.form.changeMode.toString();
        this.$emit("magicCubeFun", this.form, "magicCube");
      }
      this.currentIndex = index;
      this.$emit("setModeVal", this.form);
    },
    clickLayout(i) {
      this.layoutIndex = i;
      if (this.form.imgList[i]) {
        this.currentImg = this.form.imgList[i];
      } else {
        this.currentImg = {
          img: null
        };
      }
    },
    changeStyleSearch(e) {
      this.$emit("setModeVal", this.form);
    },
    changeImg(img) {
      this.layoutList[this.currentIndex][this.layoutIndex].img =
        "https://img.yzcdn.cn/upload_files/2014/12/05/043cc31769494d3d570543b893c9bce9.png!large.webp";
    },
    upLoadImgsMain(img) {
      this.form.layoutIndex = this.layoutIndex || 0;
      if (!this.form.imgList[this.layoutIndex]) {
        this.form.imgList[this.layoutIndex] = {};
      }
      this.form.imgList[this.layoutIndex].img = img.replace(
        process.env.Prefix,
        ""
      );

      this.form.imgList = this.form.imgList.slice();
      this.layoutList = this.layoutList.slice();
      if (!this.currentImg) {
        this.currentImg = {
          img: img
        };
      }else{
        this.currentImg.img = img
      }
      this.$emit("setModeVal", this.form);
    },
    clickDropdown(val) {
      this.form.layoutIndex = this.layoutIndex || 0;

      this.form.imgList[this.layoutIndex].urlObj = val;
      this.$emit("setModeVal", this.form);
    },
    touchstart(e) {
      // 求div到左边浏览器的距离 this.$refs.test.getBoundingClientRect().left
      //求div得width  this.$refs.test.offsetWidth
      //每个单位魔方的width   ((325-(mode+1))/mode).toFixed(4)     4==》80  5=》36.8   6=》53   7=》45.2857px
      //第一次点击算出当前鼠标所在的x轴第几个盒子，y轴第几个盒子；这是算出top、left值  top = 80*x轴个数 +1
      //鼠标移动 大于起始的x轴 小于等于当前的盒子 点亮  (
      //   移动到当前盒子的时候，判断，y，x轴 是否存在其他盒子，存在的不点亮）
      //再点击 最后算出点亮的width,height;算出当前盒子的x,y的单位盒子个数 width = 80*x轴个数 +1

      console.log(this.$refs.test.offsetWidth, 111);
      console.log(e.targetTouches[0].clientX, 999);
    },
    touchmove(e) {
      console.log(e.targetTouches[0].clientX, 888);
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/pubilc.less";

.magicCubeFun {
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

  .rc-design-select-templates__title {
    line-height: initial;
  }
  .rc-design-component-cube {
    position: relative;
    width: 325px;
  }
  .rc-design-component-cube .cube-row {
    float: left;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .rc-design-component-cube .cube-item.item-selected {
    background: #e8f7fd;
    border-color: #e5e5e5;
  }
  .rc-design-component-cube .cube-item:first-child {
    border-top: 1px solid #e5e5e5;
  }
  .rc-design-component-cube .cube-item {
    border-left: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
    text-align: center;
  }
  .rc-design-component-cube .cube-selected {
    position: absolute;
    background-color: #e8f7fd;
    border: 1px solid #bdf;
    text-align: center;
    color: #88c4dc;
    cursor: pointer;
  }
  .rc-design-component-cube .cube-selected-text {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .cube-selected img {
    height: inherit;
    vertical-align: baseline;
    object-fit: cover;
    width: 100%;
  }
  .rc-design-component-cube .cube-selected-click {
    border: 1px solid #38f;
    z-index: 2;
    cursor: auto;
  }

  .numInput.is-controls-right .el-input-number__increase,
  .numInput.is-controls-right .el-input-number__decrease {
    display: none;
  }
  .numInput.is-controls-right .el-input__inner {
    padding-left: 0px;
    padding-right: 0;
  }
  .sliderAlign .el-form-item__content {
    flex: 1;
  }
}
</style>