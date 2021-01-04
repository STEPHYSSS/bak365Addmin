<template>
  <div>
    <div
      :class="['cap-title',currentObj.traditionStyle=='1'?'cap-title--wx':'cap-title--normal']"
      :style="{'background-color': currentObj.backGColor, 'text-align': currentObj.textAlign}"
    >
      <h2 class="cap-title__main">
        {{currentObj.title?currentObj.title:'点击编辑『标题』'}}
        <span
          class="cap-title__custom-link"
          v-if="currentObj.navName"
        >
          -&nbsp;
          <a class="cap-title__link">{{currentObj.navName}}</a>
        </span>
      </h2>
      <p class="cap-title__sub" v-if="currentObj.traditionStyle=='0'&&currentObj.subtitle">
        <span class="cap-title__sub-title">{{currentObj.subtitle}}</span>
      </p>
      <p
        class="cap-title__sub"
        v-if="currentObj.traditionStyle=='1'&&(currentObj.dataTitle||currentObj.authorTitle||currentObj.titleUrlName)"
      >
        <span class="cap-title__set">
          <span class="cap-title__date" v-if="currentObj.dataTitle">{{currentObj.dataTitle}}</span>
          <span class="cap-title__author" v-if="currentObj.authorTitle">{{currentObj.authorTitle}}</span>
          <span>
            <a
              href="javascript:;"
              :style="{'margin-left':currentObj.dataTitle||currentObj.authorTitl?'10px':'0'}"
              class="cap-title__link js-open-follow"
            >{{currentObj.titleUrlName}}</a>
          </span>
        </span>
      </p>
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
          title: "",
          //0==>传统样式,1==>模仿微信图文页样式
          traditionStyle: "0",
          //left,center,right
          textAlign: "left",
          //   副标题
          subtitle: "",
          backGColor: "rgb(249, 249, 249)",
          //   导航名称
          navName: "",
          //   导航名称链接
          navNameUrl: "",
          //   日期
          dataTitle: "",
          authorTitle: "",
          titleUrlName: "",
          //   链接标题url
          titleUrl: ""
        };
      }
    }
  },
  data() {
    return {
      // currentObj: {
      //   title: this.propsObj.title,
      //   traditionStyle: this.propsObj.traditionStyle,
      //   textAlign: this.propsObj.textAlign,
      //   subtitle: this.propsObj.subtitle,
      //   backGColor: this.propsObj.backGColor,
      //   navName: this.propsObj.navName,
      //   navNameUrl: this.propsObj.navNameUrl,
      //   dataTitle: this.propsObj.dataTitle,
      //   authorTitle: this.propsObj.authorTitle,
      //   titleUrlName: this.propsObj.titleUrlName,
      //   titleUrl: this.propsObj.titleUrl
      // }
    };
  },
  computed: {},
  mounted() {
    // this.changeStyle();
  },
  methods: {
    reportErrorsFun() {
      if (!this.currentObj.title) {
        return "请填写标题内容";
      }
      if (
        this.currentObj.traditionStyle === "1" &&
        this.currentObj.titleUrlName &&
        !this.currentObj.titleUrl
      ) {
        // return "请填写标题的链接";
      }
    }
  }
};
</script>

<style scoped>
.cap-title {
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  word-break: break-all;
  position: relative;
}
.cap-title:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
}
.cap-title__main {
  margin: 0;
  font-size: 18px;
  line-height: 22px;
}
.cap-title__sub {
  color: #8c8c8c;
  margin: 5px 0 0;
}

.cap-title__date,
.cap-title__author {
  margin-left: 10px;
}
.cap-title__set span:nth-child(1) {
  margin-left: 0;
}
.cap-title__link {
  font-size: 12px;
  color: #07d;
}

.cap-title__custom-link {
  margin-left: 10px;
  color: #999;
}

.cap-title--wx .cap-title__sub {
  line-height: 1.6;
  font-size: 12px;
  font-weight: 400;
  margin-top: 5px;
}
.cap-title--wx .cap-title__link {
  color: #607fa6;
}
</style>
