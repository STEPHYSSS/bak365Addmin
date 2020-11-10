<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Name" label="网址名称" width="300">
      </el-table-column>
      <el-table-column label="网址链接">
        <template slot-scope="scoped">
          <span v-if="scoped.row.id" @click="showCate">
            {{scoped.row.url}}
          </span>
          <span v-else>{{scoped.row.url}}</span>          
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="text" slot="reference" style="margin-right:10px;" v-if="scope.row.id" @click="showCate">商品类别</el-button> 
          <el-popover placement="left" v-model="scope.row.visibleUrl">
            <el-input v-model="scope.row.url" readonly placeholder="商品链接" style="width:500px">
              <el-button slot="append" @click="copyUrl(scope.row)">复制</el-button>
            </el-input>            
            <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="商品类别" :visible.sync="dialogTableVisible">
      <el-table :data="CateData">
        <el-table-column property="Name" label="网址名称"></el-table-column>
        <el-table-column label="网址链接">
          <template slot-scope="scoped">
            <el-input v-model="scoped.row.codeUrl" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" v-model="scope.row.visibleUrl">
              <el-input v-model="scope.row.codeUrl" readonly placeholder="商品链接" style="width:500px">
                <el-button slot="append" @click="copyUrl(scope.row)">复制</el-button>
              </el-input>
              <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
// let url = window.location.protocol + '//' + window.location.host + "/WeixinNew/Dist/index.html#/";
let url = "http://dingtalk.bak365.cn/WeixinNew/Dist/index.html#/"
export default {
  name: "autoHomeUrl",
  data() {
    return {
      copyData: null,
      // cateUrl:window.location.protocol + '//' + window.location.host + "/WeixinNew/Dist/index.html#/",
      cateUrl:"http://dingtalk.bak365.cn/WeixinNew/Dist/index.html#/",
      tableData: [
        {
          Name: "商城首页",
          url: url,
        },
        {
          Name: "商品列表-自定义",
          url: url + "pages/shoppingMall/list/goodsList",
          id:'1'
        },
        {
          Name:'商品列表-点餐',
          url:url+"pages/shoppingMall/menu_naixue/menu/menu",
          // id:'2'
        },
        {
          Name: "积分商城",
          url: url + "pages/integralMall/index",
        },
        // {
        //   Name: "秒杀活动",
        //   url: url + "pages/shoppingMall/seckill/index",
        // },
        // {
        //   Name: "拼团活动",
        //   url: url + "pages/shoppingMall/makeGroup/makeGroup",
        // },
        {
          Name: "购物车",
          url: url + "pages/shoppingMall/shoppingCart/index",
        },
        {
          Name: "个人中心",
          url: url + "pages/home",
        },
        {
          Name: "我的粉丝",
          url: url + "pages/vip/myFans",
        },
        {
          Name:"我的足迹",
          url:url+"pages/vip/FootPrint"
        },
        {
          Name: "申请团长",
          url: url + "pages/vip/applyLeader",
        },
        {
          Name: "付款码",
          url: url + "pages/vip/payCode",
        },
        {
          Name: "微卡充值",
          url: url + "pages/vip/weiFull",
        },
        {
          Name: "订单列表",
          url: url + "pages/vip/allMyOrder",
        },
        {
          Name: "绑定实体会员卡",
          url: url + "pages/vip/bind/index",
        },
        {
          Name: "申请会员卡",
          url: url + "pages/vip/bind/index",
        },
        {
          Name: "地址管理",
          url: url + "pages/myAddress/myAddress",
        },
      ],
      CateData:[],
      dialogTableVisible:false
    };
  },
  mounted(){
    this.getCateList();
  },
  methods: {
    async getCateList() {//获取分类列表
      try {
        let { Data } = await getLists({ Action: "GetCateList" }, "MProdOpera");
        this.CateData = Data.ProdCateList || [];
        let query={ SID:""};
        this.CateData.forEach(item=>{
          query.SID = item.SID;
          item.codeUrl = this.cateUrl+ "pages/shoppingMall/list/goodsList"+"?query="+encodeURIComponent(JSON.stringify(query))
        })
      } catch (e) {
        this.$message.error(e)
      }
    },
    showCate(){
      this.dialogTableVisible = true;
    },
    copyUrl(val) {
     let index = $(".el-popover").length - 1;
      let input = $($(".el-popover")[index]).find("input");
      input.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
    },
  },
};
</script>
<style lang="less" scoped>
</style>