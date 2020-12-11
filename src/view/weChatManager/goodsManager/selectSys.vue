<template>
  <!-- 选择口味弹窗 -->
  <el-dialog title="选择商品属性" :visible.sync="dialogTasteVisible" :before-close="handleClose">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="selectTast" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in gridDataTaste" :label="item" :key="item.SID" style="display: block;">
        <template>          
          <span>{{item.Name}}</span>
          &nbsp;:
         <p style="display:inline-block; width:600px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;vertical-align: bottom;">
            <span v-for="(item2, index) in item.AttributeList" :key="index" :title="item2.Name">
            &nbsp;{{ item2.Name }}
          </span>
         </p>
        </template>
      </el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="sureTaste">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      gridDataTaste: Array, // 商品属性列表
      dialogTasteVisible: Boolean, // 控制对话框显示/隐藏
      comfirmSelectTast: Array  // 确认选中的商品属性
    },
    data() {
      return {
        checkAll: false, // 是否全选状态
        selectTast: [], // 选中的属性
        isIndeterminate: false, // indeterminate 状态，只负责样式控制
      };
    },
    created(){
      console.log(this.dialogTasteVisible)
    },
    mounted () {
      if (this.comfirmSelectTast && this.comfirmSelectTast.length) {
        this.selectTast = []
        for (const i of gridDataTaste) {
          for (const y of this.comfirmSelectTast) {
            if (i.SID === y.SID) {
              this.selectTast.push(i)
            }
          }
        }
      }
    },
    methods: {
      handleClose(){
        this.$emit('close')
      },
      // 全选操作
      handleCheckAllChange(val) {
        this.selectTast = val ? this.gridDataTaste : [];
        this.isIndeterminate = false;
      },
      // 选中值改变后回调
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.gridDataTaste.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.gridDataTaste.length;
      },
      // 确定
      sureTaste() {
        // let showArr = []
        // let name = ''
        // this.selectTast.forEach(item => {
        //   name = item.Name
        //   item.AttributeList.forEach(j => {
        //     name += (j.Name)
        //   });
        //   showArr.push(Name)
        // });
        // 排序
        this.selectTast.sort((a, b) => {
          return a.SID - b.SID
        })
        this.$emit('confirm', this.selectTast)
        this.$emit('close')
        // let newArr = [];
        // this.selectTast.forEach(D => {
        //   newArr.push(_.find(this.gridDataTaste, { SID: D }));
        // });
        // let abc = "";
        // let title = "";
        // newArr.forEach(item => {
        //   console.log(item)
        //   title = item.Name;
        //   let text = "";
        //   item.AttributeList.forEach(j => {
        //     text += j.Name + ",";
        //   });
        //   text = text.substring(0, text.length - 1);
        //   let dis = title + ":" + text + "\n";
        //   abc += dis;
        // });
        // this.ParamInfo2 = abc;
        // this.dialogTasteVisible = false;
        // console.log("传给后台的SID", this.selectTast);
      }
    }
  };
</script>