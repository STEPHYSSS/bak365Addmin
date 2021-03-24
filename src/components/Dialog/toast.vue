<template>
<!-- 删除 -->
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="400px">
    <span>确定批量上架吗？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" :disabled="disabled">取 消</el-button>
    <el-button type="primary" @click="confirmEnd" :loading="loadingBtn">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
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
      this.$emit('batch')
    }
  },
  watch: {
    show(val) {
      this.dialogVisible = val
    },
    dialogVisible(bool){
      this.$emit('delFunction', bool)
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
