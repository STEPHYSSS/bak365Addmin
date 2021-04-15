<template>
  <div class="entStore">
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="small" @click="addCondition">添加扫码领券</el-button>
    </div>
    <active-search-box ref="activeSearch" @searchList="searchList"></active-search-box>
    <el-table :data="dataTable" v-loading="loading" style="width: 100%">
      <el-table-column prop="Name" label="活动名称" align="center"></el-table-column>
      <el-table-column label="有效时间" align="center" width="290">
        <template slot-scope="scope">{{scope.row.StartDate}}-{{scope.row.EndDate}}</template>
      </el-table-column>
      <el-table-column prop="TimeName" label="活动状态" align="center"></el-table-column>
      <el-table-column label="是否关闭" align="center">
        <template slot-scope="scoped">{{scoped.row.Start | setActiveOpen}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button type="text" @click="editCondition(scoped.row)">编辑</el-button>
          <el-button type="text" @click="delCondition(scoped.row)">删除</el-button>
          <el-button type="text" @click="changeEnable(scoped.row,'Start')">{{scoped.row.Start|startTips}}</el-button>
          <el-popover placement="left" v-model="scoped.row.visibleUrl">
            <el-input v-model="scoped.row.codeUrl" readonly placeholder="活动链接" style="width:500px">
              <el-button slot="append" @click="copyUrl(scoped.row)">复制</el-button>
            </el-input>
            <el-button type="text" slot="reference">链接</el-button>
          </el-popover>
          <el-popover placement="left" v-model="scoped.row.visible">
            <div class="smallRoutine">
              <div class="smallRoutineTop">
                <span>扫码预览</span>
                <span class="close" @click="scoped.row.visible = false">×</span>
              </div>
              <div style="width:200px;height:200px;border: 1px solid #efefef;">
                <QRCode
                  :newWidth="200"
                  :newText="scoped.row.codeUrl"
                  v-if="currentIndexCode === scoped.$index"
                ></QRCode>
              </div>
              <a id="downloadImg"></a>
              <a
                class="smallRoutineUpDown"
                @click="upDownUrl(scoped.row.Name)"
              >可下载小程序码</a>
              <a v-if="scoped.row.Audit" class="smallRoutineUpDown">供浏览的二维码</a>
            </div>
            <el-button
              type="text"
              slot="reference"
              style="margin-left:8px;"
              @click="clicCode(scoped.$index)"
            >扫码预览</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard"; //调用接口引用
import { scanCoupon } from "@/config/index";
import Cookies from "js-cookie";
import { DownUrlFunCode } from "@/config/publicFunction";
import QRCode from "@/components/qrcodejs/qrcodejs";
import activeSearchBox from '@/components/Dialog/activeSearchBox/activeSearchBox.vue';
export default {
  components: { activeSearchBox,QRCode },
  name: "",
  data() {
    return {
      dataTable: [],
      loading: true,
      current_Status: "", //审核
      current_Open: "", //关闭
      search:{},
      currentIndexCode: "",
      scanCoupon:scanCoupon,//秒杀链接
    };
  },
  created() {
    this.getList();
  },
  methods: {     
     async getList() {
      //列表
      this.loading = true;
      try {
        let obj = { Action: "GetPromotionList",Type:8};
        obj = Object.assign(obj, this.search);
        let data = await getLists(obj, "MPromotionOpera");
        let PromotionList = data.Data.PromotionList
        PromotionList.forEach((D) => { D.codeUrl = this.scanCoupon + "?SID=" + D.SID + "&FlagScan=true";
          console.log(D.codeUrl)
        });
        this.dataTable = PromotionList;
        this.loading = false;
      } catch (e) {        
        this.loading = false;
      }
     },
     upDownUrl(Name) {
      DownUrlFunCode(Name);
    },
    copyUrl(val) {//复制
     let index = $(".el-popover").length - 1;
      let input = $($(".el-popover")[index]).find("input");
      input.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
    },
     searchList(val){//搜索
       this.search = val;
       this.getList();
     },
     addCondition() {
        this.$router.push({ path: "/weChat/manager/activity/scanCouponAddEdit" });
     },
     editCondition(row) {
      this.$router.push({
      path: "/weChat/manager/activity/scanCouponAddEdit",
      query: { SID: row.SID },
      });
     },
     delCondition(row){      
        this.$confirm('是否删除此数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
        }).then(() => {
              this.delFun(row);
        }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消删除'
              });          
        });
     },
     async delFun(row){
        try {
            let Data = await getLists(
              { Action: "RemovePromotion", SID: row.SID },
              "MPromotionOpera"
            );
              this.$message.success("删除成功");
              this.getList();
            } catch (e) {
              this.$message.error(e);
            }
      },
     // 是否启用 bool = true 为下架
    async changeEnable(row, val) {
      this.current_Status = row.Audit === "1" ? "0" : "1";
      this.current_Open = row.Start === "1" ? "0" : "1";
      try {
        if (val === "Audit") {
          let data = await getLists(
            {
              Action: "SetPromAudit",
              SID: row.SID,
              Type:row.Type,
              [val]: this.current_Status,
            },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        } else {
          let data = await getLists(
            { Action: "SetPromStart", SID: row.SID, [val]: this.current_Open,Type:row.Type },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        }
      } catch (e) {
        setTimeout(() => {
          row.Start = !row.Start;
        }, 500);
        this.$message.error(e);
      }
    },
    clicCode(index) {
      this.currentIndexCode = index;
    },
  },  
};
</script>
<style lang="less" scoped>
</style>