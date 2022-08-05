<template>
  <div id="app">
    <common-header></common-header>
    <!-- TIPS 路由组件出口位置 -->
    <router-view></router-view>
    <!-- 在登录和注册的时候时隐藏的 -->
    <common-footer v-show="$route.meta.showFooter"></common-footer>
  </div>
</template>

<script>
import CommonFooter from "./components/Footer/CommonFooter.vue";
// CommonHeader组件引入
import CommonHeader from "./components/Header/CommonHeader.vue";

export default {
  name: "App",
  // CommonHeader组件注册
  components: {
    CommonHeader,
    CommonFooter,
  },
  computed: {
    // 这种监测方式不是很好,如果路由过多,会导致条件写的很长
    // 最好的解决方式是利用路由元信息.
    checkPath() {
      return !(this.$route.path == "/login" || this.$route.path == "/register");
    },
  },
};
</script>
<st
    CommonFooteryle lang="">
</style>
