<template>
  <div class="entStoreAddEdit">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="赠送券">
        <el-input v-model="form.TicketNo" readonly></el-input>
        <el-button
          type="primary"
          style="margin-left: 10px"
          size="medium"
          @click="clickTicket"
          >添加</el-button
        >
      </el-form-item>
      <el-form-item label="筛选类型">
        <el-select v-model="form.SendType" placeholder="请选择">
          <el-option
            v-for="item in DirectType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="微卡卡号" prop="Data" v-if="form.SendType==='0'">
        <el-input v-model="form.Data" placeholder="请输入"></el-input>
        <br>
        <span style="color:red">(多个微卡卡号请用','分开)</span>
      </el-form-item>
      <el-form-item label="订单号" prop="Data" v-else-if="form.SendType!=='5'&&form.SendType!=='6'">
        <el-input v-model="form.Data" placeholder="请输入"></el-input>
        <br>
        <span style="color:red">(多个订单号请用','分开)</span>
      </el-form-item>
    </el-form>
    <el-dialog
      class="dialogTicketFa"
      title="选择电子券"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div class="chaxun">
        <span>名称搜索:</span>
        <el-input
          v-model="tiketName"
          placeholder="请输入"
          @keyup.enter="searchName"
          style="margin-right: 10px; width: 180px"
        ></el-input>
        <el-button @click="chaxun">查询</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tiketList"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="TypeNo"
          label="编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="TypeName"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.number"
              maxlength="2"
              oninput="value=value.replace(/[^\d]/g, '')"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEnd">确 定</el-button>
      </span>
    </el-dialog>
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left: 20px" @click="preserveFun"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard"; //调用接口引用
import { DirectType } from "@/config/utils"; //赠送类型引用
import ueditor1 from "@/components/ueditor1/";
import imgLoad from "@/components/download/imgLoad";
import "@/config/jquery.base64.js";
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
import * as ruleText from "@/view/wechatManager/rulesFrom";
import _ from "lodash";

export default {
  name: "",
  data() {
    return {
      form: {
        TicketNo:'',//电子券编号
        SendType:'',//筛选类型
        Data:'',//订单号和卡号
      },
      DirectType:DirectType,//筛选类型
      dialogVisible: false, //控制电子劵信息弹框显示
      tiketList: [], //电子券列表
      tiketName: "", //电子券搜索名称
    };
  },
  components: {
    imgLoad,
    ueditor1,
  },
  created() {
    this.getTicket();
  },
  methods: {
    // 选择电子券
    clickTicket() {
      this.dialogVisible = true;
    },
    async getTicket() {
      //获取电子券列表
      try {
        let { Data } = await getLists(
          { Action: "GetTicketList", TypeName: this.tiketName },
          "MProdOpera"
        );
        this.tiketList = Data.TicketList;
        this.$set(this.tiketList, "number");
      } catch (error) {
        this.$message.error(error);
      }
    },
    chaxun() {
      //电子券查询
      this.getTicket();
    },
    confirmEnd() {
      //电子券确定
      let info = "";
      this.tiketList.forEach((item) => {
        if (item.number) {
          info += item.TypeNo + "," + Number(item.number) + ";";
        }
      });
      this.form.TicketNo = info;
      this.dialogVisible = false;
    },
    
    cancelFun() {
      //取消
      this.$router.push("/weChat/manager/activity/directCouponList");
    },
    async preserveFun() {
      //保存
      try {
        let obj = _.cloneDeep(this.form);
        Object.assign(obj, { Action: "SendCoupon" });
        await getLists(obj, "WeChatCardOpera");
        this.$message.success("操作成功")
        this.$router.push("/weChat/manager/activity/directCouponList");
      } catch (error) {
        this.$message.error(error)
      }
    }
  },
};
</script>
<style lang="less" scoped>
.entStoreAddEdit {
  margin-bottom: 80px;
  min-width: 1230px;
  .el-input {
    width: 217px;
  }
  .el-textarea {
    width: 400px;
  }
  .FeaturesStyle {
    .el-form-item__content {
      line-height: 20px;
    }
  }
  .dialogTicketFa {
    .chaxun {
      margin-bottom: 10px;
    }
  }
}
</style>