<template>
  <!-- 订单列表 -->
  <div class="orderList-style">    
    <div style="margin-bottom:20px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <span class="spanWidth">商城单号：</span>
          <el-input placeholder="查询商城单号" v-model="search.ExchNo" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="changeState"></el-button>
          </el-input>
        </el-col> 
        <el-col :span="6">
          <span class="spanWidth">支付状态：</span>
          <el-select v-model="search.PayForm" placeholder="请选择支付状态"  @change="changeState(search.PayForm,1)">
            <el-option
              v-for="item in PayForm"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>       
        
        <el-col :span="6">
          <span class="spanWidth">支付类型：</span>
          <el-select v-model="search.PayType" placeholder="请选择支付类型" clearable @change="changeState">
            <el-option
              v-for="item in PayTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="spanWidth">配送方式：</span>
          <el-select
            v-model="search.DeliveryType"
            placeholder="请选择配送方式"
            clearable
            @change="changeState"
          >
            <el-option
              v-for="item in DeliveryTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:5px">
        <el-col :span="6">
          <span class="spanWidth">商户单号：</span>
          <el-input placeholder="查询商户单号" v-model="search.SID" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="changeState"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <span class="spanWidth">订单状态：</span>
          <el-select v-model="search.State" placeholder="请选择订单状态" clearable @change="changeState" class="selectSearch" v-if="search.PayForm =='0'">
            <el-option
              v-for="item in StateList1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="search.State" placeholder="请选择订单状态" clearable @change="changeState" class="selectSearch" v-else>
            <el-option
              v-for="item in StateList2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <span class="spanWidth">开始时间：</span>
          <el-date-picker
            v-model="search.StartAddTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="changeTime">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <span class="spanWidth">结束时间：</span>
          <el-date-picker
            v-model="search.EndAddTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="changeTime">
          </el-date-picker>
        </el-col>     
      </el-row>
      <el-row :gutter="20" style="margin-top:5px">
        <el-col :span="6">
          <span class="spanWidth">配送/自提门店：</span>
          <el-select v-model="search.ShopSID" filterable placeholder="请选择" clearable @change="changeState">
            <el-option
              v-for="item in storeList"
              :key="item.SID"
              :label="item.Name"
              :value="item.SID">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <el-table :data="dataList" style="width: 100%" v-loading="loading">
      <el-table-column label="单号" align="left" width="250px">
        <template slot-scope="scoped">
          <span>商城单号：{{scoped.row.ExchNo}}</span><br/>
          <span>商户单号：{{scoped.row.SID}}</span><br/>
        </template>
      </el-table-column>
      <el-table-column label="订单来源" align="center" width="250"> 
        <template slot-scope="scope">
          <p v-if="scope.row.PromType==='1'">秒杀订单/{{scope.row.PromName}}</p>
          <p v-else-if="scope.row.PromType==='5'">拼团订单/{{scope.row.PromName}}</p>
          <p v-else>普通订单</p>
        </template>
      </el-table-column>
      <el-table-column label="用户信息" align="left" width="250">
        <template slot-scope="scoped">
          <span v-if="scoped.row.UserName">用户名：{{scoped.row.UserName}}</span>
          <span v-else>--</span><br/>
          <span v-if="scoped.row.Mobile">手机号：{{scoped.row.Mobile}}</span><br/>
          <span v-if="scoped.row.Address">地址：{{scoped.row.Address}}</span>
        </template>
      </el-table-column>
       <el-table-column label="门店信息" align="left" width="250">
        <template slot-scope="scoped">
          <span v-if="scoped.row.ShopSID">{{filterFun(scoped.row.ShopSID)}}</span><br/>
          <span v-if="scoped.row.ShopSID">{{filterFun2(scoped.row.ShopSID)}}</span><br/>
          <span v-if="scoped.row.ShopSID">{{filterFun3(scoped.row.ShopSID)}}</span>
        </template>
      </el-table-column>
       <el-table-column prop="PayType" label="配送方式" align="center" width="90">
         <template slot-scope="scope">{{scope.row.DeliveryType|DeliveryType}}</template>
      </el-table-column>
      <el-table-column prop="PayAmt" label="支付金额" align="center" width="90">
        <template slot-scope="scope">{{scope.row.PayAmt}}&nbsp;元</template>
      </el-table-column>
      <el-table-column prop="PayType" label="支付状态" align="center" width="90">
         <template slot-scope="scope">{{scope.row.PayType|PayTypeTip}}</template>
      </el-table-column>
      <el-table-column prop="State" label="订单状态" align="center" width="90">
        <template slot-scope="scope">{{scope.row.State |orderState2}}</template>
      </el-table-column>
      <el-table-column prop="AddTime" label="下单时间" align="center" width="150"></el-table-column>、
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="viewRow(scope.row)">查看</el-button>
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
import { stateLists, stateLists1,stateLists2,payTypeLists, deliveryTypeLists } from "@/config/utils";
export default {
  name: "",
  data() {
    return {
      search: {
        // searchTime: "",
        PayForm:'1'
      },
      PayForm:[ { label: '未支付', value: '0' },
      { label: '已支付', value: '1' }],
      dataList: [],
      StateList: stateLists,
      StateList1: stateLists1,
      StateList2: stateLists2,
      loading: true,
      PayTypeList: payTypeLists,
      DeliveryTypeList: deliveryTypeLists,
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
      storeList:[]
    };
  },
  components: {},
  mounted() {
    this.getStoreList();
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        let obj = { Action: "GetOrderList",Page: this.currentPage - 1,OrderType:'2',State:''};
        // this.search.StartAddTime = this.search.searchTime
        //   ? this.search.searchTime[0]
        //   : "";
        // this.search.EndAddTime = this.search.searchTime
        //   ? this.search.searchTime[1]
        //   : "";
        obj = Object.assign(obj, this.search);
        let { Data } = await getLists(obj, "MOrderOpera");
        this.dataList = Data.OrderList;
        // for (const item of this.storeList) {
        //   for (const iterator of this.dataList) {
        //     iterator.ShopSID == item.SID
        //     this.$set(this.dataList,'Name',item.Name)
        //     this.$set(this.dataList,'Address',item.Address)
        //     this.$set(this.dataList,'Tel',item.Tel)
            
            
        //   }
        // }
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    filterFun(SID){
      let obj = ""
       for (const item of this.storeList) {
        if (SID == item.SID) {
         obj = `名称：${item.Name}`;
        }
      }
      return obj;
    },
    filterFun2(SID){
      let obj = ""
       for (const item of this.storeList) {
        if (SID == item.SID) {
         obj = `地址：${item.Address}`;
        }
      }
      return obj;
    },filterFun3(SID){
      let obj = ""
       for (const item of this.storeList) {
        if (SID == item.SID) {
         obj = `电话：${item.Tel}`;
        }
      }
      return obj;
    },
    async getStoreList() {
      try {
        let { Data } = await getLists({ Action: "GetShopList" }, "MShopOpera");
        this.storeList = Data.ShopInfoList;
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {      
      this.currentPage = val;
      this.getList(val);
    },
    changePicker() {
      this.getList();
    },
    changeState(val,val2) {
      if(val2){
        this.search.State = ''
      }
      this.getList();
    },
    changeTime(){
      this.getList();
    },
    viewRow(val) {
      // this.$router.push({path:'/weChat/manager/orderList/info',query:{
      //   SID:val.SID,
      //   type:val.OrderType
      // }})
      this.$router.push("/weChat/manager/orderList/info?SID=" + val.SID+'&type=2');
    },
  },
  filters:{
    PayTypeTip(val){
      if(val === '1'){
        return '微卡支付'
      }else{
        return '微信支付'
      }
    },
    DeliveryType(val){
       if(val === '1'){
        return '到店取餐'
      }else{
        return '外卖配送'
      }
    },
  }
};
</script>

<style lang="less" scoped>
.orderList-style {
  .selectSearch {
    margin-right: 8px;
    margin-bottom: 8px;
  }
  .input-with-select {
    width: 250px;
    // margin-left: 10px;
  }  
}
</style>