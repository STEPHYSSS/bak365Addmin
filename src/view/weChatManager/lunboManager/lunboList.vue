<template>
  <!-- 轮播列表 -->
  <div class="lunboManager">
    <el-form :model="ruleForm" ref="ruleForm" label-width="150px" v-loading="loading">
      <el-form-item label="商品图片" prop="ImgList">
        <imgLoad
          folder="LabelImg"
          :isAutoFixed="true"
          @upLoadImgs="upLoadImgsList"
          :fileListUp="fileListUpList"
          :limit="6"
        ></imgLoad>(建议尺寸:800*800;大小:小于2M;格式:JPG,PNG,JPEG)
      </el-form-item>
    </el-form>
    <div class="preserveStyle">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" style="margin-left:20px" @click="preserveFun">保存</el-button>
    </div>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import imgLoad from "@/components/download/imgLoad";
import { addScroll, ImgList, replacePre } from "@/config/publicFunction";
export default {
  data() {
    return {
      tableData: [], //轮播列表
      loading: false,
      // 显示在页面的商品图片
      fileListUpList: [],
      ruleForm: {},
    };
  },
  mounted() {
    this.getLunbo();
  },
  components: {
    imgLoad
  },
  methods: {
    // 获取列表
    async getLunbo() {
      this.loading = true;
      try {
        let { Data } = await getLists(
          {
            Action: "GetImgs",
            Type: 4
          },
          "MBaseOpera"
        );
        let lunbo = Data.Imgs;
        let obj = [];
        let obj2 = {}
        lunbo.forEach((item,index) => {
          obj2 = item.Img ? { url: process.env.Prefix + item.Img }: {};
          obj.push(obj2)
        });
        this.fileListUpList = obj
        this.loading = false;
      } catch (e) {
        this.$message.error(e);
        this.loading = false;
      }
    },
    // 更新图片列表
    upLoadImgsList(ImgList) {
      // 图片集
      var b = ImgList.map((item, index) => {
        return {
          Img: item.Img || item.url.substring(3),
          Sort: index
        };
      });      
      this.ruleForm.ImgList = JSON.stringify(b);
    },
    cancelFun() {
      // 取消
      this.$router.push("/weChat/manager/goodSetting");
    },
    // 保存
    preserveFun() {
      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        } else {
          let obj2 = {
            Action: "SetImg",
            Type: 4,
            Img: this.ruleForm.ImgList
          };
          let { Data } = await getLists(obj2, "MBaseOpera");
          this.$message("上传成功");
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>
