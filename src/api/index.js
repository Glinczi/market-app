// 所有的api接口统一的管理
// 通过将一个个请求封装成函数,然后暴露,这样在需要发送请求的地方直接调用函数就可以了
import requests from "./request";

// 引入mockAxios
import mockRequests from "./mockAxios";

// ------------------真实后端请求--------------
// 请求三级联动数据
// 请求地址: /api/product/getBaseCategoryList
// 请求方式: get
// 请求参数: 无
export const getCategoryList = function () {
  // 需要将发送请求的结果(结果是Promise对象)返回出去
  return requests({
    url: "/product/getBaseCategoryList",
    method: "GET",
  });
};
// -------------------------------------------
// --------------Mock-------------------------
// 请求banner数据
// 请求地址: /mock/banner
// 请求方式: get
// 请求参数: 无
export const getBannerList = function () {
  return mockRequests({
    url: "/banner",
    method: "GET",
  });
};

// 请求floor数据
// 请求地址: /mock/floors
// 请求方式: get
// 请求参数: 无
export const getFloorList = function () {
  return mockRequests({
    url: "/floors",
    method: "GET",
  });
};

// --------------Mock-------------------------
