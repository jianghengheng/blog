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
			
				'/api': {
					target: 'http://localhost:3000/',
					changeOrigin: true,
					rewrite: path => path.replace(new RegExp(`/api`), '')
				}
			}
		},
  }
})

