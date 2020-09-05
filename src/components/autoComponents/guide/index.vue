<template>
  <div class="rc-design-component-line-preview">
    <div
      class="cap-line-wrap"
      :style="{'color':currentObj.lineColor?currentObj.lineColor:'#e5e5e5','padding':currentObj.haspadding==='true'?0:'0px 15px'}"
    >
      <hr
        class="cap-line"
        :style="{'border-top': '1px ' + currentObj.linetype +' '+ (currentObj.lineColor?currentObj.lineColor:'#e5e5e5')}"
      />
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
          lineColor: "#e5e5e5",
          haspadding: true,
          //   dotted,dashed,solid
          linetype: "solid"
        };
      }
    }
  },
  data() {
    return {
      // currentObj: {
      //   lineColor: this.propsObj.lineColor,
      //   haspadding: this.propsObj.haspadding,
      //   linetype: this.propsObj.linetype
      // }
    };
  },
  mounted() {
    // this.changeStyle();
  },
  methods: {
    changeStyle() {
      // bus.$on("guideFun", obj => {
      //   this.currentObj = obj;
      // });
    }
  }
};
</script>

<style scoped>
.rc-design-component-line-preview {
  height: 30px;
  display: flex;
  box-align: center;
  align-items: center;
}
.cap-line-wrap {
  width: 100%;
  box-sizing: border-box;
}
.cap-line {
  width: 100%;
}
hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
</style>