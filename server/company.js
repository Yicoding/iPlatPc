let router = require('./router.js')
let pool = require('./pool.js')
// 查看公司列表
router.get('/getCompanyList', (req, res) => {
	let sql = 'select * from company'
	pool.getConnection((err, connection) => {
		if (err) {
			console.log('err', err);
			throw err;
		}
		connection.query(sql, (err, data, fields) => {
			if (err) {
				console.log(err)
				res.status(500).send(err)
			} else {
				console.log(data)
				res.send(data)
			}
			connection.release();
		})
	})
})

// 查看单个公司详情
router.get('/getCompanyDetail', (req, res) => {
	let sql = 'select * from company where id=?'
	pool.getConnection((err, connection) => {
		if (err) {
			console.log('err', err);
			throw err;
		}
		connection.query(sql, [req.query.id], (err, data, fields) => {
			if (err) {
				console.log(err)
				res.status(500).send(err)
			} else {
				console.log(data)
				if (data.length) {
					res.send(data[0])
				} else {
					res.send()
				}
			}
			connection.release();
		})
	})
})

module.exports = router