const Config = require("webpack-chain");
const htmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }= require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = new Config();
/* const merge = config.merge; */
const path = require("path");
const resolve  = file =>path.resolve(__dirname,file);
//entry
config.entry("index").add(resolve("src/index.js"))
config.entry("test").add(resolve("src/test.js"))


//output
config.output
    .path(resolve("dist"))
    .filename("[name].bundle.js")
    .libraryTarget("umd")//commonjs or umd经常会用到
    .publicPath("./")//资源前缀
    .end()//如果使用的过程中需要拿到config实例，进行其它操作，就可以调用一下end





/*----------------------------------------------------------
loader:一般是将某个语法统一处理为统一的语法
webpack只能直接处理 javascript 格式的代码。
任何非 js 文件都必须被预先处理转换为 js 代码，
才可以参与打包。loader（加载器）就是这样一个代码转换器。
-----------------------------------------------------------*/
//loader是栈，相进后出，所以后边的先执行,先end返回config，向上继续使用use
config.module
    .rule('css')//具名title
      .test(/\.(sc|le|c|postc)ss$/)//正则匹配
      	// 4.提取css 到单独文件
        .use('extract-css-loader')//在真正loader前必须先使用

          .loader(require('mini-css-extract-plugin').loader)
          .options({
            publicPath: './'
          })
          .end()
        // 报错缺少，document,因为style loader用于将样式挂载在dom上
        // 我们是在js文件中引入的，都没有这个挂载的过程，所以报错
        /* .use("style-loader")
           .loader("style-loader")//3.将js字符串生成style节点
           .end() */
        
        //css-loader 通过 npm 安装，但是要把样式真正挂载到 dom 上，还需要安装 style-loader
        .use('css-loader')
          .loader('css-loader')//2.将css转化成CommomJS模块
          .options({})
          .end()
        .use("sass-loader")
          .loader("sass-loader")//1.将sass编译成css
          .end()
        //插件的使用,postcss最主要的作用是把css转化为js进行操作
        .use('postcss-loader')
          .loader('postcss-loader')
          .options({
            //配置信息，去看具体的loader文档
            postcssOptions:{
                plugins:[
                  //autoprefixer 自动添加兼容 css 前缀
                  require('autoprefixer')({
                    overrideBrowserslist: ['>0.25%', 'not dead']
                  }),
                  "postcss-reporter"
                ]
            }
          })
          .end() 
        .use('less-loader')
          .loader('less-loader')
          .end()
//图片和其他路径的配置
config.module.rule("img")
          .test(/\.(png|jpg|gif|jpeg)$/)
            .use("url-loader")
                .loader("url-loader")
                .options({
                    // limit:8192,
                    // outputPath:"img"
                })
                .end()
            .use("file-loader")
                .loader("file-loader")
                .end()



/*-----------------------------------------------------
plugin:一般是在打包前或打包后对结果进行再次操作
插件的作用主要是解决loader所无法解决的其他事情
生成html，清理dist，打开浏览器等
------------------------------------------------------*/
config.plugin("clean")
    .use(CleanWebpackPlugin)   
config.plugin("html")//起个名字
    .use(htmlPlugin)//具体使用
    .tap(args=>args);//自己的操作
config.plugin('minicss')
    .use(MiniCssExtractPlugin)
//别名
config.resolve.alias
.set("@",resolve("src"))//使用的时候@/就是src/





//devServer
/* config.devServer.port(8888)
    .open(true)
    .proxy({'/dev': {
           target: 'http://123.57.153.106:8080/',
           changeOrigin: true,
           pathRewrite: {
             '^/dev': ''
           }
         }
    }) */



module.exports = config.toConfig();