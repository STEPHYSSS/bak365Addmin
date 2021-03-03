<template>
  <div>
    <el-table :data="dataTable">
      <el-table-column width="100" label="微信头像" align="center">
        <template slot-scope="scope">
            <div style="width:80px;height:80px;border:1px solid #eee">
              <img :src="scope.row.Headimgurl" alt style="width:100%;height:100%" />               
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="MyGroup" label="团长" align="center">
        <template slot-scope="scope">
          {{scope.row.MyGroup|MyGroupTips}}
        </template>
      </el-table-column>
      <el-table-column prop="Name" label="活动名称" align="center"></el-table-column>
      <el-table-column prop="NUM" label="团人数" align="center"></el-table-column>
      <el-table-column prop="GroupState" label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.GroupState|GroupStateTips}}
        </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="开团时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
        <el-button type="text" @click="detail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详情" :visible.sync="dialogTableVisible">
      <el-table :data="dataDetail">
        <el-table-column width="80" label="微信头像" align="center">
          <template slot-scope="scope">
              <div class="WxPhoto">
                <img :src="scope.row.Headimgurl" alt style="width:100%;height:100%" />       
              </div>
               {{scope.row.MyGroup|MyGroupTips}}
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="ExchNo" label="订单号" align="center" width="180"></el-table-column>        
        <el-table-column prop="State" label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.State|StateTips}}
            <p v-if="scope.row.State ==='-2'&& scope.row.RefundState ==='4'" style="color:red">(退款失败)</p>
          </template>
        </el-table-column>
        <el-table-column prop="AddTime" label="开团时间" align="center" width="150"></el-table-column>
        <el-table-column prop="RefundTime" label="退款时间" align="center" width="150">
          <template slot-scope="scope">
           <span v-if="scope.row.State==='4'">{{scope.row.RefundTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="60">
          <template slot-scope="scope">
          <el-button type="text" @click="check(scope.row)" v-if="scope.row.State==='-2'">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import GroupDialog from '@/components/Dialog/GroupDialog.vue';//活动商品弹窗组件
export default {
  name:"addEditGood",
  data(){
    return{
      dataTable:[],//列表详情
      dataDetail:[],//弹窗详情
      dialogTableVisible: false,
    }
  },
  components:{
    GroupDialog
  },
  created(){
    this.getActiveGoodInfo()
  },
  methods:{
    async getActiveGoodInfo(){//获取详情
      try {
        let res = await getLists({
          Action:'GetGroupStatistics',
          PromotionSID: this.$route.query.PromotionSID
        },"MPromotionOpera")
        console.log(res.Data)
        this.dataTable = res.Data.PromotionList||[]
      } catch (error) {
        this.$message.error(error)
      }
    },
    async detail(row){  
      this.dialogTableVisible = true;
      try {
        let res = await getLists({ Action: "GetGroupDetail",GroupSID:row.GroupSID,PromotionSID:row.PromotionSID}, "MPromotionOpera");
        this.dataDetail = res.Data.PromotionList||[];         
      } catch (error) {
        this.$message.error(error)
      }
    },
    
    // async check(row){
    //   try {
    //     let res = await getLists({ Action: "GroupRefund",OrderSID:row.OrderSID,PromotionSID:row.PromotionSID}, "MPromotionOpera");
    //     this.$message.success('操作成功')
    //   } catch (error) {
    //     this.$message.error(error)
    //   }
    // },
    check(row){
      this.$confirm("是否确认退款?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        try {
          let { Data } = getLists({ Action: "GroupRefund",OrderSID:row.OrderSID,PromotionSID:row.PromotionSID,RefundState:'3'}, "MPromotionOpera");
          // this.$message.success('操作成功')
          this.dialogTableVisible = false;
        } catch (error) {
          this.$message.error(error);
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        });
      });
    }
  },
  filters:{
    GroupStateTips(val){
      if(val==='0'){
        return '未成团'
      }else if(val === '1'){
        return '已成团'
      }else if(val === '3'){
        return '已退款'
      }else if(val === '4'){
        return '退款失败'
      }
    },
    MyGroupTips(val){
      if(val==='1'){
        return '团长'
      }
    },
    StateTips(val){
      if(val){
        if(val==='-2'){
          return '已付款'
        }else if(val==='4'){
          return '已退款'
        }else if(val==='-3'){
          return '已取消'
        }else if(val==='3'){
          return '退款失败'
        }
      }
    }
  }
}
</script>
<style lang="less">
.WxPhoto{
  width:50px;height:50px;border:1px solid #eee;margin: 0 auto;
}
</style>