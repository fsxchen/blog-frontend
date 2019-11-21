<template>
  <div class="simple-header" v-if="siteInfo">
    <!-- <head-room :speed="600" :zIndex="1003" style="position: fixed;"> -->
    <header>
      <div id="mobile-bar">
        <!-- <router-link class="logo" to="/"> -->
        <img :src="siteInfo.icon">
        <!-- </router-link> -->
        <transition name="fade">
          <!-- <div class="search-area" v-show="showMobileSearchView">
            <search-view></search-view>
          </div> -->
        </transition>
        <!-- <a class="menu-button" @click="showMobileMenu"></a -->
        <!-- <a class="search-button" @click="showSearchView"></a> -->
      </div>
      <div id="header" class="show">
        <router-link id="logo" to="/">
          <img :src="siteInfo.icon">
          <div class="info">
            <span class="name">{{ siteInfo.name }}</span>
            <span class="desc">{{ siteInfo.desc }}</span>
          </div>
        </router-link>
        <ul id="nav">
          <!-- 搜索框 -->
          <!-- <li class="search-area">
            <search-view></search-view>
          </li> -->
          <!-- 类别导航 -->
          <li
            class="nav-dropdown-container"
            v-for="category_level1 in allCategorysInfo"
            v-if="category_level1.is_tab"
          >
            <router-link class="nav-link" :to="rootRouterLink(category_level1)">
              {{ category_level1['name'] }}
              <span class="arrow"></span>
            </router-link>
            <ul class="nav-dropdown" v-if="category_level1.sub_category.length > 0">
              <li
                v-for="category_level2 in category_level1.sub_category"
                v-if="category_level2.is_tab"
              >
                <router-link
                  class="nav-link"
                  :to="routerLink(category_level2)"
                >{{ category_level2['name'] }}</router-link>
                <ul class="nav-dropdown">
                  <li
                    v-for="category_level3 in category_level2.sub_category"
                    v-if="category_level3.is_tab"
                  >
                    <router-link
                      class="nav-link"
                      :to="routerLink(category_level3)"
                    >{{ category_level3['name'] }}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <!-- 自定义的导航 -->
          <li class="nav-dropdown-container" v-for="navigation in siteInfo.navigations">
            <nuxt-link
              class="nav-link"
              :to="navigation.url"
              :target="navigation.target"
            >{{ navigation['name'] }}</nuxt-link>
          </li>
          <li class="switches">
            <ButtonGroup size="small">
              <i-button
                style="width:30px;"
                :icon="isDark ? 'android-sunny' : 'ios-moon'"
                @click="toggleTheme"
              ></i-button>
              <i-button style="width:40px;" @click="toggleLanguage">
                <!-- {{ $i18n.locale === 'EN' ? '中文' : 'EN' }} -->
                中文
              </i-button>
            </ButtonGroup>
          </li>
        </ul>
      </div>
    </header>
    <!-- </head-room> -->
    <side-bar :categorys="allCategorysInfo" ref="sidebar"></side-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations, mapActions } from "vuex";
import SideBar from "@/components/header/SimpleHeader/SideBar";
import SearchView from "@/components/views/Search/SearchView";
// import {headroom} from 'vue-headroom';
import { loadFromLocal, saveToLocal, mixin } from "@/utils/js/utils";

export default {
  name: "simple-header",
  data() {
    return {
      searchKeyWords: "",
      searchResult: [],
      showMobileSearchView: false
    };
  },
  mixins: [mixin],
  asyncData({ store }) {
    return Promise.all([
      store.dispatch("base/GET_SITE_INFO"),
      store.dispatch("base/GET_ALL_CATEGORYS")
    ]);
  },
  mounted() {
    // // if (!this.$store.state.base.siteInfo)
    this.getSiteInfo();
    // // if (!this.$store.state.base.allCategorysInfo)
    this.getAllCategorys();
    // // 获取皮肤信息
    this.checkTheme();
  },
  computed: {
    ...mapState({
      siteInfo: state => state.base.siteInfo,
      allCategorysInfo: state => state.base.allCategorysInfo,
      siteTheme: state => state.base.siteTheme
    }),
    isDark: function() {
      return this.siteTheme === "dark";
    }
  },
  methods: {
    ...mapMutations({
      updateSiteTheme: "base/UPDATE_SITE_THEME"
    }),
    ...mapActions({
      getSiteInfo: "base/GET_SITE_INFO",
      getAllCategorys: "base/GET_ALL_CATEGORYS"
    }),
    rootRouterLink(category) {
      let router = {};
      router.name = category.category_type;
      return `/${router.name}`;
    },
    routerLink(category) {
      let router = {};
      router.name = category.category_type;
      router.params = {};
      router.params["id"] = category.id;
      return router;
    },
    //   showMobileMenu() {
    //     // 显示手机端的菜单
    //     let sidebar = this.$refs.sidebar;
    //     sidebar.toggleSideBar();
    //   },
    showSearchView() {
      this.showMobileSearchView = !this.showMobileSearchView;
    },
    checkTheme() {
      const theme = loadFromLocal("siteConfig", "theme", "default");
      this.updateSiteTheme(theme);
    },
    toggleTheme() {
      this.updateSiteTheme(this.siteTheme === "dark" ? "default" : "dark");
    },
    toggleLanguage() {
      if (this.$i18n.locale === "CN") {
        this.$i18n.locale = "EN";
      } else if (this.$i18n.locale === "EN") {
        this.$i18n.locale = "CN";
      }
      // 持久化
      saveToLocal("siteConfig", "language", this.$i18n.locale);
    }
  },
  components: {
    // 'head-room': headroom,
    "side-bar": SideBar,
    "search-view": SearchView
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import 'stylus/header.styl';
</style>
