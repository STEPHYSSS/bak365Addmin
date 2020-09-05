<template>
  <div>
    <van-cell
      style="font-weight: 700;background-color:transparent "
      v-for="(item,index) in cellList"
      :key="index"
      :title="item.name?item.name:'点击编辑第一条<关联链接>'"
      is-link
    />
  </div>
</template>

<script>
import Mixins from "../public";
export default {
  mixins: [Mixins],
  data() {
    return {
      cellList: [
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ]
    };
  }
};
</script>

<style>
</style>