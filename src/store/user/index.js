// 登录和注册共用仓库
import {
  getRegisterCode,
  regiser,
  reqUserLogin,
  getUserInfo,
  reqUserLoginout,
} from "@/api/index";
import { getToken, removeToken } from "@/utils/token";
import { set } from "nprogress";
export default {
  state: {
    code: "",
    token: getToken(),
    userInfo: {},
  },
  getters: {},
  mutations: {
    GETREGCODE(state, code) {
      state.code = code;
    },
    USERLOGIN(state, token) {
      state.token = token;
    },
    USERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 清空登录用户所有信息
    USERLOGINOUT(state) {
      state.token = "";
      state.userInfo = "";
      removeToken();
    },
  },
  actions: {
    // 获取验证码
    async getRegCode(store, phone) {
      let result = await getRegisterCode(phone);
      if (result.code == 200) {
        store.commit("GETREGCODE", result.data);
        return "获取成功";
      } else {
        return Promise.reject(new Error("获取失败"));
      }
    },
    // 注册
    async userReg(store, data) {
      let result = await regiser(data);
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("注册失败"));
      }
    },
    // 登录
    async userLogin(store, data) {
      let result = await reqUserLogin(data);
      console.log(result);
      if (result.code == 200) {
        store.commit("USERLOGIN", result.data.token);
        return "登录成功";
      } else {
        return Promise.reject(new Error("登录失败"));
      }
    },
    // 获取登录用户的用户信息
    async userInfo(store) {
      let result = await getUserInfo();
      console.log(result);
      if (result.code == 200) {
        store.commit("USERINFO", result.data);
        return "获取成功";
      } else {
        return Promise.reject(new Error("获取失败"));
      }
    },
    // 退出登录
    async userLoginout(store) {
      let result = await reqUserLoginout();
      if (result.code == 200) {
        store.commit("USERLOGINOUT");
        return "退出成功";
      } else {
        return Promise.reject(new Error("退出失败"));
      }
    },
  },
};
