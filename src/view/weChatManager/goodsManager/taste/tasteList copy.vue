<template>
<!-- 商品属性的页面 -->
  <div class="tasteList">
    <el-button type="primary" @click="add">新增</el-button>
    <el-table :data="tableData" style="width: 90%; margin-top: 30px">
      <el-table-column prop="Name" label="商品属性名称" align="center">
      </el-table-column>
      <el-table-column label="商品属性值" align="center">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.AttributeList" :key="index">
            <!-- {{item.Name +`(￥` + item.Price +`)`}} -->
             {{AttributeJoin(item, index)}}
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
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item prop="Name" label="商品属性名"
          :rules="[{ required: true, message: '请输入商品属性名', trigger: 'blur'}]">
            <el-input v-model="dynamicValidateForm.Name" style="width:200px"></el-input>
            属性名排序：<el-input v-model="dynamicValidateForm.Sort" style="width:50px"></el-input>
          </el-form-item>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          label="商品属性值"
          :key="index" 
          :prop="'domains.' + index + '.Name'"
          :rules="[{
            required: true, message: '属性值不能为空', trigger: 'blur'
          },{max: 25, message: '不超过25个字符', trigger: 'blur' }]"
        >
          <el-input v-model="domain.Name" style="width:200px"></el-input>
          ￥<el-input v-model="domain.Price" style="width:50px"></el-input>
          排序<el-input v-model="domain.Sort" style="width:50px"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增属性值</el-button>
        </el-form-item>
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
      tableData: [],
      dynamicValidateForm: {
        domains: [{
          Name: '',
          Price:0,
          Sort:0
        }],
        Name: '',
        Sort:0
      },
      eidtSID:'',
      dialogFormVisible: false,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    addDomain() {
        this.dynamicValidateForm.domains.push({
          Name: '',
          Price:0,
          Sort:'',
          key: Date.now()
        });
        // this.$set(this.dynamicValidateForm,this.dynamicValidateForm.domains,this.dynamicValidateForm.domains)
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
        // this.$set(this.dynamicValidateForm,this.dynamicValidateForm.domains,this.dynamicValidateForm.domains)
      }
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
    add() {//新增
      this.dialogFormVisible = true;
      this.dynamicValidateForm = {}
      this.eidtSID = "";
      this.dynamicValidateForm = {
        domains: [{
          Name: '',
          Price:0,
          Sort:''
        }],
        Name: ''
      }
      
    },
    edit(row){//编辑
      this.dialogFormVisible = true;
      this.eidtSID = row.SID;
      this.detail(row.SID);     
    },
    // 详情
    async detail(sid){
      let { Data } = await getLists(
        {
          Action: "GetParamInfo",
          SID:sid,
          Type: "2",
        },
        "MBaseOpera"
      );
      this.dynamicValidateForm = Data.ParamInfo;
      this.dynamicValidateForm.domains = Data.ParamList;
    },
    // 确定按钮
    async sure() {
      this.dynamicValidateForm.domains = this.dynamicValidateForm.domains.map((item, index) => {
        return {
          Name: item.Name,
          Price:item.Price,
          Sort:item.Sort
        };
      });
      let { Data } = await getLists(
        {
          Action: "SetParamInfo",
          Name: this.dynamicValidateForm.Name,
          AttributeList: JSON.stringify(this.dynamicValidateForm.domains),
          Type: "2",
          SID:this.eidtSID?this.eidtSID:'',
          Sort:this.dynamicValidateForm.Sort
        },
        "MBaseOpera"
      );
      this.getInfo();
      this.dialogFormVisible = false;
    },
    del(row){//删除列表
    this.$confirm('是否删除此属性?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let { Data } =  getLists(
            {
              Action: "RemoveParamInfo",
              SID:row.SID,
              Type: "2",
            },
            "MBaseOpera"
          );
          this.getInfo();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  computed:{
    AttributeJoin () {
        return function (item, index) {
          if (index > 0) return `,  ${item.Name}(￥${item.Price})`
          else return `${item.Name}(￥${item.Price})`
        }
      },
  }
};
</script>