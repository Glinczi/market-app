// 路由详细信息
// 引入首页
import CommonHeader from "../views/Home/Home.vue";
export default [
  {
    // 重定向,访问/的时候应该定向到首页
    path: "*", // TIPS 这里的路径需要注意,*
    redirect: "/home",
  },
  {
    // 主页
    path: "/home",
    name: "home",
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
      };
    },
  },
  {
    // 登录页面
    path: "/login",
    name: "login",
    component: () => import("../views/Login"),
    meta: {
      showFooter: false,
    },
  },
  {
    // 注册页面
    path: "/register",
    name: "register",
    component: () => import("../views/Register"),
    meta: {
      showFooter: false,
    },
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
  {
    // 要传递商品的id
    path: "/detail/:goodsId",
    name: "detail",
    component: () => import("../views/Detail"),
    meta: {
      showFooter: true,
    },
  },
  {
    // 商品添加页面
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("../views/AddCartSuccess"),
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("../views/ShopCart"),
    meta: {
      showFooter: true,
    },
  },
  {
    path: "/center",
    name: "center",
    component: () => import("../views/Center"),
    meta: {
      showFooter: true,
    },
  },
];
