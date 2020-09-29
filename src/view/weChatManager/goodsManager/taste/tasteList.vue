<template>
  <div class="tasteList">
    <el-button type="primary" @click="add">新增</el-button>
    <el-table :data="tableData" style="width: 90%; margin-top: 30px">
      <el-table-column label="商品属性名称" align="center">
      </el-table-column>
      <el-table-column label="商品属性值" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button
            v-if="scoped.row.SID"
            type="text"
            @click="delColor(scoped.row, scoped.$index)"
            >删除</el-button
          >
          <el-button
            v-if="scoped.row.SID"
            type="text"
            @click="editColor(scoped.row, scoped.$index)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "tasteList",
  data() {
    return {
         tableData:[]
    };
  },
  created() {},
  methods: {
     add(){
          this.$router.push('/weChat/manager/addTaste')
     }
  },
};
</script>