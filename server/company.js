var router = require('./router.js')
var pool = require('./pool.js')
// 查看公司列表
router.get('/getCompanyList', (req, res) => {
	var sql = 'select * from company'
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
router.get('/getCompanyList', (req, res) => {
	var sql = 'select * from company'
	pool.getConnection((err, connection) => {
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

router.get('/test', (req, res) => {
	var sql = 'select * from food'
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

module.exports = router