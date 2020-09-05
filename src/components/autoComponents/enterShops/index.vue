<template>
  <div class="cap-store">
    <div class="cap-store__main">
      <span class="iconfont icon-dianpu cap-store__icon"></span>
      <span class="cap-store__title">烘焙365555200121</span>
      <span class="cap-store__action-text">
        {{currentObj.storeLeft}}
        <span class="iconfont icon-jiantou cap-store__arrow"></span>
      </span>
    </div>
  </div>
</template>

<script>
import Mixins from "../public";
export default {
  mixins: [Mixins],
  props: {
    // storeLeft: {
    //   type: String,
    //   default: "进入店铺"
    // },
    propsObj: {
      type: Object,
      default() {
        return {
          storeLeft: "进入店铺"
        };
      }
    }
  },
  data() {
    return {
      // currentObj: {
      //   storeLeft: this.propsObj.storeLeft
      // }
    };
  },
  mounted() {
    this.changeStyle();
  },
  methods: {
    changeStyle() {
      //接收
      // bus.$on("inputFun", obj => {
      //   // console.log(year,22222)
      //   this.currentObj = obj
      // });
    }
  }
};
</script>

<style scoped>
.cap-store {
  display: block;
  padding: 12px 15px;
  line-height: 20px;
  font-size: 14px;
  background-color: #fff;
  color: #333;
}
.cap-store__main {
  display: flex;
  align-items: center;
}
.cap-store__icon {
  margin-right: 10px;
}
.cap-store__title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.cap-store__action-text {
  position: relative;
  box-sizing: border-box;
  box-flex: 1;
  flex: 1;
  padding-right: 17px;
  text-align: right;
  color: #999;
}
.cap-store__arrow {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: #999;
  font-size: 12px;
}
</style>