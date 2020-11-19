<template>
  <div class="activeGoods">
    <!--拼团 活动商品列表 -->
    <div style="margin-bottom:20px">
      <el-button type="primary" size="small" @click="addGood">添加活动商品</el-button>
    </div>
    <activeGoodsList :activeTypeShow = "activeTypeShow"></activeGoodsList>
  </div>
</template>

<script>
import activeGoodsList from "@/components/Dialog/activeGoodsList";
export default {
  name: "",
  data() {
    return {
      activeTypeShow:'5',//用来判断活动类型
    };
  },
  components: { activeGoodsList },
  methods:{
    addGood() {
      this.$router.push({path: "/weChat/manager/activity/groupGoodAdd"});
    }
  }
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