const { resolve } = require("path");
const { merge } = require("webpack-merge");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require("./webpack.base");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const devConfig = {
  mode: "production",
  entry: resolve(__dirname, "../src/client/entry.client.jsx"),
  output: {
    // filename: "client.bundle.js",
  },
  devServer: {
    contentBase: resolve(__dirname, "../dist"),
    port: 8000,
    /* 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容。
     * 将 devServer.historyApiFallback 设为 true开启：
     **/
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../src/client/index.template.html"),
    }),
    new CompressionPlugin({
      filename: "[path][base].gz", //目标资源名称。
      algorithm: "gzip", //算法
      test: /\.(js|css)$/, //压缩 js 与 css
      threshold: 10240, //只处理比这个值大的资源。按字节计算
      minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: ".cache/", //缓存压缩，默认不缓存，设置存放位置开启
        test: /.js$/, //匹配需要压缩的文件，默认为/.js$/和Loader配置一样
        //include: [], 使用正则去选择需要被压缩的文件和Loader配置一样
        //exclude: [], 使用正则去去除不需要被压缩的文件和Loader配置一样
        //workerCount: 2, 开启几个子进程并发执行压缩
        // sourceMap: false, 是否输出source Map，开启会导致压缩变慢
        // uglifyJS: {}, 用于压缩ES6代码不可和uglifyJS同时使用
        uglifyJS: {
          //压缩ES5代码
          output: {
            // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
            beautify: false,
            //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
            comments: false,
          },
          compress: {
            //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出
            // warnings: false,
            //是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
            drop_console: true,
            //是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为否
            // collapse_vars: true,
            // 提取出现多次但是没有定义成变量去引用的静态值
            // reduce_vars: true,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   // cacheGroupKey here is `commons` as the key of the cacheGroup
        //   name:"common",
        //   chunks: 'all',
        // },
        defaultVendors: {
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor",
          chunks: "all",
        }, //此处将react和react-dom提取出来，单独作为一个文件加载
      },
    },
  },
};

module.exports = merge(baseConfig, devConfig);
