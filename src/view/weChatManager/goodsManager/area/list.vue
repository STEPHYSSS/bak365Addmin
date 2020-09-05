<template>
  <div>
    <!-- 自定义地区 -->
    <el-table
      class="tableAdd"
      v-loading="loading"
      :data="tableData">
      <el-table-column
        prop="Name"
        label="名称">
        <template slot-scope="scoped">
          <el-input v-model="scoped.row.Name" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scoped">
          <el-button v-if="scoped.row.SID" type="primary" size="small" @click="submitSure(scoped.row,scoped.$index)" :disabled="btnLoading">保存</el-button>
          <el-button v-if="scoped.row.SID" type="text" @click="deleteTaste(scoped.row,scoped.$index)">删除</el-button>
          <el-button v-if="!scoped.row.SID" type="primary" size="small" @click="addTaste(scoped.row,scoped.$index)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>

  </div>
</template>

<script>
import {getLists} from '@/api/vipCard'
import Del from '@/components/Dialog/del'
import {optionsLabelType} from '@/config/utils'

export default {
  components: {Del},
  data() {
    return {
      loading: true,
      btnLoading: false,
      tableData: [],
      show: false,
      ruleForm: {
        Name: '',
        State:false
      },
      rules: {
        Name: [
          {required: true, message: '请填写名称', trigger: 'blur'}
        ]
      },
      current_index: -1
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        let data = await getLists({Action: 'GetAreaList'}, 'MShopOpera')
        this.tableData = data.Data.ProdCateList
        this.tableData.push({State:false})
        this.loading = false
      } catch (e) {
        this.$message.error(e)
        this.loading = false
      }
    },
    deleteTaste(row, index) {
      this.show = true
      this.ruleForm.SID = row.SID
      this.current_index = index
    },
    delFunction(bool) {
      this.show = bool
    },
    addTaste(row,index){
      this.ruleForm.Name = row.Name
      this.ruleForm.State = row.State
      if(!row.Name){
        this.$message.info('请输入名称')
        return
      }
      this.submitSure(this.ruleForm)
    },
    async confirmEnd() {
      try {
        await getLists({Action: 'RemoveArea', SID: this.ruleForm.SID}, 'MShopOpera')
        this.tableData.splice(this.current_index, 1)
        this.$message.success('删除成功')
        this.show = false
      } catch (e) {
        this.show = false
        this.$message.error(e)
      }
    },
    async submitSure(row,index) {
      let obj = {}

      if(row){
        Object.assign(obj, row)
      }
      Object.assign(obj, {Action: 'SetArea'})
      obj.State = obj.State === true ? 1 : 0
      try {
        this.btnLoading = true
        // console.log(obj, 33333)
        // return
        await getLists(obj, 'MShopOpera')
        this.$message.success('操作成功')
        this.btnLoading = false
        this.getList()
      } catch (e) {
        this.btnLoading = false
        this.$message.error(e)
      }
    },
    async changeShow(bool,row){
      // 是否启用 0，不现实 1，显示
      if(!row.SID){
        return
      }
      let State = bool === true ? 1 : 0
      try{
        await getLists({Action: 'SetParamState',SID:row.SID,State:State}, 'MBaseOpera')
        this.$message.success('修改成功')
      }catch(e){
        setTimeout(() => {
          row.State = !row.State
        }, 500)
        this.$message.error(e)
      }
    }
  },
  computed: {
  },
  watch:{
    $route(){
    }
  }
}
</script>

<style scoped lang="less">
  .addStyle {
    .el-input {
      width: 300px;
    }
  }
  .tableAdd{
    .el-input {
      width: 300px;
    }
  }
</style>
