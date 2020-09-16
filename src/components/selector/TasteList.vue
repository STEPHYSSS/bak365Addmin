<template>
  <div class="tasteListSelect">
    <!-- 口味2 标签0 配件3 单据内容4 选择 -->
    <el-select
      v-model="value"
      :multiple="multiple"
      filterable
      :allow-create="allowCreate"
      default-first-option
      @change="changeTaste"
      :placeholder="placeholder"
    >
      <el-option v-for="(item,i) in options" :key="i" :label="item.Name" :value="item.SID"></el-option>
    </el-select>
    <div v-if="Type == 2" style="width:150px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button type="text" style="padding:5px" @click="mouldChange(true)" :class="isMould?'mouldStyle':''">模板选择</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="text" style="padding:5px" @click="mouldChange(false)" :class="isMould?'':'mouldStyle'">口味选择</el-button>
        </el-col>
      </el-row>

      <!-- <el-button
        style="display:block;margin-left: 5px;margin-right:5px"
        type="text"
        @click="mouldChange(true)"
      >模板选择</el-button>-->
      <!-- <el-button
        type="text"
        style="display:block;margin-left: 5px;margin-right:5px"
        @click="mouldChange"
      >口味选择</el-button>-->
    </div>
  </div>
</template>

<script>
import { getLists } from "@/api/vipCard";
import _ from "lodash";

export default {
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    Type: {
      //口味2 标签0 配件3 单据内容4
      type: Number || String,
      default: null
    },
    allowCreate: {
      //是否允许用户创建新条目
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    valueCurrent: [Array, String]
  },
  data() {
    return {
      loading: false,
      options: [],
      value: [],
      isMould: false,
      ModeList: [],
      noModeList: []
    };
  },
  computed: {},
  async created() {
    if (this.Type == 2) {
      this.getModeList();
    }
    try {
      let action = Number(this.Type) === 3 ? "GetPartsList" : "GetParamList";
      let opera = Number(this.Type) === 3 ? "MProdOpera" : "MBaseOpera";
      let { Data } = await getLists({ Action: action, Type: this.Type }, opera);
      // console.log(Data, 99999)

      if (Number(this.Type) === 3 && Data.ProdPartsList) {
        // 获取开启的
        let arr = _.differenceBy(Data.ProdPartsList, [{ State: "0" }], "State");
        this.options = arr;
        this.options.forEach(D => {
          D.SID = D.ProdNo;
        });
      } else {
        if (Data.ParamInfoList.length > 0) {
          Data.ParamInfoList.forEach((D, i) => {
            D.id = i;
          });
        }
        this.options = Data.ParamInfoList || [];
      }

      if (Number(this.Type) === 2) {
        this.value = this.valueCurrent;
        // 口味只传名字
        this.options.forEach(D => {
          D.SID = D.Name;
        });
        this.noModeList = this.options;
      }
    } catch (e) {
      this.$message.error(e);
    }
  },
  methods: {
    changeTaste(val) {
      let paramsArr = [];
      let newArr = [];
      if (this.Type == 2) {
        paramsArr = JSON.parse(JSON.stringify(val));
        // console.log(paramsArr, "paramsArr11111111");
        for (let j = 0; j < paramsArr.length; j++) {
          let D = paramsArr[j];
          let index = j;
          if (!D) {
            delete paramsArr[index];
            continue;
          }
          if (D.indexOf(",") > -1) {
            D = D.split(",");
            newArr = newArr.concat(D);
            delete paramsArr[index];
          }
        }
        if (newArr.length > 0) {
          //模板和单个合并
          paramsArr = paramsArr.concat(newArr);
        }
      } else {
        paramsArr = val;
      }
      let hash = []; //去重
      for (let i = 0; i < paramsArr.length; i++) {
        if (!paramsArr[i]) {
          continue;
        }
        if (hash.indexOf(paramsArr[i]) === -1) {
          hash.push(paramsArr[i]);
        }
      }
      paramsArr = hash;
      this.$emit("changeTaste", paramsArr);
    },
    mouldChange(bool) {
      this.isMould = bool ? true : false;

      if (this.isMould) {
        this.options = this.ModeList;
      } else {
        this.options = this.noModeList;
      }
    },
    async getModeList() {
      try {
        let { Data } = await getLists(
          { Action: "GetParamList", Type: 21 },
          "MBaseOpera"
        );
        this.ModeList = Data.ParamInfoList;
        this.ModeList.forEach(D => {
          D.SID = D.Name;
        });
      } catch (e) {}
    }
  },
  watch: {
    valueCurrent(val) {
      this.$nextTick(() => {
        this.value = val;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mouldStyle{
  border:1px solid #409EFF;
}
</style>
