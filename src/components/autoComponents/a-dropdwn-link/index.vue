<template>
  <div class>
    <!-- 选择链接，自定义链接, -->
    <div style="display:flex;align-items: center;">
      <div
        v-if="currentItemObj.name"
        style="border:1px solid rgba(51, 136, 255, 0.3);
            background: rgb(226, 243, 255);
            color: rgb(102, 102, 102);"
        class="zent-tag"
      >
        <div class="zent-tag-content" v-if="currentItemObj.id!==1">{{currentItemObj.name}}</div>

        <el-input v-if="currentItemObj.id===1" v-model="currentItemObj.url" placeholder="请输入链接" @change="changeInput"></el-input>

        <i class="el-icon-close zent-tag-close-btn" @click="clickDropdownDel"></i>
      </div>
      <el-dropdown @command="clickDropdown" style="float: right;">
        <a class="el-dropdown-link">
          <span v-if="!currentItemObj.name">选择跳转到的页面</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </a>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item" v-for="(item,index) in list" :key="index">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    currentItem: {
      type: Object,
      default() {
        return {
          name: "",
          url: ""
        };
      }
    }
  },
  data() {
    return {
      currentItemObj: this.currentItem,
      //链接列表
      list: [
        { url: "", name: "自定义链接", id: 1 },
        // { url: "https://www.baidu.com", name: "8888888" }
      ]
    };
  },
  components: {},
  mounted() {
    this.currentItemObj = this.currentItem;
  },
  computed: {
    //     currentI(val) {
    //       return this.currentItem;
    //     }
  },
  methods: {
    clickDropdown(val) {
      this.currentItemObj = val;
      this.$emit("clickDropdown", val);
    },
    clickDropdownDel() {
      //     清空
      this.currentItemObj.url = ''
      this.currentItemObj = {};
      this.$emit("clickDropdown", {});
    },
    changeInput(val){
      // this.currentItemObj.url = val
      this.$emit("clickDropdown", this.currentItemObj);
    }
  },
  watch: {
    currentItem() {
      this.currentItemObj = this.currentItem;
    }
  }
};
</script>

<style lang="less" scoped>
.zent-tag-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin-right: 0.417em;
}
.zent-tag-close-btn {
  cursor: pointer;
  cursor: pointer;
  margin: 3px;
  display: inline-block;
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  font-variant: normal;
  text-rendering: auto;
  text-decoration: inherit;
  line-height: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.zent-tag {
  display: flex;
  margin-right: 5px;
  -webkit-box-pack: justify;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  font-size: 12px;
  color: #fff;
  padding: 0.084em 0.417em;
  border-radius: 0.167em;
}
.zent-tag-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin-right: 0.417em;
}
.zent-tag-close-btn {
  cursor: pointer;
  cursor: pointer;
  margin: 3px;
  display: inline-block;
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  font-variant: normal;
  text-rendering: auto;
  text-decoration: inherit;
  line-height: 1;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>