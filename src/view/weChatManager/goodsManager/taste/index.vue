<template>
  <div class="tasteStyle">
    <!-- 配件，口味，标签 列表 -->
    <el-button type="primary" size="small" @click="openMaterial" class="marginBottom">图标素材</el-button>
    <el-table
      class="tableAdd"
      :v-loading="loading"
      :data="tableData"
      :style="{width:ruleForm.Type!==3?'60%':'100%'}"
    >
      <el-table-column label="图片" prop="GoodId" v-if="ruleForm.Type===3" width="200">
        <template slot="header">
          图片
          <span
            class="imgTipStyle"
            style="margin-top:15px;
      display: inline-block;"
          >(建议尺寸:400*400;大小:小于500kb;格式:JPG,PNG,JPEG)</span>
        </template>
        <template slot-scope="scoped">
          <div class="imgLoadStyle">
            <imgLoad
              folder="PartsImg"
              :isAutoFixed="true"
              @upLoadImgs="upLoadImgsMain($event,scoped.row)"
              :fileListUrl="scoped.row.Img |setImgPrex"
              :limit="1"
              :enlarge="1"
              :showFileList="true"
            ></imgLoad>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="GoodId" v-if="ruleForm.Type===3" width="180">
        <template slot-scope="scoped">
          <!--          <span v-if="scoped.row.SID">商品编号</span>-->
          <el-input
            style="max-width:200px"
            v-model="scoped.row.ProdNo"
            :readonly="true"
            placeholder="选择关联商品"
            @focus="selectGoods(scoped.row,scoped.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="Name" label="名称" :key="2">
        <template slot-scope="scoped">
          <el-input
            v-model="scoped.row.Name"
            placeholder="请输入内容"
            @blur="blurSubmit(scoped.row,scoped.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="ruleForm.Type===0" prop="TypeName" label="标签类型">
        <template slot-scope="scoped">
          <el-select v-model="scoped.row.TypeName" placeholder="请选择">
            <el-option v-for="(item) in labelType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </template>
      </el-table-column>-->
      <el-table-column v-if="ruleForm.Type===3" width="150" label="显示">
        <template slot-scope="scoped">
          <el-checkbox v-model="scoped.row.State"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="价格" v-if="ruleForm.Type===3">
        <template slot-scope="scoped">
          <el-input style="max-width:150px" v-model="scoped.row.SalePrice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="库存" v-if="ruleForm.Type===3">
        <template slot-scope="scoped">
          <el-input style="max-width:150px" v-model="scoped.row.StoreQty"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="图标标签" v-if="ruleForm.Type===0" :key="1">
        <template slot-scope="scoped">
          <!-- v-if="scoped.row.SID" -->
          <div
            v-if="scoped.row.Img"
            class="labelImgStyle tableLabelImgStyle"
            @click="changeImg(scoped.$index)"
          >
            <img :src="scoped.row.Img|setImgPrex" alt />
          </div>
          <el-button v-else size="small" type="text" @click="changeImg(scoped.$index)">选择图片</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button
            v-if="scoped.row.SID&&ruleForm.Type===3"
            type="primary"
            size="small"
            @click="submitSure(scoped.row,scoped.$index)"
            :disabled="btnLoading"
          >保存</el-button>
          <el-button
            v-if="scoped.row.SID"
            type="text"
            @click="deleteTaste(scoped.row,scoped.$index)"
          >删除</el-button>
          <el-button
            v-if="!scoped.row.SID"
            type="primary"
            size="small"
            @click="addTaste(scoped.row,scoped.$index)"
          >添加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin:25px 0;" v-if="ruleForm.Type===2">
      <div style="margin-bottom:10px">口味模板设置</div>
      <el-table :data="tasteModeList" style="width:70%">
        <el-table-column label="口味集合">
          <template slot-scope="scoped">
            <!-- v-model="scoped.row.Name" -->
            <el-select
              v-model="scoped.row.Name"
              :multiple="true"
              filterable
              :allow-create="false"
              default-first-option
              @change="changeTasteListFa($event,scoped.row)"
              placeholder="请选择口味"
            >
              <el-option
                v-for="(item,i) in tableDataMode"
                :key="i"
                :label="item.Name"
                :value="item.Name"
              ></el-option>
            </el-select>
            <!-- <tasteList
              :Type="2"
              @changeTaste="changeTasteListFa($event,scoped.row)"
              ref="tasteListFa"
              :valueCurrent="tasteModeList.Name"
            ></tasteList>-->
            <!-- <el-input type="textarea"
            :rows="2" v-model="scoped.row.Name"></el-input>-->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scoped">
            <el-button
              v-if="scoped.row.SID"
              type="primary"
              size="small"
              @click="submitSure(scoped.row,scoped.$index,true)"
              :disabled="btnLoading"
            >保存</el-button>
            <el-button
              v-if="scoped.row.SID"
              type="text"
              @click="deleteTaste(scoped.row,scoped.$index,true)"
            >删除</el-button>
            <el-button
              v-if="!scoped.row.SID"
              type="primary"
              size="small"
              @click="addTaste(scoped.row,scoped.$index,true)"
            >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <Del :show="show" @delFunction="delFunction" @confirmEnd="confirmEnd"></Del>

    <Goods :goodsShow="goodsShow" @changeDig="changeDig" @sureGood="sureGood"></Goods>

    <el-dialog
      title="点击选择图片"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div v-for="(item,i) in 10" :key="i" class="labelImgStyle" @click="clickMaterial(i)">
        <img
          :id="'materialImg'+i"
          :src="require('../../../../assets/img/labelImg/labelImg'+item+'.png')"
          alt
        />
      </div>

      <div class="lineBack" v-if="materialList.length>0"></div>
      <div v-if="materialList.length>0">
        <div
          v-for="(item,index) in materialList"
          :key="item.SID"
          class="labelImgStyle tableLabelImgStyle"
          style="margin-bottom:5px"
          @click="clickMaterial(index,item.Img)"
        >
          <img :id="'materialImgUp'+index" :src="item.Img |setImgPrex" alt />
        </div>
      </div>
    </el-dialog>

    <el-dialog
      class="customImgStyle"
      title="自定义标签图片"
      :visible.sync="visibleMaterial"
      width="600px"
      :before-close="handleClose"
    >
      <div v-loading="loadingImg">
        <div v-if="materialList.length>0">
          <div
            v-for="(item,index) in materialList"
            :key="index"
            class="labelImgStyle tableLabelImgStyle labelImgStyleWidth"
          >
            <img :src="item.Img |setImgPrex" alt />
          </div>
        </div>
        <div class="lineBack" v-if="materialList.length>0"></div>

        <div>
          <imgLoad
            folder="LabelImg"
            :isAutoFixed="true"
            @upLoadImgs="upLoadImgs"
            :fileListUp="fileListUp"
            :limit="20"
            :enlarge="0.15"
          ></imgLoad>
        </div>

        <span class="imgTipStyle">(建议尺寸:400*400;大小:小于500kb;格式:JPG,PNG,JPEG)</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleMaterial = false">取 消</el-button>
        <el-button type="primary" @click="submitImgs" :disabled="loadingImg">保存上传的图片</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import { UploadImgBase } from "@/api/user";
import Del from "@/components/Dialog/del";
import Goods from "@/components/Dialog/goods";
import { optionsLabelType } from "@/config/utils";
import tasteList from "@/components/selector/TasteList";
import imgLoad from "@/components/download/imgLoad";

export default {
  components: { Del, Goods, tasteList, imgLoad },
  data() {
    return {
      search: {},
      loading: true,
      loadingImg: true,
      btnLoading: false,
      tableData: [],
      tasteModeList: [],
      tableDataMode: [],
      show: false,
      ruleForm: {
        Name: "",
        State: false
      },
      rules: {
        Name: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      labelType: optionsLabelType,
      labelTypeAll: optionsLabelType,
      current_index: -1,
      // 控制商品弹框显示
      goodsShow: false,
      cellIndex: 0,
      // 是否是口味模块
      isTasteMode: false,
      dialogVisible: false,
      visibleMaterial: false,
      fileListUp: [],
      //标签上传图片
      materialList: [],
      GetImgs: []
    };
  },
  created() {
    if (this.labelType.length === 3) {
      this.labelType = this.labelType.slice(1, 3);
    }
    if (this.$route.path === "/weChat/manager/tasteList") {
      this.ruleForm.Type = 2;
    } else if (this.$route.path === "/weChat/manager/labelList") {
      this.ruleForm.Type = 0;
    } else if (this.$route.path === "/weChat/manager/partsList") {
      this.ruleForm.Type = 3;
    }
    this.getImgList();
    this.getList();
    this.getTasteModeList();
  },
  methods: {
    async getList() {
      try {
        // "GetPartsList"
        this.loading = true;
        let action = this.ruleForm.Type === 3 ? "GetPartsList" : "GetParamList";
        let opera = this.ruleForm.Type === 3 ? "MProdOpera" : "MBaseOpera";
        let { Data } = await getLists(
          { Action: action, Type: this.ruleForm.Type },
          opera
        );
        let param =
          this.ruleForm.Type === 3 ? "ProdPartsList" : "ParamInfoList";

        this.tableDataMode = Data[param];
        this.tableData = Data[param];

        if (this.ruleForm.Type === 3) {
          this.tableData.forEach(D => {
            D.State = D.State === "1" ? true : false;
          });
        }
        this.tableData = JSON.parse(JSON.stringify(Data[param]));
        this.tableData.push({ State: false, isAdd: true });
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    async getTasteModeList() {
      let { Data } = await getLists(
        { Action: "GetParamList", Type: 21 },
        "MBaseOpera"
      );
      this.tasteModeList = Data.ParamInfoList;
      this.tasteModeList.forEach(D => {
        if (D.Name instanceof Array) {
          return;
        }
        D.Name = D.Name.split(",");
      });

      this.tasteModeList.push({});
    },
    async getImgList() {
      this.loadingImg = true;
      try {
        let { Data } = await getLists(
          { Action: "GetImgs", Type: 2 },
          "MBaseOpera"
        );
        console.log(Data.Imgs, "77");
        this.materialList = Data.Imgs;
        this.loadingImg = false;
      } catch (e) {
        this.loadingImg = false;
      }
    },
    deleteTaste(row, index, bool) {
      this.show = true;
      this.ruleForm.SID = row.SID;
      this.current_index = index;
      this.isTasteMode = bool ? true : false;
    },
    delFunction(bool) {
      this.show = bool;
    },
    addTaste(row, index, bool) {
      // this.ruleForm.Name = row.Name;
      // this.ruleForm.State = row.State;
      // this.ruleForm.SalePrice = row.SalePrice;
      // this.ruleForm.ProdNo = row.ProdNo;
      this.submitSure(row, index, bool);
      // this.getTasteModeList();
    },
    async confirmEnd() {
      try {
        await getLists(
          { Action: "RemoveParamInfo", SID: this.ruleForm.SID },
          "MBaseOpera"
        );
        let arr = this.isTasteMode ? this.tasteModeList : this.tableData;
        arr.splice(this.current_index, 1);
        this.$message.success("删除成功");
        this.show = false;
      } catch (e) {
        this.show = false;
        this.$message.error(e);
      }
    },
    async submitSure(row, index, bool) {
      // bool 是否是口味模板
      if (!row.Name) {
        this.$message.info("请输入名称");
        return;
      }
      if (this.ruleForm.Type === 3 && !row.SalePrice) {
        this.$message.info("请输入价格");
        return;
      }
      if (this.ruleForm.Type === 3 && !row.ProdNo) {
        this.$message.info("请选择商品");
        return;
      }
      if (this.ruleForm.Type === 3 && !row.StoreQty) {
        this.$message.info("请输入商品库存");
        return;
      }
      // if (this.ruleForm.Type === 0 && !row.TypeName) {
      //   this.$message.info("请输入标签类型");
      //   return;
      // }
      let obj = {};
      if (row) {
        Object.assign(obj, row);
      }
      let action = this.ruleForm.Type === 3 ? "SetPartsInfo" : "SetParamInfo";
      let Opera = this.ruleForm.Type === 3 ? "MProdOpera" : "MBaseOpera";
      if (this.ruleForm.Type === 0) {
        //  标签
        obj.TypeName = "商品便签";
      }

      if (obj.Name instanceof Array) {
        obj.Name = obj.Name.join(",");
      }

      Object.assign(obj, { Action: action });
      obj.State = obj.State === true ? 1 : 0;
      obj.Type = bool ? 21 : this.ruleForm.Type;
      try {
        this.btnLoading = true;

        await getLists(obj, Opera);
        this.$message.success("操作成功");
        this.btnLoading = false;
        if (bool) {
          this.getTasteModeList();
        } else {
          this.getList();
        }
      } catch (e) {
        this.btnLoading = false;
        this.$message.error(e);
      }
    },
    changeLabel() {},
    selectGoods(row, index) {
      if (row.Name) {
        //当选择过商品编号不让修改
        return;
      }
      this.goodsShow = true;
      this.cellIndex = index;
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    sureGood(val) {
      this.goodsShow = false;
      this.$set(this.tableData[this.cellIndex], "ProdNo", val.ProdNo);
      this.$set(this.tableData[this.cellIndex], "Name", val.ProdName);
    },
    blurSubmit(row, index) {
      if (this.ruleForm.Type === 3 || row.isAdd) {
        return;
      }
      this.submitSure(row, index);
    },
    changeTasteListFa(val, row) {
      row.Name = val;
    },
    upLoadImgsMain(url, row) {
      row.Img = url.replace(process.env.Prefix, "");
    },
    upLoadImgs(imgs) {
      let arr = [];
      let ti = imgs;
      for (let i = 0; i < ti.length; i++) {
        ti[i].url = ti[i].url.replace(process.env.Prefix, "");
        arr.push(ti[i].url);
      }
      this.GetImgs = arr.join(",");
    },
    handleClose(done) {
      done();
    },
    changeImg(index) {
      this.dialogVisible = true;
      this.current_index = index;
    },
    openMaterial() {
      this.visibleMaterial = true;
    },
    clickMaterial(i, url) {
      let src,
        tableList = [];
      let currentObj = this.tableData[this.current_index];
      if (url) {
        //点击的是用户上传的图片
        src = document.getElementById(`materialImgUp${i}`).src;

        let currentObj = this.tableData[this.current_index];
        if (currentObj.Name) {
          currentObj.Img = url;
          this.submitSure(currentObj);
        }
        this.tableData[this.current_index].Img = url;
        this.dialogVisible = false;
      } else {
        src = document.getElementById(`materialImg${i}`).src;
        UploadImgBase(src, "Label")
          .then(D => {
            let currentObj = this.tableData[this.current_index];
            if (currentObj.Name) {
              currentObj.Img = D.Message;
              this.submitSure(currentObj);
            }
            this.tableData[this.current_index].Img = D.Message;
            this.dialogVisible = false;
          })
          .catch(e => {
            // 没上传成功
            this.$message.error(e);
          });
      }
    },
    async submitImgs() {
      try {
        if (this.GetImgs.length === 0) {
          this.$message.info("请选择相片");
          return;
        }
        await getLists(
          { Action: "SetImg", Img: this.GetImgs, Type: 2 },
          "MBaseOpera"
        );
        this.$message.success("添加成功");
        this.visibleMaterial = false;
        this.getImgList();
      } catch (e) {
        this.$message.error(e);
      }
    }
  },
  computed: {
    isTastePath() {
      return this.$route.path === "/weChat/manager/tasteList" || false;
    },
    islabelPath() {
      return this.$route.path === "/weChat/manager/labelList" || false;
    }
  },
  watch: {
    $route() {
      if (this.$route.path === "/weChat/manager/tasteList") {
        this.ruleForm.Type = 2;
      } else if (this.$route.path === "/weChat/manager/labelList") {
        this.ruleForm.Type = 0;
      } else if (this.$route.path === "/weChat/manager/partsList") {
        this.ruleForm.Type = 3;
      }
      this.getList();
    }
  }
};
</script>

<style lang="less">
.tasteStyle {
  .imgTipStyle {
    font-size: 10px;
    margin-top: 15px;
    display: inline-block;
  }
  .tableAdd {
    .el-input {
      max-width: 250px;
    }
    .imgLoadStyle {
      .el-upload--picture-card,
      .el-upload-list__item {
        width: 120px;
        height: 120px;
      }
      .el-upload--picture-card {
        line-height: 120px;
      }
    }

    .imgStyle {
      width: 120px;
      height: 120px;
      border: 1px solid #eee;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .lineBack {
    width: 100%;
    height: 1px;
    background: #d6d0d0;
    margin: 15px 0;
  }

  .labelImgStyle {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .labelImgStyleWidth {
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
  }
  .tableLabelImgStyle {
    border: 1px solid #eee;
  }
  .customImgStyle {
    .el-upload--picture-card,
    .el-upload-list__item {
      width: 80px;
      height: 80px;
    }
    .el-upload--picture-card {
      line-height: 80px;
    }
  }
}
</style>
