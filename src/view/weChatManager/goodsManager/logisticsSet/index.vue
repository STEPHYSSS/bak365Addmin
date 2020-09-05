<template>
  <div class="province_style">
    <!-- 运费设置 -->
    <el-tabs v-model="freightType" @tab-click="tabClick">
      <el-tab-pane label="外卖运费" name="1"></el-tab-pane>
      <!-- <el-tab-pane label="外卖范围" name="3"></el-tab-pane> -->
      <el-tab-pane label="物流管理" name="2"></el-tab-pane>
    </el-tabs>
    <div v-loading="loading">
      <div class="defaultLog" v-if="freightType==='2'">
        <div>
          默认运费&nbsp;&nbsp;
          <el-input-number v-model="DefFreight" :min="0" label="描述文字"></el-input-number>&nbsp;元
        </div>
      </div>

      <el-button
        v-if="freightType==='1'"
        style="margin:10px 0;"
        type="primary"
        @click="addProvince"
      >新增运费规则</el-button>
      <div class v-for="(item,index) in list" :key="index">
        <div class="province_fa" v-if="freightType==='2'">
          <span style="margin:0 10px">选择省：</span>
          <el-input
            readonly
            type="textarea"
            class="textarea-style"
            placeholder="请输入内容"
            v-model="item.Provinces"
            :autosize="{ minRows: 2, maxRows: 2}"
          ></el-input>

          <div style="margin:auto 40px auto 10px;border:1px solid #eee">
            <el-button
              type="primary"
              size="medium"
              @click="changeProvince(index,item.Provinces)"
            >...</el-button>
          </div>
          <div>
            运费：
            <el-input-number v-model="item.Freight" :min="0" label="运费"></el-input-number>&nbsp;元
          </div>
          <div>
            <el-button
              style="margin-left:40px"
              type="primary"
              @click="delProvince(index)"
              size="small"
            >删 除</el-button>
          </div>
        </div>
        <div v-if="freightType==='1'">
          <span style="margin:0 10px">运费规则{{index+1}}：</span>
          <div class="province_fa">
            <div>
              <el-input-number v-model="item.StartingKM" controls-position="right" :min="0"></el-input-number>公里以内
              <el-input-number v-model="item.StartingPrice" controls-position="right" :min="0"></el-input-number>元， 超出起送公里后每
              <el-input-number v-model="item.BeyondKM" controls-position="right" :min="0"></el-input-number>公里加收
              <br />
              <el-input-number v-model="item.BeyondPrice" controls-position="right" :min="0"></el-input-number>元，
              运费上限
              <el-input-number v-model="item.UpPrice" controls-position="right" :min="0"></el-input-number>元， 超出
              <el-input-number v-model="item.NodeliveryKM" controls-position="right" :min="0"></el-input-number>公里不配送
            </div>
            <el-button
              style="margin-left:40px"
              type="primary"
              @click="delProvince(index)"
              size="small"
            >删 除</el-button>
            <el-checkbox
              style="margin-left:40px"
              v-model="item.Defaults"
              @change="changeDefault(item,index)"
            >设置为默认</el-checkbox>
          </div>
        </div>
      </div>
      <div v-if="freightType==='1'">
        <div class="lineBack"></div>
        <div style="margin:10px 10px">配送范围：</div>
        <areaMy v-if="!loading" @CheckTicketFun="CheckTicketFun" :rangeList="rangeList"></areaMy>
      </div>

      <div style="text-align:center;margin-top:20px">
        <el-button
          v-if="freightType==='2'"
          style="margin:0 20px;margin-top:100px"
          type="primary"
          @click="addProvince"
        >新 增</el-button>
        <el-button
          v-if="freightType==='2'"
          style="margin:20px"
          type="primary"
          @click="CheckTicketFun"
          :loading="loadingBtn"
        >提 交</el-button>
      </div>
    </div>

    <el-dialog
      title="选择省"
      width="600px"
      :before-close="beforeClose"
      :visible.sync="showCheckProvince"
    >
      <div class="showCheckProvince">
        <el-checkbox
          style="display:block"
          label="0"
          v-model="allCheckGroup"
          @change="checkboxGroupAll"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkClick" @change="checkboxGroup">
          <el-checkbox :label="item" v-for="item in provinceList" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <!-- <el-button @click="showCheckProvince = false">取 消</el-button> -->
        <el-button type="primary" @click="CheckProvince">确 定</el-button>
      </div>
    </el-dialog>

    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>
  </div>
</template>

<script>
import areaList from "@/config/area_json/area";
import { getLists } from "@/api/vipCard";
import Del from "@/components/Dialog/del";
import areaMy from "@/components/area_app";

export default {
  name: "",
  data() {
    return {
      provinceList: Object.values(areaList.province_list),
      list: [],
      showCheckProvince: false,
      checkClick: [],
      allCheckGroup: false,
      show: false,
      currentRow: "",
      currentIndex: "",
      loadingBtn: false,
      loading: true,
      // 默认运费
      DefFreight: 0,
      freightType: "1",
      takeOutList: [],
      logisticList: [],
      rangeList:[]
    };
  },
  components: { Del, areaMy },
  mounted() {
    this.getList();
  },
  methods: {
    changeProvince(index, str) {
      this.currentIndex = index;
      this.showCheckProvince = true;
      let arr = [];
      if (str) {
        arr = str instanceof Array ? str : str.split(",");
      }
      this.checkClick = arr;
    },
    beforeClose(done) {
      // 弹框关闭
      this.checkClick = [];
      this.allCheckGroup = false;
      done();
    },
    async getList() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          { Action: "GetRdcRuleList", Type: this.freightType },
          "MShopOpera"
        );
        Data.RdcRuleList.forEach(D => {
          D.Defaults = D.Defaults === "1" ? true : false;
        });
        this.rangeList = Data.RdcScope
        this.list = Data.RdcRuleList;
        if (this.freightType === "1") {
          //外卖
          this.takeOutList = Data.RdcRuleList;
        } else {
          //物流
          this.logisticList = Data.RdcRuleList;
        }
        this.DefFreight = Data.DefFreight || 0;
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    async CheckTicketFun(val) {
      let newList = [];
      let RdcScope = "";
      if (this.freightType === "2") {
        newList = this.list.filter(data => data.Provinces); //过滤省为空白的项
        let arr = [];
        newList.forEach((D, index) => {
          let newD = [];
          newD =
            D.Provinces instanceof Array ? D.Provinces : D.Provinces.split(",");
          arr = arr.concat(newD);
        });
        let newArr = [...new Set(arr)]; //去除重复后的数组
        if (newArr.length < arr.length) {
          this.$message("添加省重复");
          return;
        }
      } else {
        if (!this.list.some(D => D.Defaults)) {
          this.$message("请选择一个默认收费方式");
          return;
        }
        newList = JSON.parse(JSON.stringify(this.list));
        newList.forEach(D => {
          D.Defaults = D.Defaults === true ? "1" : "0";
        });
        
        if(val.length>0){
          RdcScope = JSON.stringify(val)
        }
      }

      let obj = {
        ProList: JSON.stringify(newList),
        Action: "SetRdcRule",
        RdcScope: RdcScope,
        DefFreight: this.DefFreight,
        Type: this.freightType
      };
      // console.log(obj,'obj')
      try {
        this.loadingBtn = true;
        await getLists(obj, "MShopOpera");
        this.$message.success("操作成功");
        this.loadingBtn = false;
      } catch (e) {
        this.$message.error(e);
        this.loadingBtn = false;
      }
    },
    addProvince() {
      if (this.freightType === "2") {
        this.list.push({ Provinces: "", Freight: "" });
      } else {
        this.list.push({
          StartingKM: "",
          StartingPrice: "",
          BeyondKM: "",
          BeyondPrice: "",
          UpPrice: "",
          NodeliveryKM: "",
          Defaults: false
        });
      }
    },
    delProvince(index) {
      this.show = true;
      this.currentIndex = index;
    },
    delFunction(bool) {
      this.show = bool;
    },
    CheckProvince() {
      let Provinces = this.checkClick.join(",");
      this.list[this.currentIndex].Provinces = Provinces;
      this.showCheckProvince = false;
      this.checkClick = [];
      this.allCheckGroup = false;
    },
    async confirmEnd() {
      if (!this.list[this.currentIndex].hasOwnProperty("SID")) {
        //省为空的时候，删除不走接口
        this.list.splice(this.currentIndex, 1);
        this.show = false;
        return;
      }
      try {
        await getLists(
          {
            Action: "RemoveRdcRule",
            SID: this.list[this.currentIndex].SID,
            Type: this.freightType
          },
          "MShopOpera"
        );
        this.$message.success("操作成功");
        this.show = false;
        this.list.splice(this.currentIndex, 1);
      } catch (e) {
        this.$message.error(e);
      }
    },
    checkboxGroupAll(val) {
      let arr = [];
      if (val) {
        arr = this.provinceList;
        // arr.push("0");
        this.checkClick = arr;
      } else {
        this.checkClick = [];
      }
    },
    checkboxGroup(val) {
      if (val.length < this.provinceList.length) {
        this.allCheckGroup = false;
      } else if (val.length === this.provinceList.length) {
        this.allCheckGroup = true;
      }
    },
    tabClick(val) {
      if (this.freightType === "1") {
        //外卖
        if (this.takeOutList.length > 0) {
          this.list = this.takeOutList;
          return;
        }
      } else {
        //物流
        if (this.logisticList.length > 0) {
          this.list = this.logisticList;
          return;
        }
      }
      this.getList();
    },
    changeDefault(val, currentIndex) {
      this.list.forEach((D, index) => {
        if (currentIndex !== index) {
          D.Defaults = false;
        } else {
          D.Defaults = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.province_style {
  .textarea-style {
    width: 300px;
    margin: auto 0;
  }
  .province_fa {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
  }
  .defaultLog {
    margin: 25px 10px;
  }
  .el-input-number {
    margin: 5px 6px;
  }
  .lineBack {
    width: 100%;
    height: 1px;
    background: #d6d0d0;
  }
}
</style>