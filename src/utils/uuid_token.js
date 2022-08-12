// 此文件中方法用于判断是否生成随机的uuid_token
// 引入uuid
import { v4 as uuidv4 } from "uuid";

const getUuidToken = function () {
  // 检测本地存储中时候有uuid_token
  let uuid_token = localStorage.getItem("uuid_token");
  if (!uuid_token) {
    let uuid_token = uuidv4();
    // 将随机生成的uuid_token存储到本地存储
    localStorage.setItem("uuid_token", uuid_token);
  }
  // 将最终的uuid_token返回出去
  return uuid_token;
};
export default getUuidToken;
