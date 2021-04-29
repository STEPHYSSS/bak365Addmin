<template>
  <navbar class="navBar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;
    </button>
    <div class="navbar-brand">
      <el-select v-model="valueCity" @change="chooseArea" placeholder="请选择地区" class="navbar-brandBtn">
        <el-option
          v-for="item in optionsCity"
          :key="item.Name"
          :label="item.Name"
          :value="item.SID">
        </el-option>
      </el-select>
      <!--      <el-button icon="el-icon-search" type="text" @click="searchNav">搜索</el-button>-->
      <el-dropdown>
        <div class="el-icon-star-on navbar-brandNav">导航</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link tag="div" to='/' class="nav-link">
              <span> 微信管理 </span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link tag="div" to='/wechatCard' class="nav-link">
              <span> 微卡设置 </span>
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--    <el-button type="primary" icon="el-icon-search" class="navbar-brand">搜索</el-button>-->
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul>

    <ul class="nav navbar-nav d-md-down-none navTop">
      <li class="nav-item header-item">
        <router-link tag="div" to='/' class="nav-link">
          <p style="color:white"> 微信管理 </p>
        </router-link>
      </li>
      <li class="nav-item header-item">
        <router-link tag="div" to='/wechatCard' class="nav-link">
          <p style="color:white"> 微卡设置 </p>
        </router-link>
      </li>
      <!--      <li class="nav-item header-item">-->
      <!--        <router-link tag="div" to='/home1' class="nav-link">-->
      <!--          <p style="color:white"> 浏览排行 </p>-->
      <!--        </router-link>-->
      <!--      </li>-->
      <!--      <li class="nav-item header-item">-->
      <!--        <router-link tag="div" to='/home1' class="nav-link">-->
      <!--          <p style="color:white"> 销量排行 </p>-->
      <!--        </router-link>-->
      <!--      </li>-->
    </ul>


    <ul class="nav navbar-nav ml-auto">
      <!-- <el-autocomplete
        class="navbarInputCenter"
        style="margin-right:30px"
        prefix-icon="el-icon-search"
        v-model="inputSearch"
        :fetch-suggestions="querySearch"
        placeholder="搜索"
        :trigger-on-focus="false"
        @select="handleSelect"
      > -->
        <template slot-scope="{ item }">
          <div style="text-overflow: ellipsis;overflow: hidden;">{{ item.value }}</div>
          <!--          <span style="font-size:12px;color:#b4b4b4">{{ item.address }}</span>-->
        </template>
      <!-- </el-autocomplete> -->

      <!--      <li class="nav-item d-md-down-none">-->
      <!--        <a class="nav-link" ><Icon type="android-notifications" size="20"></Icon><span class="badge badge-pill badge-danger">5</span></a>-->
      <!--      </li>-->
      <el-dropdown>
        <a href="javascript:void(0)">
          <!--           <span slot="button">-->
          <!--          <img src="../../assets/img/avatars/6.jpg" class="img-avatar" alt="o">-->
          <span>{{userName}}</span>
          <!--          </span>-->
        </a>
        <el-dropdown-menu slot="dropdown">
          <!--          <el-dropdown-item><p class="dropdown-itemp">狮子头</p></el-dropdown-item>-->
          <!--          <el-dropdown-item><p class="dropdown-itemp">狮子头</p></el-dropdown-item>-->
          <el-dropdown-item>
            <span href="" @click="Logouts"><p class="dropdown-itemp">退出登录</p></span>
            
          </el-dropdown-item>
          <el-dropdown-item>
            <div href="" @click="VersionInfo"><p>版本信息</p></div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>


      <li class="nav-item d-md-down-none">
        <!--        <a class="nav-link navbar-toggler aside-menu-toggler"  @click="asideToggle">&#9776;</a>-->
      </li>
    </ul>
  </navbar>
</template>
<script>

import navbar from './Navbar'
import {navSearch} from '../../config/navASearch'
import {mapGetters} from 'vuex';
import { getLists } from "@/api/vipCard";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      optionsCity: [],
      valueCity: '',
      inputSearch: '',
      restaurants: []
    }
  },
  computed: {
    ...mapGetters(['AreaNo', 'AreaList', 'AppNo', 'userName'])
  },
  created(){
    this.valueCity = localStorage.getItem("chooseArea")
    this.getAreaList();
  },
  mounted() {
    this.restaurants = navSearch;
  },
  methods: {
    Logouts(e) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({path: '/login?' + this.AppNo});
      }).catch(err => {
        this.$message.error(err);
      });
    },
    chooseArea(val){
      localStorage.setItem("chooseArea",val)
      this.$router.push({path:'/weChat/manager/Statistics'})
    },
    VersionInfo(){

    },
    click() {
      // do nothing
    },
    sidebarToggle(e) {
      document.body.classList.toggle('sidebar-hidden')
      e.preventDefault()
    },
    sidebarMinimize(e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle(e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    querySearch(queryString, cb) {
      // 所有的导航信息
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      results = results.splice(0, 10)

      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.address.toLowerCase().indexOf(queryString.toLowerCase()) >= 0 || restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
      }
    },
    handleSelect(item) {
      this.$router.push(item.url)
    },
    async getAreaList() {
      // 门店区域
      try {
        let { Data } = await getLists({ Action: "GetAreaList" }, "MShopOpera");        
        this.optionsCity = Data.AreaList;
        localStorage.setItem('AllAreaList',JSON.stringify(Data.AreaList));
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
  watch: {
    $route() {
    }
  }
}
</script>

<style type="text/css" lang="less">
  .el-autocomplete-suggestion {
    width: auto !important;
    max-width: 30% !important;
  }

  .navBar {
    .dropdown-itemp {
      text-align: left;
      font-size: 15px;
      padding: 10px;
    }

    .navbar-brandNav {
      margin-left: 20px;
      font-size: 28px;
      vertical-align: middle;
      color: #2d8cf0;
      display: none;
    }

    .navbar-brandBtn {
      margin-left: 20px;
      color: #fff;

      .el-input {
        width: 130px;
      }
    }

    .header-item .ivu-dropdown-item {
      padding: 15px;
    }

    .header-item {
      width: 130px;
    }

    .header-item a {
      color: white !important;
    }

    .valueCity {
      width: 150px;
      margin-right: 50px;
    }

    .navbarInputCenter {
      .el-input {
        width: 220px !important;
      }
    }
  }

</style>
