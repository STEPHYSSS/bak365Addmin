<template>
  <div class>
    <!-- 选择链接，自定义链接, -->
    <div style="display: flex; align-items: center">
      <div
        v-if="currentItemObj.name"
        style="
          border: 1px solid rgba(51, 136, 255, 0.3);
          background: rgb(226, 243, 255);
          color: rgb(102, 102, 102);
        "
        class="zent-tag"
      >
        <div class="zent-tag-content" v-if="currentItemObj.id !== 1">
          {{ currentItemObj.name }}
        </div>

        <el-input
          v-if="currentItemObj.id === 1"
          v-model="currentItemObj.url"
          placeholder="请输入链接"
          @change="changeInput"
        ></el-input>

        <i
          class="el-icon-close zent-tag-close-btn"
          @click="clickDropdownDel"
        ></i>
      </div>
      <el-dropdown @command="clickDropdown" style="float: right;">
        <a class="el-dropdown-link">
          <span v-if="!currentItemObj.name">选择跳转到的页面</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item" v-for="(item,index) in list" :key="index">{{item.name}}  {{item.url}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
     
      <!-- <el-dialog title="选择链接" :visible.sync="dialogVisible" width="800px"  :modal="false">
        <el-table :data="list" style="width: 100%" ref="singleTable" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column prop="name" label="网址名称" align="center" width="300">
          </el-table-column>
          <el-table-column prop="url" label="网址链接" align="center">
          </el-table-column>
        </el-table>
      </el-dialog> -->
   </div>
</template>

<script>
let url = window.location.protocol + '//' + window.location.host + "/WeixinNew/Dist/index.html#/";
export default {
  name: "",
  props: {
    currentItem: {
      type: Object,
      default() {
        return {
          name: "",
          url: "",
        };
      },
    },
  },
  data() {
    return {
      currentItemObj: this.currentItem,
      dialogVisible:false,
      currentRow:"",
      //链接列表
      list: [
        // { url: "", name: "自定义链接", id: 1 },
        {
          name: "商城首页",
          url: url,
        },
        {
          name: "商品列表-自定义",
          url: url + "pages/shoppingMall/list/goodsList",
        },
        {
          Name:'商品列表-点餐',
          url:url+"pages/shoppingMall/menu_naixue/menu/menu"
        },
        {
          name: "积分商城",
          url: url + "pages/integralMall/index",
        },
        {
          name: "秒杀活动",
          url: url + "pages/shoppingMall/seckill/index",
        },
        {
          name: "拼团活动",
          url: url + "pages/shoppingMall/makeGroup/makeGroup",
        },
        {
          name: "购物车",
          url: url + "pages/shoppingMall/shoppingCart/index",
        },
        {
          name: "我的粉丝",
          url: url + "pages/vip/myFan",
        },
        {
          name: "个人中心",
          url: url + "pages/home",
        },
        {
          name: "申请团长",
          url: url + "pages/vip/applyLeader",
        },
        {
          name: "付款码",
          url: url + "pages/vip/payCode",
        },
        {
          name: "微卡充值",
          url: url + "pages/vip/weiFull",
        },
        {
          name: "订单列表",
          url: url + "pages/vip/allMyOrder",
        },
        {
          name: "绑定实体会员卡",
          url: url + "pages/vip/bind/index",
        },
        {
          name: "申请会员卡",
          url: url + "pages/vip/bind/index",
        },
        {
          name: "地址管理",
          url: url + "pages/myAddress/myAddress",
        },
      ],
    };
  },
  components: {},
  mounted() {
    this.currentItemObj = this.currentItem;
    console.log(this.currentItemObj,'currentItemObj')
  },
  computed: {
    //     currentI(val) {
    //       return this.currentItem;
    //     }
  },
  methods: {
    handleCurrentChange(val){
      this.currentRow = val;
      this.dialogVisible = false;
    },
    showDal() {
      this.dialogVisible = true;
    },
    clickDropdown(val) {
      this.currentItemObj = val;
      this.$emit("clickDropdown", val);
    },
    clickDropdownDel() {
          // 清空
      // this.currentItemObj.url = "";
      
      this.currentItemObj = {};
      this.$emit("clickDropdown", {});
    },
    changeInput(val) {
      this.currentItemObj.url = val
      this.$emit("clickDropdown", this.currentItemObj);
    },
  },
  watch: {
    currentItem() {
      this.currentItemObj = this.currentItem;
    },
  },
};
</script>

<style lang="less" scoped>
.zent-tag-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin-right: 0.417em;
}
.zent-tag-close-btn {
  cursor: pointer;
  cursor: pointer;
  margin: 3px;
  display: inline-block;
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  font-variant: normal;
  text-rendering: auto;
  text-decoration: inherit;
  line-height: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.zent-tag {
  display: flex;
  margin-right: 5px;
  -webkit-box-pack: justify;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  font-size: 12px;
  color: #fff;
  padding: 0.084em 0.417em;
  border-radius: 0.167em;
}
.zent-tag-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin-right: 0.417em;
}
.zent-tag-close-btn {
  cursor: pointer;
  cursor: pointer;
  margin: 3px;
  display: inline-block;
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  font-variant: normal;
  text-rendering: auto;
  text-decoration: inherit;
  line-height: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>