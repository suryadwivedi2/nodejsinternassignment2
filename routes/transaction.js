const express = require('express')

const router = express.Router();

const tcontroller = require('../controller/transaction')
const auth = require('../middleware/auth.js');

router.post('/add', tcontroller.addt)
router.get('/get', auth.authenticate, tcontroller.getT)




module.exports = router;