var https = require('https');
var http = require('http');
var fs = require('fs');
var multipart = require('connect-multiparty');
var COS = require('cos-nodejs-sdk-v5');
const yly = require('yly-nodejs-sdk');

var multipartMiddleware = multipart();

var cosconfig = require('./cosconfig');


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
    var content = `<FS2><center>${company.name}</center></FS2>\n`;
    content += `订单创建时间：${createTime.slice(0, -3)}\n`;
    content += `订单打印时间：${changeDate(new Date(), 'yyyy-MM-dd HH:mm')}\n`;
    content += `订单编号：${data.data.id}\n`;
    if (data.data.customerName) {
      content += `客户姓名：${data.data.customerName}\n`;
    }
    if (data.data.customerPhone) {
      content += `客户手机：${data.data.customerPhone}\n`;
    }
    if (data.data.customerSite) {
      content += `客户地址：${data.data.customerSite}\n`;
    }
    content += `${'.'.repeat(48)}\n\n`;
    content += `<table>`;
    content += `<tr><td>商品名</td><td>数量</td><td>  单价</td><td>合计(元)</td></tr>`;
    for (let i = 0; i < goodList.length; i++) {
      const item = goodList[i];
      content += `<tr><td>${item.name}</td><td>${item.num}${item.unitType == 1 ? item.unitSingle : item.unitAll}</td><td>${item.unitType == 1 ? item.sale : (item.unitDecimal + item.unitSingle + 'x' + AmtFormat(item.sale / item.unitDecimal))}</td><td>${item.total}</td></tr>`;
    }
    content += `</table>`;
    content += `\n${'.'.repeat(48)}\n\n`;
    content += `<FS>订单总价: ¥ ${data.data.total} 元</FS>\n\n`;
    if (company.tel) {
      content += `<FS>联系电话：${company.tel}</FS>\n`;
    }
    if (company.phone) {
      content += `<FS>..........${company.phone}</FS>\n\n`;
    }
    content += `<FS>联系地址：${company.address}</FS>`;
    content += `\n${'.'.repeat(48)}\n\n`;
    content += `<QR>https://open.weixin.qq.com/sns/getexpappinfo?appid=wxf2cab88a1e083fa9&path=pages%2Forder-detail%2Findex.html?id=${data.data.id}#wechat-redirect</QR>`;
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

// 文件上传配置
var cos = new COS({
  // 必选参数
  SecretId: cosconfig.SecretId,
  SecretKey: cosconfig.SecretKey,
  // 可选参数
  FileParallelLimit: 3,    // 控制文件上传并发数
  ChunkParallelLimit: 8,   // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
  ChunkSize: 1024 * 1024 * 8,  // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
  Proxy: '',
});

// 列出存储桶列表
app.get('/getService', async function (req, res) {
  try {
    cos.getService({
      Region: 'ap-guangzhou',
    }, function (err, data) {
      if (err) {
        console.log('err', err);
        return res.status(500).send({
          code: 500,
          errMsg: err
        })
      }
      console.log('data', data);
      res.status(200).send({
        code: 0,
        data
      })
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).send({
      code: 500,
      errMsg: err
    });
  }
});

// 列出某个目录的所有文件
app.get('/getBucket', async function (req, res) {
  try {
    cos.getBucket({
      Bucket: 'qcloudtest-1257454171',
      Region: 'ap-guangzhou',
      Prefix: 'food/'
    }, function (err, data) {
      if (err) {
        console.log('err', err);
        return res.status(500).send({
          code: 500,
          errMsg: err
        })
      }
      console.log('data', data);
      res.status(200).send({
        code: 0,
        data
      })
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).send({
      code: 500,
      errMsg: err
    });
  }
});

// 上传文件
app.post('/putObject', multipartMiddleware, function (req, res) {
  try {
    const { file: { path } } = req.files;
    // return console.log('files', req.files)
    cos.putObject({
      Bucket: 'qcloudtest-1257454171',
      Region: 'ap-guangzhou',
      Key: `good/picture_${Math.random().toString().slice(-8)}.png`,
      Body: fs.createReadStream(path)
    }, function (err, data) {
      if (err) {
        console.log('err', err);
        return res.status(500).send({
          code: 500,
          errMsg: err
        })
      }
      console.log('data', data);
      res.status(200).send({
        code: 0,
        data
      })
    });
  } catch (err) {
    console.log('err', err);
    res.status(500).send({
      code: 500,
      errMsg: err
    });
  }
});

// 用户登录
app.get('/getOpenId', async function (req, res) {
  try {
    const { code } = req.query;
    const { data } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: 'wxa951826c9c76290b',
        secret: '67957573d25420da690f4c6798e0e8a8',
        js_code: code,
        grant_type: 'authorization_code'
      }
    });
    res.status(200).send({ code: 0, data });
  } catch (err) {
    console.log('err', err);
    res.status(500).send({
      code: 500,
      errMsg: err
    });
  }
});

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

function AmtFormat(val) {
  var n = val.toString();
  if (/\./.test(n) && n.split('.')[1].length > 2) {
    return val.toFixed(2);
  }
  return val;
}