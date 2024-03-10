const Transaction = require('../models/transaction');
const User = require('../models/user-details')




exports.addt = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const category = req.body.category;
        const userid = req.body.userid
        // console.log(amount,category,userid)
        if (category == 'income') {
            //const user = await User.find({ _id: userid });
            const newincome = Number(amount) + Number(req.user.Totalincome);
            const newsavings = Number(req.user.Savings) + Number(amount)
            await User.findByIdAndUpdate({ _id: userid }, { $set: { Totalincome: newincome, Savings: newsavings } });
            const user = await User.find({ _id: req.user._id })
            // console.log(user[0].TotalExpense)
            const transaction = await Transaction.create({
                Amount: amount,
                Category: category,
                userId: userid,
            })
            return res.status(200).json({
                transaction: transaction,
                totalexpense: user[0].TotalExpense,
                savings: user[0].Savings,
                totalincome: user[0].Totalincome
            })
        } else {
            const newexpense = Number(amount) + Number(req.user.TotalExpense);
            const newsavings = Number(req.user.Savings) - Number(amount)
            await User.findByIdAndUpdate({ _id: userid }, { $set: { TotalExpense: newexpense, Savings: newsavings } });
            const user = await User.find({ _id: req.user._id })
            // console.log(user[0].TotalExpense)
            const transaction = await Transaction.create({
                Amount: amount,
                Category: category,
                userId: userid,
            })
            return res.status(200).json({
                transaction: transaction,
                totalexpense: user[0].TotalExpense,
                savings: user[0].Savings,
                totalincome: user[0].Totalincome
            })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

//function for getting the expense for the logged in user
exports.getT = async (req, res, next) => {
    try {
        //const userid = req.user.id;
        const transactions = await Transaction.find({ userId: req.user.id });
        const user = await User.find({ _id: req.user.id })
        console.log(user)
        res.status(200).json({
            transactions: transactions,
            totalexpense: user[0].TotalExpense,
            savings: user[0].Savings,
            totalincome: user[0].Totalincome

        })
    } catch (err) {
        res.status(400).json(err)
    }
}



//funtion for deleting transactions of the logged in user
exports.deleteT = async (req, res, next) => {
    try {
        const expid = req.query.id;
        const category = req.query.category;
        const amount = req.query.amount;
        const uid = req.user.id;
        if (category == 'income') {
            const newincome = Number(req.user.Totalincome) - Number(amount);
            const newsavings = Number(req.user.Savings) - Number(amount);
            await Transaction.findOneAndDelete({ _id: expid, userId: uid });
            await User.findByIdAndUpdate({ _id: req.user._id }, { $set: { Totalincome: newincome, Savings: newsavings } })
            const user = await User.find({ _id: req.user._id })
            return res.status(200).json({
                totalexpense: user[0].TotalExpense,
                savings: user[0].Savings,
                totalincome: user[0].Totalincome
            })
        } else {
            const newexpense = Number(req.user.TotalExpense) - Number(amount);
            const newsavings = Number(req.user.Savings) + Number(amount);
            await Transaction.findOneAndDelete({ _id: expid, userId: uid });
            await User.findByIdAndUpdate({ _id: req.user._id }, { $set: { TotalExpense: newexpense, Savings: newsavings } })
            const user = await User.find({ _id: req.user._id })
            return res.status(200).json({
                totalexpense: user[0].TotalExpense,
                savings: user[0].Savings,
                totalincome: user[0].Totalincome
            })
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}