<template>
  <!-- 商品属性的页面 -->
  <div class="tasteList">
    <el-button type="primary" @click="add">新增</el-button>
    <el-table :data="tableData" style="width: 90%; margin-top: 30px">
      <el-table-column prop="Name" label="商品属性名称" align="center">
      </el-table-column>
      <el-table-column label="商品属性值" align="center">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.AttributeList" :key="index">
             {{ AttributeJoin(item, index) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scoped">
          <el-button
            v-if="scoped.row.SID"
            type="text"
            @click="edit(scoped.row, scoped.$index)"
            >编辑</el-button
          >
          <el-button
            v-if="scoped.row.SID"
            type="text"
            @click="del(scoped.row, scoped.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="商品属性信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm">
        <el-form-item prop="Name" label="商品属性名" :rules="[{ required: true, message: '请输入商品属性名', trigger: 'blur'}]">
            <el-input v-model="ruleForm.Name" style="width:200px"></el-input>
            属性名排序：<el-input v-model="ruleForm.Sort" style="width:50px"></el-input>
            是否必选： <el-radio v-model="ruleForm.Radio" label="0">否</el-radio>
                      <el-radio v-model="ruleForm.Radio" label="1">是</el-radio>
          </el-form-item>
         <div v-for="(item, index) in ruleForm.SpecList" :key="index">
          <el-form-item :key="index + 1" :prop="'SpecList.' + index + '.ProdNo'" label="商品属性值" 
          :rules="[
            {max: 25, message: '不超过25个字符', trigger: 'blur' }]">
            <el-input v-model="item.Name" style="width:200px"></el-input>
            ￥<el-input v-model="item.Price" style="width:50px"></el-input>
            排序<el-input v-model="item.Sort" style="width:50px"></el-input>
            <el-radio v-model="defaultValue" :label="index " @click.native.prevent="changge(index)" border >默认</el-radio>
            <el-button @click="delGoodsNorms(index)">删除</el-button>
          </el-form-item>
         </div>
        <el-button type="info" @click="addGoodsNorms">添加</el-button>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getLists } from "@/api/vipCard";
export default {
  name: "tasteList",
  data() {
    return {
      defaultValue: -1, // 默认值
      tableData: [],
      ruleForm: {
        Name:'',
        Radio:'0',
        Sort:'',
        SpecList: [{
          Name: "",
          Price: 0,
          Sort: 0
        }],
      },
      eidtSID: "",
      dialogFormVisible: false,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    changge(index){
      if (index === this.defaultValue) {
        this.defaultValue = -1
      }else {
        this.defaultValue = index
      }
    },
    addGoodsNorms(){
      this.$nextTick(() => {
        this.ruleForm.SpecList.push({
          Name: "",
          Price:0,
          Sort:''
        });
      });
    },
    delGoodsNorms(index) {
       this.ruleForm.SpecList.splice(index, 1);
    },
    // 列表
    async getInfo() {
      let { Data } = await getLists(
        {
          Action: "GetParamList",
          Type: "2",
        },
        "MBaseOpera"
      );
      this.tableData = Data.ParamInfoList;
    },
    add() {
      //新增
      this.dialogFormVisible = true;
      this.eidtSID = "";
      this.ruleForm = {
        SpecList: [{
          Name: '',
          Price:0,
          Sort:''
        }],
        Name: '',
        Radio:'0',
        Sort:''
      }
    },
    edit(row) {
      //编辑
      this.dialogFormVisible = true;
      this.eidtSID = row.SID;
      this.detail(row.SID);
    },
    // 详情
    async detail(sid) {
      let { Data } = await getLists(
        {
          Action: "GetParamInfo",
          SID: sid,
          Type: "2",
        },
        "MBaseOpera"
      );
      this.ruleForm.Name = Data.ParamInfo.Name;
      this.ruleForm.Sort = Data.ParamInfo.Sort;
      this.ruleForm.Radio = Data.ParamInfo.Radio;
      this.ruleForm.SpecList = Data.ParamList;
      this.ruleForm.SpecList.forEach((item, index) => {
        if (item.IsDefault == 1) {
          this.defaultValue = index
        }
      });
    },
    // 确定按钮
    async sure() {
      try {
        let formData = this.ruleForm.SpecList.map((item,index)=>{
          return {
              Name: item.Name,
              Price: item.Price,
              Sort: item.Sort,
              IsDefault: 0
            };
        })
        if (this.defaultValue >= 0) {
          formData[this.defaultValue].IsDefault = 1
        }
        let { Data } = await getLists(
          {
            Action: "SetParamInfo",
            Name: this.ruleForm.Name,
            Radio:this.ruleForm.Radio,
            AttributeList: JSON.stringify(formData),
            Type: "2",
            SID: this.eidtSID ? this.eidtSID : "",
            Sort: this.ruleForm.Sort,
          },
          "MBaseOpera"
        );
        this.getInfo();
        this.dialogFormVisible = false;
      } catch (error) {
        this.$message.error(error)
      }
    },
    del(row) {
      //删除列表
      this.$confirm("是否删除此属性?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let { Data } = getLists(
            {
              Action: "RemoveParamInfo",
              SID: row.SID,
              Type: "2",
            },
            "MBaseOpera"
          );
          setTimeout(()=>{
            this.getInfo();
          },200)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    AttributeJoin() {
      return function (item, index) {
        if (index > 0) return `,  ${item.Name}(￥${item.Price})`;
        else return `${item.Name}(￥${item.Price})`;
      };
    },
  },
};
</script>