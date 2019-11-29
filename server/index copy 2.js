var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();
app.use('/', proxy({
  // 代理跨域目标接口
  target: 'https://0az3korx.qcloud.la/weapp',
  changeOrigin: true,

  // 修改响应头信息，实现跨域并允许带cookie
  onProxyRes: function (proxyRes, req, res) {
    res.header('Access-Control-Allow-Origin', '*');
  },
  // 修改响应信息中的cookie域名
  //  cookieDomainRewrite: ''  // 可以为false，表示不修改
}));

const server = app.listen(8020, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});//你的端口