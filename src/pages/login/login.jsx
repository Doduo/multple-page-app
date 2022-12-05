import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from '../../common/scripts/request';

const Login = () => {
	const getAuthor = () => {
		const data = {
			userName: '123456',
			password: '654321',
		};
		axios
			.request({
				url: '/eya-uums/um-user/author',
				data,
				extra: {},
			})
			.then(data => {
				if (data) {
					if (process.env.NODE_ENV === 'production') {
						Cookies.set('token', data, {
							path: '/',
							domian: '.zielsmart.cn',
						});
					} else if (process.env.NODE_ENV === 'development') {
						Cookies.set('token', data, {
							path: '/',
						});
					}
					getUserInfo(data);
				}
			})
			.catch(err => {
				debugger;
				console.log(err);
			});
	};

	const getUserInfo = data => {
		axios
			.request({
				url: 'eya-uums/um-user/current-user',
				data,
			})
			.then(data => {
				console.log('测试当前用户：', data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	// 更新form数据
	useEffect(() => {
		console.log('Login useEffect 333');
		getAuthor();
	}, []);
	return <div>1</div>;
};
export default Login;
