<template>
  <div>
    <!-- 辅助留白 -->
    <div class="cap-white" :style="{'height':currentObj.whiteHeight+'px'}"></div>
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
          whiteHeight: "30"
        };
      }
    }
  },
  data() {
    return {
      // currentObj: {
      //   whiteHeight: this.propsObj.whiteHeight
      // }
    };
  },
  mounted() {
  },
  methods: {
    changeStyle() {
      //接收
      // bus.$on("auxiliaryBlankFun", obj => {
      //   this.currentObj = obj;
      // });
    }
  }
};
</script>

<style scoped>
.cap-white {
}
</style>