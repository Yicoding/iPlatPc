let express = require('express');
let cors = require('cors');

let app = express();
app.use(cors())

// 公司管理
let company = require('./company')
app.use(company)
// // 角色管理
// let role = require('./role')
// app.use(role)
// // 用户管理
// let user = require('./user')
// app.use(user)

let server = app.listen(9000, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})