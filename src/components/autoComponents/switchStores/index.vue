<template>
  <div class="switchStores">
    <div class="topStyle">
      <i class="icon iconfont icon-dianpu"></i>
      <span class="title">烘焙365</span>
      <span>[切换]</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.switchStores {
  padding: 0 15px;
  background: #fff;
  line-height: 30px;
  .topStyle {
    display: flex;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    margin-left: 8px;
  }
}
</style>