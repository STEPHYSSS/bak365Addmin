<template>
  <div>
    <div
      class="van-notice-bar"
      content
      bg_color="#fff8e9"
      color="#666"
      type="notice"
      __zent-design-uuid__="f427e633-6a4f-4825-b68f-01edded1e829"
      :style="{'color': currentObj.textColor, 'background': currentObj.backGColor}"
    >
      <i class="van-icon van-icon--image van-notice-bar__left-icon">
        <img src="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
      </i>
      <div class="van-notice-bar__wrap" ref="vanNoticeBarW">
        <div
          v-if="!scrollable"
          ref="noticeTextTitle"
          class="van-notice-bar__content van-ellipsis"
          style="padding-left: 0px; animation-delay: 1s; animation-duration: 0s;"
        >{{currentObj.noticeText?currentObj.noticeText:"请填写内容，如果过长，将会自手机上滚动显示"}}</div>

        <div
          v-else
          ref="noticeTextTitle"
          class="van-notice-bar__content van-ellipsis"
          style="padding-left: 0px; animation-delay: 1s; animation-duration: 0s;"
        >
          <span
            v-if="!isScroll"
            ref="noticeTextTitle"
          >{{currentObj.noticeText?currentObj.noticeText:"请填写内容，如果过长，将会自手机上滚动显示"}}</span>
          <marquee v-else>
            <span>{{currentObj.noticeText?currentObj.noticeText:"请填写内容，如果过长，将会自手机上滚动显示"}}</span>
          </marquee>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from "../public";
export default {
  mixins: [Mixins],
  props: {
    propsObj: {
      type: Object,
      default() {
        return {
          noticeText: "",
          textColor: "rgb(102, 102, 102)",
          backGColor: "rgb(255, 248, 233)"
        };
      }
    }
  },
  data() {
    return {
      //在手机端组件时，记得把scrollable设置成true
      scrollable: false,
      isScroll: false
    };
  },
  mounted() {
    let noticeTextTitle = this.$refs.noticeTextTitle.offsetWidth;
    let vanNoticeBarW = this.$refs.vanNoticeBarW.offsetWidth;
    if (noticeTextTitle > vanNoticeBarW) {
      this.isScroll = true;
    }

  },
  methods: {
    reportErrorsFun(){
      if(!this.currentObj.noticeText){
        return '请填写公告'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-notice-bar {
  align-items: center;
  display: flex;
  height: 40px;
  padding: 0 15px;
  font-size: 14px;
  line-height: 24px;
  position: relative;
  overflow: hidden;
}
.van-icon--image {
  width: 1em;
  height: 1em;
  img {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    position: absolute;
  }
}
.van-icon {
  position: relative;
}
.van-notice-bar__left-icon {
  font-size: 16px;
  min-width: 20px;
  img {
    height: auto;
    vertical-align: baseline;
  }
}
.van-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}
.van-notice-bar__wrap {
  flex: 1;
  height: 40px;
  line-height: 44px;
  overflow: hidden;
  position: relative;
  margin-left:5px;
}
.van-notice-bar__content {
  position: absolute;
  white-space: nowrap;
}
.van-notice-bar__content.van-ellipsis {
  max-width: 100%;
}
</style>