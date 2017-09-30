module.exports = {
		extends: ['airbnb-base', 'plugin:react/recommended'],
		env: {
			browser: true
		},
		rules: {
			'prefer-const': 0,
			'indent': ['error', 'tab'],
			'no-tabs': 0,
		},
		plugins: [
				'import',
				'react',
				'jsx'
		],
		"parserOptions": {
				"ecmaFeatures": {
						"jsx": true
				}
		},
};
