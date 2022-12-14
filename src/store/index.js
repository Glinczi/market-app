import Vue from "vue";
import Vuex from "vuex";
//
// 引入模块仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import getUuidToken from "@/utils/uuid_token";
import cart from "./cart";
import user from "./user";
import VueRouter from "vue-router";
//
Vue.use(Vuex);

// 对外暴露Store
export default new Vuex.Store({
  state: {
    // 仓库,存储数据的地方
    goodsInfo: {},
    // 这里采用的是封装方法
    uuid_token: getUuidToken(),
  },
  mutations: {
    // 修改state中数据的方法
  },
  actions: {
    // 处理action,可以处理异步
  },
  getters: {
    // 计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
  },
  modules: {
    home,
    search,
    detail,
    cart,
    user,
  },
});
