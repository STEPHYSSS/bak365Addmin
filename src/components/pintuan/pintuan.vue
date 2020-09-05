<template>
  <!-- 拼团成功通知模板 -->
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="模板ID：" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="模板内容：" prop="desc">
        <el-input type="textarea" v-model="form.desc" ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
export default {
  props: {},
  data() {
       return{
            ruleForm:{
                 name:'',
                 desc:''
            },
            rule:{
                 name:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
                 desc:[{ required: true, message: '请填写活动形式', trigger: 'blur' }]
            }
       }
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取商品列表
    async getList() {
      //  try {
      //    let { Data } = await getLists(
      //      { Action: "GetProdCateBaseList" },
      //      "MProdOpera"
      //    );
      //    this.dataTree = Data.CateBaseList;
      //  } catch (e) {
      //    this.$message.error(e);
      //  }
    },
  },
  watch: {},
};
</script>

<style lang="less">
</style>
