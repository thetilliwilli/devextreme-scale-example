const path = require('path');

module.exports = {
	mode: 'development',
	entry: './source/main.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'source')],
				loader: 'babel-loader',

				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			}
		]
	},
};
