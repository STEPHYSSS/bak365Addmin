<template>
<!--  树形图-->
  <div>
    <el-tree ref="elTree"
             node-key="id"
             :data="dataTree"
             :props="defaultProps"
             :default-expand-all="defaultExpandAll"
             :highlight-current="highlight"
             :show-checkbox="showCheckbox"
             :expand-on-click-node="false"
             @check="checkChange"
             @node-click="handleNodeClick1">
    </el-tree>
  </div>
</template>

<script>
export default {
  props:{
    // 树形图数据
    dataTree:{
      type:Array,
      default:()=>{
        return []
      }
    },
    // 是否全部展开
    defaultExpandAll:{
      type:Boolean,
      default:true
    },
    // 是否高亮
    highlight:{
      type:Boolean,
      default:true
    },
    // 是否有多选
    showCheckbox:{
      type:Boolean,
      default:false
    },
    defaultProps: {
      type:Object,
      default:()=>{
        return {
          children: 'children',
          label: 'CateName'
        }
      }
    },
    CheckboxVal: {
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data(){
    return {
      value:'2333',
      setCurrentKey:[1,4],
    }
  },
  created(){
    // this.$nextTick(() => {
    //   $('.el-tree>.el-tree-node:first-child>.el-tree-node__content:first-child').trigger('click')
    // })
  },
  updated(){
  },
  mounted(){
    $(function () {
      $('.el-tree-node__content').mouseover(function () {
        this.titleShow = this.children[1].innerText
        $('.el-tree-node__content').attr('title', this.titleShow)
      })
    })
  },
  methods:{
    setCheckedKeys(arr){
      this.$refs.elTree.setCheckedKeys(arr)
    },
    handleNodeClick1(obj,node,def){
      // 点击节点
      console.log(obj,node,999)
      this.$emit('handleNodeClick',obj,'000')
    },
    checkChange(){
      // 点击选中框
      // 只获取子节点数据
      let arr = this.$refs.elTree.getCheckedNodes(true)
      this.$emit('checkChange',arr)
    }
  }
}
</script>

<style lang="less">
.el-tree-node:focus > .el-tree-node__content {
  background-color: #ccd1d8 !important;
}
</style>
