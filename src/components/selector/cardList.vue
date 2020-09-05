<template>
<!--  微信模板列表-->
  <el-select v-model="value" placeholder="请选择" @change="changeValue" :clearable="clearable">
    <el-option
      v-for="item in options"
      :key="item.WeChatNo"
      :label="item.Name"
      :value="item.WeChatNo">
    </el-option>
  </el-select>
</template>

<script>
import {getLists} from '@/api/vipCard'
export default {
  name: "cardList",
  props:{
    // 是否是全部数据
    isAll:{
      type:Boolean,
      default:true
    },
    clearable:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      options: [],
      value: ''
    }
  },
  async created(){
    try{
      let data = await getLists({Action: 'GetTemplateList'},'WeChatCardOpera')
      if(!this.isAll){
        let newArr = []
        let ti = data.Data.TemplateList
        for (let i = 0; i < ti.length; i++) {
          if(Number(ti[i].Audit) === 1){
            newArr.push(ti[i])
          }
        }
        this.options = newArr
      }else{
        this.options = data.Data.TemplateList
      }
    }catch(e){}
  },
  methods: {
    changeValue(val) {
      this.$emit('changeValue', val)
    }
  }
}
</script>

<style scoped>

</style>
