/**
 * Created by lijing on 2021-02-22.
 */

 import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
 import { merge, trim } from 'lodash';
 import { get as getCookie } from 'js-cookie';
 import { showSpin, hideSpin, showError } from './utils';
 import Cookies from 'js-cookie';

 class HttpRequest {
	 constructor(baseUrl) {
		 this.baseUrl = baseUrl;
		 this.queue= {},
		 this.limit={},
		 this.extra = {
			loadingWrapper:undefined,
			isReturnFull:false,
			isErrorHandle:false,
			isShowLoading:false,
			isLimit:true,
		 }
	 }

	 /**
		* 发送请求
		* @param options
		*/
	 request(options) {
		 const { url, extra } = options;
		 if (!url) {
			 showError('请求url不能为空');
			 // eslint-disable-next-line
			 return new Promise(() => {});
		 }
		 // 这一步暂时先不合并参数 控制重复请求
		 if (extra === undefined || extra.isLimit) {
			 if (this.limit[url] === true)
				 // eslint-disable-next-line
				 return new Promise(() => {});
			 this.limit[url] = true;
		 }
		 return this.startRequest(options);
	 }

	 /**
		* 开始请求
		* @param options
		*/
	 startRequest(options) {
		 // 合并参数
		 const newOptions = merge(
			 this.getDefaultConfig(),
			 options,
		 );
		 const { extra, url } = newOptions;

		 const instance = axios.create();
		 instance.interceptors.request.use(
			 this.beforeRequest(extra, url),
			 error => {
				 this.release(extra, url);
				 return Promise.reject(error);
			 },
		 );
		 instance.interceptors.response.use(
			 this.succRequest(extra, url),
			 this.failRequest(extra, url),
		 );
		 delete newOptions.extra; // 移除不必要参数
		 return instance(newOptions);
	 }

	 /**
		* 请求拦截处理
		* @param options
		*/
	 beforeRequest(extra, url) {
		 return (config) => {
			 // loading控制 不建议开启 请自行控制
			 if (!Object.keys(this.queue).length && extra.isShowLoading)
				 showSpin({ wrapper: extra.loadingWrapper });
			 // 加入请求队列
			 this.queue[url] = true;
			 if (
				 config.method === 'get' &&
				 config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
			 ) {
				 // 处理国际化
				 let lang = 'zh_CN';
				 lang = lang.replace('-', '_');
				 config.params = { ...config.data, local: lang };
			 }
			 return config;
		 };
	 }

	 // (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>
	 /**
		* 请求成功处理
		* @param extra
		*/
	 succRequest(extra, url) {
		 return (res) => {
			 const { isReturnFull, isErrorHandle } = extra;
			 this.release(extra, url);
			 const { data: resData, status } = res;
			 const { success, msg, data } = resData;
			 const currentToken = res.headers.authorization;
			 // 更新token
			 if (currentToken) {
				 if (process.env.NODE_ENV === 'production') {
					 Cookies.set('token', currentToken, {
						 path: '/',
						 domian: '.zielsmart.cn',
					 });
				 } else if (process.env.NODE_ENV === 'development') {
					 Cookies.set('token', currentToken, {
						 path: '/',
					 });
				 }
			 }
			 switch (status) {
				 case 200:
					 if (success) return isReturnFull ? resData : data;
					 if (isErrorHandle) return Promise.reject(resData); // 错误自行处理
					 showError(msg); // 错误程序自动处理
					 break;
				 case 401:
					 console.log('登录');
					 // eslint-disable-next-line
					 return new Promise(() => {});
				 case 404:
					 console.log('404页面');
					 // eslint-disable-next-line
					 return new Promise(() => {});
				 default:
					 if (isErrorHandle) {
						 return Promise.reject(resData);
					 }
					 showError(msg);
			 }
		 };
	 }

	 /**
		* 请求失败处理
		* @param extra
		*/
	 failRequest(extra, url) {
		 return (error) => {
			 // response：{ config, data, headers, request, status, statusText }
			 const {
				 response: { status, statusText },
			 } = error;
			 this.release(extra, url);
			 if (extra.isErrorHandle) {
				 return Promise.reject({
					 success: false,
					 msg: `${status}: ${statusText}`,
				 });
			 }
			 showError(`${status}: ${statusText}`);
		 };
	 }
	 /**
		* 释放存储资源
		* @param url
		* @param extra
		*/
	 release(
		 { isShowLoading, loadingWrapper },
		 url,
	 ) {
		 delete this.limit[url];
		 delete this.queue[url];
		 if (!Object.keys(this.queue).length && isShowLoading) {
			 hideSpin({ wrapper: loadingWrapper });
		 }
	 }

	 /**
		* 获取默认配置
		*/
	 getDefaultConfig() {
		 const config = {
			 method: 'post',
			 baseURL: this.baseUrl,
			 url: '',
			 withCredentials: true,
			 // 此方法用于拼接参数，看服务端接收情况
			 transformRequest: (data, header) => {
				 let lang = 'zh_CN';
				 lang = lang.replace('-', '_');
				 const params = { ...data, local: lang };
				 if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
					 return this.handleParams(params);
				 }
				 return JSON.stringify(data);
			 },
			 headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				 Authorization: getCookie('token'),
			 },
			 extra: {
				 loadingWrapper: undefined, // loading的加载区域 类型为dom元素 非document，document请设置isShowLoading为true
				 isReturnFull: false, // 请求成功的时候是否需要把请求结果全部返回 默认只返回Data数据
				 isErrorHandle: false, // 请求失败的时候，是否进行错误处理 默认是处理，如果为true 则不处理
				 isShowLoading: false, // 请求url的时候 是否显示加载状态 默认不显示
				 isLimit: true, // 默认防止重复提交 注意此判断是以url为基准，如果url相同，参数不同，请求也会拦截，若碰到此情况，请设置为false
			 },
		 };
		 return config;
	 }

	 handleParams(data) {
		 const ret = [];
		 if (data) {
			 Object.keys(data).forEach(key => {
				 let paramVal = data[key];
				 if (paramVal === 0 || paramVal === '' || paramVal) {
					 if (typeof paramVal === 'string') paramVal = trim(paramVal);
					 if (typeof paramVal === 'object') {
						 paramVal = JSON.stringify(paramVal);
					 }
					 ret.push(
						 `${encodeURIComponent(key)}=${encodeURIComponent(
							 paramVal,
						 )}`,
					 );
				 }
			 });
		 }
		 return ret.join('&');
	 }
 }

 const httpRequest = new HttpRequest(
	 process.env.NODE_ENV === 'development' ? '/' : '/',
 );

 export default httpRequest;
