<template>
  <div class="imgLoadFa">
    <!-- 头像上传模式 -->
    <el-upload
      ref="upload"
      class="upload-demo"
      action
      :limit="limit"
      :on-exceed="onExceed"
      :auto-upload="false"
      :file-list="fileList"
      :on-change="changeUpload"
      :on-remove="onRemove"
      :http-request="upload"
      :accept="accept"
      list-type="picture"
      v-if="showFileList"
      :show-file-list="showFileList"
    >
      <img style="width: 100%; height: 100%;" v-if="imageUrl||fileListUrl" :src="fileListUrl?fileListUrl:imageUrl" class="avatar" />
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
        :style="{'width':imgWidth,'height':imgHeight,'line-height':imgHeight}"
      ></i>
    </el-upload>
    <!-- 组上传模式 -->
    <el-upload
      v-else
      ref="upload"
      class="upload-demo"
      action
      :limit="limit"
      :on-exceed="onExceed"
      :auto-upload="false"
      :file-list="fileList"
      :on-change="changeUpload"
      :on-remove="onRemove"
      :http-request="upload"
      :accept="accept"
      list-type="picture-card"
    >
      <!--      image/jpeg,,image/pdf,image/jpg,image/png-->
      <el-button size="small" type="primary">+加图</el-button>
      <!--      <div slot="tip" class="el-upload__tip">不能超过{{this.sizeMax}}{{this.isM ? 'M' : 'kb'}}</div>-->
    </el-upload>

    <el-dialog
      :visible.sync="dialogVisible"
      style="text-align: center;"
      append-to-body
      :close-on-click-modal="false"
      width="700px"
      @close="closeDialog"
    >
      <div v-loading="realTimeLoad">
        <div :style="parentStyle">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :outputType="option.outputType"
            :autoCropWidth="option.cropWidth"
            :autoCropHeight="option.cropHeight"
            :fixed="option.fixed"
            @realTime="realTime"
            :infoTrue="true"
            :enlarge="enlarge"
          ></vueCropper>
        </div>
        <div class="btn">
          <el-button @click="cancel">取消裁剪</el-button>
          <el-button @click="save">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import { UploadImg, UploadImgBase } from "@/api/user";

export default {
  // name: "imgLoad",
  components: { VueCropper },
  props: {
    // 图片路径（传到后台的路径，给的固定值）
    folder: String,
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    cropWidth: {
      // X2 = 截图框大小  2是enlarge
      type: Number,
      default: 0
    },
    cropHeight: {
      type: Number,
      default: 0
    },
    // sizeOption: {
    //   type: Number,
    //   default: 0.8
    // },
    limit: {
      //最多上传多少张
      type: Number,
      default: 6
    },
    enlarge: {
      type: Number,
      default: 2
    },
    fileListUp: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileListUrl: [String, Number],
    isCoverCurrentImgs: {
      //当给fileListUp默认值的时候，是否覆盖掉已上传的值
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: "image/jpeg,image/jpg,image/png"
    },
    sizeMax: {
      // 单位kb 1m = 1024kb 默认500kb
      type: Number,
      default: 2
    },
    isM: {
      // 是否是单位 M
      type: Boolean,
      default: true
    },
    isAutoFixed: {
      // 长度自由截图 (true只能正方形截图)
      type: Boolean,
      default: false
    },
    mustScreen: {
      //必须截图
      type: Boolean,
      default: false
    },
    showFileList: {
      //用户头像上传
      type: Boolean,
      default: false
    },
    imgWidth: {
      //用户头像上传时imgWidth
      type: String,
      default: "120px"
    },
    imgHeight: {
      //用户头像上传时imgWidth
      type: String,
      default: "120px"
    }
  },
  data() {
    return {
      // 列表图片
      // fileList: [{
      //   name: 'food.jpeg',
      //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      // }, {
      //   name: 'food2.jpeg',
      //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      // }],
      dialogVisible: false,
      option: {
        img: "",
        size: 1,
        canScale: true,
        autoCrop: true,
        outputType: "jpeg",
        fixed: this.isAutoFixed, //是否开启截图框宽高固定比例
        cropWidth: this.cropWidth, //默认生成截图框宽度 容器的80%
        cropHeight: this.cropHeight
      },
      currentImgs: [],
      showImgs: [],
      removeList: [],
      propstrue: false,
      // fileList: [],
      imageUrl: "",
      realTimeLoad: true
    };
  },
  mounted() {},
  computed: {
    parentStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        display: "inline-block"
      };
    },
    fileListUpProp() {
      // 获取到默认的图片
      if (this.propstrue) {
        // 当有操作onRemove的时候，默认图片为空
        return [];
      } else {
        return this.fileListUp;
      }
    },
    fileList() {
      if (this.currentImgs.length > 0 && !this.isCoverCurrentImgs) {
        // isCoverCurrentImgs是否有操作
        if (this.fileListUpProp.length > 0 && this.limit > 1) {
          return this.fileListUpProp.concat(this.currentImgs);
        }
        return this.currentImgs;
      } else if (this.fileListUpProp) {
        // 是否传过来数组
        return this.fileListUpProp;
      } else {
        return [];
      }
    }
  },
  methods: {
    onExceed() {
      this.$message.info(`最多上传${this.limit}张！`);
    },
    changeUpload(file, fileList) {
      this.$nextTick(() => {
        this.option.img = file.url;
        this.dialogVisible = true;
      });
      this.showImgs = fileList;
    },
    closeDialog() {
      // 点击上角x,不上传
      this.showImgs.pop();
    },
    onRemove(file, fileList) {
      this.propstrue = true;
      this.currentImgs = fileList;
      this.$emit("upLoadImgs", fileList);
    },
    beforeAvatarUpload(file) {
      let isLt2M;
      if (this.isM) {
        isLt2M = Number(file.size) / 1024 / 1024 < this.sizeMax;
      } else {
        isLt2M = Number(file.size) / 1024 / 1024 / 1024 < this.sizeMax;
      }
      if (!isLt2M) {
        this.$message.error(
          `上传头像图片大小不能超过${this.sizeMax + (this.isM ? "M" : "kb")}!`
        );
        return false;
      } else {
        return true;
      }
    },
    successUpload(response, file, fileList) {},
    upload(options) {
      if (!this.beforeAvatarUpload(options.file)) {
        return false;
      }
      // 自定义上传
      UploadImg(options.file, this.folder)
        .then(D => {
          if (this.showFileList) {
            // this.imageUrl = process.env.Prefix + D.Message;
            this.imageUrl = D.Message;
            this.$emit("upLoadImgs", this.imageUrl);
            return;
          }

          this.currentImgs.push({
            // url: process.env.Prefix + D.Message
            url: D.Message
          });
          this.$emit("upLoadImgs", this.fileList);
        })
        .catch(e => {
          this.showImgs.pop();
          this.$message.error(e);
        });
    },
    cancel() {
      this.dialogVisible = false;
      if (!this.mustScreen) {
        this.$refs.upload.submit();
      }
    },
    save() {
      // console.log(process.env.Prefix,'111')
      // this.$refs.cropper.getCropBlob((data) => {
      // console.log(JSON.stringify(data), 6666)
      // })
      this.dialogVisible = false;
      this.$refs.cropper.getCropData(data => {
        let filte = { size: UrlSize(data) };
        if (!this.beforeAvatarUpload(filte)) {
          return false;
        }
        UploadImgBase(data, this.folder)
          .then(D => {
            if (this.showFileList) {
              
              this.imageUrl = process.env.Prefix + D.Message;
              this.$emit("upLoadImgs", this.imageUrl);
              return;
            }
            this.currentImgs.push({
              url: process.env.Prefix + D.Message
            });
            this.$emit("upLoadImgs", this.fileList);
          })
          .catch(e => {
            // 没上传成功
            this.showImgs.pop();
            this.$message.error(e);
          });
      });
    },
    realTime(data) {
      if (data.w > 0) {
        this.realTimeLoad = false;
      }
    }
  },
  watch: {
    fileListUrl(url) {
      if (!url) {
        this.imageUrl = "";
      }
    },
    dialogVisible(val) {
      if (val) {
        this.realTimeLoad = true;
      }
    }
  }
};

function UrlSize(baseStr) {
  let tag = "base64";
  baseStr = baseStr.substring(baseStr.indexOf(tag) + tag.length);
  let eqTagIndex = baseStr.indexOf("=");
  baseStr = eqTagIndex !== -1 ? baseStr.substring(0, eqTagIndex) : baseStr;
  let strLen = baseStr.length;
  let fileSize = strLen - (strLen / 8) * 2;
  return fileSize;
}
function dataURLtoFile(dataurl) {
  //将base64转换为文件
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], "img", { type: mime });
}
</script>

<style lang="less">
.imgLoadFa {
  .imgLoad {
    .v-modal {
      z-index: 2000;
    }
  }

  .el-upload__tip {
    margin-top: 15px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
}
</style>
