<template>
  <div class="activeGoods">
    <el-table :data="dataList" v-loading="loading" style="width: 100%;">
      <el-table-column label="活动名称" width="250" prop="Name" align="center">
        <!-- <template slot-scope="scoped">
          <el-row>
            <el-col :span="12" class="goodsInfo">
              <img :src="scoped.row.Img | setImgPrex" />
            </el-col>
            <el-col :span="12" class="goodInfoRight">
              <div>{{scoped.row.Name}}</div>
            </el-col>
          </el-row>
        </template> -->
      </el-table-column>
      <el-table-column prop="SID" label="商品编号" align="center"></el-table-column>
      <el-table-column prop="Type" label="活动类型" align="center">
        <template slot-scope="scoped">{{setActiveType(scoped.row.Type)}}</template>
      </el-table-column>
      <el-table-column prop="TimeName" label="活动状态" align="center"></el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scoped">{{scoped.row.Audit | setActiveStatus}}</template>
      </el-table-column>
      <el-table-column label="是否关闭" align="center">
        <template slot-scope="scoped">{{scoped.row.Start | setActiveOpen}}</template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
        <template slot-scope="scoped">
          <el-popover placement="left" v-model="scoped.row.visibleUrl">
            <el-input v-model="scoped.row.codeUrl" readonly placeholder="商品链接">
              <el-button slot="append" @click="copyUrl(scoped.row)">复制</el-button>
            </el-input>
            <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
          </el-popover>
          <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>
          <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
          <el-button type="text" @click="changeEnable(scoped.row,'Audit')">审核</el-button>
          <el-button type="text" @click="changeEnable(scoped.row,'Start')">关闭</el-button>
          <el-popover placement="left" v-model="scoped.row.visible">
            <div class="smallRoutine">
              <div class="smallRoutineTop">
                <span>小程序码</span>
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
                v-if="!scoped.row.Audit"
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
            >小程序码</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>
    <ModifyCate :cateShow="cateShow" @cateFunction="cateFunction" :isIntegral="true"></ModifyCate>
  </div>
</template>

<script>
import ModifyCate from "@/components/Dialog/modifyCate";
import Del from "@/components/Dialog/del";
import { getLists } from "@/api/vipCard";
import { activeUrlGood } from "@/config/index";
import { DownUrlFunCode } from "@/config/publicFunction";
import Cookies from "js-cookie";
import QRCode from "@/components/qrcodejs/qrcodejs";
export default {
  name: "",
  data() {
    return {
      dataList: [],
      allData: [],
      loading: false,
      cateShow: false,
      show: false,
      AppNoMy: Cookies.get("AppNo"),
      activeUrlGood: activeUrlGood,
      currentIndexCode: "",
      current_index: "",
      current_SID: "",
      activeType: "1",
      current_Status: "", //审核
      current_Open: "", //关闭
    };
  },
  props: ["activeTypeShow"],
  components: { ModifyCate, QRCode, Del },
  created() {
    this.getList();
  },
  methods: {
    //   获取列表
    async getList() {
      try {
        this.loading = true;
        let { Data } = await getLists(
          { Action: "GetPromotionList" ,Type:this.activeTypeShow},
          "MPromotionOpera"
        );
        this.loading = false;
        let PromotionList = Data.PromotionList || [];
        PromotionList.forEach((D) => {
          D.codeUrl =
            this.activeUrlGood +
            "?SID=" +
            D.SID +
            "&AppNo=" +
            this.AppNoMy +
            "&seckill=true";

          // this.$set(D, "Start", D.Start === "0" || !D.Start ? true : false);
          // this.$set(D, "Audit", D.Audit === "0" || !D.Audit ? true : false);
        });
        this.allData = PromotionList;
        this.dataList = PromotionList
        // if (PromotionList.length > 0) {
        //   this.dataList = PromotionList.filter(
        //     (item) => item.Type == this.activeTypeShow
        //   );
        // }
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // 活动类型（1秒杀活动，2爆款活动，3套餐活动，4买赠活动，5团购活动）
    setActiveType(val) {
      if (val == "1" && val == this.activeTypeShow) {
        return "秒杀活动";
      } else if (val == "5" && val == this.activeTypeShow) {
        return "团购活动";
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
              [val]: this.current_Status,
            },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        } else {
          let data = await getLists(
            { Action: "SetPromStart", SID: row.SID, [val]: this.current_Open },
            "MPromotionOpera"
          );
          this.$message.success("操作成功");
          this.getList();
        }
        //    let action = val === "Audit" ? "SetPromAudit" : "SetPromStart";
        //    let data = await getLists(
        //      { Action: action, SID: row.SID, [val]: Start },
        //      "MPromotionOpera"
        //    );
        //    this.$message.success("操作成功");
        //    console.log(row, "row");
      } catch (e) {
        setTimeout(() => {
          row.Start = !row.Start;
        }, 500);
        this.$message.error(e);
      }
    },
    // 复制输入框的地址
    copyUrl(val) {
      let index = $(".el-popover").length - 1;
      let input = $($(".el-popover")[index]).find("input");
      input.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
      val.visibleUrl = false;
    },
    // 编辑 通过类型进入编辑页面
    editRowGoods(row) {
      if (this.activeTypeShow == "1") {
        this.$router.push({
          path: "/weChat/manager/activity/goodAdd",
          query: { SID: row.SID },
        });
      } else if (this.activeTypeShow == "5") {
        this.$router.push({
          path: "/weChat/manager/activity/groupGoodAdd",
          query: { SID: row.SID },
        });
      }
    },
    // viewEvaluate() {},
    delRow(row, index) {
      this.show = true;
      this.current_index = index;
      this.current_SID = row.SID;
    },
    clicCode(index) {
      this.currentIndexCode = index;
    },
    upDownUrl(Name) {
      DownUrlFunCode(Name);
    },
    cateFunction(bool) {
      this.cateShow = bool;
    },
    modifyCateFun() {
      this.cateShow = true;
    },
    //     // 添加
    //     addGood() {
    //       if(this.activeIndex === '0'){
    //         this.$router.push({
    //           path: "/weChat/manager/activity/goodAdd"
    //         });
    //       }else {
    //         this.$router.push({
    //           path: "/weChat/manager/activity/groupGoodAdd"
    //         });
    //       }
    //     },
    delFunction(bool) {
      this.show = bool;
    },
    //     删除
    async confirmEnd() {
      try {
        await getLists(
          { Action: "RemovePromotion", SID: this.current_SID },
          "MPromotionOpera"
        );
        this.dataList.splice(this.current_index, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    //     handleClick(tab, event) {
    //       this.activeIndex = tab.index;
    //       // this.getList();
    //       //  console.log(this.allData, "this.allData");
    //        console.log(this.activeType)
    //       this.dataList = this.allData.filter(item => item.Type == this.activeType || (item.Type == '5'&& this.activeType=='2'));
    //     }
  },
  filters: {
    setActiveStatus(val) {
      if (val === "1") {
        return "已审核";
      } else return "未审核";
    },
    //是否启用
    setActiveOpen(val) {
      if (val === "1") {
        return "启用";
      } else {
        return "停用";
      }
    },
  },
};
</script>

<style lang="less">
.activeGoods {
  .goodsInfo {
    width: 75px;
    height: 75px;
    border: 1px solid #eee;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .goodInfoRight {
    margin: 0px 0 0 20px;
    line-height: 32px;
  }

  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #fff !important;
    color: #409eff;
  }
}
</style>
