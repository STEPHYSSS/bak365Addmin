<template>
  <div class="cap-search-box">
    <div
      class="cap-search-box__view"
      :style="{'padding-right': '15px','top': '0px','background': currentObj.backGColor}"
    >
      <div class="cap-search">
        <div
          :class="['cap-search__filed',' cap-search__filed--'+currentObj.shape,currentObj.textCenter==='1'?'cap-search__filed--center':'']"
          :style="{'background-color': currentObj.inputBackGColor,'height':currentObj.heightInput+'px',}"
          @click="clickInputBox"
        >
          <i class="iconfont icon-sousuo" :style="{'color':currentObj.inputColor}"></i>
          <!-- <van-field :style="{'height':heightInput+'px','width':textCenter?'76px':'auto'}"> -->
          <div
            class="van-cell van-cell--borderless van-field"
            :style="{'width':currentObj.textCenter==='1'?'78px':'auto','font-size':'14px'}"
          >
            <div class="van-cell__value van-cell__value--alone">
              <div class="van-field__body">
                <input
                  class="van-field__control"
                  slot="input"
                  v-model="value"
                  :style="{'color':currentObj.inputColor}"
                  placeholder="搜索商品"
                />
              </div>
            </div>
          </div>
          <!-- </van-field> -->
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
          //rect ,circle
          shape: "rect",
          heightInput: "40",
          backGColor: "rgb(249, 249, 249)",
          inputBackGColor: "rgb(255, 255, 255)",
          textCenter: '0',
          inputColor: "rgb(153, 153, 153)"
        };
      }
    }
  },
  data() {
    return {
      value: "搜索商品"
      // currentObj: {
      //   shape: this.propsObj.shape,
      //   heightInput: this.propsObj.heightInput,
      //   backGColor: this.propsObj.backGColor,
      //   inputBackGColor: this.propsObj.inputBackGColor,
      //   textCenter: this.propsObj.textCenter,
      //   inputColor: this.propsObj.inputColor
      // }
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    clickInputBox() {}
  }
};
</script>

<style>
.cap-search-box {
  width: 100%;
}
.cap-search-box:before {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.cap-search-box__view {
  width: 100%;
  padding: 5px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  box-align: center;
  transition: top 0.3s linear;
}
.cap-search {
  display: flex;
  box-align: center;
  align-items: center;
  box-flex: 1;
  flex: 1;
  box-sizing: border-box;
  position: relative;
}
.cap-search__filed {
  display: flex;
  flex: 1;
  align-items: center;
  box-align: center;
  border-radius: 4px;
}
.cap-search .icon-sousuo{
  font-size: 16px;
  margin-left: 10px;
}
.cap-search .van-cell {
  box-flex: 1;
  flex: 1;
  padding: 0 10px;
  background: transparent;
}
.cap-search .van-cell__value {
  display: flex;
  box-align: center;
  align-items: center;
}
.cap-search .van-field__body {
  box-flex: 1;
  flex: 1;
}
.cap-search .van-cell__value .van-field__control {
  background: transparent;
}
.van-field__control {
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  resize: none;
  display: block;
  box-sizing: border-box;
}

.cap-search__filed--circle {
  border-radius: 20px;
  overflow: hidden;
}
.cap-search__filed--center {
  box-pack: center;
  justify-content: center;
}
.cap-search__filed--center .van-cell {
  box-flex: 0;
  flex: none;
}
</style>