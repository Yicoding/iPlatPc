var express = require('express');
var cors = require('cors');
var axios = require('axios')
var bodyParser = require('body-parser');
var app = express();

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/getTypeList', function (req, res) {
  // res.send('Hello World');
  axios.get('https://0az3korx.qcloud.la/weapp/getTypeList').then(response => {
    console.log('getTypeList', response.data)
    res.send(response.data)
  }).catch(err => {
    console.log('err', err)
  })
})

app.post('/userLogin', function (req, res) {
  // res.send('Hello World');
  // return console.log('req.body', req.body)
  // console.log('userLogin', req.query)
  axios.post('https://0az3korx.qcloud.la/weapp/userLogin', req.body).then(response => {
    res.send(response.data)
  }).catch(err => {
    console.log('err', err)
  })
})

const server = app.listen(8020, function (req, res) {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
});//你的端口