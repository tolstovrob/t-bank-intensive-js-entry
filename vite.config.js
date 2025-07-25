import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	base: '/tbank-intensive-js-entry/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
