const Transaction = require('../models/transaction');




exports.addt = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const category = req.body.category;
        const userid = req.body.userid
        //console.log(amount,category,userid)
        const transaction = await Transaction.create({
            Amount: amount,
            Category: category,
            userId: userid
        })
        res.status(200).json({ "message": "transaction" })
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.getT = async (req, res, next) => {
    try {
        //const userid = req.user.id;
        const transactions = await Transaction.find({ userId: req.user.id });
        console.log(transactions)
        res.status(200).json({
            transactions: transactions
        })
    } catch (err) {
        res.status(400).json(err)
    }
}