<template>
  <div id="qrcode" ref="qrcode"></div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  props: {
    newText: String,
    newWidth: {
      type: Number,
      default: 100
    }
  },
  mounted() {
    this.qrCode = new QRCode("qrcode", {
      width: this.newWidth, //二维码宽度，单位像素
      height: this.newWidth, //二维码高度，单位像素
      text: this.newText, //二维码中的内容
      colorDark: "#000000", //前景色
      colorLight: "#ffffff", //背景色
      correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
    });
  },
  methods: {}
};
</script>

<style scoped>
</style>