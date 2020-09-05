<template>
  <div>
    <div class="rc-design-editor-component-title">进入店铺</div>
    <el-form ref="form" label-width="100px">
      <div class="styleFlex">
        <el-form-item label="文案:">
          <el-input @input="inputFun" maxlength="7" v-model="modeldesign"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
export default {
  mixins: [Mixins],
  data() {
    return {
      modeldesign: "进入店铺"
    };
  },
  methods: {
    inputFun(str) {
      this.$emit("setModeVal", { storeLeft: str })
    }
  }
};
</script>

<style>
@import "../../../assets/css/autoComponents/pubilc.less";
</style>