<template>
  <div>
    <div class="rc-design-editor-component-title">辅助空白</div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="空白高度:">
        <div class="height-slider">
          <el-slider
            v-model="form.whiteHeight"
            :max="100"
            :min="10"
            input-size="mini"
            style="flex:1;margin:0 14px 0 6px;"
            @input="changeStyleSearch"
          ></el-slider>
          <span style="margin-right:5px;">40 像素</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Mixins from "../publicFun";
export default {
  mixins: [Mixins],
  data() {
    return {
      form: {
        whiteHeight: 30
      }
    };
  },
  created(){
  },
  methods: {
    changeStyleSearch(str) {
      this.$emit("setModeVal",this.form)
    }
  }
};
</script>

<style>
@import "../../../assets/css/autoComponents/pubilc.less";
</style>