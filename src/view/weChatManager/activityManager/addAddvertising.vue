<template>
  <div class="keyWordReply">
    <!-- 
      Name             1
      Url              1    
      Img              1
      ParentNo         1
      AdvertisingType  1
    -->

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- <el-form-item label="点击链接" prop="Url">
        <el-input type="text" v-model="ruleForm.Url"></el-input>
        <el-button @click="chooseUrl">选择链接</el-button>
      </el-form-item> -->

      <el-form-item label="点击链接" prop="Url">
        <template slot-scope="scope">
          <el-input type="text" v-model="ruleForm.Url"></el-input>
          <el-button @click="chooseUrl(scope.row)">选择链接</el-button>
        </template>
      </el-form-item>

      <el-form-item label="广告类型" prop="AdvertisingType">
        <el-select
          v-model="ruleForm.AdvertisingType"
          placeholder="请选择广告类型"
        >
          <el-option label="活动" value="0"></el-option>
          <el-option label="商品" value="1"></el-option>
          <el-option label="文章" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动名称" prop="Name">
        <el-input
          v-model="ruleForm.Name"
          placeholder="请输入活动名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="Img">
        <imgLoad
          style="margin-top:10px;width:100px;height:100px;"
          :limit="1"
          @upLoadImgs="upLoadImg"
          :fileListUp="fileListUp"
          folder="ShopImg"
          ref="imgLoad"
        ></imgLoad>
        <!-- <imgLoad
          folder="ProdImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsMain"
          :fileListUp="fileListUpMain"
          :limit="1"
        ></imgLoad
        > -->
      </el-form-item>
    </el-form>

    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button
        type="primary"
        style="margin-left: 20px"
        @click="preserveFun('ruleForm')"
        :disabled="isDisabled"
        >保存</el-button
      >
    </div>

    <el-dialog title="活动链接" :visible.sync="dialogTableVisible">
      <el-table
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        class="maxHeight"
      >
        <el-table-column
          prop="Name"
          label="名称"
          align="center"
        ></el-table-column>
        <el-table-column label="网址链接" width="350px" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.codeUrl"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- <template slot-scope="scope">
            <el-button type="text" @click="copyUrl(scope.row)"
              >活动商品链接</el-button
            >
          </template> -->
          <template slot-scope="scoped">
            <el-button
              type="text"
              @click="copyUrl(scoped.row)"
              v-if="scoped.row.ItemList"
              >活动商品链接</el-button
            >
            <el-popover placement="left" v-model="scoped.row.visibleUrl" v-else>
              <el-input
                v-model="scoped.row.codeUrl"
                readonly
                placeholder="商品链接"
                style="width:500px"
              >
                <el-button slot="append" @click="copyUrl2(scoped.row)"
                  >复制</el-button
                >
              </el-input>
              <el-button type="text" slot="reference" style="margin-right:10px;"
                >链接</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="活动商品" :visible.sync="dialogSmallTableVisible">
      <el-table
        :data="urlList"
        highlight-current-row
        @current-change="handleCurrentChange"
        class="maxHeight"
      >
        <el-table-column
          property="Name"
          label="网址名称"
          align="center"
        ></el-table-column>
        <el-table-column label="网址链接" width="350px" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.goodsUrl" readonly></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popover placement="left" v-model="scope.row.visibleUrl">
              <el-input
                v-model="scope.row.goodsUrl"
                readonly
                placeholder="商品链接"
                style="width:500px"
              >
                <el-button slot="append" @click="copyUrl2(scope.row)"
                  >复制</el-button
                >
              </el-input>
              <el-button type="text" slot="reference" style="margin-right:10px;"
                >链接</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSmallTableVisible = false">取消</el-button>
        <el-button type="primary" @click="certain">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import imgLoad from "@/components/download/imgLoad";
import { GetBaseImgUrl } from "@/config/publicFunction";
import { replacePre } from "@/config/publicFunction";

import { seckill, activeUrlGood } from "@/config/index"; //链接前缀
import goodsUrl from "@/components/Dialog/goodsUrl.vue"; //弹窗

export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入活动名称"));
      } else {
        return callback();
      }
    };
    var checkUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入活动链接"));
      } else {
        return callback();
      }
    };
    var checkAdvertisingType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择广告类型"));
      } else {
        return callback();
      }
    };
    var checkImg = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请上传图片"));
      } else {
        return callback();
      }
    };
    return {
      tableData: [],
      currentRow: null,
      fileListUp: [],
      ruleForm: {
        Name: "",
        Url: "",
        Img: "",
        ParentNo: "",
        AdvertisingType: "0"
      },
      // fileListUpMain:[],
      rules: {
        Name: [{ validator: checkName, required: true }],
        Url: [{ validator: checkUrl, required: true }],
        AdvertisingType: [{ validator: checkAdvertisingType, required: true }],
        Img: [{ validator: checkImg, required: true }]
      },
      isDisabled: false,
      seckill: seckill, //秒杀链接
      activeUrlGood: activeUrlGood, //进入商品详情
      dialogTableVisible: false,
      dialogSmallTableVisible: false,
      urlList: [] //弹框数组
    };
  },
  components: {
    imgLoad,
    goodsUrl
  },
  mounted() {
    if (this.$route.query.SID) {
      this.getAddverList();
    }
  },
  created() {
    this.getActiveList();
  },
  methods: {
    async getActiveList() {
      //获取秒杀 拼团活动信息+活动明细
      try {
        let data = await getLists(
          { Action: "GetPromInfoUrl" },
          "MPromotionOpera"
        );
        if (data.Data.PromList) {
          this.tableData = data.Data.PromList;
          this.tableData.forEach(D => {
            D.codeUrl = this.seckill + "?SID=" + D.SID + "&Flag=true";
          });
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
    // upLoadImgs(imgs, val, index) {
    //   this.isCoverCurrentImgs = false;
    //   this.ruleForm.SpecList[index].showImg = imgs;
    //   this.ruleForm.SpecList[index].Img = [];
    // },
    // upLoadImgsMain(arr) {
    //   // 主图片
    //   this.fileListUp = arr;
    //   if (arr.length > 0) {
    //     this.ruleForm.Img = arr[0].url;
    //   } else {
    //     this.ruleForm.Img = "";
    //   }
    // },

    //图片
    upLoadImg(imgs) {
      let arr = [];
      let ti = imgs;
      for (let i = 0; i < ti.length; i++) {
        arr.push(ti[i].url);
      }
      this.ruleForm.Img = arr.join(",");
    },
    //选择链接
    chooseUrl() {
      this.dialogTableVisible = true;
    },
    copyUrl(row) {
      let query = { SID: "", seckill: "true" };
      row.ItemList.forEach(D => {
        query.SID = D.SID;
        D.goodsUrl =
          this.activeUrlGood +
          "?query=" +
          encodeURIComponent(JSON.stringify(query));
      });
      this.urlList = row.ItemList;
      this.dialogSmallTableVisible = true;
    },
    copyUrl2() {
      let index = $(".el-popover").length - 1;
      let input = $($(".el-popover")[index]).find("input");
      input.select();
      document.execCommand("Copy");
      this.$Message.info("复制成功");
    },

    //取消
    cancelFun() {
      this.$router.push("/weChat/manager/activity/AddvertisementList");
    },
    setImg(img) {
      return process.env.Prefix + img;
    },

    //================================================编辑=======================================
    // 和添加是同一个ajax (Action)

    //查看详情
    async getAddverList() {
      // let SID = this.$route.query.SID;
      let data = await getLists(
        {
          SID: this.$route.query.SID,
          Action: "GetAdvertising"
        },
        "MShopOpera"
      );
      // if (data.Data.Advertising) {
      this.ruleForm = data.Data.Advertising;
      // }
      if (this.ruleForm.Img) {
        this.fileListUp =
          GetBaseImgUrl() + this.ruleForm.Img
            ? [{ url: GetBaseImgUrl() + this.ruleForm.Img }]
            : [];
      }
      this.Name = data.Data.Advertising.Name;
      this.Url = data.Data.Advertising.Url;
      this.Img = data.Data.Advertising.Img;
      this.ParentNo = data.Data.Advertising.ParentNo;
      this.AdvertisingType = data.Data.Advertising.AdvertisingType;
    },
    //================================================保存=======================================
    async preserveFun() {
      this.ruleForm.Img = this.ruleForm.Img.replace("../", "");
      console.log(this.ruleForm, "000");

      try {
        let data = await getLists(
          {
            Name: this.ruleForm.Name,
            Url: this.ruleForm.Url,
            Img: this.ruleForm.Img,
            // sid放到ParentNo
            ParentNo: this.ruleForm.SID,
            AdvertisingType: this.ruleForm.AdvertisingType,
            Action: "SetAdvertising",
            SID: this.$route.query.SID
          },
          "MShopOpera"
        );
        setTimeout(() => {
          this.$router.push("/weChat/manager/activity/AddvertisementList");
        }, 300);

        // if(data.Img){
        //   if(data.Img.length>0){
        //     for(let i=0;i<data.Img.length;i++){
        //       let item=data.Img[i];
        //       data.Img[i]=item.indexOf(process.env.Prefix)!==-1?item.replace(process.env.Prefix,""):item;
        //     }
        //   }
        //   if(typeof data.Img!=="string"){
        //     data.Img=data.Img.join(",");
        //   }
        // }
      } catch (error) {
        this.$message.error(error);
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log("000", val);
    },
    sure() {
      this.ruleForm.Name = this.currentRow.Name;
      this.ruleForm.Url = this.currentRow.codeUrl;
      // this.ruleForm.AdvertisingType = this.currentRow.AdvertisingType;
      this.dialogTableVisible = false;
      this.dialogSmallTableVisible = false;
    },
    certain() {
      this.ruleForm.Name = this.currentRow.Name;
      this.ruleForm.Url = this.currentRow.goodsUrl;
      this.dialogTableVisible = false;
      this.dialogSmallTableVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.keyWordReply {
  margin-bottom: 20px;
  // background: #fff;
  .imgWidth {
    width: 100px !important;
    height: 100px !important;
    background: red;
  }
  .keyword {
    width: 50%;
    background: #f3f3f3;
    padding-left: 20px;
    margin-bottom: 15px;
    .title {
      padding-top: 5px;
      font-size: 16px;
    }
    .tips {
      padding-bottom: 4px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #90c0f1;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.el-input,
.explain,
.el-textarea {
  width: 300px;
}
.explain {
  background-color: #cccccc;
  span {
    padding-left: 8px;
  }
}
.el-table {
  /deep/tbody tr:hover > td {
    background-color: #90c0f1;
  }
}
</style>
