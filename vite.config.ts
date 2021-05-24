import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import macrosPlugin from 'vite-plugin-babel-macros';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [reactRefresh(), macrosPlugin(), tsconfigPaths()],

   esbuild: {
      jsxFactory: 'jsx',
      jsxInject: `import {jsx, css} from '@emotion/react'`,
   },
   define: {
      'process.platform': JSON.stringify('win32'),
      'process.env': {},
   },
   alias: {
      '~~': resolve(__dirname, 'src'),
   },

   // alias: {
   //    '@material-ui/icons': '@material-ui/icons/esm',
   // },
});
