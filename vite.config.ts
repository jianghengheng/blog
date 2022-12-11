import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
function getSrcPath(srcName = 'src') {
  const rootPath =path.resolve(process.cwd());

  return `${rootPath}/${srcName}`;
}
// https://vitejs.dev/config/
export default defineConfig(config=>{
 

  return {
    base:'/',
    resolve: {
      alias: {
        '~':  path.resolve(process.cwd()),
        '@': getSrcPath()
      }
    },
    plugins: [react()],
	
    server: {
			host: '0.0.0.0',
			port: 3200,
			open: true,
			proxy: {
				'/file': {
					target: 'http://192.168.5.246:9116',
					changeOrigin: true,
					rewrite: path => path.replace(new RegExp(`/file`), '')
				},
				'/api': {
					target: 'http://192.168.5.246:8080',
					changeOrigin: true,
					rewrite: path => path.replace(new RegExp(`/api`), '')
				}
			}
		},
  }
})

