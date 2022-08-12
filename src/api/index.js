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

// 请求搜索页面数据
// 请求方法: POST
// 请求地址: /api/list
// 请求参数: 需要(至少是一个空对象)
export const getSearchList = function (data) {
  // 记得结果要return出去
  return requests({
    url: "/list",
    method: "POST",
    // post请求放在data里面
    data: data,
  });
};

// 请求商品详情页面数据
// 请求方法: GET
// 请求地址: /api/item/{ skuId }
// 请求参数: skuId
export const getDetailList = function (skuId) {
  // 返回Promise
  return requests({
    url: `/item/${skuId}`,
    method: "GET",
  });
};
// 添加或者更新购物车数据
// 请求方法: POST
// 请求地址: /api/cart/addToCart/{ skuId }/{ skuNum }
// 请求参数: skuId,skuNum
export const addOrUpdataCarts = function (skuId, skuNum) {
  // 返回
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "POST",
  });
};

// 获取购物车列表
// 请求方法: GET
// 请求地址: /api/cart/cartList
// 请求参数: 无
export const getCartList = function () {
  return requests({
    url: "/cart/cartList",
    method: "GET",
  });
};

// 切换商品选中状态
// 请求方法: GET
// 请求地址: /api/cart/checkCart/{skuID}/{isChecked}
// 请求参数: skuID,isChecked
export const switchCheck = function (skuId, isChecked) {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "GET",
  });
};

// 删除购物车商品
// 请求方法: DELETE
// 请求地址: /api/cart/deleteCart/{skuId}
// 请求参数: skuId
export const deleteGoods = function (skuId, isChecked) {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE",
  });
};

// 验证码请求
// 请求方法: GET
// 请求地址: /api/user/passport/sendCode/{phone}
// 请求参数: phone
export const getRegisterCode = function (phone) {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "GET",
  });
};

// 用户注册
// 请求方式: POST
// 请求地址: /api/user/passport/register
// 请求参数: phone,code,password
export const regiser = function (data) {
  return requests({
    url: "/user/passport/register",
    method: "POST",
    data: data,
  });
};

// 用户登录
// 请求方法: "POST"
// 请求地址: /api/user/passport/login
// 请求参数: phone,password
export const reqUserLogin = function (data) {
  return requests({
    url: "/user/passport/login",
    method: "POST",
    data: data,
  });
};

// 获取登录用户的用户信息
// 请求方式: "GET"
// 请求地址: /api/user/passport/auth/getUserInfo
// 请求参数: 无
export const getUserInfo = function () {
  return requests({
    url: "/user/passport/auth/getUserInfo",
    method: "GET",
  });
};

// 退出登录
// 请求方法: "GET"
// 请求地址: /api/user/passport/logout
// 请求参数:
export const reqUserLoginout = function () {
  return requests({
    url: "/user/passport/logout",
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
