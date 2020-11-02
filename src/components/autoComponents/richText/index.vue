<template>
  <div class="richText">
    <div class="rc-design-vue-preview rc-design-component-text-preview">
      <div
        :class="['cap-richtext',currentObj.fullScreen==='1'||currentObj.fullScreen==='true'?'cap-richtext--fullscreen':'']"
        :style="{'background-color': currentObj.backGColor}"
        v-if="currentObj.contentRich"
        v-html="currentObj.contentRich"
      ></div>
      <div
        v-if="!currentObj.contentRich"
        :class="['cap-richtext',currentObj.fullScreen==='1'||currentObj.fullScreen==='true'?'cap-richtext--fullscreen':'']"
        color="#f9f9f9"
        content
        fullscreen="0"
        type="rich_text"
        __zent-design-uuid__="7b433852-3550-4a02-8758-d12af41e61ed"
        :style="{'background-color': currentObj.backGColor}"
      >
        <div>
          <p>点此编辑『富文本』内容 ——&gt;</p>
          <p>
            你可以对文字进行
            <strong>加粗</strong>、
            <em>斜体</em>、
            <span style="text-decoration: underline;">下划线</span>、
            <span style="text-decoration: line-through;">删除线</span>、文字
            <span style="color: rgb(0, 176, 240);">颜色</span>、
            <span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号
            <span style="font-size: 20px;">大</span>
            <span style="font-size: 14px;">小</span>等简单排版操作。
          </p>
          <p>还可以在这里加入表格了</p>
          <table>
            <tbody>
              <tr>
                <td width="93" valign="top" style="word-break: break-all;">中奖客户</td>
                <td width="93" valign="top" style="word-break: break-all;">发放奖品</td>
                <td width="93" valign="top" style="word-break: break-all;">备注</td>
              </tr>
              <tr>
                <td width="93" valign="top" style="word-break: break-all;">猪猪</td>
                <td width="93" valign="top" style="word-break: break-all;">内测码</td>
                <td width="93" valign="top" style="word-break: break-all;">
                  <em>
                    <span style="color: rgb(255, 0, 0);">已经发放</span>
                  </em>
                </td>
              </tr>
              <tr>
                <td width="93" valign="top" style="word-break: break-all;">大麦</td>
                <td width="93" valign="top" style="word-break: break-all;">积分</td>
                <td width="93" valign="top" style="word-break: break-all;">
                  <a href="javascript: void(0);" target="_blank">领取地址</a>
                </td>
              </tr>
            </tbody>
          </table>
          <p style="text-align: left;">
            <span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from "../public";
export default {
  mixins: [Mixins],
  name: "",
  props: {
    propsObj: {
      type: Object,
      default() {
        return {
          backGColor: "0",
          fullScreen: "0",
          contentRich: ""
        };
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  mounted() {
  },
  methods: {
     reportErrorsFun(){
      if(!this.currentObj.contentRich){
        return '请填写富文本内容'
      }
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/css/autoComponents/goods.css";
.richText {
  table {
    border-collapse: collapse !important;
  }
}
</style>