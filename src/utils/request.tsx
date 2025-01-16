/* eslint-disable */
// @ts-ignore
import { HOST } from "@/types";
import axios from "axios";
import { API } from "@/types/typings";

const request = axios.create({
  baseURL: HOST + "/", // Replace with your API base URL
  timeout: 1000, // The request timeout period
});

// Request an interceptor
request.interceptors.request.use(
  (config) => {
    // What to do before sending a request
    return config;
  },
  (error) => {
    // What to do about request errors
    return Promise.reject(error);
  },
);

// Respond to the interceptor
request.interceptors.response.use(
  (response: API.ResponseResult<any>) => {
    // Do something about the response data
    return response.data;
  },
  (error: API.ResponseResult<any>) => {
    // Do something about response errors
    return Promise.reject(error);
  },
);

export default request;
