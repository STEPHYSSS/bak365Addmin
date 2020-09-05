<template>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="this.page.current_page"
    :page-size="page.per_page"
    layout="total, prev, pager, next, jumper"
    :total="page.total">
  </el-pagination>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      default: function () {
        return {
          current_page: 1, //当前页
          per_page: 15, //每页条数
          // last_page: 0, //总页数
          total: 0//总条数
        }
      }
    }
  },
  methods: {
    // 点击当前页页面刷新
    handleCurrentChange(page) {
      this.$emit('change_page', page)
    }
  }
}
</script>
<style lang="less">
  .el-pagination {
    margin-bottom: 20px;
  }
</style>
