<template>
  <div :id="randomId"></div>
</template>

<script>
import "../../../static/ueditor1/ueditor.config.js";
import "../../../static/ueditor1/ueditor.all.js";
import "../../../static/ueditor1/lang/zh-cn/zh-cn.js";
// import "@/config/jquery.base64.js"; 解码和绑码
// $.base64.atob('', "utf8") 解码
// Features.replace(  给富文本中的图片加../
//     /src="Files/g,
//     `src="${process.env.Prefix}Files`
//  );
// this.$refs.Features.setUEContent(Features);  设置
// getUEContent()   获取
//  Features.replace(/src="\.\.\/Files/g, `src="Files`);   去除富文本中的图片加的../

export default {
  name: "index",
  props: {
    // 默认数据
    // valText: {
    //   type: String,
    //   default: ''
    // }
    frameHeight: [String, Number]
  },
  data() {
    return {
      config: {
        autoHeightEnabled: false,
        autoFloatEnabled: false, //是否工具栏可浮动
        initialContent: "", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: 600,
        initialFrameHeight: this.frameHeight || 350,
        BaseUrl: "",
        elementPathEnabled: false,
        // UEDITOR_HOME_URL: './static/ueditor1/'
        UEDITOR_HOME_URL:
          process.env.NODE_ENV === "production"
            ? "./static/ueditor1/"
            : "/static/ueditor1/"
      },
      randomId: "editor1_" + Math.random() * 10000000000000000,
      // 当图片上传的时候避免与contentChange重复添加
      bool: true
    };
  },
  destoryed() {
    this.editor.destory();
  },
  updated() {},
  mounted() {
    this.editor = window.UE.getEditor(this.randomId, this.config);
    console.log(this.config)
    let _this = this;
    this.editor.addListener("simpleupload_customcomplete", function(
      //图片上传成功
      name,
      response
    ) {
      _this.bool = false;
      _this.$emit("blurUEContent", _this.editor.getContent());
    });

    this.editor.addListener("contentChange", function() {
      if (_this.bool) {
        _this.$emit("blurUEContent", _this.editor.getContent());
      }
    });

    // blur
  },
  methods: {
    getUEContent: function() {
      // 获取editor 里面的内容
      return this.editor.getContent();
    },
    setUEContent(val) {
      return this.editor.setContent(val);
       
    }
  },
  watch: {}
};
</script>

<style scoped>
</style>
