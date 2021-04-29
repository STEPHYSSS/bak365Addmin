<template>
  <div class="satisfyList">
    <el-row class="showStopGood">
      <el-col :span="4" style="line-height: 50px">
        <el-button
          size="small"
          type="primary"
          style="margin-left: 10px; margin-top: 10px"
          @click="addSatisfy"
          >添加满足赠送活动</el-button
        >
      </el-col>
      <!-- <el-col :span="20">
        <div style="margin-top: 5px">
          开始时间：<el-date-picker v-model="search.StartDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime">
          </el-date-picker>
          结束时间：<el-date-picker v-model="search.EndDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" @change="changeTime">
          </el-date-picker>
          <el-button slot="append" >查询</el-button>
        </div>
      </el-col> -->
    </el-row>
    <active-search-box ref="activeSearch" @searchList="searchList"></active-search-box> 
    <el-table :data="tableDate" v-loading="loading" style="width: 100%;">
      <el-table-column label="活动名称" prop="Name" align="center"></el-table-column>
      <el-table-column label="开始时间" prop="StartDate" align="center"></el-table-column>
      <el-table-column label="结束时间" prop="EndDate" align="center"></el-table-column>
      <el-table-column label="参与条件" align="center">
        <template slot-scope="scoped">{{scoped.row.PromWhere|PromType}}</template>
      </el-table-column>
      <!-- <el-table-column label="审核状态" align="center">
        <template slot-scope="scoped">{{scoped.row.Audit | setActiveStatus}}</template>
      </el-table-column> -->
      <el-table-column label="活动周期" prop="TimeName" align="center"></el-table-column>
      <el-table-column label="活动状态" align="center">
        <template slot-scope="scoped">{{scoped.row.Start | setActiveOpen}}</template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scoped">         
          <el-button type="text" @click="Statistics(scoped.row)">统计</el-button>
          <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>
          <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
          <!-- <el-button type="text" @click="changeEnable(scoped.row,'Audit')">审核</el-button> -->
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
import Pagination from "@/components/pagination/index";
import { getLists } from "@/api/vipCard";
import activeSearchBox from '@/components/Dialog/activeSearchBox/activeSearchBox.vue';
export default {
  components: { activeSearchBox ,Pagination},
  name: "satisfyList",
  data() {
    return {
      TotalList: 0, //分页总数
      currentPage: 0,
      pageSize: 0,
      loading:false,
      tableDate:[],
      current_Status: "", //审核
      current_Open: "", //关闭
      search:{},
    };
  },
  created(){
    this.getList();
  },
  methods: {
      searchList(val){//搜索
        this.search = val;
        this.getList();
      },
     async getList() {//获取列表
      this.loading = true;
      try {
        let obj = { Action: "GetPromotionList",Type:'6',Page: this.currentPage - 1,};
        obj = Object.assign(obj, this.search);
        let data = await getLists(obj, "MPromotionOpera");
        this.tableDate = data.Data.PromotionList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
      
     },
    //  changeTime(){
    //   this.getList();
    // },
     addSatisfy(){//新增
        this.$router.push({path:'/weChat/manager/activity/satisfyAddEdit'})
     },
     Statistics(row){//统计
        this.$router.push({
          path: "/weChat/manager/activity/publicGetMeet",
          query: { SID: row.SID },
        });
     },
     editRowGoods(row){//编辑
      this.$router.push({ path: "/weChat/manager/activity/satisfyAddEdit",
        query: { SID: row.SID },
      });
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
            { Action: "RemovePromotion", SID: row.SID,Type:'6' },
            "MPromotionOpera"
          );
            this.$message.success("删除成功");
            this.getList();
          } catch (e) {
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