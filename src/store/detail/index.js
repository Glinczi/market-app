// detail 仓库
// 引入获得详细数据请求方法
import { getDetailList, addOrUpdataCarts } from "@/api/index";

export default {
  state: {
    detailList: {},
  },
  getters: {
    // 整理数据
    // categoryView 面包屑相关数据
    categoryView(state) {
      // TIPS 这里需要注意,至少要返回一个空对象,因为请求是异步的,所以这里如果直接返回可能会报错,因为这个时候detailList里面没有数据
      return state.detailList.categoryView || {};
    },
    // skuInfo手机详情数据
    skuInfo(state) {
      return state.detailList.skuInfo || {};
    },
    // spuSaleAttrList 手机售卖配置数据
    spuSaleAttrList(state) {
      return state.detailList.spuSaleAttrList || {};
    },
  },
  mutations: {
    DETAILLIST(state, detailList) {
      state.detailList = detailList;
    },
  },
  actions: {
    // 请求详细数据列表
    async detailList(state, goodId) {
      let result = await getDetailList(goodId);
      // console.log(result);
      // 获得的数据提交给mutation
      state.commit("DETAILLIST", result.data);
    },
    // 添加或更新商品数量(这里服务器不会返回任何数据,不需要做存储操作)
    async addOrUpdata(state, payload) {
      let { goodsId, buyNum } = payload;
      console.log(goodsId, buyNum);
      let result = await addOrUpdataCarts(goodsId, buyNum);
      if (result.code == 200) {
        // 返回成功的回调
        return "添加成功";
      } else {
        // 返回失败的回调
        return Promise.reject(new Error("添加失败"));
      }
    },
  },
};
