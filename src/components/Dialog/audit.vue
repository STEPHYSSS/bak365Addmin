<template>
<!-- 审核 -->  
  <div>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="400px">
      <span v-if="showID !='1'">是否通过审核？</span>
      <span v-else>是否取消已审核？</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" :disabled="disabled">取 消</el-button>
      <el-button type="primary" @click="confirmEnd" :loading="loadingBtn">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    showID:{
      type:String,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      loadingBtn: false,
      disabled: false
    }
  },
  methods: {
    confirmEnd() {
      this.loadingBtn = true
      this.$emit('confirmEnd',this.showID)
    }
  },
  watch: {
    show(val) {
      this.dialogVisible = val
    },
    showID(val){
      console.log(val)
    },
    dialogVisible(bool){
      this.$emit('auditFunction', bool)
      if(this.loadingBtn){
        this.loadingBtn = bool
      }
    },
    loadingBtn(val){
      if(val){
        this.disabled = true
      }else{
        this.disabled = false
      }
    }
  }
}
</script>

<style scoped>

</style>
