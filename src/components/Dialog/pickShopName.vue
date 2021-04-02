<template>
  <el-dialog class="dialogTicketFa" title="选择门店" :visible.sync="dialogVisible" width="600px">
     <div class="addScroll">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkClick" @change="handleCheckedCitiesChange">
          <el-checkbox :label="item.SID" v-for="item in storeList" :key="item.SID">
            {{ item.Name }}
            <span v-if="item.Address">&nbsp;{{ item.Address }}</span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogVisible = false" >取 消</el-button>
        <el-button type="primary" @click="sureGood">确 定</el-button>
      </div>
     </el-dialog>
</template>
<script>
import { getLists } from "@/api/vipCard";
import { addScroll} from "@/config/publicFunction";
import _ from "lodash";
export default {
     props: {
          storeList:Array,
          showShop: {
               type: Boolean,
               default: false
          },
     },
     data(){
          return{
               dialogVisible:false,
               loadingBtn: false,
               disabled: false,
               shopInfo:"",//返回给父组件的数据
               checkAll:[],//全选v-model
               allCheckList: [],
               checkClick: [],//checkbox框v-model
               isIndeterminate:false,//全选按钮                              
               checkClick: [], // 多选框当前选中的数据               
               checkList: [],// 多选框的数据
          }
     },
     created(){          
     },
     mounted(){
          
     },
     methods:{
          handleCheckAllChange(val) {
               this.checkClick = val ? this.allCheckList : [];
               this.isIndeterminate = false;
          },
          handleCheckedCitiesChange(value){
               let checkedCount = value.length;
               this.checkAll = checkedCount === this.allCheckList.length;
               this.isIndeterminate =
               checkedCount > 0 && checkedCount < this.allCheckList.length;
          },
          sureGood() {
               console.log(this.storeList)
               let newArr = [];
              //供货门店
               this.checkClick.forEach(D => {
                    newArr.push(_.find(this.checkList, { SID: D }));
               });
               let { nameArr, idArr } = setData(newArr, "Name", "SID");
               // 门店id排序
               let arr = idArr.sort((a, b) => {
                    return a.localeCompare(b, "zh-CN");
               });
               let ShopInfo = arr.join(",");
               let PickShopName = nameArr.join(",");
               this.$emit('sureGood',ShopInfo,PickShopName)                
          },          
     },
     watch: {
          showShop(val) { 
               this.dialogVisible = val;
               this.allCheckList = [];
                    this.storeList.forEach(D => {
                    this.allCheckList.push(D.SID);
               });
               this.checkList = this.storeList;
               // if (this.ruleForm.ShopInfo) {
               //      this.checkClick = this.ruleForm.ShopInfo.split(",");
               // }
               if (this.checkClick.length > 0) {
                    this.handleCheckedCitiesChange(this.allCheckList);
               }
          },
          dialogVisible(bool){
               this.$emit('changeDig', bool)
               if(this.loadingBtn){
                    this.loadingBtn = bool
               }
          },
          loadingBtn(val){
               if(val){
                    this.disabled = true
               }else{
                    this.disabled = false
               }
          }
     },
}
function setData(data, label, id) {
  let arr = data;
  let nameArr = [];
  let idArr = [];
  if (arr.length > 0) {
    arr.forEach(D => {
      nameArr.push(D[label]);
      idArr.push(D[id]);
    });
  }
  return {
    nameArr,
    idArr
  };
}
function getCharCount(info,char) {
     let regex = new RegExp(char,'g');
     let result = info.match(regex);
     let count = !result ? 0:result.length;
     return count;
}
</script>
<style lang="less" scoped>
  .el-checkbox {
      display: block;
      margin-top: 8px;
    }
.chaxun{
     margin-bottom: 20px;
}
.inputSty{
     margin-right: 10px;
     width: 180px
}
</style>