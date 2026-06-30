import axios from "axios";
import { message } from "antd";

axios.defaults.baseURL = "https://musci-api-six.vercel.app/";
// axios.defaults.baseURL = 'http://172.18.3.125:8013/'

// 是否允许携带cookie
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  // const cookie = localStorage.getItem('cookie');
  // if (cookie) {
  //   config.headers.Authorization = `token ${cookie}`
  // }
  return config;
});

axios.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data?.code !== undefined && data.code !== 200) {
      message.error(data.message || data.msg || "请求失败");
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    message.error('error')
    return Promise.reject(error);
  }
);

export default axios;
