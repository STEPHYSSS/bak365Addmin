<template>
  <!--    微卡卡券微卡参数 卡类别-->
  <el-select v-model="value" placeholder="请选择" @change="changeValue">
    <el-option
      v-for="item in options"
      :key="item.TypeNo"
      :label="item.TypeName"
      :value="item.TypeNo">
    </el-option>
  </el-select>
</template>

<script>
import {getLists} from '@/api/vipCard'

export default {
  name: "CardCategory",
  data() {
    return {
      options: [],
      value: ''
    }
  },
  async created() {
    // try {
    //   let data = await getLists({Action: 'GetCardTypeList'},'WeChatCardOpera')
    //   this.options = data.Data.List
    // } catch (e) {
    //   this.options = []
    //   this.$message.error(e)
    // }
  },
  methods:{
    // changeValue(val){
    //   this.$emit('changeValue', val)
    // }
  }
}
</script>

<style scoped>

</style>
