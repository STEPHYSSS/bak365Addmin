<template>
  <!--  优惠券名称列表-->
  <el-select v-model="value"
             placeholder="请选择劵名称"
             @change="changeValue"
             :remote-method="filterMethod"
             :loading="loading"
             filterable
             remote>
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
import _ from 'lodash'
export default {
  name: "cardList",
  props:{
    defaultId:String
  },
  data() {
    return {
      loading:false,
      allData: [],
      options: [],
      value: ''
    }
  },
  async created(){
    try{
      let data = await getLists({Action: 'GetTicketTypeList'},'MTicketOpera')
      this.allData = data.Data.TicketType || []

      if(this.defaultId){
        // 默认值
        let a = _.find(this.allData,{TypeNo:this.defaultId})
        this.value = a.TypeName
      }
      this.$emit('changeValue', a)
    }catch(e){}
  },
  methods: {
    changeValue(val) {
      let a = _.find(this.allData,{TypeNo:val})
      this.$emit('changeValue', a)
    },
    filterMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.allData.filter(item => {
            return item.TypeName.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = [];
      }
    }
  }
}
</script>

<style scoped>

</style>
