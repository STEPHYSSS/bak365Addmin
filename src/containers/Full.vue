<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '../components/full/Header'
import Sidebar from '../components/full/Sidebar'
import AppFooter from '../components/full/Footer'
import Breadcrumb from '../components/full/Breadcrumb'

export default {
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  created() {
    if (this.$route.path === '/wechatCard/vip/newlyBuild') {
      $('body').css('overflow-x', 'hidden')
    } else {
      $('body').css('overflow-x', 'visible')
    }
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      let arr = this.$route.matched
      if (this.$route.meta.labelNoshow) {
        // 删除特定的nav 当前路由meta.labelNoshow 和 要被删除的meta.noshow
        arr.forEach((D, index) => {
          if (D.meta.noshow) {
            arr.splice(index, 1)
          }
        })
      }
      return this.$route.matched
    }
  },
  watch: {
    $route() {
      // if (this.$route.path === '/wechatCard/vip/newlyBuild') {
      //   $('body').css('overflow-x', 'hidden')
      // } else {
      //   $('body').css('overflow-x', 'scroll')
      // }
    }
  }
}
</script>
<style lang="sass">
  @import '../assets/css/style.css'
  @import '../assets/css/table.css'
  @import '../assets/css/index.css'
</style>
