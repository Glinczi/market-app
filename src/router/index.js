/*
 * @Author: Iamxiaoz gcz9956@outlook.com
 * @Date: 2022-08-02 17:33:03
 * @LastEditors: Iamxiaoz gcz9956@outlook.com
 * @LastEditTime: 2022-08-05 00:42:50
 * @FilePath: \sggapp\src\router\index.js
 * @Description: 路由配置页面
 */
// TIPS 配置路由放在router文件夹中

import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);
// 引入首页
import CommonHeader from "../views/Home/Home.vue";

export default new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      // 重定向,访问/的时候应该定向到首页
      path: "*", // TIPS 这里的路径需要注意,*
      redirect: "/home",
    },
    {
      // 主页
      path: "/home",
      component: CommonHeader,
      meta: {
        showFooter: true,
      },
    },
    {
      // 搜索页面
      path: "/search/:keyword?",
      // path: "/search",
      name: "search",
      component: () => import("../views/Search/Search.vue"),
      meta: {
        showFooter: true,
      },
      // TIPS 开启props接收参数
      // 这种方式可以降低参数和组件之间的耦合????
      // 1. 布尔值的写法
      // props: true,
      // 2. 对象写法(额外的传递参数)
      // props:{a:1,b:2}
      // NEW 3. 函数形式写法??(推荐)
      props: (route) => {
        return {
          keyword: route.params.keyword,
          name: route.query.name,
          // TODO 这里层级怎么弄?l1?l2?l3?
        };
      },
    },
    {
      // 登录页面
      path: "/login",
      name: "login",
      component: () => import("../views/Login/Login.vue"),
      meta: {
        showFooter: false,
      },
    },
    {
      // 注册页面
      path: "/register",
      name: "register",
      component: () => import("../views/Register/Register.vue"),
      meta: {
        showFooter: false,
      },
    },
  ],
});
