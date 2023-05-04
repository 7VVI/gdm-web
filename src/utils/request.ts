import axios from 'axios'
import BaseResponse = API.BaseResponse;
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import {userStore} from "@/stores/userStore";
import {storeToRefs} from "pinia";
// 自定义 axios 实例
const request = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://xxx/api"
            : "http://localhost:9000/api",
});

axios.defaults.timeout=3000   //设置超时时间为3000ms
request.defaults.withCredentials = true;

// 添加请求拦截器
request.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        const  commonStore = userStore()
        const { token } = storeToRefs( commonStore )
        // 配置请求头
        config.headers = {
            // 'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
            'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
            'Authorization': `Bearer ${token.value}`, // 设置Authorization
            // 'token': token.value // 或者设置token

        };
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
request.interceptors.response.use(
    function (response: AxiosResponse):Promise<AxiosResponse<BaseResponse<any>>> {
        console.log("拦截器",response.data);
        // 对响应数据做点什么
        return response.data;
    },
    function (error:any) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);



export default request;
