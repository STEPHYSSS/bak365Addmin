<template>
     <div>
          <el-table :data="tableData" style="width: 100%">
               <el-table-column></el-table-column>
          </el-table>
     </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
     name:"",
     data(){
          return{
               tableData:[]
          }
     },
     created(){
          this.getActiveList();
     },
     methods:{
          async getActiveList(){//获取秒杀 拼团活动信息+活动明细
               try {
                    let data = await getLists({ Action: "GetPromInfoUrl"},"MPromotionOpera");
                    this.tableData = data.PromList;
               } catch (error) {
                    this.$message.error(error)
               }
               
          }
          // 后台 MPromotionOpera  GetPromInfoUrl  获取秒杀 拼团活动信息+活动明细
     }
}
</script>
<style lang="less" scoped>

</style>