import axios from "axios";

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
    const code = res.status;
    if (code !== 200) {
        console.log('error');
    }
    return res.data;
  },
  (error) => {
    console.log('error');
    return Promise.reject(error);
  }
);

export default axios;
