<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <template v-for="(item,index) in routes">
          <router-link
            tag="li"
            class="nav-item nav-dropdown"
            v-if="!item.hidden&&item.children&&item.children.length>0"
            :to="item.path+''+item.children[0].path"
            disabled
            :key="index"
          >
            <div class="nav-link nav-dropdown-toggle" @click="handleClick">
              {{ item.meta.label}}
            </div>
            <ul class="nav-dropdown-items">
              <li
                class="nav-item"
                v-for="(child,index) in item.children"
                :key="index"
                @click="addActive"
              >
                <div v-if="!child.hidden&&!child.isHidden">
                  <router-link
                    :to="item.path+'/'+child.path+'/'+child.children[0].path"
                    class="nav-link"
                    v-if="!child.hidden&&child.children"
                    :disabled="controlNavClick"
                  >{{ child.meta.label}}</router-link>
                  <router-link
                    :to="item.path+'/'+child.path"
                    class="nav-link"
                    v-else-if="!child.children"
                    :disabled="controlNavClick"
                  >{{ child.meta.label}}</router-link>
                </div>
              </li>
            </ul>
          </router-link>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    routes: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      e.target.parentElement.classList.toggle("open");
    },
    addActive(e) {
      e.preventDefault();
      e.target.parentElement.parentElement.parentElement.classList.add("open");
    }
  },
  computed: {
    // 控制当在获取数据的时候，不然点击
    ...mapGetters(["controlNavClick"])
  },
  mounted() {
    // console.log(this.routes);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-icon {
  margin-right: 10px;
}

.nav-link {
  text-align: center;
}

.hideSidebar .menu-indent {
  display: block;
  text-indent: 10px;
}
</style>

