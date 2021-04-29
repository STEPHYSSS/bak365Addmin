<template>
  <div class>
    <!-- 门店区域下拉列表 -->
    <el-select v-model="value" placeholder="请选择" @change="changeType" :setArea="setArea">
      <el-option v-for="item in list" :key="item.SID" :label="item.Name" :value="item.SID"></el-option>
    </el-select>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "",
  data() {
    return {
      list: [],
      value: ""
    };
  },
  props:{
    setArea:{
      type: String,
      default:""
    }
  },
  components: {},
  created() {
    let AreaList = localStorage.getItem("AllAreaList");    
    this.list = JSON.parse(AreaList);
  },
  methods: {
    changeType(val) {
      this.$emit("changeType", val);
    }
  },
  watch:{
   setArea(){
     this.value = this.setArea
   }
  }
};
</script>

<style lang="less" scoped>
</style>