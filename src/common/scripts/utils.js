import React from 'react';
import ReactDOM from 'react-dom';
import { Spin, Modal } from 'antd';
import Cookies from 'js-cookie';


/**
 * 显示loading
 * @param options
 */
export function showSpin(options) {
	if (document.querySelector('body > .zl-spin-wrapper')) {
		// 在body下边已经存在spin
		return;
	}
	const newOptions = { ...options };
	const { wrapper = document.body } = newOptions;
	// 默认直接放到body下边
	const spinWrapper = document.createElement('div');
	spinWrapper.style.position = 'absolute';
	spinWrapper.style.left = '0';
	spinWrapper.style.top = '50%';
	spinWrapper.style.right = '0';
	spinWrapper.style.bottom = '0';
	spinWrapper.style.textAlign = 'center';
	spinWrapper.style.transform = 'translateY(-50%)';
	spinWrapper.style.zIndex = '9999';
	const { position } = window.getComputedStyle(wrapper, null);
	if (!position || position === 'static') {
		wrapper.style.position = 'relative';
	}
	wrapper.appendChild(spinWrapper);
	spinWrapper.className += ' zl-spin-wrapper';
	delete newOptions.wrapper;
	ReactDOM.render(<Spin {...newOptions} />, spinWrapper);
}

/**
 * 隐藏loading
 * @param options
 */
export function hideSpin(options) {
	const newOptions = { ...options };
	const { wrapper = document.body } = newOptions;
	const div = wrapper.querySelector('.zl-spin-wrapper');
	if (div) {
		const unmountResult = ReactDOM.unmountComponentAtNode(div);
		if (unmountResult && div.parentNode) {
			div.parentNode.removeChild(div);
		}
	}
}

export function showError(options) {
	const modalDefault = {
		title: 'errorTip', // '错误提示',
		centered: true,
		keyboard: false,
	};
	let newOptions = {};
	if (typeof options == 'string') {
		newOptions = { ...modalDefault, content: options };
	} else {
		newOptions = { ...modalDefault, ...options };
	}
	Modal.error(newOptions);
}


// 设置 cookie
export function setCookie(key, value = '') {
	if (key) {
		if (process.env.NODE_ENV === 'production') {
			// 生产环境
			Cookies.set(key, value, {
				path: '/',
				domain: document.domain.substr(document.domain.indexOf('.')), //'.zielsmart.com',
			});
		} else if (process.env.NODE_ENV === 'development') {
			// 开发环境
			Cookies.set(key, value, {
				path: '/',
			});
		}
	}
}


