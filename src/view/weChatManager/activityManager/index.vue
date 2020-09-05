<template>
  <div class="activeGoods">
    <!-- 秒杀活动 活动商品列表 -->
    <div style="margin-bottom:20px">
      <el-button type="primary" size="small" @click="addGood">添加活动商品</el-button>
    </div>
    <!-- <el-tabs v-model="activeType" @tab-click="handleClick" type="card" style="margin-top:20px">
      <el-tab-pane label="秒杀活动" name="1"></el-tab-pane>
    </el-tabs> -->
    <activeGoodsList :activeTypeShow = "activeTypeShow"></activeGoodsList>
  </div>
</template>

<script>
import activeGoodsList from "@/components/Dialog/activeGoodsList";
export default {
  name: "",
  data() {
    return {
      activeTypeShow:'1',//用来判断活动类型
    };
  },
  components: { activeGoodsList },
  methods:{
    addGood() {
      this.$router.push({path: "/weChat/manager/activity/goodAdd"});
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