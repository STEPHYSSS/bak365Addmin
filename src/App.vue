<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: "App",
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  created() {
    if (typeof Array.prototype.forEach != "function") {
      Array.prototype.forEach = function(fn, context) {
        for (let k = 0, length = this.length; k < length; k++) {
          if (
            typeof fn === "function" &&
            Object.prototype.hasOwnProperty.call(this, k)
          ) {
            fn.call(context, this[k], k, this);
          }
        }
      };
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
};
</script>

<style lang="less">
@import "./assets/css/index.less";
@import "./assets/icon/iconfont.css";

.el-message {
  z-index: 5000 !important;
}
body {
  background-color: #fff;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "12px Extra Small";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 100%;
}
a,
abbr,
acronym,
address,
applet,
article,
aside,
audio,
b,
big,
blockquote,
body,
canvas,
caption,
center,
cite,
code,
dd,
del,
details,
dfn,
div,
dl,
dt,
em,
embed,
fieldset,
figcaption,
figure,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
header,
hgroup,
html,
i,
iframe,
img,
ins,
kbd,
label,
legend,
li,
mark,
menu,
nav,
object,
ol,
output,
p,
pre,
q,
ruby,
s,
samp,
section,
small,
span,
strike,
strong,
sub,
summary,
sup,
table,
tbody,
td,
tfoot,
th,
thead,
time,
tr,
tt,
u,
ul,
var,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  // line-height: initial;
  }
p {
  line-height: initial;
}
input {
  background: none;
  outline: none;
  border: none;
}

.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
div::-webkit-scrollbar {
  /*滚动条整体样式*/
  height: 10px;
}
.block{
    background: #fff;
    text-align: right;
    padding: 10px 0;
  }
// .preserveStyle {
//   position: fixed;
//   background: #fff;
//   width: 100%;
//   text-align: center;
//   transform: translateX(-30px);
//   bottom: 0;
//   z-index: 1100;
//   padding: 15px 0;
// }
// .preserveStyle button {
//   transform: translateX(-80px);
// }

.preserveStyle {
  position: fixed;
  background: #fff;
  width: 100%;
  text-align: center;
  transform: translateX(-30px);
  bottom: 0;
  z-index: 1100;
  padding: 15px 0;
}
.preserveStyle button {
  transform: translateX(-80px);
}
.m-colorPicker .box{
  width: 214px !important;
}
.m-colorPicker .hd .colorView{
  width: 30px !important;
}
.m-colorPicker .colorBtn{
  width: 30px !important;
  height: 30px !important;
}
.el-table__body tr.current-row>td{
  background-color: #c1d7ec;
}
</style>
