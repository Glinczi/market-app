// 这里是home组件的仓库
import { getCategoryList, getBannerList, getFloorList } from "@/api/index";
export default {
  state: {
    // 这里的初始数据类型需要注意,不能乱写,要看收到的结果是对象还是数组
    categoryList: [],
    bannerList: [],
    floorList: [],
  },
  mutations: {
    CATEGORYLIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    FLOORLIST(state, floorlist) {
      state.floorList = floorlist;
    },
  },
  actions: {
    // 获取三级联动数据
    async categoryList({ commit }) {
      let result = await getCategoryList();
      // 数据获取成功将数据提交给mutation
      if (result.code == 200) {
        commit("CATEGORYLIST", result.data);
      } else {
        return;
      }
    },
    // 获取banner图数据
    async bannerList({ commit }) {
      let result = await getBannerList();
      if (result.code == 200) {
        commit("BANNERLIST", result.data);
      }
    },
    // 获取floor的数据
    async floorList(store) {
      let result = await getFloorList();
      store.commit("FLOORLIST", result.data);
    },
  },
};
