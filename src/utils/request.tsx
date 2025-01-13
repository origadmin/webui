import axios from 'axios';

const request = axios.create({
  baseURL: '/', // 替换为你的 API 基础 URL
  timeout: 1000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default request;
