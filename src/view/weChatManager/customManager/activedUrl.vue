<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Name" label="名称" width="350" align="center"></el-table-column>
      <el-table-column label="网址链接">
        <template slot-scope="scoped">{{scoped.row.codeUrl}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scoped">
          <el-button type="text" @click="copyUrl(scoped.row)" v-if="scoped.row.ItemList">活动商品链接</el-button>
         <el-popover placement="left" v-model="scoped.row.visibleUrl" v-else>
          <el-input v-model="scoped.row.codeUrl" readonly placeholder="商品链接" style="width:500px">
              <el-button slot="append" @click="copyUrl2(scoped.row)">复制</el-button>
          </el-input>
          <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="活动商品" :visible.sync="dialogTableVisible">
      <el-table :data="urlList">
        <el-table-column property="Name" label="网址名称" width="180px"></el-table-column>
        <el-table-column label="网址链接">
          <template slot-scope="scoped">
          <el-input v-model="scoped.row.goodsUrl" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80px">
          <template slot-scope="scope">
          <el-popover placement="left" v-model="scope.row.visibleUrl">
          <el-input v-model="scope.row.goodsUrl" readonly placeholder="商品链接" style="width:500px">
              <el-button slot="append" @click="copyUrl2(scope.row)">复制</el-button>
          </el-input>
          <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
          </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- <goodsUrl :itemDate="urlList" :goodsShow="goodsShow" @changeDig="changeDig"></goodsUrl> -->
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
import { seckill,activeUrlGood,scanCoupon } from "@/config/index";//链接前缀
import goodsUrl from "@/components/Dialog/goodsUrl.vue"//弹窗
export default {
  name: "",
  data() {
    return {
      tableData: [],
      seckill: seckill, //秒杀链接
      activeUrlGood:activeUrlGood,//进入商品详情
      scanCoupon:scanCoupon,
      goodsShow: false,//弹窗
      urlList: [],//弹框数组
      dialogTableVisible:false,
    };
  },
  components:{
    goodsUrl
  },
  created() {
    this.getActiveList();
  },
  methods: {
    async getActiveList() {
      //获取秒杀 拼团活动信息+活动明细
      try {
        let data = await getLists(
          { Action: "GetPromInfoUrl" },
          "MPromotionOpera"
        );
        if (data.Data.PromList) {
          this.tableData = data.Data.PromList;
          this.tableData.forEach(D => {
            if(D.Type == '1'){
              D.codeUrl = this.seckill + "?SID=" + D.SID + "&Flag=true";
            }else if(D.Type == '8'){
              D.codeUrl = this.scanCoupon + "?SID=" + D.SID + "&FlagScan=true";
            }else if(D.Type == '5'){
              D.codeUrl = this.seckill + "?SID=" + D.SID + "&Group=true"
            }
          });
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    copyUrl(row) {
      let query={ SID:"",
      seckill: "true"}
      row.ItemList.forEach(D => {
        query.SID = D.SID;
        D.goodsUrl = this.activeUrlGood + "?query="+encodeURIComponent(JSON.stringify(query))
      });
      this.urlList = row.ItemList;
      this.dialogTableVisible = true;
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    copyUrl2(){
      let index = $(".el-popover").length - 1;
      let input = $($(".el-popover")[index]).find("input");
      input.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
    }
    // 后台 MPromotionOpera  GetPromInfoUrl  获取秒杀 拼团活动信息+活动明细
  }
};
</script>
<style lang="less" scoped>
</style>
