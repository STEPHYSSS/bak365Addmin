<template>
  <div class="satisfyList">
    <el-row class="showStopGood">
      <el-col :span="4" style="line-height: 50px">
        <el-button
          size="small"
          type="primary"
          style="margin-left: 10px; margin-top: 10px"
          @click="addSatisfy"
          >添加全民吸粉活动</el-button
        >
      </el-col>
    </el-row>
    <active-search-box ref="activeSearch" @searchList="searchList"></active-search-box> 
    <el-table :data="tableDate" style="width: 100%;">
      <el-table-column label="活动名称" prop="Name" align="center"></el-table-column>
      <el-table-column label="开始时间" prop="StartDate" align="center"></el-table-column>
      <el-table-column label="结束时间" prop="EndDate" align="center"></el-table-column>
      <el-table-column label="活动类型" align="center">
        <template slot-scope="scope">
          {{scope.row.PromWhere.split(',')[0]|tips}}
        </template>
      </el-table-column>
      <el-table-column label="关键词" align="center">
        <template slot-scope="scope">
          {{scope.row.PromWhere.split(',')[1]}}
        </template>
      </el-table-column>
      <el-table-column label="活动周期" prop="TimeName" align="center"></el-table-column>
      <el-table-column label="活动状态" align="center">
        <template slot-scope="scoped">{{scoped.row.Start | setActiveOpen}}</template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scoped">
          <el-button type="text" @click="countGoods(scoped.row)">统计</el-button>         
          <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>          
          <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
          <el-button type="text" @click="delBg(scoped.row,scoped.$index)">删除背景</el-button>
          <el-button type="text" @click="changeEnable(scoped.row,'Start')">{{scoped.row.Start|startTips}}</el-button>
        </template>
      </el-table-column>      
    </el-table>
    <div class="block" v-if="TotalList">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="TotalList">
      </el-pagination>
     </div>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import activeSearchBox from '@/components/Dialog/activeSearchBox/activeSearchBox.vue';
export default {
  name: "satisfyList",
  data() {
    return {
      TotalList: 0, //分页总数
      currentPage: 0,
      pageSize: 0,
      loading:false,
      tableDate:[],
      search:{}
    };
  },
  components:{activeSearchBox},
  created(){
    this.getList();
  },
  filters:{
    tips(val){
      if(val == '0'){
        return '邀请关注'
      }else if(val == '3'){
        return '邀请充值'
      }else if(val == '4'){
         return '营销推广'
      }
    }
  },
  methods: {
     async getList() {//获取列表
      this.loading = true;
      try {
        let obj = { Action: "GetPromotionList",Type:'9',Page: this.currentPage - 1,};
        obj = Object.assign(obj, this.search);
        let data = await getLists(obj, "MPromotionOpera");
        // let data = await getLists(
        //   {
        //     Action: "GetPromotionList",
        //     Page: this.currentPage - 1,
        //     StartDate:this.search.StartDate,
        //     EndDate:this.search.EndDate,
        //     Type:'9'
        //   },
        //   "MPromotionOpera"
        // );
        this.tableDate = data.Data.PromotionList;
        this.TotalList = data.Data.DataCount;
        this.pageSize = data.Data.PageSize;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
     },
     searchList(val){//搜索
        this.search = val;
        this.getList();
      },
     changeTime(){
       this.getList();
     },
     addSatisfy(){//新增
        this.$router.push({path:'/weChat/manager/activity/Act_addEdit'})
     },
     editRowGoods(row){//编辑
        this.$router.push({path:'/weChat/manager/activity/Act_addEdit',query:{
          SID:row.SID
        }})
     },
    delRow(row){//删除
      this.$confirm('是否删除此数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
        }).then(() => {
              this.delFun(row);
        }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消删除'
              });          
        });
     },
     async delFun(row){
        try {
          let Data = await getLists(
            { Action: "RemovePromotion", SID: row.SID,Type:'9' },
            "MPromotionOpera"
          );
            this.$message.success("删除成功");
            this.getList();
          } catch (e) {
            this.$message.error(e);
        }
      },
      countGoods(row){//统计
        this.$router.push({          
          path: "/weChat/manager/activity/Act_Statistics",
          query: { 
            PromotionSID: row.SID ,
            PromType : row.PromWhere.split(',')[0]
          }
        });
      },
      async changeEnable(row, val) {
      this.current_Status = row.Audit === "1" ? "0" : "1";
      this.current_Open = row.Start === "1" ? "0" : "1";
      try {
        if (val === "Audit") {
          let data = await getLists(
            {
              Action: "SetPromAudit",
              SID: row.SID,
              Type:row.Type,
              [val]: this.current_Status,
            },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        } else {
          let data = await getLists(
            { Action: "SetPromStart", SID: row.SID, [val]: this.current_Open,Type:row.Type },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        }
      } catch (e) {
        setTimeout(() => {
          row.Start = !row.Start;
        }, 500);
        this.$message.error(e);
      }
    },
     handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
     },
     handleCurrentChange(val) {
          this.currentPage = val;
          // this.getList(val);
     },
    delBg(row){//删除团长背景（营销推广）   删除渠道背景（邀请关注邀请充值）
      this.SetAccessQrCode(row)
    },    
    async SetAccessQrCode(row) {//删除渠道背景（邀请关注邀请充值）
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "SetAccessQrCode",
            PromotionSID: row.PromWhere.split(',')[0] =='4'?'':row.SID
          },
          "MPromotionOpera"
        );
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.satisfyList {
     .showStopGood{
          margin-bottom: 20px;
     }
  .widthW {
    width: 170px;
  }
}
</style>