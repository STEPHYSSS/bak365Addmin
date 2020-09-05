<template>
  <div :class="['cap-shop-banner cap-shop-banner--type-'+currentObj.typeNum,'cap-shop-banner']">
    <div
      class="cap-shop-banner__cover"
      :style="`background-image: url(${setPrex(currentObj.currentImg)})`"
    >
      <div class="cap-shop-banner__cover-mask"></div>
    </div>
    <div class="cap-shop-banner__inner">
      <div class="cap-shop-banner__content">
        <div class="cap-shop-banner__logo"></div>
        <div class="cap-shop-banner__right-content">
          <h3>烘焙365555200121</h3>
          <p v-if="currentObj.typeNum===0" class="cap-shop-banner__reduce-content">
            <span class="cap-shop-banner__reduce-content-tag">满减</span>
            <span class="0">在线支付满150减30，满100减20</span>
          </p>
          <p v-else class="cap-shop-banner__sum-content">
            <a>
              <span class="cap-shop-banner__sum-content-total">全部商品999</span>
            </a>
            <a>
              <span class="cap-shop-banner__sum-content-total">上新30</span>
            </a>
          </p>
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
    // 同一个相同的参数
    propsObj: {
      type: Object,
      default() {
        return {
          currentImg:'',
            // "https://img.yzcdn.cn/public_files/2017/07/11/f2a0a05d5a801cb51ecbc0710e6947fb.png",
          typeNum: 0
        };
      }
    }
  },
  data() {
    return {
      // currentObj: {
      //   typeNum: this.propsObj.typeNum,
      //   currentImg: this.propsObj.currentImg
      // }
    };
  },
  computed: {},
  mounted() {
    // this.changeStyle();
  },
  methods: {
    // changeStyle() {
    //   //接收
    //   bus.$on("changeStyleFun", obj => {
    //     this.currentObj = obj
    //   });
    // }
    setPrex(val) {
      return process.env.Prefix + val;
    },
    reportErrorsFun() {
      if (!this.currentObj.currentImg) {
        return '店铺信息请选择背景图片'
      }
    }
  }
};
</script>

<style>
.cap-shop-banner {
  position: relative;
  background-color: #fff;
  font-size: 12px;
}
.cap-shop-banner__cover {
  position: relative;
  height: 185px;
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: cover;
}
.cap-shop-banner__cover-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.cap-shop-banner__inner {
  position: absolute;
  top: 110px;
  width: 100%;
}
.cap-shop-banner__content {
  position: relative;
  padding-left: 15px;
  overflow: hidden;
}
.cap-shop-banner__logo {
  float: left;
  width: 58px;
  height: 58px;
  border: 1px solid #fff;
  background-color: #fff;
  vertical-align: bottom;
  overflow: hidden;
}
.cap-shop-banner__right-content {
  margin-left: 70px;
}
.cap-shop-banner__right-content h3 {
  margin-top: 10px;
  max-width: 220px;
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.cap-shop-banner__reduce-content {
  position: relative;
  margin: 8px 15px 0 0;
  padding-right: 10px;
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.cap-shop-banner__reduce-content-tag {
  display: inline-block;
  height: 14px;
  line-height: 14px;
  padding: 0 3px;
  background-color: #f44;
  border-radius: 1px;
  vertical-align: middle;
  font-size: 12px;
}
.cap-shop-banner__reduce-content-text {
  margin-left: 3px;
  vertical-align: middle;
  font-size: 12px;
}
.cap-shop-banner__sum-content > a {
  color: #999;
}
.cap-shop-banner__sum-content {
  margin-top: 10px;
  line-height: 12px;
}
.cap-shop-banner__sum-content > a:first-child > span {
  padding-left: 0;
}
.cap-shop-banner__sum-content > a:first-child > span:after {
  content: "|";
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 12px;
  font-size: 10px;
  color: #e5e5e5;
}
.cap-shop-banner__sum-content-total {
  position: relative;
  display: inline-block;
  padding: 0 10px;
  vertical-align: middle;
}
.cap-shop-banner--type-0 .cap-shop-banner__reduce-content:after {
  content: ">";
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 14px;
}
.cap-shop-banner--type-1 {
  height: 238px;
}
.cap-shop-banner--type-1 .cap-shop-banner__inner {
  top: 150px;
}
.cap-shop-banner--type-1 .cap-shop-banner__logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.cap-shop-banner--type-1 .cap-shop-banner__right-content {
  margin-left: 82px;
}
.cap-shop-banner--type-1 .cap-shop-banner__cover-mask,
.cap-shop-banner--type-3 .cap-shop-banner__cover-mask,
.cap-shop-banner--type-2 .cap-shop-banner__cover-mask {
  background-color: transparent;
  background-image: linear-gradient(0deg, #000, transparent);
}

.cap-shop-banner--type-2 .cap-shop-banner__sum-content > a,
.cap-shop-banner--type-4 .cap-shop-banner__sum-content > a {
  color: #fff;
}

.cap-shop-banner--type-3 {
  height: 275px;
}
.cap-shop-banner--type-3 .cap-shop-banner__cover {
  height: 150px;
}
.cap-shop-banner--type-3 .cap-shop-banner__content {
  padding-left: 0;
  text-align: center;
}
.cap-shop-banner--type-4 .cap-shop-banner__logo,
.cap-shop-banner--type-3 .cap-shop-banner__logo {
  float: none;
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.cap-shop-banner--type-3 .cap-shop-banner__right-content,
.cap-shop-banner--type-4 .cap-shop-banner__right-content {
  margin-left: 0;
}
.cap-shop-banner--type-3 .cap-shop-banner__right-content > h3 {
  display: inline-block;
  margin-top: 20px;
  max-width: 100%;
  color: #333;
  text-shadow: none;
}
.cap-shop-banner--type-3 .cap-shop-banner__sum-content {
  margin-top: 10px;
}
.cap-shop-banner--type-4 {
  height: 250px;
}
.cap-shop-banner--type-4 .cap-shop-banner__cover {
  height: 100%;
}
.cap-shop-banner--type-4 .cap-shop-banner__inner {
  top: 50px;
}
.cap-shop-banner--type-4 .cap-shop-banner__content {
  padding-left: 0;
  text-align: center;
}
.cap-shop-banner--type-4 .cap-shop-banner__right-content > h3 {
  display: inline-block;
  margin-top: 20px;
  max-width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
  color: #fff;
  text-shadow: none;
}
.cap-shop-banner--type-4 .cap-shop-banner__sum-content {
  margin-top: 5px;
}
</style>