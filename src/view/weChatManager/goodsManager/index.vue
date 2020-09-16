<template>
  <div class="goodManager">
    <!-- 商品列表 -->
    <el-row class="showStopGood" v-if="currentGoods">
      <el-col :span="11" style="line-height: 50px;">
        <el-button type="primary" size="small" @click="clickTest">下载商品信息</el-button>
        <el-button type="primary" size="small" @click="addGood">添加商品</el-button>
        <el-button type="primary" size="small" @click="AddTiket">添加电子券</el-button>
        <!-- <el-checkbox v-model="search.Status" style="margin-left:15px">显示停用商品</el-checkbox> -->
        <!--        <span>当前共上传{{this.data.length}}个商品</span>-->
      </el-col>
      <el-col :span="13">
        
        <div style="float: right">
          类别：
          <goodType
            style="display: inline-block"
            @changeGoodType="changeGoodType"
            :multiple="false"
            placeholderProp="请选择类别"
          ></goodType>
          <el-input
            v-model="search.Name"
            placeholder="搜索"
            style="width: auto"
            @keyup.enter.native="searchName"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
            <!--            suffix-icon="el-icon-search"-->
          </el-input>
          <el-button
            size="small"
            type="primary"
            style="margin-left:10px;margin-top:10px"
            @click="modifyCateFun"
          >添加/修改 类别</el-button>
        </div>
      </el-col>
    </el-row>
    <el-button
      v-if="!currentGoods"
      type="primary"
      size="small"
      @click="addGood"
      class="marginBottom"
      :disabled="loading"
    >添加优惠券</el-button>

    <el-table :data="data" v-loading="loading" style="width: 100%;margin-bottom:25px">
      <el-table-column label="商品名称" width="300">
        <template slot-scope="scoped">
          <el-row>
            <el-col :span="12" class="goodsInfo">
              <img :src="scoped.row.ImgList.length>0?scoped.row.ImgList[0]:''" alt />
            </el-col>
            <el-col :span="12" class="goodInfoRight">
              <!--              <div>{{scoped.row.SID}}</div>-->
              <div>{{currentGoods?scoped.row.Name:scoped.row.Name}}</div>
              <div style="color:red;margin-top:10px">¥{{scoped.row.SalePrice}}</div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="ProdNo" label="商品编号"></el-table-column>
      <!--      <el-table-column-->
      <!--        label="商品类型">-->
      <!--        <template slot-scope="scoped">-->
      <!--          <span v-if="scoped.row.Type">{{scoped.row.TypeName}}</span>-->
      <!--          <span v-else>&#45;&#45;</span>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="库存">
        <template slot-scope="scoped">
          <span v-if="scoped.row.StoreQty>0">{{scoped.row.StoreQty}}</span>
          <span v-else>不限</span>
        </template>
      </el-table-column>
      <el-table-column label="下架">
        <template slot-scope="scoped">
          <el-checkbox v-model="scoped.row.State" @change="changeEnable($event,scoped.row)"></el-checkbox>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="StoreQty"-->
      <!--        label="商品类别">-->
      <!--      </el-table-column>-->
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
          <el-button type="text" @click="viewEvaluate(scoped.row)">查看评价</el-button>
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
    <!-- <QRCode :newWidth="newWidth" :newText="code"></QRCode> -->

    <!--    <Pagination :page="page" @change_page="get_list" style="float: right;margin-top:30px"></Pagination>-->
    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>
    <ModifyCate :cateShow="cateShow" @cateFunction="cateFunction"></ModifyCate>
  </div>
</template>

<script>
import goodType from "@/components/selector/goodType";
import Pagination from "@/components/pagination/index";
import Del from "@/components/Dialog/del";
import ModifyCate from "@/components/Dialog/modifyCate";
import CodeImg from "@/components/download/codeImg";
import { DownUrlFunCode } from "@/config/publicFunction";
import { getLists } from "@/api/vipCard";
import { PhoneUrlGood } from "@/config/index";
import Cookies from "js-cookie";
import QRCode from "@/components/qrcodejs/qrcodejs";

export default {
  components: { Pagination, Del, ModifyCate, CodeImg, goodType, QRCode },
  data() {
    return {
      defaultImg: 'this.src="' + require("../../../assets/img/logo.png") + '"',
      loading: true,
      search: {
        // 显示停用商品 返回true 和false
        Status: "",
        // 分类
        CateNo: "",
        Name: ""
      },
      // 控制删除弹框
      show: false,
      // 商品类别修改
      cateShow: false,
      // 点击当前行的index
      current_index: "",
      current_SID: "",
      page: { total: 100, current_page: 1 },
      data: [],
      // 商品类别
      potionList: [],
      phoneUrlGood: PhoneUrlGood,
      AppNoMy: Cookies.get("AppNo"),
      newWidth: "100",
      code:
        "http://dingtalk.bak365.cn/WeixinNew/Dist/#/shoppingMall/goodsPage/5718436288937326446?AppNo=1",
      currentIndexCode: ""
    };
  },
  async created() {
    // console.log(this.$route, 7888)
    // this.$store.dispatch('setControlNavClick', true)
    // setTimeout(() => {
    //   this.$store.dispatch('setControlNavClick', false)
    // }, 10)
    await this.getList();
  },
  computed: {
    //是商品列表  否则是优惠券列表
    currentGoods() {
      return this.$route.path === "/weChat/manager/goodSetting";
    }
  },
  methods: {
    clicCode(index) {
      this.currentIndexCode = index;
    },
    changeGoodType(arr) {
      // 商品列席id
      this.search.CateSID = arr;
      this.getList();
    },
    async getList() {
      this.loading = true;
      try {
        let obj = {};
        Object.assign(obj, { Page: this.page.current_page });
        Object.assign(obj, this.search);
        let api = this.currentGoods ? "GetProdInfoList" : "GetTicketList";
        let Opera = this.currentGoods ? "MProdOpera" : "MTicketOpera";
        Object.assign(obj, { Action: api });
        let data = await getLists(obj, Opera);

        this.data = this.currentGoods
          ? data.Data.Prod_InfoList
          : data.Data.TicketList;
        let setImg = this.currentGoods ? "Img" : "ImgList";
        this.data.forEach(D => {
          D.ImgList = D[setImg] ? D[setImg].split(",") : [];
          D.ImgList.forEach((data, index) => {
            D.ImgList[index] = process.env.Prefix + data;
          });
          this.$set(D, "State", D.State === "0" ? true : false);
        });
        // console.log(this.data, 777);
        this.data.forEach(D => {
          D.codeUrl = this.phoneUrlGood + D.SID + "?AppNo=" + this.AppNoMy;
        });
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    async changeEnable(bool, row) {
      // 是否启用 bool = true 为下架
      let State = bool === true ? 0 : 1;
      try {
        let httpApi = this.currentGoods ? "SetProdState" : "SetSaleState";
        let Opera = this.currentGoods ? "MProdOpera" : "MTicketOpera";
        let data = await getLists(
          { Action: httpApi, SID: row.SID, State: State },
          Opera
        );
        this.$message.success(data.Message);
      } catch (e) {
        setTimeout(() => {
          row.State = !row.State;
        }, 500);
        this.$message.error(e);
      }
    },
    searchName() {// 名称搜索
      this.page.current_page = 1;
      this.getList();
    },
    upDownUrl(Name) {
      DownUrlFunCode(Name);
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
      // 编辑
      // 商品编号
      if (this.currentGoods) {
        this.$router.push({
          path: "/weChat/manager/goodEdit",
          query: { SID: row.SID }
        });
      } else {
        this.$router.push({
          path: "/weChat/manager/couponEdit",
          query: { SID: row.SID }
        });
      }
    },
    viewEvaluate(row) {
      this.$router.push({
        path: "/weChat/manager/userEvaluate",
        query: { SID: row.SID }
      });
      // let routeData = this.$router.resolve({path: '/weChat/manager/userEvaluate', query: {SID: row.SID}})
      // window.open(routeData.href, '_blank');
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
        let api = this.currentGoods ? "RemoveProdInfo" : "RemoveTicket";
        let Opera = this.currentGoods ? "MProdOpera" : "MTicketOpera";
        await getLists({ Action: api, SID: this.current_SID }, Opera);
        this.data.splice(this.current_index, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    cateFunction(bool) {
      this.cateShow = bool;
    },
    get_list(page) {// 切换page
      this.page.current_page = page;
      this.getList();
    },
    addGood() {//添加商品按钮和添加优惠券按钮
      if (this.currentGoods) {
        this.$router.push({ path: "/weChat/manager/goodAdd" });
      } else {
        this.$router.push({ path: "/weChat/manager/couponAdd" });
      }
    },
    addCoupon() {// 添加优惠券
      this.$router.push("/weChat/manager/couponAdd");
    },
    modifyCateFun() {
      this.cateShow = true;
    },
    clickTest() {
      // this.getList();
    },
    AddTiket(){//添加电子券
      this.$router.push("/weChat/manager/addTiket");
    }

  },
  mounted() {},
  watch: {
    $route() {
      this.getList();
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/index.less";

.container-fluid {
  min-width: 1035px;
}

.goodManager {
  .marginBottom {
    margin-bottom: 20px;
  }
  .showStopGood {
    margin-bottom: 20px;
  }

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
}
</style>
