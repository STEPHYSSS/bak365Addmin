<template>
  <div>
    <!-- <shopinfoma :stylenum=""></shopsinfoma> -->
    <el-button type="primary" @click="setColor">主要按钮</el-button>
  </div>
</template>

<script>
import shopinfoma from "@/components/shopInformation";
import bus from "@/components/event.js";
export default {
  components: { shopinfoma },
  methods: {
    setColor() {
      bus.$emit("changeYear", 2);
    }
  }
};
</script>

<style>
</style>