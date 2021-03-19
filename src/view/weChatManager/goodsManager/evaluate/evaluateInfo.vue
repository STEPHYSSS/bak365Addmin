<template>
  <div class="evaluateInfo" v-loading="loading">
    <!--    用户评价详情-->
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
      <el-form-item label="评价类型：" v-if="current_add" prop="Type">
        <el-select v-model="form.Type" placeholder="请选择">
          <el-option
            v-for="item in optionsType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称：" v-if="!current_add">
        <span>{{form.Name?form.Name:'--'}}</span>
      </el-form-item>
      <el-form-item label="商品名称：" prop="Name" v-if="current_add">
        <el-input v-model="form.Name" placeholder="请添加商品" v-if="current_add"></el-input>
        <span v-else>{{form.Name?form.Name:'--'}}</span>
        <el-button
          v-if="current_add"
          type="primary"
          style="margin-left:10px"
          size="medium"
          @click="selectGoods"
        >添加</el-button>
      </el-form-item>
      <el-form-item label="评论人：" v-if="!current_add">
        <span v-if="form.UserName">{{form.UserName}}</span>
        <span v-else>无</span>
      </el-form-item>
      <el-form-item label="添加时间：" v-if="!current_add">{{form.AddTime}}</el-form-item>
      <el-form-item label="评价内容：" prop="Details">
        <div v-if="!current_add">
          <span v-if="form.Details">{{form.Details}}</span>
          <br />
          <!-- <div v-if="form.ImgList.length>0"> -->
          <!-- <div class="DetailsImg" v-for="img in form.ImgList" :key="img">
            <img :src="setImg(img)" alt onclick="window.open()" />
          </div> -->
          <!-- </div> -->
        </div>
        <div v-else>
          <el-input
            v-if="current_add"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="form.Details"
          ></el-input>
          <imgLoad style="margin-top:10px" @upLoadImgs="upLoadImg" folder="TicketImg" ref="imgLoad"></imgLoad>
        </div>
      </el-form-item>
      <el-form-item label="星级：" style="vertical-align: middle">
        <el-rate
          style="line-height: 2.5;"
          v-model="form.StarClass"
          :disabled="!current_add"
          disabled-void-color="#C0C4CC"
          show-score
          text-color="#ff9900"
        ></el-rate>
      </el-form-item>
      <el-form-item label="回复评价内容：" prop="Reply">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.Reply"></el-input>
      </el-form-item>

      <el-form-item label="评价置顶级别：">
        <el-select v-model="form.Leves" placeholder="请选择">
          <el-option
            v-for="item in optionLeves"
            :key="item.leves"
            :label="item.name"
            :value="item.leves"
          ></el-option>
        </el-select>
        <div style="color:#999">级别一样的按时间顺序排序</div>
      </el-form-item>
      <el-form-item label="默认显示：">
        <el-radio v-model="form.IsShow" label="1">开启</el-radio>
        <el-radio v-model="form.IsShow" label="0">关闭</el-radio>
      </el-form-item>
      <el-form-item style="margin-top:30px">
        <el-button type="primary" @click="submitReply" :loading="btnLoading">提交</el-button>
        <el-button @click="resetForm('form')" v-if="current_add">重置</el-button>
      </el-form-item>
    </el-form>

    <mall-goods-copy
      :goodsShow="goodsShow"
      @changeDig="changeDig"
      @sureGood="sureGood"
      :isEvaluate="true"
    ></mall-goods-copy>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import imgLoad from "@/components/download/imgLoad";
import mallGoods from "@/components/Dialog/mallGoods";
import { optionLeves, optionsType } from "@/config/utils";
import MallGoodsCopy from '@/components/Dialog/mallGoodsCopy.vue';

export default {
  name: "evaluateInfo",
  components: { imgLoad, mallGoods,MallGoodsCopy },
  data() {
    return {
      loading: false,
      btnLoading: false,
      form: {
        // ImgList: ['http://localhost:8080/static/img/cardlogo.c62c92c.jpg', 'http://localhost:8080/static/img/pin1.a007f84.jpg'],
        // Details: 'hjghjhg'
        Leves: "1",
        StarClass: 5,
        IsShow: "1"
      },
      optionLeves: optionLeves,
      optionsType: optionsType,
      rules: {
        Type: [
          { required: true, message: "请选择评价类型", trigger: "change" }
        ],
        Name: [{ required: true, message: "请选择商品", trigger: "blur" }],
        Details: [{ required: true, message: "请填写评价", trigger: "blur" }]
      },
      goodsShow: false
    };
  },
  created() {
    if (this.$route.query.SID) {
      this.getInfo();
    }
  },
  computed: {
    current_add() {
      return !this.$route.query.SID || false;
    }
  },
  methods: {
    setImg(img) {
      return process.env.Prefix + img;
    },
    async getInfo() {
      try {
        this.loading = true;
        let data = await getLists(
          { Action: "GetAppraisement", SID: this.$route.query.SID },
          "MAppraisementOpera"
        );
        // console.log(data.Data.Appraisement)
        this.form = data.Data.Appraisement;
        this.form.ImgList = this.form.ImgList
          ? this.form.ImgList.split(",")
          : [];
        this.form.StarClass = Number(this.form.StarClass);
      } catch (e) {
        this.$message.error(e);
      }
      this.loading = false;
    },
    submitReply() {
      this.btnLoading = true;
      // console.log(this.form, 8888);
      this.$refs.form.validate(async valid => {
        if (valid) {
          let obj = {};
          Object.assign(obj, { Action: "SetAppraisement" });
          Object.assign(obj, { SID: this.$route.params.id });
          Object.assign(obj, { Type: this.form.Type });
          Object.assign(obj, this.form);

          if (obj.ImgList) {
            if (obj.ImgList.length > 0) {
              for (let i = 0; i < obj.ImgList.length; i++) {
                let item = obj.ImgList[i];
                obj.ImgList[i] =
                  item.indexOf(process.env.Prefix) !== -1
                    ? item.replace(process.env.Prefix, "")
                    : item;
              }
            }
            if (typeof obj.ImgList !== "string") {
              obj.ImgList = obj.ImgList.join(",");
            }
          }
          try {
            await getLists(obj, "MAppraisementOpera");
            this.$message.success("提交成功");
            this.btnLoading = false;
            this.$router.push('/weChat/manager/userEvaluate/index')
          } catch (e) {
            this.$message.error(e);
            this.btnLoading = false;
          }
        } else {
          return false;
        }
      });
    },
    upLoadImg(imgs) {
      let arr = [];
      let ti = imgs;
      for (let i = 0; i < ti.length; i++) {
        arr.push(ti[i].url);
      }
      this.form.ImgList = arr;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.imgLoad.currentImgs = [];
      this.form.ImgList = "";
      this.form.StarClass = 5;
      this.form.Leves = "1";
    },
    selectGoods() {
      this.goodsShow = true;
    },
    changeDig(bool) {
      this.goodsShow = bool;
    },
    sureGood(row) {
      this.form.GoodsSID = row.SID;
      this.form.Name = row.Name;
    }
  }
};
</script>

<style lang="less">
.evaluateInfo {
  .el-textarea,
  .el-select,
  .el-input {
    width: 300px;
  }

  .DetailsImg {
    width: 150px;
    height: 150px;
    overflow: hidden;
    margin-top: 13px;
    border: 1px solid #fff;
    display: inline-block;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
