<template>
  <!--    库存类型未使用-->
  <el-select v-model="value" placeholder="请选择" @change="changeStockType">
    <el-option
      v-for="item in stockTypeList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  // name: "stockType",
  data() {
    return {
      value: '',
      stockTypeList: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }, {
        value: '5',
        label: '北京烤鸭'
      }]
    }
  },
  methods: {
    changeStockType(id) {
      this.$emit('changeStockType', id)
    }
  }
}
</script>

<style scoped>

</style>
