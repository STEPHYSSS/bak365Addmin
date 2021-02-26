<template>
  <div class="orderNotify">
    <el-row class="marginBottom">
      <el-col :span="24">
        <span>卡 号：</span>
        <el-input placeholder="请输入卡号" v-model="CardNo" clearable @clear = "clearN" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
        </el-input>&nbsp;&nbsp;
        <span>手机号：</span>
        <el-input placeholder="请输入ID" v-model="OpenID" clearable @clear = "clearI" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchN"></el-button>
        </el-input>
        <span>卡来源：</span>
        <el-select v-model="BindType" @change="changeCard" placeholder="请选择">
          <el-option
            v-for="item in BindTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>卡状态：</span>
        <el-select v-model="CardState" @change="changeCard" placeholder="请选择">
          <el-option
            v-for="item in CardStateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="头像" width="80px" align="center">
           <template slot-scope="scoped">
               <img :src="scoped.row.Headimgurl?scoped.row.Headimgurl:defaultImg" alt="" class="imgWidth">
           </template>
      </el-table-column>
      <el-table-column prop="NickName" label="用户名" align="center"></el-table-column>
      <el-table-column label="性别"  width="80px" align="center">
          <template slot-scope="scoped">{{scoped.row.Sex|Sex}}</template>
      </el-table-column>
      <el-table-column prop="CardNo" label="卡号" align="center"></el-table-column>
      <el-table-column prop="BindType" label="卡来源" align="center"  width="100px">
        <template slot-scope="scoped">{{scoped.row.BindType|BindTypeTips}}</template>
      </el-table-column>
      <el-table-column prop="CardState" label="卡状态" align="center" width="100px">
        <template slot-scope="scoped">{{scoped.row.CardState|CardStateTips}}</template>
      </el-table-column>
      <el-table-column prop="Source" label="会员来源" align="center" width="100px">
        <template slot-scope="scoped">{{scoped.row.Source|SourceTips}}</template>
      </el-table-column>
      <el-table-column prop="Mobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="Subscribe" label="是否关注" align="center">
          <template slot-scope="scoped">
               {{scoped.row.Subscribe|Subscribe}}
          </template>
      </el-table-column>
      <el-table-column prop="AddTime" label="添加时间" align="center"></el-table-column>
      <el-table-column prop="UpTime" label="更新时间" align="center"></el-table-column>
      <!-- <el-table-column prop="Source" label="来源"></el-table-column> -->
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
import _ from "lodash";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      defaultImg:require("@/assets/img/defaule_back.png"),
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
      CardNo:"",//卡号查询
      OpenID:"",//ID 查询
      BindTypeList: [{
          value: '',
          label: '全部'
        },{
          value: 'Net',
          label: '微卡'
        }, {
          value: 'Manage',
          label: '实体卡'
        }],
        BindType: '',
        CardStateList:[{
          value: '',
          label: '全部'
        },{
          value: '0',
          label: '已领用'
        },{
          value: '2',
          label: '正常'
        }, {
          value: '3',
          label: '挂失'
        }, {
          value: '4',
          label: '作废'
        }],
        CardState:''
    };
  },
  created() {
    this.GetOrderTemplate();
  },
  methods: {
    async GetOrderTemplate() {
      try {
        let { Data } = await getLists(
          {
            Action: "GetMemberList",
            Page: this.currentPage - 1,
            CardNo:this.CardNo,
            Mobile:this.OpenID,
            BindType:this.BindType,
            CardState:this.CardState
          },
          "MMemberOpera"
        );
        this.tableData = Data.UserList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
      } catch (error) {
        this.$message.error(error);
      }
    },
    changeCard(){
      this.GetOrderTemplate();
    },
    searchN(){//卡号查询
      this.GetOrderTemplate();
    },
    clearN(){
      this.CardNo = '';
      this.GetOrderTemplate();
    },
    clearI(){
      this.OpenID = '';
      this.GetOrderTemplate();
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.GetOrderTemplate(val);
    },
  },
  filters:{
    Sex(val){
      if(val=='1'){
        return '男'
      }else if(val=='2'){
        return '女'
      }else{
        return '未知'
      }
    },
    Subscribe(val){//关注
      if(val=='1'){
        return '是'
      }else{
        return '否'
      }
    },
    BindTypeTips(val){//卡来源
      if(val=='0'||val==''){
        return '无'
      }else if(val=='Net'){
        return '微卡'
      }else{
        return '实体卡'
      }
    },
    SourceTips(val){//会员来源
      if(val=='0'){
        return '公众号'
      }else return ''
    },
    CardStateTips(val){//会员卡状态 "0", "已领用", "2", "正常", "3", "挂失", "4", "作废"
      if(val=='0'){
        return '已领用'
      }else if(val=='2'){
        return '正常'
      }else if(val=='3'){
        return '挂失'
      }else if(val=='4'){
        return '作废'
      }
    }
  }
};
</script>
<style lang="less" scoped>
.imgWidth{
  width: 60px;
  height: 60px;
}
.input-with-select {
  width: 250px;
}
.marginBottom{
  margin-bottom: 15px;
}
</style>