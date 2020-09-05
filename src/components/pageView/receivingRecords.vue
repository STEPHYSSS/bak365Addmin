<template>
  <div class="recordsStyle"  v-loading="loading">
    <el-row>
      <el-col :span="12">
        <span>激活时间：</span>
        <el-date-picker
          v-model="daterange"
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="12" v-if="!currentRoute">
        <span style="display: inline-block;width:90px">微信卡模板：</span>
        <cardNames @changeValue="changeValue" :clearable="true"></cardNames>
      </el-col>
      <el-col :span="12" v-if="currentRoute">
        <span style="display: inline-block;width:70px">劵名称：</span>
        <couponNames></couponNames>
      </el-col>
      <el-col :span="12">
        <div style="width:70px;display: inline-block;text-align: right">状态：</div>
        <el-select v-model="search.State" placeholder="请选择">
          <el-option
            v-for="item in stateList"
            :key="item.label"
            :label="item.value"
            :value="item.label">
          </el-option>
        </el-select>
      </el-col>
      <!--      <el-col :span="12">-->
      <!--        时间类型：-->
      <!--        <el-select v-model="timeType" placeholder="请选择">-->
      <!--          <el-option-->
      <!--            v-for="item in timeList"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </el-col>-->
    </el-row>
    <el-button type="primary" style="margin-left:75px" @click="searchFun">筛选</el-button>
    <el-button type="primary">下载</el-button>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        v-if="!currentRoute"
        prop="Name"
        label="卡模板名称">
      </el-table-column>
      <el-table-column
        v-if="currentRoute"
        prop="date"
        label="优惠券名称">
      </el-table-column>
      <el-table-column
        v-if="!currentRoute"
        label="绑定卡号">
        <template slot-scope="scoped">
          <span v-if="scoped.row.CardNo">{{scoped.row.CardNo}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="currentRoute"
        prop="name"
        label="优惠券码">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scoped">
          <span>{{scoped.row.State |setStateFil}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="AddTime"
        label="领取时间">
      </el-table-column>
      <el-table-column
        v-if="!currentRoute"
        prop="ActivateTime"
        label="激活时间">
      </el-table-column>
      <el-table-column
        v-if="currentRoute"
        prop="address"
        label="使用时间">
      </el-table-column>
    </el-table>
<!--    <Pagination :page="page" @change_page="get_list" style="float: right;margin-top:30px"></Pagination>-->
  </div>
</template>

<script>
import cardNames from '@/components/selector/cardList'
import couponNames from '@/components/selector/couponList'
import Pagination from '@/components/pagination/index'
import {getLists} from '@/api/vipCard'

export default {
  name: "receivingRecords",
  props: {
    currentRoute: Boolean
  },
  components: {cardNames, Pagination, couponNames},
  data() {
    return {
      loading:true,
      daterange: '',
      search: {},
      page: {total: 100, current_page: 1},
      stateList: [
        {
          label: '',
          value: '全部'
        }, {
          label: '0',
          value: '已删除'
        }, {
          label: '1',
          value: '已领取'
        }, {
          label: '2',
          value: '已激活'
        }
      ],
      // timeList: [
      //   {name: '全部', TimeType: null},
      //   {name: '领取时间', TimeType: 0},
      //   {name: '激活时间', TimeType: 1}
      // ],
      tableData: []
    }
  },
  async created() {
    await this.get_list()
  },
  methods: {
    async get_list() {
      this.loading = true
      try{
          let obj = {}
          Object.assign(obj,this.search)
          Object.assign(obj,{Action: 'GetSendList'})
          let data = await getLists(obj,'WeChatCardOpera')
          this.tableData = data.Data.CardSendList || []
          this.loading = false
      }catch(e){
        this.loading = false
      }
    },
    async searchFun() {
      if(this.daterange){
        this.search.StartTime = this.daterange[0]
        this.search.EndTime = this.daterange[1]
      }else{
        this.search.StartTime = ''
        this.search.EndTime = ''
      }
      await this.get_list()
    },
    changeValue(id){
      this.search.WeChatNo = id
    }
  },
  filters:{
    setStateFil(val){
      switch (Number(val)) {
        case 0:
          return '已删除';
        case 1:
          return '已领取';
        case 2:
          return '已激活'
      }
    }
  },
  watch:{
    loading(val){
      this.$emit('setNoClick',val)
    }
  }
}
</script>

<style lang="less">
  .recordsStyle {
    .el-date-editor .el-range-separator {
      width: 8%;
    }

    .el-col-12 {
      margin-top: 8px;
    }

    .el-row {
      margin-bottom: 20px;
    }

    .el-table {
      margin-top: 20px;
    }
  }

</style>
