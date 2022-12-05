module.exports = {
	root: true,
	extends: ['react-app', 'plugin:prettier/recommended'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-wrap-multilines': [
			'error',
			{ declaration: false, assignment: false },
		],
	},
};
