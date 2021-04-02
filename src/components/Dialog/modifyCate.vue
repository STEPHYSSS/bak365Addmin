<template>
<!-- 商品类别弹框 -->
  <div>
    <el-dialog
      class="modifyCate"
      title="商品类别编辑"
      :visible.sync="dialogVisible"
      :before-close="beforeClose"
      width="850px"
    >
      <el-row :gutter="30" class="goodsSelectRow">
        <el-col :span="13">
          <div class="leftGoods">
            <el-header class="leftGoodsHead">类别列表</el-header>
            <div class="modifyCateTable">
              <el-table
                :data="tableData"
                highlight-current-row
                @row-click="rowClick"
                style="width: 100%;"
              >
                <el-table-column label="图片" v-if="!isIntegral" width="70" align="center">
                  <template slot-scope="scoped">
                    <div class="imgStyle">
                      <img :src="scoped.row.Img |setImgPrex" alt />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Name" label="类别名称" align="center"></el-table-column>
                <el-table-column prop="Sort" label="排序" width="70" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scoped">
                    <el-popover placement="top" width="200" v-model="scoped.row.visible">
                      <p>确定删除吗？</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="scoped.row.visible = false">取消</el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          @click="deleteRow(scoped.row,scoped.$index)"
                        >确定</el-button>
                      </div>
                      <el-button slot="reference" @click.stop>删除</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="rightGoods">
            <el-header class="leftGoodsHead">类别编辑</el-header>
            <div :class="{'scrollTable':scrollTable}">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <!--                <el-form-item label="类别编号" prop="CateNo">-->
                <!--                  <el-input v-model="ruleForm.SID" disabled></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="类别名称" prop="CateName">
                  <el-input v-model="ruleForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="类别排序" prop="CateName">
                  <el-input v-model="ruleForm.Sort"></el-input>
                </el-form-item>
                <el-form-item label="类别图片" prop="CateImg" v-if="!isIntegral">
                  <imgLoad
                    ref="imgload"
                    :limit="1"
                    :fileListUp="fileListUp"
                    :folder="isIntegral?'IntProdImg':'ProdImg'"
                    @upLoadImgs="upLoadImgs"
                    :isAutoFixed="true"
                    :isCoverCurrentImgs="isCoverCurrentImgs"
                  ></imgLoad>
                  <!--                  :width="181.25" :height="116.25"-->
                  <div>建议尺寸：800*800</div>
                  <div style="line-height: 12px;font-size:12px">一次只能上传一张图片</div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="preserve" size="mini">提交</el-button>
                  <el-button @click="addForm" size="mini">清空添加新数据</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--    <el-button type="primary" @click="confirmEnd" :loading="loadingBtn">确 定</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import imgLoad from "@/components/download/imgLoad";
import _ from "lodash";
import { getLists } from "@/api/vipCard";
import { replacePre } from "@/config/publicFunction";

export default {
  name: "modifyCate",
  components: { imgLoad },
  props: {
    cateShow: {
      type: Boolean,
      default: false
    },
    isIntegral: {
      //是积分
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      ruleForm: {},
      rules: {},
      fileListUp: [],
      scrollTable: false,
      disabledName: false,
      isCoverCurrentImgs: false
    };
  },
  created() {},
  methods: {
    async deleteRow(row, index) {
      // 删除整行
      try {
        let Opera = this.isIntegral ? "MIntegralOpera" : "MProdOpera";
        await getLists({ Action: "RemoveCate", SID: row.SID }, Opera);
        this.tableData.splice(index, 1);
        this.$message.success("操作成功");
        row.visible = false;
        if (this.ruleForm.SID === row.SID) {
          clearData(this);
        }
      } catch (e) {
        this.$message.error(e);
        row.visible = false;
      }
      // console.log(index, 999)
    },
    rowClick(row, column, event) {
      // 点击整行
      // console.log(row, 77777)
      if ($(this.$refs.ruleForm.$el).height() > 353) {
        this.scrollTable = true;
      } else {
        this.scrollTable = false;
      }

      this.ruleForm = _.clone(row);
      this.disabledName = true;
      this.fileListUp = row.Img ? [{ url: process.env.Prefix + row.Img }] : [];

      this.isCoverCurrentImgs = true;
    },
    preserve() {
      // 保存
      this.SubmitData();
    },
    upLoadImgs(imgs) {
      let arr = [];
      imgs.forEach(D => {
        arr.push(D.url);
      });
      this.ruleForm.Img = arr.join(",");
      this.isCoverCurrentImgs = false;
    },
    async SubmitData() {
      try {
        if (this.ruleForm.Img) {
          this.ruleForm.Img = replacePre(this.ruleForm, "Img");
        }
        let Opera = this.isIntegral ? "MIntegralOpera" : "MProdOpera";
        Object.assign(this.ruleForm, { Action: "SetCate" });
        await getLists(this.ruleForm, Opera);
        // 添加成功
        this.$message.success("操作成功");
        clearData(this);
        this.getList();
      } catch (e) {
        this.$message.error(e);
      }
    },
    addForm() {
      // 添加
      // if(this.ruleForm.SID){
      clearData(this);
      // }else{
      //   this.SubmitData()
      // }
    },
    beforeClose(done) {
      clearData(this);
      done();
    },
    // 弹窗列表数据
    async getList() {
      let opera = this.isIntegral ? "MIntegralOpera" : "MProdOpera";
      try {
        let { Data } = await getLists({ Action: "GetCateList" }, opera);
        this.tableData = Data.ProdCateList || [];
      } catch (e) {
        this.tableData = [];
      }
    }
  },
  watch: {
    cateShow(val) {
      this.dialogVisible = val;
      if (val) {
        this.getList();
      }
    },
    dialogVisible(bool) {
      this.$emit("cateFunction", bool);
    }
  }
};

function clearData(_this) {
  _this.disabledName = false;
  _this.ruleForm = {};
  _this.fileListUp = [];
  _this.$refs.ruleForm.resetFields();
  if (_this.$refs.imgload) {
    _this.$refs.imgload.currentImgs = [];
  }
}
</script>

<style lang="less">
.modifyCate {
  .goodsSelectRow {
    margin: 0 10px !important;
    /*margin:30px 0 !important;*/

    .leftGoods,
    .rightGoods {
      height: 440px;
      border: 1px solid #e5e5e5;
      padding: 0 !important;
      overflow: hidden;
      .el-table__body-wrapper {
        overflow-y: scroll;
        height: 350px;
      }
    }

    .rightGoods {
      .el-form-item {
        padding-right: 20px;
        margin-top: 20px;
      }

      .el-upload--picture-card,
      .el-upload-list__item {
        width: 100px;
        height: 100px;
      }
    }
    .el-upload--picture-card {
      line-height: 100px;
    }

    .leftGoodsHead {
      background: #f6f6f6;
      line-height: 40px;
      height: 40px !important;
      text-align: center;
    }

    .modifyCateTable {
      .imgStyle {
        width: 60px;
        height: 60px;
        border: 1px solid #eee;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .scrollTable {
      height: 398px;
      overflow-y: scroll;
    }
  }
}
</style>
