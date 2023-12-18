import minimist from 'minimist';
import esbuild from 'esbuild';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import { log } from 'console';

const args = minimist(process.argv.slice(2));

// console.log('args', args);

const target =  args._[0] || "reactivity";

const format =  args.f || 'esm';

// console.log(import.meta.url);

const cwd = dirname(fileURLToPath(import.meta.url));

// console.log('cwd', cwd);

const entry = resolve(cwd, `../packages/${target}/src/index.ts`);

const outfile = resolve(cwd, `../packages/${target}/dist/${target}.js`);

// console.log('entry', entry);

// console.log('outfile', outfile);

const  IIEFNamesMap = {
    'reactivity': 'VueReactivity',
}

esbuild.context({
    entryPoints: [entry],
    outfile,
    bundle: true, // 将所有文件打包在一起
    platform: 'browser',
    sourcemap: true,
    format,
    // globalName: IIEFNamesMap[target],
    // define: {
    //     __IIEF__: IIEFNamesMap[target]
    // }
}).then((ctx) => {
    ctx.watch()
})

// format 格式
// esm-bundle     开发时候使用 各自打包成模块
// esm-browser    生成时候使用 打包一个
// global         iife 全局变量上
// common.js      node