<template>
  <div>
    <!-- 门店列表 -->
    <el-button
      type="primary"
      size="small"
      @click="addGood"
      style="margin-bottom:20px"
      >添加门店</el-button
    >

    <el-button type="primary" size="small" @click="renewGood">更新门店</el-button>

    <span style="margin-left: 20px">门店名称</span>
    <el-input style="width: 188px" placeholder="请输入内容" v-model="search.Name" @clear="clearN"></el-input>

    <span style="margin-left: 20px">状态：</span>
    <el-select placeholder="请选择" v-model="search.State">
      <el-option label="开启" value="1"></el-option>
      <el-option label="关闭" value="0"></el-option>
    </el-select>

    <el-button
      class="marginBottom"
      style="margin-left: 20px"
      @click="searchReply"
      >搜索
    </el-button>

    <!-- <span>商品名称：</span>
    <el-input
      style="width: 188px"
      v-model="search.Name"
      placeholder="请输入内容"
      clearable
      @clear="clearN"
    ></el-input>

    <span style="margin-left: 20px">评价显示：</span>
    <el-select v-model="search.IsShow" placeholder="请选择">
      <el-option label="全部" value=""></el-option>
      <el-option label="显示" value="1"></el-option>
      <el-option label="不显示" value="0"></el-option>
    </el-select>

    <div style="margin-top: 15px">
      <el-button
        type="primary"
        size="small"
        @click="searchReply"
        class="marginBottom"
        :disabled="loading"
        >搜索
      </el-button>
    </div> -->

    <el-table :data="listData" v-loading="loading" style="width: 100%">
      <el-table-column label="门店图片">
        <template slot-scope="scoped">
          <div class="goodsInfo">
            <img
              :src="scoped.row.Img.length > 0 ? addPre(scoped.row.Img[0]) : ''"
              alt
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="SID" label="门店编号"></el-table-column>
      <el-table-column prop="Name" label="门店名称"></el-table-column>
      <el-table-column prop="Address" label="门店地址"></el-table-column>
      <el-table-column label="门店电话">
        <template slot-scope="scoped">
          <div v-if="scoped.row.Tel">{{ scoped.row.Tel }}</div>
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column label="启用">
        <template slot-scope="scoped">
          <el-checkbox
            v-model="scoped.row.State"
            @change="changeEnable($event, scoped.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="经纬度">
        <template slot-scope="scoped">
          <div>经度：{{ scoped.row.Longitude }}</div>
          <div>纬度：{{ scoped.row.Latitude }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button type="text" @click="editRowGoods(scoped.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="delRow(scoped.row, scoped.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请问是否需要更新门店？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="refreshGood">确 定</el-button>
      </span>
    </el-dialog> -->

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
      search:{},
      loading: false,
      listData: [],
      show: false,
      current_index: null,
      current_SID: null
      // dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //更新门店
    async renewGood(suibian){
      console.log(suibian,"我是你要找的suibian");
      this.$confirm("是否需要更新门店","提示",{
        confirmButtonText:"是",
        cancelButtonText:"否",
        type:"warning"
      }).then(()=>{
        let{Data}=getLists(
          {
            Action:"SetShopSynchronous"
          },
          "MShopOpera"
        );
        this.$message.success("更新成功");
      }).catch(()=>{
        this.$message({
          type:"info",
          message:"已取消更新"
        })
      })
    },

    async getList() {
      try {
        let { Data } = await getLists({ Action: "GetShopList" ,Name:this.search.Name,State:this.search.State}, "MShopOpera");
        // console.log(Data)
        this.listData = Data.ShopInfoList;
        console.log("我肯定一定确定是你要找的",this.listData)
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
    },

    searchReply() {
      this.getList();
    },
    clearN(){
      this.search.Name="",
      this.getList();
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
