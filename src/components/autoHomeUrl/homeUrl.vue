<template>
  <div>
    <el-dialog title="选择商品" class="goodsSelect" :visible.sync="dialogVisible" width="900px">
      <el-table :data="tableData" style="width: 100%;height:500px;overflow-y: scroll;">
        <el-table-column prop="Name" label="网址名称" align="center" width="200">
        </el-table-column>
        <el-table-column prop="url" label="网址链接" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scoped">
            <!-- <el-popover placement="left" v-model="scope.row.visibleUrl">
              <el-input
                v-model="scope.row.url"
                readonly
                placeholder="商品链接"
                style="width: 500px"
              >
                <el-button slot="append" @click="copyUrl(scope.row)"
                  >复制</el-button
                >
              </el-input>
            </el-popover> -->
              <el-button type="text" slot="reference" style="margin-right: 10px" @click="useUrl(scoped.row)">使 用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
let url = window.location.host + "/WeixinNew/Dist/index.html#/";
import { GetAppNo } from "@/config/publicFunction";
export default {
  name: "autoHomeUrl",
  data() {
    return {
      copyData: null,
      dialogVisible: false,
      tableData: [
        {
          Name: "商城首页",
          url: url + "index.html",
        },
        {
          Name: "商品列表",
          url: url + "pages/shoppingMall/list/goodsList",
        },
        // {
        //   Name: "积分商城",
        //   url: url + "pages/integralMall/index",
        // },
        {
          Name: "秒杀活动",
          url: url + "pages/shoppingMall/seckill/index",
        },
        // {
        //   Name: "拼团活动",
        //   url: url + "pages/shoppingMall/makeGroup/makeGroup",
        // },
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
        },{//pages/packages/index 权益入口
          Name:"权益列表",
          url:url+"pages/packages/index"
        },
        {
          Name: "绑定实体会员卡",
          // url: url + "pages/vip/bind/index",
          url:'http://manage.bak365.cn/WebApp/WXCard/?Type=ApplyCard&AppNo='+GetAppNo()
        },
        {
          Name: "申请会员卡",
          // url: url + "pages/vip/bind/index",
          url:'http://manage.bak365.cn/WebApp/WXCard/?Type=ApplyCard&AppNo='+GetAppNo()
        },
        {
          Name: "地址管理",
          url: url + "pages/myAddress/myAddress",
        },
      ],
    };
  },
  props:{
    showUrl:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    useUrl(row){
      this.$emit('sureUrl',row);
    },
    copyUrl(val) {
      let index = $(".el-popover").length - 1;
      let input = $($(".el-popover")[index]).find("input");
      input.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
    },
  },
  watch:{
    showUrl(val) {
      this.dialogVisible = val;
    },
    dialogVisible(bool){
      this.$emit('closeUrl', bool);
    },
  }
};
</script>
<style lang="less" scoped>
</style>