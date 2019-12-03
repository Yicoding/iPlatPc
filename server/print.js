var https = require('https');
var http = require('http');
var fs = require('fs');

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var axios = require('axios');

//同步读取密钥和签名证书
var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
}

// 打印配置
const yly = require('yly-nodejs-sdk');
const config = new yly.Config({
  'cid': '1087420892',         //应用id
  'secret': 'fbd1936498aa2bae20e2b7d5332d67c2'       //应用秘钥
});
const oauthClient = new yly.OauthClinet(config);

var app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

// 解决跨域
app.use(cors());

// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/printOrderById', async function (req, res) {
  const { id } = req.body;
  const { data } = await axios.post('https://ilovelyplat.com:3000/printOrderById', { id });
  // const { data } = await axios.post('http://localhost:3001/printOrderById', { id });
  const { goodList } = data.data;
  // 获取调用凭证（仅调用一次后关闭此方法）
  // const result = await oauthClient.getToken();
  // if (
  //   result.error != 0 &&
  //   result.error_description != 'success'
  // ) {
  //   throw new Error('failed:' + result.error_description);
  // }
  // const tokenData = {
  //   'accessToken': result.body.access_token,
  //   'refreshToken': result.body.refresh_token,
  // };
  // if (result.body.machine_code) {
  //   tokenData.machineCode = result.body.machine_code;
  // }
  const tokenData = {
    accessToken: '37ba5669eb46450db3614d707b768a2f',
    refreshToken: '11fa636b37ab45ed8da83f1e860a8289'
  }
  var RpcClient = new yly.RpcClient(tokenData.accessToken, config);
  var Print = new yly.Print(RpcClient);
  const content = `
    <FS2><center>**#恒祥茶庄**</center></FS2>
    ${'.'.repeat(32)}
    <FS2><center>--在线支付--</center></FS2>
    订单时间:${changeDate(new Date(), 'yyyy-MM-dd HH:mm')}\n
    订单编号:${data.data.id}\n
    ${'*'.repeat(32)}商品${'*'.repeat(32)}
    <table style="color: #333; font-size: 14px; width: 100%;">
      <tr>
        <td>商品名</td>
        <td>单价</td>
        <td>数量</td>
        <td>合计</td>
      </tr>
      ${
        goodList.map(item => {
          return `
            <tr>
              <td>${item.name}</td>
              <td>${item.sale}</td>
              <td>x${item.num}${item.unitType == 1 ? item.unitSingle : item.unitAll}</td>
              <td>${item.total}</td>
            </tr>
          `
        }).join('')
      }
    </table>
    ${'.'.repeat(32)}
    <QR>这是二维码内容</QR>
    ${'.'.repeat(32)}
    订单总价: ¥ ${data.data.total} 元\n
    <FS2><center>**#end**</center></FS2>
  `;
  // return console.log('content', content)
  await Print.index('4004632435', 'orderNo1', content);
  res.status(200).send({
    code: 0,
    data: 'o了个k'
  })
})

//https监听3000端口
httpsServer.listen(3002);
//http监听3001端口
httpServer.listen(3003);

// 时间函数
function changeDate(time, format) {
  var t = new Date(time);
  var tf = function (i) { return (i < 10 ? '0' : '') + i };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}