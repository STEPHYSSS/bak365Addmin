<template>
  <!--      商品类别-->
  <div>
    <el-select v-if="!isBatch"
      v-model="value"
      :multiple="multiple"
      :placeholder="placeholderProp"
      @change="changeGoodType"
      clearable
    >
      <el-option v-for="item in listGood" :key="item.SID" :label="item.Name" :value="item.SID"></el-option>
    </el-select>
    <el-select v-model="value" placeholder="请选择" v-if="isBatch" @change="changeGood" clearable>
    <el-option v-for="item in listGood" :key="item.SID" :label="item.Name" :value="item.SID">
    </el-option>
  </el-select>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";

export default {
  props: {
    isBatch:String,
    multiple: {
      type: Boolean,
      default: true
    },
    placeholderProp: {
      type: String,
      default: "请选择"
    },
    isIntegral: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: [],
      listGood: []
    };
  },
  async created() {
    try {
      let Opera = this.isIntegral?'MIntegralOpera':'MProdOpera'

      let { Data } = await getLists({ Action: "GetCateList" }, Opera);
      this.listGood = Data.ProdCateList;
    } catch (e) {}
  },
  methods: {
    changeGoodType(id) {
      this.$emit("changeGoodType", id);
    },
    changeGood(id){
      this.$emit("changeGoodType", id);
    }
  }
};
</script>

<style scoped>
</style>
