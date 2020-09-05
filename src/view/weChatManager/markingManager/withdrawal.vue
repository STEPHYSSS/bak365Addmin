<template>
  <div class="withdrawal">
    <el-select v-model="search.status" placeholder="请选择" clearable class="marginBottom">
      <el-option v-for="item in withStatus" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
    <el-select v-model="search.IsRebate" placeholder="请选择" clearable class="marginBottom">
      <el-option v-for="item in withRebated" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="LeaderSID" label="团长编号"></el-table-column>
      <!-- <el-table-column prop="OpenId" label="团长微信ID"></el-table-column> -->
      <el-table-column prop="Money" label="返佣金额"></el-table-column>
      <el-table-column label="返佣状态">
        <template slot-scope="scope">{{scope.row.State|servantStaus}}</template>
      </el-table-column>
      <el-table-column label="是否返佣">
        <template slot-scope="scope">{{scope.row.IsRebate|IsRebateTip}}</template>
      </el-table-column>
      <el-table-column prop="AddTime" label="提交时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="shenh(scope.row,scope.$index)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import audit from "@/components/Dialog/audit";
import {withStatus,withRebated} from '@/config/utils'
import {servantStaus} from '@/config/filters'
export default {
  name: "",
  data() {
    return {
      tableData: [],
      loading: false,
      search: {
        IsRebate: "",//是否返佣
        status:''//返佣状态
      },
      withStatus:withStatus,
      withRebated:withRebated,
      
      current_Audit: "",
      current_SID: "",      
      show: false// 控制审核弹框
    };
  },
  components: { audit },
  mounted() {
    this.getMarkingList();
  },
  methods: {
    // 获取列表
    async getMarkingList() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          { 
            Action: "GetRebateList",
            State:this.search.status,
            IsRebate:this.search.IsRebate
          },
          "MMemberOpera"
        );
        this.tableData = Data.RebateList;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // 查询
    searchName() {
      // 名称搜索
      // this.page.current_page = 1;
      this.getMarkingList();
    },
    //审核
    shenh(row){
      this.$router.push({
          path: "/weChat/manager/marking/commissionDetail",
          query: { SID: row.SID }
        });
    }
  },
  // filters:{
  //   servantStaus(val){
  //     if(val === '0'){
  //       return '未申请'
  //     }else if(val === '1'){
  //       return '申请返佣'
  //     }else if(val === '2'){
  //       return '处理成功'
  //     }else if(val === '3'){
  //       return '处理失败'
  //     }
  //   },
  //   IsRebateTip(val){
  //     if(val === '0'){
  //       return '未返佣'
  //     }else if(val === '1'){
  //       return '已返佣'
  //     }
  //   }
  // },
};
</script>

<style lang="less" scoped>
.withdrawal {
  .marginBottom {
    margin-bottom: 20px;
  }
  .el-select{
    margin-right: -6px;
  }
}
</style>