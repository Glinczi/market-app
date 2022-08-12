import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { removeToken } from "@/utils/token";

// 使用插件
Vue.use(VueRouter);

const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes,
  // NEW 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    // TODO 官网是top:0,有啥区别
    return { y: 0 };
  },
});
export default router;

router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    // 如果有token,不能去登陆页面
    if (to.path == "/login") {
      next(false);
    } else {
      // 对于其他页面可能存在token失效的情况
      // 可以先看看能不能获取到用户信息,可以说明token没有过期
      if (name) {
        // 有token,有信息,放行
        next();
      } else {
        // 有token,无信息
        // 获取用户信息,成功就放行,不成功就清除旧token,并返回登录页面
        try {
          await store.dispatch("userInfo");
          next();
        } catch (error) {
          removeToken();
          next("/login");
        }
      }
    }
  } else {
    // 不能跳转到购物车,和商品添加成功页面
    if (to.path == "/addcartsuccess" || to.path == "/shopcart") {
      next("/login");
    } else {
      next();
    }
  }
});
