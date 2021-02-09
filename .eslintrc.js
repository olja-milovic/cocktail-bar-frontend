module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 12,
		'sourceType': 'module',
	},
	'plugins': [
		'react',
	],
	'rules': {
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1,
			},
		],
		'linebreak-style': [
			'warn',
			'windows',
		],
		'quotes': [
			'warn',
			'single',
		],
		'semi': [
			'warn',
			'always',
		],
		'no-trailing-spaces': [
			'warn',
		],
		'comma-dangle': [
			'warn',
			'always-multiline',
		],
		'sort-imports': [
			'warn', {
				'ignoreCase': false,
				'ignoreDeclarationSort': true,
				'ignoreMemberSort': false,
				'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
				'allowSeparatedGroups': true,
			},
		],
		'arrow-parens': [
			'warn',
			'as-needed',
		],
		'no-mixed-spaces-and-tabs': [
			0,
			'smart-tabs',
		],
		'no-unused-vars': [
			'warn',
		],
	},
};
