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
    <el-button @click="storeUpOrdown('up')" :disabled="multipleSelection.length=='0'" class="marbtn">批量启用</el-button>
    <el-button @click="storeUpOrdown('down')" :disabled="multipleSelection.length=='0'" class="marbtn">批量关闭</el-button>
    <span style="margin-left: 20px">门店名称</span>
    <el-input style="width: 188px" placeholder="请输入内容" v-model="search.Name" @clear="clearN"></el-input>

    <span style="margin-left: 20px">状态：</span>
    <el-select placeholder="请选择" v-model="search.State" clearable> 
      <el-option label="开启" value="1"></el-option>
      <el-option label="关闭" value="0"></el-option>
    </el-select>

    <el-button
      class="marginBottom"
      style="margin-left: 20px"
      @click="searchReply"
      >搜索
    </el-button>

    <el-table :data="listData" v-loading="loading" tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="门店图片" align="center" width="120">
        <template slot-scope="scoped">
          <div class="goodsInfo">
            <img
              :src="scoped.row.Img.length > 0 ? addPre(scoped.row.Img[0]) : ''"
              alt
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="SID" label="门店编号" align="center" width="100"></el-table-column>
      <el-table-column prop="Name" label="门店名称" align="center"></el-table-column>
      <el-table-column prop="Address" label="门店地址" align="center"></el-table-column>
      <el-table-column label="门店电话" align="center" width="110">
        <template slot-scope="scoped">
          <div v-if="scoped.row.Tel">{{ scoped.row.Tel }}</div>
          <div v-else>无</div>
        </template>
      </el-table-column>
      <el-table-column label="启用" align="center" width="55">
        <template slot-scope="scoped">
          <el-checkbox
            v-model="scoped.row.State"
            @change="changeEnable($event, scoped.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="经纬度" align="center">
        <template slot-scope="scoped">
          <div>经度：{{ scoped.row.Longitude }}</div>
          <div>纬度：{{ scoped.row.Latitude }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
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
    <div class="block" v-if="TotalList">
        <el-pagination  background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="TotalList">
        </el-pagination>
    </div>

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
      current_SID: null,
      multipleSelection:[],//多选
      splitSID:'',//多选id
      State:'',
      TotalList:0,//分页总数
      currentPage: 0,
      pageSize:0,
      // dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //更新门店
    async renewGood(suibian){
      this.$confirm("是否需要更新门店","提示",{
        confirmButtonText:"是",
        cancelButtonText:"否",
        type:"warning"
      }).then(()=>{
        this.setShop();
      }).catch(()=>{
        this.$message({
          type:"info",
          message:"已取消更新"
        })
      })
    },
    async setShop(){
      try {
         let{Data}=await getLists(
          {
            Action:"SetShopSynchronous"
          },
          "MShopOpera"
        );
        this.$message.success("更新成功");
        this.getList();
      } catch (error) {
        this.$message.error(error)
      }
    },
    async getList() {
      try {
        let { Data } = await getLists({ Action: "GetShopList" ,Name:this.search.Name,State:this.search.State,Page: this.$route.query.page?this.$route.query.page:this.currentPage - 1}, "MShopOpera");        
        this.listData = Data.ShopInfoList;
        this.TotalList = Data.DataCount;
        this.pageSize = Data.PageSize;
        this.listData.forEach(D => {
          D.Img = D.Img.split(",");
          D.State = D.State === "0" ? false : true;
        });
      } catch (e) {
        this.$message.error(e);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList(val);
    }, 
    storeUpOrdown(flag){//上架

      if(flag == 'up'){
        this.msg = '是否批量启用'
      }else{
        this.msg = '是否批量关闭'
      }
      this.$confirm(this.msg, '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
        }).then(() => {
              this.goodsUpOrdownFun(flag);
        }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消'
              });          
        });
    },
    async goodsUpOrdownFun(flag){
      let SID = ''
      this.multipleSelection.forEach((item,index)=>{
        this.splitSID+=item.SID+','
        this.State = item.State
        SID = this.splitSID.substr(0,this.splitSID.length-1)
        console.log(SID,'SID')
      })
      // let SID = 
      let State = '';
      if(flag == 'up'){
        State = '1'
      }else{
        State = '0'
      }
      try {
        let data = await getLists(
          {
            Action: "SetShopState",
            State:State,
            SID:SID
          }, "MShopOpera")
        this.dialogVisibleUp = false;
        this.$message.success(data.Message);
        setTimeout(() => {
          this.getList()
        }, 200);
      } catch (e) {
        this.$message.error(e)
      }
    },
    
    handleSelectionChange(val) {//多选
      this.multipleSelection = val;
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
        query: { sid: row.SID ,page:Number(this.currentPage-1)}
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
 function quchongstr(str){
    var a = str.match(/\S+/g);//等价于str.split(/\s+/g)// \s空白符，\S非空白符
    a.sort();
    for(var i=a.length-1;i>0;i--){
      if(a[i]==a[i-1]){
        a.splice(i,1);
      }
    }
    return a.join(" ");
  }
</script>

<style scoped lang="less">
.goodsInfo {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
