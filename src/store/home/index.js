// 这里是home组件的仓库
import { getCategoryList } from "@/api/index";
export default {
  state: {
    // 这里的初始数据类型需要注意,不能乱写,要看收到的结果是对象还是数组
    categoryList: [],
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList;
    },
  },
  actions: {
    // 获取数据
    async categoryList({ commit }) {
      let result = await getCategoryList();
      // 数据获取成功将数据提交给mutation
      if (result.code == 200) {
        commit("CATEGORYLIST", result.data);
      } else {
        return;
      }
    },
  },
};
