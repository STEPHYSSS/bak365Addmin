<template>
  <div class="storeSet">
    <!-- 新增门店，门店编辑 -->
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
      <el-form-item label="门店编号" prop="ShopNo">
        <el-input v-model="form.ShopNo" :readonly="true" placeholder="请选择门店"></el-input>
        <el-button
          type="primary"
          style="margin-left:10px"
          size="medium"
          @click="selecStore(null)"
          v-if="!$route.query.sid"
        >选择门店</el-button>
      </el-form-item>      
      <el-form-item label="门店名称：" prop="Name">
        <el-input v-model="form.Name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="门店地址：" prop="Address">
        <el-input v-model="form.Address" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="门店电话：" prop="Tel">
        <el-input v-model="form.Tel" placeholder="请输入内容"></el-input>
      </el-form-item>
      <!-- <el-form-item label="门店区域：" prop="AreaSID">
        <storeAreaList @changeType="changeType"></storeAreaList>
      </el-form-item> -->
      <!-- <el-form-item label="支持配送：" prop="Type">
        <el-checkbox v-model="checkedType"></el-checkbox>
      </el-form-item>-->
      <el-form-item label="经度：" prop="Longitude">
        <el-input v-model="form.Longitude" :readonly="true" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="纬度：" prop="Latitude">
        <el-input v-model="form.Latitude" :readonly="true" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="门店图片：">
        <imgLoad
          style="margin-top:10px"
          @upLoadImgs="upLoadImg"
          :fileListUp="fileListUp"
          folder="ShopImg"
          ref="imgLoad"
        ></imgLoad>
      </el-form-item>
      <!-- <el-form-item>
        <div>可移动选择经纬度</div>
        <areaMy :isStore="true" @dragendArea="dragendArea"></areaMy>
      </el-form-item> -->
    </el-form>
    <el-dialog title="门店列表" :visible.sync="dialogTableVisible">
      <div style="margin-bottom: 20px;text-align: center;">
        <span>名称搜索</span>
        <el-input
          v-model="Name"
          placeholder="请输入"
          @keyup.enter="searchName"
          style="margin-right:10px;width:180px"
        ></el-input>
        <el-button type="primary" @click="searchName">搜索</el-button>
      </div>
      <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange" class="maxHeight">
        <el-table-column prop="ShopName" label="名称" width="150"></el-table-column>
        <el-table-column prop="ShopNo" label="门店编号" width="200"></el-table-column>
        <el-table-column prop="Mobile" label="电话"></el-table-column>
        <el-table-column prop="Address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <div class="preserveStyle">
      <el-button
        type="primary"
        style="margin-left:20px"
        @click="preserveFun"
        :loading="btnLoading"
      >提交</el-button>
    </div>
  </div>
</template>

<script>
import imgLoad from "@/components/download/imgLoad";
import { getLists } from "@/api/vipCard";
import { replacePre } from "@/config/publicFunction";
import areaMy from "@/components/area_app";
import storeAreaList from "@/components/selector/storeArea";

export default {
  name: "edit",
  components: { imgLoad, areaMy, storeAreaList },
  data() {
    return {
      form: {
        Img: []
      },
      dialogTableVisible: false,
      gridData: [], //门店列表
      Name: "", //搜索门店
      currentRow: null,
      rules: {
        Name: [{ required: true, message: "请填写门店名称", trigger: "blur" }],
        // Address: [
        //   { required: true, message: "请填写门店地址", trigger: "blur" }
        // ],
        // Tel: [{ required: true, message: "请填写门店电话", trigger: "blur" }],
        // AreaSID: [
        //   {
        //     required: true,
        //     message: "请填写门店区域",
        //     trigger: "change",
        //     validator: (rules, value, callback) => {
        //       if (!value) {
        //         callback(new Error("请填写门店区域"));
        //       } else {
        //         callback();
        //       }
        //     }
        //   }
        // ],
        // Longitude: [{ required: true, message: "请填写经度", trigger: "blur" }],
        // Latitude: [{ required: true, message: "请填写纬度", trigger: "blur" }]
      },
      fileListUp: [],
      btnLoading: false,
      checkedType: true
    };
  },
  created() {
    this.$route.meta.label = "添加门店";
    if (this.$route.query.sid) {
      this.getInfo();
    }
  },
  methods: {
    async getMendian() {
      try {
        let { Data } = await getLists(
          { Action: "GetEntShopList", Name: this.Name },
          "MShopOpera"
        );
        this.gridData = Data.ShopInfoList;
      } catch (e) {
        console.log(e);
      }
    },
    async getInfo() {
      try {
        let { Data } = await getLists(
          { Action: "GetShop", SID: this.$route.query.sid },
          "MShopOpera"
        );
        this.form = Data.ShopInfo;
        // if (this.form.Type) {
        //   this.checkedType = this.form.Type.indexOf("2") > -1 ? true : false;
        // }
        this.fileListUp = this.form.Img
          ? [{ url: process.env.Prefix + this.form.Img }]
          : [];
      } catch (e) {
        this.$message.error(e);
      }
    },
    upLoadImg(imgs) {
      let arr = [];
      let ti = imgs;
      for (let i = 0; i < ti.length; i++) {
        arr.push(ti[i].url);
      }
      this.form.Img = arr.join(",");
    },
    preserveFun() {
      // if (!this.form.Img || this.form.Img.length === 0) {
      //   this.$message.info("上传门店图片");
      //   return;
      // }
      this.$refs.form.validate(async valid => {
        // SID与Shop值不共存，确保数据准确；新增传值Shop，SID为空；编辑传值SID，ShopNo为空
        if (valid) {
          if (this.form.Img) {
            this.form.Img = replacePre(this.form, "Img");
          }
          if (this.$route.query.sid) {
            this.form.ShopNo = "";
          }
          // this.form.Type = this.checkedType ? "1,2" : "1";
          let obj = {
            Action: "SetShop"
          };
          Object.assign(obj, this.form);
          this.btnLoading = true;
          try {
            await getLists(obj, "MShopOpera");
            this.$message.success("提交成功");
            this.$router.push("/weChat/manager/storeSet/index");
            this.btnLoading = false;
          } catch (e) {
            this.btnLoading = false;
            this.$message.error(e);
          }
        } else {
          return false;
        }
      });
    },
    dragendArea(val) {
      this.$set(this.form, "Longitude", val.longitude);
      this.$set(this.form, "Latitude", val.latitude);
    },
    selectArea() {
      this.$refs.dialogAreaRef.dialogVisible = true;
    },
    changeType(val) {
      this.form.AreaSID = val;
    },
    // 点击选择门店
    selecStore() {
      this.dialogTableVisible = true;
      this.getMendian();
    },
    //搜索
    searchName() {
      this.getMendian();
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    sure() {
      this.form.ShopNo = this.currentRow.ShopNo;
      this.form.Name = this.currentRow.ShopName;
      this.form.Tel = this.currentRow.Mobile;
      this.form.Address = this.currentRow.Address;
      this.form.Longitude = this.currentRow.Location.split(",")[0];
      this.form.Latitude = this.currentRow.Location.split(",")[1];
      this.dialogTableVisible = false;
    }
  }
};
</script>

<style scoped lang="less">
.storeSet {
  .el-input {
    width: 300px;
  }
}
.maxHeight{
  max-height: 500px;
  overflow-y: scroll;
}
</style>
