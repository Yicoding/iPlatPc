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
  try {
    const { id } = req.body;
    const { data } = await axios.post('https://ilovelyplat.com:3000/printOrderById', { id });
    // const { data } = await axios.post('http://localhost:3001/printOrderById', { id });
    const { goodList, createTime, company } = data.data;
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
      accessToken: 'e4b1ffb0f05a4fe885798922d4823c00',
      refreshToken: '4d3cde29cf00459a922aca0efe423187'
    }
    var RpcClient = new yly.RpcClient(tokenData.accessToken, config);
    var Print = new yly.Print(RpcClient);
    var str = goodList.map(item => {
        return `<FS>${item.name} ${item.sale} x${item.num}${item.unitType == 1 ? item.unitSingle : item.unitAll} ${item.total}</FS>\n`
      }).join('');
    var content = `<FS2><center>${company.name}</center></FS2>\n`;
    content += `订单创建时间：${createTime.slice(0, -3)}\n`;
    content += `订单打印时间：${changeDate(new Date(), 'yyyy-MM-dd HH:mm')}\n`;
    content += `订单编号：${data.data.id}\n`;
    content += `${'.'.repeat(48)}\n\n`;
    content += `<table>`;
    content += `<tr><td>商品名</td><td>单价</td><td>  数量</td><td>合计(元)</td></tr>`;
    for (let i = 0; i < goodList.length; i ++) {
    	const item = goodList[i];
    	content += `<tr><td>${item.name}</td><td>${item.sale}</td><td>${item.num}${item.unitType == 1 ? item.unitSingle : item.unitAll}</td><td>${item.total}</td></tr>`;
    }
    content += `</table>`;
    content += `\n${'.'.repeat(48)}\n\n`;
    content += `<FS>订单总价: ¥ ${data.data.total} 元</FS>\n\n`;
    content += `<FS>联系电话：${company.tel}</FS>\n`;
    if (company.phone) {
      content += `<FS>..........${company.phone}</FS>\n\n`;
    }
    content += `<FS>联系地址：${company.address}</FS>`;
    await Print.index('4004632435', 'orderNo1', content);
    res.status(200).send({
      code: 0,
      data: 'o了个k'
    })
  } catch (err) {
    res.status(500).send({
      code: 500,
      errMsg: err
    })
  }
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