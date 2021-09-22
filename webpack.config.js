
const {merge} = require('webpack-merge')
const config = require("./webpack-base-chain")
const path = require("path");
const resolve  = file =>path.resolve(__dirname,file);
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
//merge可以合并base配置，做特定配置操作


const webpackConfig = merge(config,{


    //本地调试服务配置
    devServer: {  
		port: 3000, //端口   
		host: '127.0.0.1', //局域网访问可填写'0.0.0.0'
		hot: true, //启动热更新 
		static: {
		 	directory: resolve("public"),
		},
		compress: true,
		proxy:{
            
        },
	},
	/* optimization: {
		splitChunks: {
		  // include all types of chunks
		  chunks: 'all',
		},
	}, */



})
module.exports = webpackConfig;
