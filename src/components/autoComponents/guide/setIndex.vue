<template>
  <div class="">
    <div class="rc-design-editor-component-title">辅助线</div>
    <el-form ref="form" :model="form" label-width="100px">
      <div class="styleFlex">
        <el-form-item label="颜色:">
          <el-color-picker
            @change="changeStyleSearch"
            v-model="form.lineColor"
            style="vertical-align: middle;"
          ></el-color-picker>
          <a class="btnReset" @click="colorReset('lineColor','#e5e5e5')">重置</a>
        </el-form-item>
      </div>
      <el-form-item label="边距:" style="margin-top:20px;">
        <el-radio-group v-model="form.haspadding" @change="changeStyleSearch">
          <el-radio label="true">无边距</el-radio>
          <el-radio label="false">左右留边</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="样式:" style="margin-top:20px;">
        <el-radio-group v-model="form.linetype" @change="changeStyleSearch">
          <el-radio label="solid">实线</el-radio>
          <el-radio label="dashed">虚线</el-radio>
          <el-radio label="dotted">点线</el-radio>
        </el-radio-group>
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
        lineColor: "#e5e5e5",
        haspadding: true,
        linetype: "solid"
      }
    };
  },
  methods: {
    colorReset(params, color) {
      this.form[params] = color;
      this.$emit("setModeVal",this.form)
    },
    changeStyleSearch() {
      this.$emit("setModeVal",this.form)
    }
  }
};
</script>

<style>
</style>