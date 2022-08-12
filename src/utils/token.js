// 此方法用于获取本地存储中的token
export const getToken = function () {
  let token = "";
  // 检查本地存储中有无Token
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token");
  }
  return token;
};

export const removeToken = function () {
  localStorage.removeItem("token");
};
