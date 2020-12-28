<template>
     <div class="goodsUrl">
          <el-dialog title="活动商品" :visible.sync="dialogTableVisible">
               <el-table :data="urlData">
                    <el-table-column property="Name" label="网址名称"></el-table-column>
                    <el-table-column label="网址链接">
                         <template slot-scope="scoped">
                         <el-input v-model="scoped.row.codeUrl" readonly></el-input>
                         </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                         <template slot-scope="scope">
                         <el-popover placement="left" v-model="scope.row.visibleUrl">
                         <el-input v-model="scope.row.codeUrl" readonly placeholder="商品链接" style="width:500px">
                              <el-button slot="append" @click="copyUrl(scope.row)">复制</el-button>
                         </el-input>
                         <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
                         </el-popover>
                         </template>
                    </el-table-column>
               </el-table>
          </el-dialog>
     </div>
</template>
<script>
export default {
     name:"goodsUrl",
     data(){
          return{
               dialogTableVisible:false,
               urlData:[]
          }
     },
     props:{
          urlList:{
               type:Array,
               default:() => []
          },
          goodsShow: {
               type: Boolean,
               default: false
          },
     },
     methods:{

     },
     watch:{
          dialogTableVisible(bool) {
               this.$emit("changeDig", bool);
          },
          goodsShow(bool) {
               this.dialogTableVisible = bool;    
          },
     }
}
</script>
<style lang="less" scoped>

</style>