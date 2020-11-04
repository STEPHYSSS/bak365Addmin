<template>
  <div class="imgNav-style">
    <div class :style="{'background-color':'rgb(249, 249, 249)','cursor': 'grab'}">
      <div class="rc-design-vue-preview">
        <div class="cap-image-ad">
          <div
            :style="{'overflow-x':currentObj.isScroll==1?'scroll':'hidden','background-color':currentObj.backGColor}"
            :class="['cap-image-ad__'+currentObj.navStyle+'-nav',
            currentObj.navStyle=='text'?'cap-image-ad__slide':'',
            currentObj.isScroll==1?'marginBot':'']"
          >
            <div v-if="currentObj.navStyle=='image'">
              <div
                ref="imageWrapper"
                class="image-wrapper"
                :style="{'width':currentObj.isScroll==1?widthBox+'px':widthBoxHid,'margin-right': '0px'}"
                v-for="(item,index) in currentObj.listNav"
                :key="index"
              >
                <a
                  :style="{'color':currentObj.fontColor}"
                  class="cap-image-ad__link--image-nav cap-image-ad__link"
                >
                  <!-- :href="item.urlObj?item.urlObj:''" -->
                  <div
                    class="cap-image-ad__image"
                    :style="{'height':currentObj.isScroll==1?widthBox+'px':HeightBoxHid+'px',
                    'width':currentObj.isScroll==1?widthBox+'px':'100%'}"
                  >
                    <img v-if="item.url" class="cap-image-ad__image" :style="{'height':currentObj.isScroll==1?widthBox+'px':HeightBoxHid+'px', 'width':currentObj.isScroll==1?widthBox+'px':'100%'}" 
                    :src="item.url |SetImage" />
                    <img v-else class="cap-image-ad__image" :style="{'height':currentObj.isScroll==1?widthBox+'px':HeightBoxHid+'px', 'width':currentObj.isScroll==1?widthBox+'px':'100%'}" 
                    :src="'https://img.yzcdn.cn//public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png'" />
                  </div>
                  <h3 class="cap-image-ad__nav-title">{{item.name}}</h3>
                </a>
              </div>
            </div>
            <div v-else>
              <!-- 文字导航 -->
              <a
                :style="{'width':currentObj.isScroll==1?widthBox+'px':widthBoxHid,'background-color': currentObj.backGColor,'color':currentObj.fontColor}"
                v-for="(item,index) in currentObj.listNav"
                :key="index"
                class="text-nav-wrapper"
              >
                <h3 class="cap-image-ad__nav-title">{{item.name}}</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from "../public";
export default {
  mixins: [Mixins],
  props: {
    propsObj: {
      type: Object,
      default() {
        return {
          // text,image
          navStyle: "image",
          // 是否滚动0否，1是
          isScroll: "0",
          //横向滑动时 有7个数据 100；77；62；52；45；40；35
          backGColor: "rgb(255,255,255)",
          pageShowNum: 1,
          fontColor: "rgb(0,0,0)", //rgb(0,0,0)
          // listNav: { img: "", name: "", urlObj: { name: "", url: "" } }
          listNav: [
            { name: "导航一" },
            { name: "导航二" },
            { name: "导航三" },
            { name: "导航四" }
          ]
        };
      }
    }
  },
  data() {
    return {
      widthBoxHid: "",
      HeightBoxHid: "",
      widthBox: ""
    };
  },
  created() {
    // console.log(this.currentObj.listNav,'currentObj.listNav')
  },
  mounted() {
    this.setWidth();
  },
  methods: {
    setWidth() {
      //手机端记得把320改成clientWidth
      let clientWidth = 320 || document.body.clientWidth;

      let pageShowNum = Number(this.propsObj.pageShowNum) + 3;

      if (this.propsObj.isScroll == "1") {
        //横向滑动
        this.widthBox = (clientWidth + 70) * (100 / pageShowNum / 100);
        this.widthBoxHid = clientWidth * (100 / pageShowNum / 100);
      } else {
        this.widthBoxHid = 100 / this.currentObj.listNav.length + "%";
        this.HeightBoxHid =
          clientWidth * (100 / this.currentObj.listNav.length / 100);
      }
    }
  },
  watch: {
    "propsObj.pageShowNum"() {
      this.setWidth();
    },
    "currentObj.isScroll"() {
      this.setWidth();
    },
    "currentObj.navStyle"() {
      this.setWidth();
    }
  }
};
</script>

<style scoped lang="less">
.imgNav-style {
  .rc-design-vue-preview {
    position: relative;
    overflow: hidden;
    line-height: initial;
  }
  .cap-image-ad {
    overflow: hidden;
    font-size: 0;
  }
  .cap-image-ad__image-nav {
    white-space: nowrap;
    /* padding-bottom: 10px; */
    /* margin-bottom: -17px; */
  }
  .cap-image-ad__image {
    display: block;
    margin: 0 auto;
    border: 0;
  }
  .cap-image-ad__link {
    display: block;
    position: relative;
    height: 100%;
  }
  .cap-image-ad__nav-title {
    font-size: 12px;
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;

    text-align: center;
    overflow: hidden;
    box-sizing: border-box;
  }
  .cap-image-ad__text-nav {
    margin-left: 0;
    margin-right: 0;
  }
  .cap-image-ad__slide {
    width: 100%;
    overflow-y: hidden;
    white-space: nowrap;
    /* padding-bottom: 10px; */
  }
  .marginBot {
    margin-bottom: -11px;
  }

  .cap-image-ad__image-nav .image-wrapper {
    display: inline-block;
    vertical-align: middle;
  }
  .cap-image-ad__image-nav .cap-image-ad__link--image-nav {
    font-size: 0;
  }
  .cap-image-ad__image-nav .cap-image-ad__image {
    background-size: cover;
    background-position: 50%;
  }
  .cap-image-ad__image-nav .cap-image-ad__nav-title {
    // padding-bottom: 9px;
    // height: 33px;
    line-height: 35px;
    margin: 0;
  }
  .cap-image-ad__text-nav .text-nav-wrapper {
    display: inline-block;
    padding: 12px 0;
    padding-right: 5px;
  }
  .cap-image-ad__text-nav .cap-image-ad__nav-title {
    position: relative;
    font-size: 12px;
    text-align: center;
    margin-bottom: 0;
  }
  .cap-image-ad__text-nav .cap-image-ad__nav-title:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* width: 200%; */
    height: 200%;
    transform: scale(0.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border-right: 1px solid #eee;
  }
}
</style>