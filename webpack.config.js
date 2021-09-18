
const {merge} = require('webpack-merge')
const config = require("./webpack-base-chain")

//merge可以合并base配置，做特定配置操作
const webpackConfig = merge(config,{
    //entry ...

})
module.exports = webpackConfig;
