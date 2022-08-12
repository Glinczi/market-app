// 这里是search的仓库
// 引入getSearchList,
import { getSearchList } from "../../api/index";
export default {
  state: {
    // 数据是什么样子,就使用什么数据类型
    searchList: {},
  },
  getters: {
    attrsList(state) {
      return state.searchList.attrsList || {};
    },
    goodsList(state) {
      return state.searchList.goodsList || {};
    },
    trademarkList(state) {
      return state.searchList.trademarkList || {};
    },
  },
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList;
    },
  },
  actions: {
    // 设置dispatch的函数
    async searchList(store, data) {
      let result = await getSearchList(data);
      // console.log(result);
      // 将请求的数据通过mutation存入state里面
      if (result.code == 200) {
        store.commit("GETSEARCHLIST", result.data);
      } else {
        return;
      }
    },
  },
};
