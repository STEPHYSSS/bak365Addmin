<template>
     <div class="block" v-if="TotalList">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" layout="total, prev, pager, next" :total="TotalList">
          </el-pagination>
     </div>
</template>
<script>
export default {
     
}
</script>
<style lang="less" scoped>

</style>