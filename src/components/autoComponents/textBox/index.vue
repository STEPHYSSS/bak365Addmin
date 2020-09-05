<template>
  <div>
    <a
      :class="['cap-text',currentObj.bottomLine?'cap-text--has-line':'']"
      :href="currentObj.urlClick"
      :style="{'text-align': currentObj.textAlign,'color': currentObj.fontColor,'font-size': currentObj.fontSize+'px',
      'background': currentObj.backGColor}"
    >
      <div class="cap-text__content-wrap">
        <p class="cap-text__content">{{currentObj.textContent}}</p>
      </div>
    </a>
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
          textContent: "",
          //18;14;12
          fontSize: "14",
          fontColor: "rgb(0, 0, 0)",
          backGColor: "rgb(255, 255, 255)",
          //left,center,right
          textAlign: "left",
          //   跳转链接
          urlClick: "",
          //底部分割线 false无true有
          bottomLine: false
        };
      }
    }
  },
  data() {
    return {
      // currentObj: {
      //   textContent: this.propsObj.textContent,
      //   fontSize: this.propsObj.fontSize,
      //   fontColor: this.propsObj.fontColor,
      //   backGColor: this.propsObj.backGColor,
      //   textAlign: this.propsObj.textAlign,
      //   urlClick: this.propsObj.urlClick,
      //   bottomLine: this.propsObj.bottomLine
      // }
    };
  },
  computed: {},
  mounted() {},
  methods: {
    // 这个函数返回警告信息，如果未填直接return出去警告
    reportErrorsFun() {
      if (!this.currentObj.textContent) {
        return "请填写文本内容";
      }
    }
  },
  watch: {}
};
</script>

<style scoped>
.cap-text {
  display: block;
  background: #fff;
}
.cap-text__content-wrap {
  position: relative;
  padding: 10px 0;
  margin: 0 10px;
}
.cap-text__content {
  line-height: 20px;
  margin: 0 !important;
  white-space: pre-line;
  word-break: break-all;
  word-wrap: break-word;
}
.cap-text--has-line .cap-text__content-wrap:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}
</style>