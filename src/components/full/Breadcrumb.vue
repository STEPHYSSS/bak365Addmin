<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list" :key="index">
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>

      <router-link :to="item.path" v-else-if="item.path!==''">{{ showName(item) }}</router-link>

      <a href="#/" v-else-if="item.path===''">{{ showName(item) }}</a>
    </li>
  </ol>
  <!--  <el-breadcrumb separator="/" class="breadcrumb">-->
  <!--    <span class="loc">当前位置：</span>-->
  <!--    <el-breadcrumb-item v-for="(item, key) in crumb" :key="key" :to="item.to" :replace="true">-->
  <!--      {{item.title}}-->
  <!--    </el-breadcrumb-item>-->
  <!--  </el-breadcrumb>-->

</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    },
    //面包屑数据 [{title:'',to:'当前前往路径'}]
    // crumb: {
    //   type: Array,
    //   required: true
    // },
  },
  data() {
    return {
      newList: []
    }
  },
  created() {
    // this.newList = _.clone(this.list)
    // this.newList = this.newList.splice(0, 1)
    // console.log(this.newList, 88889)
  },
  computed: {},
  methods: {
    isLast(index) {

      return index === this.list.length - 1
    },
    showName(item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      // if (item.meta.displayName) {
      //   item = item.meta.displayName
      // }
      return item
    }
  }
}
</script>
<style scoped lang="less">
  .breadcrumb {
    .loc {
      float: left;
    }
  }
</style>
