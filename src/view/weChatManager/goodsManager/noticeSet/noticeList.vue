<template>
  <div>
    <!-- 消息设置 -->
    <el-button type="primary" size="small" @click="addGood" style="margin-bottom:20px">新建回复消息</el-button>
    <el-table :data="listData" v-loading="loading" style="width: 100%">
          <el-table-column prop="Name" label="关键字" align="center"></el-table-column>
          <el-table-column label="回复类型" align="center">
               <template slot-scope="scoped">{{scoped.row.ReplyType | TypeVal}}</template>
          </el-table-column>
          <el-table-column prop="Contents" label="回复文本" align="center"></el-table-column>
          <el-table-column prop="Title" label="回复标题" align="center"></el-table-column>
          <el-table-column label="类型" align="center">
               <template slot-scope="scoped">{{scoped.row.Type | Type}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
          <template slot-scope="scoped">
               <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>
               <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
          </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import Del from "@/components/Dialog/del";

export default {
  name: "index",
  components: {
    Del
  },
  data() {
    return {
      loading: false,
      listData: [],
      show: false,
      current_index: null,
      current_SID: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        let { Data } = await getLists({ Action: "GetReplyList" }, "MBaseOpera");
        // console.log(Data)
        this.listData = Data.ReplyList;
      } catch (e) {
        this.$message.error(e);
      }
    },    
    editRowGoods(row) {
      this.$router.push({
        path: "/weChat/manager/keyWordReply",
        query: { sid: row.SID }
      });
    },
    addGood() {
      this.$router.push("/weChat/manager/keyWordReply");
    },
    delRow(row, index) {
      this.show = true;
      this.current_index = index;
      this.current_SID = row.SID;
    },
    delFunction(bool) {
      this.show = bool;
    },
    async confirmEnd() {
      try {
        await getLists(
          { Action: "RemoveShop", SID: this.current_SID },
          "MShopOpera"
        );
        this.listData.splice(this.current_index, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    addPre(val) {
      if (val) {
        return process.env.Prefix + val;
      } else {
        return "";
      }
    }
  },
  filters:{
     TypeVal(val){
          if(val==='1'){
               return '文本回复'
          }else if(val==='2'){
               return '图文回复'
          }else {
               return '图片回复'
          }
     },
     Type(val){
          // 回复类型（1关键词自动回复  2关注后自动回复  3消息托管  4小尾巴）
          if(val==='1'){
               return '关键词自动回复'
          }else if(val==='2'){
               return '关注后自动回复'
          }else if(val==='2'){
               return '消息托管'
          }else{
               return '小尾巴'
          }
     }
  }
};
</script>

<style scoped lang="less">
.goodsInfo {
  width: 120px;
  height: 120px;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
