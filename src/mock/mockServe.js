// 引入Mock 要用大写
import Mock from "mockjs";
// 引入数据(json,图片在webpack中都是默认暴露的)
import banner from "./banner.json";
import floors from "./floors.json";

// 利用mock方法创建请求地址和请求数据
// 参数一 -- 请求地址
// 参数二 -- 请求数据
Mock.mock("/mock/banner", {
  code: 200,
  data: banner,
});
Mock.mock("/mock/floors", {
  code: 200,
  data: floors,
});
