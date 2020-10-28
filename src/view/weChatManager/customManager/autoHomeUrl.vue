<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="Name" label="网址名称" width="300">
      </el-table-column>
      <el-table-column prop="url" label="网址链接" >
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-popover placement="left" v-model="scope.row.visibleUrl">
            <el-input v-model="scope.row.url" readonly placeholder="商品链接" style="width:500px">
              <el-button slot="append" @click="copyUrl(scope.row)">复制</el-button>
            </el-input>
            <el-button type="text" slot="reference" style="margin-right:10px;">链接</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
let url = window.location.protocol + '//' + window.location.host + "/WeixinNew/Dist/index.html#/";
export default {
  name: "autoHomeUrl",
  data() {
    return {
      copyData: null,
      tableData: [
        {
          Name: "商城首页",
          url: url,
        },
        {
          Name: "商品列表",
          url: url + "pages/shoppingMall/list/goodsList",
        },
        {
          Name: "积分商城",
          url: url + "pages/integralMall/index",
        },
        {
          Name: "秒杀活动",
          url: url + "pages/shoppingMall/seckill/index",
        },
        {
          Name: "拼团活动",
          url: url + "pages/shoppingMall/makeGroup/makeGroup",
        },
        {
          Name: "购物车",
          url: url + "pages/shoppingMall/shoppingCart/index",
        },
        {
          Name: "我的粉丝",
          url: url + "pages/vip/myFan",
        },
        {
          Name: "个人中心",
          url: url + "pages/home",
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
    };
  },
  methods: {
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