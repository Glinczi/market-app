import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router";
// 引入仓库
import store from "@/store";
// 使用mock
require("@/mock/mockServe");

// 引入swiper的样式
import "swiper/css/swiper.css";

Vue.config.productionTip = false;
// ----------------全局组件注册区--------------------
// 三级联动组件全局注册
import TypeNav from "./components/TypeNav/TypeNav.vue";
// 也可以通过TypeNav.name获取名字
Vue.component("TypeNav", TypeNav);
// 分页器组件全局注册
import MyPagination from "./components/Pagination/MyPagination.vue";
Vue.component("MyPagination", MyPagination);
// ----------------全局组件注册区--------------------
new Vue({
  // key Value一致,省略Value
  /* 
    TIPS 注册路由信息,当这里书写router的时候,组件身上都拥有$route,$routers
    $route -- 一般是获取路由路径和传递的参数的
    NEW $router -- 一般用于进行编程式跳转的[push/replace]???
  */
  router,
  // 组件实例属性上会多一个$store属性
  store,
  render: (h) => h(App),
}).$mount("#app");
