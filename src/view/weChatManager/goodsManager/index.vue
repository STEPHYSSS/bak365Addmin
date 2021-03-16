<template>
  <div class="goodManager">
    <!-- 商品列表 -->
    <el-row class="showStopGood" v-if="currentGoods">
      <el-col style="line-height: 50px;">
        <el-button type="primary" size="small" @click="clickTest">下载商品信息</el-button>
        <el-button type="primary" size="small" @click="addGood">添加商品</el-button>
        <el-button type="primary" size="small" @click="AddTiket">添加电子券</el-button>
        <el-button size="small" type="primary" style="margin-left:10px;margin-top:10px" @click="modifyCateFun">添加/修改 类别</el-button>
      </el-col>
    </el-row>
    <el-row v-if="currentGoods" class="showStopGood">
      <el-col :span="4">
        名称：<el-input v-model="search.Name" clearable @clear="clearName" placeholder="请输入商品名称" class="widthW"></el-input>
      </el-col>
      <el-col :span="4">
        编号：<el-input v-model="search.ProdNo" clearable @clear="clearName" placeholder="请输入商品编号" class="widthW"></el-input>
      </el-col>
      <el-col :span="4">
        类别：<goodType style="display: inline-block" @changeGoodType="changeGoodType" :multiple="false" placeholderProp="请选择商品类别" class="widthW"></goodType>
      </el-col>
      <el-col :span="4">
         类型：<el-select v-model="search.ProdType" placeholder="请选择商品类型" class="widthW">
                  <el-option v-for="item in ProdTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
      </el-col>
      <el-col :span="4">
         规格：<el-select v-model="search.SpecType" placeholder="请选择商品规格" class="widthW">
                <el-option v-for="item in SpecTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
      </el-col>
      <el-col :span="4">
        <el-button  @click="searchName">查询</el-button>
      </el-col>
    </el-row>
    <!-- <el-button @click="batch" :disabled="multipleSelection.length=='0'" class="marbtn">批量上架</el-button> -->
     <!-- tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange" -->
    <el-table :data="data" v-loading="loading" style="width: 100%;">
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="商品名称" width="260" align="center">
        <template slot-scope="scoped">
          <el-row>
            <el-col :span="12" class="goodsInfo">
              <img :src="scoped.row.ImgList.length>0?scoped.row.ImgList[0]:''" alt />
            </el-col>
            <el-col :span="12" class="goodInfoRight">
              <div>{{currentGoods?scoped.row.Name:scoped.row.Name}}</div>
              <div style="color:red;margin-top:10px">
                <span>¥{{scoped.row.SalePrice}}</span>
                <span v-if="currentGoods">{{scoped.row.ProdType | typeTip}}</span>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="SpecType" label="规格类型" align="center">
        <template slot-scope="scoped">{{scoped.row.SpecType|SpecType}}</template>
      </el-table-column>
      <el-table-column prop="ProdNo" label="商品编号" align="center"></el-table-column>
      <el-table-column label="库存类型" align="center">
        <template slot-scope="scoped">
          <span v-if="scoped.row.StockType==='1'">商城库存（{{scoped.row.StoreQty }}）</span>
          <span v-else-if="scoped.row.StockType==='2'">门店库存</span>
          <span v-else>不限</span>
        </template>
      </el-table-column>
      <el-table-column label="商品排序" align="center" width="100">
        <template slot-scope="scoped">
          <el-input v-model="scoped.row.Sort" @blur="sort(scoped.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="下架" align="center">
        <template slot-scope="scoped">
          <el-switch v-model="scoped.row.State" active-text="上架" inactive-text="下架" :disabled="isDisabled" @change="changeEnable($event,scoped.row)"></el-switch>         
        </template>
      </el-table-column>
      <el-table-column width="300" label="操作" align="center">
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
              <a class="smallRoutineUpDown" @click="upDownUrl(scoped.row.Name)">扫码预览</a>
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
    <div class="block" v-if="TotalList">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="TotalList">
      </el-pagination>
    </div>
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
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
      defaultImg: 'this.src="' + require("../../../assets/img/logo.png") + '"',
      loading: true,
      isDisabled:false,
      search: {
        // 显示停用商品 返回true 和false
        Status: "",
        // 分类
        CateSID: "",
        Name: "",
        ProdNo:"",
        ProdType:"",
        SpecType:""
      },
      Sort:'',
      // 控制删除弹框
      show: false,
      // 商品类别修改
      cateShow: false,
      // 点击当前行的index
      current_index: "",
      current_SID: "",
      
      data: [],
      multipleSelection:[],//多选
      splitSID:'',//多选id
      State:'',
      ProdTypeList: [
        {
          value: '0',
          label: '商品'
        },{
          value: '1',
          label: '电子券'
        }
      ],//商品类型
      SpecTypeList: [
        {
          value: '1',
          label: '单规格'
        },{
          value: '2',
          label: '多规格'
        }
      ],//商品规格
      phoneUrlGood: PhoneUrlGood,
      AppNoMy: Cookies.get("AppNo"),
      newWidth: "100",
      code:
        "http://dingtalk.bak365.cn/WeixinNew/Dist/#/shoppingMall/goodsPage/5718436288937326446?AppNo=1",
      currentIndexCode: "",    
      
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
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(typeof(val))
        this.currentPage = val;
        this.getList(val);
      },
    clicCode(index) {
      this.currentIndexCode = index;
    },
    changeGoodType(arr) {//商品列表搜索
      // 商品列席id
      this.search.CateSID = arr;
      this.getList();
    },
    clearName(){
      this.getList();
    },
    async getList() {
      this.loading = true;
      try {
        let data = await getLists(
          {
            Action: "GetProdInfoList",
            Status:this.search.Status,
            CateSID:this.search.CateSID,
            Name:this.search.Name,
            ProdNo:this.search.ProdNo,
            ProdType:this.search.ProdType,
            SpecType:this.search.SpecType,
            Page: this.currentPage - 1           
          }, "MProdOpera")
        this.data = data.Data.Prod_InfoList;
        let setImg = this.currentGoods ? "Img" : "ImgList";
        this.TotalList = data.Data.DataCount;
        this.pageSize = data.Data.PageSize;
        this.data.forEach(D => {
          D.ImgList = D[setImg] ? D[setImg].split(",") : [];
          D.ImgList.forEach((data, index) => {
            D.ImgList[index] = process.env.Prefix + data;
          });
          this.$set(D, "State", D.State === "1" ? true : false);
        });
        let query={ SID:""}
        this.data.forEach(D => {
          query.SID = D.SID;
          D.codeUrl = this.phoneUrlGood+"?query="+encodeURIComponent(JSON.stringify(query))
        });
        this.loading = false;
      } catch (e) {
        this.$message.error(e)
        this.loading = false;
      }
    },
    sort(val){
      try {
        let data = getLists(
          {
            Action: "SetProdSort",
            Sort:val.Sort,
            SID:val.SID
          }, "MProdOpera")
        console.log(data,'888')
        this.$message.success(data.Message);
      } catch (e) {
        this.$message.error(e)
      }
    },
    async changeEnable(bool, row) {
      this.isDisabled = true;
				setTimeout(() => {
				  this.isDisabled = false;
				}, 1000)
      // 是否启用 bool = true 为下架 SetProdState上/下架
      let State = bool === true ? 1 : 0;
      try {
        let httpApi = this.currentGoods ? "SetProdState" : "SetSaleState";
        let Opera = "MProdOpera";
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
    // async batch(){//批量上架
    //   this.multipleSelection.forEach((item,index)=>{
    //     // splitSID
    //     this.splitSID+=item.SID+','
    //     this.State = item.State
    //   })
    //   let SID = this.splitSID.substr(0,this.splitSID.length-1)
    //   let State = '';
    //   console.log(this.splitSID,State)
    //   if(this.State == '1'){
    //     State = '0'
    //   }else if(this.State == '0'){
    //     State = '1'
    //   }
    //   try {
    //     let data = await getLists(
    //       {
    //         Action: "SetProdState",
    //         State:State,
    //         SID:SID
    //       }, "MProdOpera")
    //       console.log(data,'kandaying')
    //     this.$message.success(data.Message);
    //     setTimeout(() => {
    //       this.getList()
    //     }, 500);
    //   } catch (e) {
    //     this.$message.error(e)
    //   }
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;      
    //   console.log(this.multipleSelection,'66666')
    // },
    searchName() {// 名称搜索
      // this.page.current_page = 1;
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
      // 编辑 0普通商品 1电子券
        if(row.ProdType == '0'){
          this.$router.push({
            path: "/weChat/manager/goodEdit",
            query: { SID: row.SID }
          });
        }else{
          this.$router.push({
            path: "/weChat/manager/addTiket",
            query: { SID: row.SID }
          });
        }
    },
    viewEvaluate(row) {
      this.$router.push({
        path: "/weChat/manager/userEvaluate",
        query: { SID: row.SID }
      });
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
        // let Opera = this.currentGoods ? "MProdOpera" : "MTicketOpera";
        let Opera = "MProdOpera"
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
      this.$router.push({ path: "/weChat/manager/goodAdd" });
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
  filters:{
    typeTip(val){
      if(val == 0){
        return '普通商品'
      }else{
        return '电子券'
      }
    },
    SpecType(val){
      if(val == '0'){
        return '电子券'
      }else if(val == '1'){
        return '单规格'
      }else{
        return '多规格'
      }
    },
    StockType(val){
      if(val == '1'){
         return '商城库存'
      }else if(val == '2'){
        return '门店库存'
      }else{
        return '无限'
      }
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
.marbtn{
  margin-bottom: 20px;
}
.container-fluid {
  min-width: 1035px;
}
.block{
  background: #fff;
  text-align: right;
  height: 50px;
  box-sizing: border-box;
  padding: 10px;
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
  .widthW{
    width: 170px;
  }
}
</style>
