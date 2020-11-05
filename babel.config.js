module.exports = {
	presets: ['@babel/env', '@babel/preset-flow', '@babel/preset-react'],
	plugins: ['emotion'],
	env: {
		development: {
			ignore: ['**/__tests__', '**/*.test.js'],
		},
		production: {
			ignore: ['**/__tests__', '**/*.test.js'],
			only: ['src'],
			plugins: ['emotion', 'transform-react-remove-prop-types'],
		},
		test: {
			plugins: ['dynamic-import-node'],
		},
	},
};
