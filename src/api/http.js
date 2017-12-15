import axios from 'axios';
import main from '@/main.js'
import qs from 'qs'

const http = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout:10000,
    //headers: {"Content-Type": "application/json"},
    data: {}
});
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config.data)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    
    return response;
  }, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
          if(error.message.indexOf('timeout')!=-1){
            main.$message.error('请求超时，请稍后再试！');
          }
          if(error.message.indexOf('Network Error')!=-1){
            main.$message.error('服务端未响应，请稍后再试！');
          }
          
      }
      console.log(error)
    return Promise.reject(error);
  });
export default http