const express = require('express')

const router = express.Router();

const tcontroller = require('../controller/transaction')
const auth = require('../middleware/auth.js');

router.post('/add', auth.authenticate, tcontroller.addt)
router.get('/get', auth.authenticate, tcontroller.getT)
router.delete('/delete', auth.authenticate, tcontroller.deleteT)




module.exports = router;