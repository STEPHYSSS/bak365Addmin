<template>
  <div>
    <!-- 门店列表 -->
    <el-button type="primary" size="small" @click="addGood" style="margin-bottom:20px">添加门店</el-button>
    <el-table :data="listData" v-loading="loading" style="width: 100%">
      <el-table-column label="门店图片">
        <template slot-scope="scoped">
          <div class="goodsInfo">
            <img :src="scoped.row.Img.length>0?addPre(scoped.row.Img[0]):''" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="SID" label="门店编号"></el-table-column>
      <el-table-column prop="Name" label="门店名称"></el-table-column>
      <el-table-column prop="Address" label="门店地址"></el-table-column>
      <el-table-column label="门店电话">
        <template slot-scope="scoped">
          <div v-if="scoped.row.Tel">{{scoped.row.Tel}}</div>
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column label="启用">
        <template slot-scope="scoped">
          <el-checkbox v-model="scoped.row.State" @change="changeEnable($event,scoped.row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="经纬度">
        <template slot-scope="scoped">
          <div>经度：{{scoped.row.Longitude}}</div>
          <div>纬度：{{scoped.row.Latitude}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button type="text" @click="editRowGoods(scoped.row)">编辑</el-button>
          <el-button type="text" @click="delRow(scoped.row,scoped.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import Del from "@/components/Dialog/del";

export default {
  name: "index",
  components: {
    Del
  },
  data() {
    return {
      loading: false,
      listData: [],
      show: false,
      current_index: null,
      current_SID: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      try {
        let { Data } = await getLists({ Action: "GetShopList" }, "MShopOpera");
        // console.log(Data)
        this.listData = Data.ShopInfoList;
        this.listData.forEach(D => {
          D.Img = D.Img.split(",");
          D.State = D.State === "0" ? false : true;
        });
      } catch (e) {
        this.$message.error(e);
      }
    },
    async changeEnable(bool, row) {
      // 是否启用 bool = true 为启用
      let State = bool === true ? 1 : 0;
      try {
        let data = await getLists(
          { Action: "SetShopState", SID: row.SID, State: State },
          "MShopOpera"
        );
        this.$message.success(data.Message);
      } catch (e) {
        setTimeout(() => {
          row.State = !row.State;
        }, 500);
        this.$message.error(e);
      }
    },
    editRowGoods(row) {
      this.$router.push({
        path: "/weChat/manager/storeSet/info",
        query: { sid: row.SID }
      });
    },
    addGood() {
      this.$router.push("/weChat/manager/storeSet/info");
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
        await getLists(
          { Action: "RemoveShop", SID: this.current_SID },
          "MShopOpera"
        );
        this.listData.splice(this.current_index, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    addPre(val) {
      if (val) {
        return process.env.Prefix + val;
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped lang="less">
.goodsInfo {
  width: 120px;
  height: 120px;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
