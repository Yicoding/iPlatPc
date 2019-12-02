var express = require('express');
var proxy = require('http-proxy-middleware');
var cors = require('cors');
var https = require('https');
var http = require('http');
var fs = require('fs');

//同步读取密钥和签名证书
var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
}

console.log('options', options)

var app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);


app.use(cors());

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

//https监听3000端口
httpsServer.listen(3000);
//http监听3001端口
httpServer.listen(3001);

// const server = app.listen(3000, function () {
 
//   let host = server.address().address
//   let port = server.address().port
 
//   console.log("应用实例 hhh，访问地址为 http://%s:%s", host, port)
 
// });//你的端口