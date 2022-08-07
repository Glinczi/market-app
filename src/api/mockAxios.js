// 对axios进行二次封装
import axios from "axios";

// 引入NProgress
import NProgress from "nprogress";
// 引入nprogress样式文件
import "nprogress/nprogress.css";

// 1 利用axios的方法去创建一个Axios实例
// TIPS 新axios只是没有取消请求和批量发请求的方法,其它所有语法都是一致的
const requests = axios.create({
  // 默认路径
  baseURL: "/mock",
  // 请求超时时间
  timeout: 5000,
});

// 2 请求拦截器
// 在发请求之前,请求拦截器可以监测到
requests.interceptors.request.use((config) => {
  // config: 配置对象,里面有一个很重要的属性,headers请求头
  // 进度条开始
  NProgress.start();
  return config;
});

// 3 响应拦截器
requests.interceptors.response.use(
  (response) => {
    // 成功收到响应,进度条结束
    NProgress.done();
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requests;
