<template>
  <div class="integralGoods">
    <!-- 积分列表 -->
    <div>
      <el-button type="primary" size="small" @click="addGood">添加积分商品</el-button>
      <el-button
        size="small"
        type="primary"
        style="margin-left:10px;margin-top:10px"
        @click="modifyCateFun"
      >添加/修改 类别</el-button>
    </div>
    <el-table :data="dataList" v-loading="loading" style="width: 100%;margin-top:25px">
      <el-table-column label="商品" width="300">
        <template slot-scope="scoped">
          <el-row>
            <el-col :span="12" class="goodsInfo">
              <img :src="scoped.row.Img | setImgPrex" />
            </el-col>
            <el-col :span="12" class="goodInfoRight">
              <div>{{scoped.row.Name}}</div>
              <span style="color:red">¥{{scoped.row.SalePrice}} + {{scoped.row.Score}}积分</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="SID" label="商品ID"></el-table-column>
      <el-table-column label="库存">
        <template slot-scope="scoped">
          <span v-if="scoped.row.StoreQty">{{scoped.row.StoreQty}}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="下架">
        <template slot-scope="scoped">
          <el-checkbox v-model="scoped.row.State" @change="changeEnable($event,scoped.row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column width="300" label="操作">
        <template slot-scope="scoped">
          <el-popover placement="left" v-model="scoped.row.visibleUrl">
            <el-input
              v-model="scoped.row.codeUrl"
              readonly
              placeholder="商品链接"
            >
              <el-button slot="append" @click="copyUrl(scoped.row)">复制</el-button>
            </el-input>
            <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
          </el-popover>
          <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>
          <!-- <el-button type="text" @click="viewEvaluate(scoped.row)">查看评价</el-button> -->
          <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
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
              <a class="smallRoutineUpDown" @click="upDownUrl(scoped.row.Name)">下载小程序码</a>
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
import { integralUrlGood } from "@/config/index";
import { DownUrlFunCode } from "@/config/publicFunction";
import Cookies from "js-cookie";
import QRCode from "@/components/qrcodejs/qrcodejs";
export default {
  name: "",
  data() {
    return {
      dataList: [],
      loading: false,
      cateShow: false,
      show: false,
      AppNoMy: Cookies.get("AppNo"),
      integralUrlGood: integralUrlGood,
      currentIndexCode: "",
      current_index: "",
      current_SID: ""
    };
  },
  components: { ModifyCate, QRCode, Del },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        this.loading = true;
        let { Data } = await getLists(
          { Action: "GetProdInfoList" },
          "MIntegralOpera"
        );
        this.loading = false;
        this.dataList = Data.ProdInfoList || [];

        this.dataList.forEach(D => {
          D.codeUrl =
            this.integralUrlGood + D.SID + "?AppNo=" + this.AppNoMy+'&isIntegral=true';

          this.$set(D, "State", D.State === "0" ? true : false);
        });
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    async changeEnable(bool, row) {
      // 是否启用 bool = true 为下架
      let State = bool === true ? 0 : 1;
      try {
        let data = await getLists(
          { Action: "SetProdState", SID: row.SID, State: State },
          "MIntegralOpera"
        );
        this.$message.success(data.Message);
      } catch (e) {
        setTimeout(() => {
          row.State = !row.State;
        }, 500);
        this.$message.error(e);
      }
    },
    copyUrl(val) {
      let index = $(".el-popover").length - 1;
      let input = $($(".el-popover")[index]).find("input");
      // // 复制输入框的地址
      input.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
      val.visibleUrl = false;
    },
    editRowGoods(row) {
      this.$router.push({
        path: "/weChat/manager/integral/goodAdd",
        query: { SID: row.SID }
      });
    },
    // viewEvaluate() {},
    delRow(row,index) {
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
    addGood() {
      this.$router.push({
        path: "/weChat/manager/integral/goodAdd"
      });
    },
    delFunction(bool) {
      this.show = bool;
    },
    async confirmEnd() {
      try {
        await getLists(
          { Action: "RemoveProdInfo", SID: this.current_SID },
          "MIntegralOpera"
        );
        this.dataList.splice(this.current_index, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.integralGoods {
  .goodsInfo {
    width: 120px;
    height: 120px;
    border: 1px solid #eee;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .goodInfoRight {
    margin: 12px 0 0 20px;
    line-height: 32px;
  }
}
</style>