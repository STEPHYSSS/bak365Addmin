<template>
  <div>
    <el-button type="primary" size="small" @click="addCoupon" class="marginBottom">添加优惠券</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    addCoupon() {
    }
  }
}
</script>

<style>

</style>
