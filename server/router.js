let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

module.exports = router