<template>
  <div v-loading="loading">
    <el-button type="primary" @click="addRule">新建规则</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="会员卡名称">
      </el-table-column>
      <el-table-column
        prop="Mchid"
        label="商户支付编号">
      </el-table-column>
      <el-table-column
        prop="BeginTime"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="EndTime"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="LeastCost"
        label="生效支付金额下限">
      </el-table-column>
      <el-table-column
        prop="MaxCost"
        label="生效支付金额上限	">
      </el-table-column>
      <el-table-column
        width="150"
        label="操作">
        <template slot-scope="scoped">
          <el-button type="text" @click="deFun(scoped.row,scoped.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>
  </div>
</template>

<script>
import Del from '@/components/Dialog/del'
import {getLists} from '@/api/vipCard'

export default {
  name: "vipPayment",
  components: {Del},
  data() {
    return {
      show: false,
      loading: true,
      // 当前点击的row index
      current_index: '',
      tableData: []
    }
  },
  async created() {
    await this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      try {
        let data = await getLists({Action: 'GetPayMemberList'}, 'MBaseOpera')
        this.tableData = data.Data.PayMemberList || []
        this.loading = false
      } catch (e) {
        this.loading = false
        this.tableData = []
        this.$message.error(e)
      }
    },
    addRule() {
      this.$router.push('/wechatCard/vip/rule')
    },
    deFun(row, index) {
      this.show = true
      this.current_index = index
    },
    delFunction(bool) {
      this.show = bool
    },
    async confirmEnd() {
      try {
        await getLists({Action: 'SetPayMember'}, 'MBaseOpera')
        this.$message.success('删除成功')
        this.tableData.splice(this.current_index, 1)
        this.show = false
      } catch (e) {
        this.show = false
        this.$message.error(e)
      }
    }
  }
}
</script>

<style scoped>
  .el-table {
    margin-top: 20px;
  }
</style>
