const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/eya-uums', {
			target: 'http://api-v3.zielsmart.cn/',
			changeOrigin:true,
		}));

};
