// 引入方法
import { getCartList, switchCheck, deleteGoods } from "@/api/index";

// 记得要在总仓库注册

export default {
  state: {
    cartList: [],
  },
  getters: {
    cartList(state) {
      let data = {};
      if (state.cartList[0]) {
        data = state.cartList[0];
      } // 这里不先计算出来,会报错,因为数据没有回来,state.cartList[0]不是对象
      return data.cartInfoList || [];
    },
  },
  mutations: {
    CARTLIST(state, cartList) {
      state.cartList = cartList;
    },
  },
  actions: {
    // 获取购物车列表
    async cartList(store) {
      let result = await getCartList();
      // console.log(result);
      if (result.code == 200) {
        store.commit("CARTLIST", result.data);
      }
    },
    // 更改商品状态
    async switchGoodsCheck(store, payload) {
      let { skuId, isChecked } = payload;
      let result = await switchCheck(skuId, isChecked);
      // console.log(result);
      // 通过这个的返回值,来控制调用此action的组件的Promise状态
      if (result.code == 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("修改失败"));
      }
    },
    // 删除商品
    // payload --> 删除商品的id
    async deleteItems(store, payload) {
      let result = await deleteGoods(payload);
      // console.log(result);
      if (result.code == 200) {
        return "删除成功";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },
    // 删除所有选中的商品
    deleteAllItemIsChecked(store) {
      // store就是一个小仓库，包含了仓库的各个属性
      // 遍历所有的数据，找出被选中的数据派发请求
      // console.log(store);
      // 将所有的请求返回的Promise状态存放在数组里面
      let PromiseAllArr = [];
      store.getters.cartList.forEach((item) => {
        if (item.isChecked == 1) {
          let result = store.dispatch("deleteItems", item.skuId);
          PromiseAllArr.push(result);
        }
      });
      return Promise.all(PromiseAllArr);
    },
    // 修改所有商品的选中状态
    updataAllItemIsChecked(store, checked) {
      let PromiseAllArr = [];
      store.getters.cartList.forEach((item) => {
        let data = {
          skuId: item.skuId,
          isChecked: checked,
        };
        let result = store.dispatch("switchGoodsCheck", data);
        PromiseAllArr.push(result);
      });
      return Promise.all(PromiseAllArr);
    },
  },
};
