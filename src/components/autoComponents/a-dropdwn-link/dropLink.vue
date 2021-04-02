<template>
     <div class="dropLink">
          <el-menu mode="horizontal" :default-active="activeIndex">
               <el-submenu index="2">
                    <template slot="title" v-if="title!='自定义链接'">{{title}}</template>
                    <template slot="title" v-if="title=='自定义链接'">
                         <el-input v-model="currentItemObj.name" v-if="currentItemObj.id === 1" clearable placeholder="请输入链接" @change="changeInput"></el-input>
                    </template>                 
                    <el-menu-item index="2-1" v-for="(item, index) in list" :key="index" @click="handleSelect(item)">
                         <template slot="title">{{item.name}}</template>
                         <el-submenu index="2-2" v-if="item.name =='商品列表-自定义'">
                         <template slot="title">{{item.name}}</template>
                         <div class="dorp">
                              <el-menu-item index="2-2-1" v-for="(item,index) in obj" :key="index" @click="handleSelect(item)" >{{item.name}}</el-menu-item>
                         </div>
                    </el-submenu>
                    </el-menu-item>
               </el-submenu>
          </el-menu>
     </div>
</template>
<script>
import { GetAppNo,autoUrl } from "@/config/publicFunction";
import { getLists } from "@/api/vipCard";
export default {
     name:'dropLink',
     data(){
          return{
               activeIndex: '1',
               title:'选择跳转到的页面',
               list: [
                    { url: "", name: "自定义链接", id: 1 },
                    { name: "商城首页",url: autoUrl()},
                    { name: "商品列表-自定义", url: autoUrl()+ "pages/shoppingMall/list/goodsList"},
                    {name: "商品列表-点餐",url: autoUrl()+ "pages/shoppingMall/menu_naixue/menu/menu"},
                    {name: "购物车",url: autoUrl()+ "pages/shoppingMall/shoppingCart/index",},
                    {name: "个人中心",url: autoUrl()+ "pages/home"},
                    {name: "我的粉丝",url: autoUrl()+ "pages/vip/myFan"},
                    {name: "我的足迹",url: autoUrl()+ "pages/vip/FootPrint"},
                    {name: "申请团长",url: autoUrl()+ "pages/vip/applyLeader"},
                    {name: "付款码",url:"http://manage.bak365.cn/WebApp/WXCard/?Type=PayCode&AppNo=" + GetAppNo()},
                    {name: "微卡充值",url: autoUrl()+ "pages/vip/weiFull"},
                    {name: "订单列表",url: autoUrl()+ "pages/vip/allMyOrder"},
                    {name: "权益列表",url: autoUrl()+ "pages/packages/index"},
                    {name: "绑定实体会员卡",url:"http://manage.bak365.cn/WebApp/WXCard/?Type=ApplyCard&AppNo=" + GetAppNo()},
                    {name: "申请会员卡",url:"http://manage.bak365.cn/WebApp/WXCard/?Type=ApplyCard&AppNo=" +GetAppNo()},
                    {name: "地址管理",url: autoUrl()+ "pages/myAddress/myAddress"},
               ],
               obj:[],//分类列表
               
          }
     },
     props:{
          currentItemName:{
               type:String,
               default:''
          },
          currentItemUrl:{
               type:String,
               default:''
          },
          currentItem:Object,
          currentObj:Object
     },
     watch:{
          currentItemName:{
              immediate:true,
               handler(val){
                    this.title = val?val:'选择跳转到的页面';
                    console.log(val,'val1')
               }
          },
          currentItemUrl:{
              immediate:true,
               handler(val){
                    console.log(val,'val2')
               }
          },
          currentObj:{
               immediate:true,
               handler(val){
                    console.log(val,'888')
                    this.title = val.name
               }
          },
          currentItem:{
               deep:true,
               handler(val){
                    this.currentItemObj=val;
                    this.title = this.currentItemObj.urlObj.name?this.currentItemObj.urlObj.name:'选择跳转到的页面';
               }
          },
     },
     mounted(){
          // console.log(this.currentItem,'5555')
          this.getCateList();
     },
     methods:{
          async getCateList() {
               //获取分类列表
               try {
                    let { Data } = await getLists({ Action: "GetCateList" }, "MProdOpera");
                    this.CateData = Data.ProdCateList || [];
                    let query = { SID: "" };
                    this.CateData.forEach(item => {query.SID = item.SID;item.codeUrl = autoUrl()+"pages/shoppingMall/list/goodsList" +"?query=" +encodeURIComponent(JSON.stringify(query));});
                    this.obj = this.CateData.map((item,index)=>{
                         return {
                              name:item.Name,
                              url:item.codeUrl
                         }
                    })
               } catch (e) {
               this.$message.error(e);
               }
          },
           handleSelect(item) {
               this.title = item.name;
               this.currentItemObj = item;
               this.$emit("clickDropdown", item);
               // console.log(item);
          },
          changeInput(val) {
               this.currentItemObj.url = val;
               // console.log(this.currentItemObj.url)
               this.$emit("clickDropdown", this.currentItemObj);
          },
     },
     // watch:{
     //      currentItem:{
     //           deep:true,
     //           handler(val){
     //                console.log(val,'val');
     //                this.currentItemObj=val;
     //                console.log(this.currentItemObj,'yyy')
     //                this.title = this.currentItemObj.urlObj.name?this.currentItemObj.urlObj.name:'选择跳转到的页面';
     //           }
     //      },
     // }
}
</script>
<style lang="less" scoped>
.dropLink{
     /deep/.el-submenu__title{
          height: 40px !important;
          line-height: 40px !important;
     }
     /deep/.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,.el-submenu.is-active .el-submenu__title,.el-menu.el-menu--horizontal{
          border-bottom:0
     }
     .dorp{
          height: 300px;
          overflow: scroll;
     }
}
</style>