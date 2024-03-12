const loan_model = require("../models/loan_model")
const getMy_loan = async(req, res) => {
    try{
        let {wallet_address} = req.body
        let loanRes = await loan_model.find({userAddress : wallet_address})
        return res.status(200).send({
            success: true,
            status: 200,
            data: loanRes,
        });
    }catch(error){
        console.log(error)
        return res.status(404).send({
            success: false,
            status: 404,
            Message: error,
        });
    }
}

const getRecent_loan = async(req, res) => {
    try{
        let loanRes = await loan_model.find().sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            status: 200,
            data: loanRes,
        });
    }catch(error){
        console.log(error)
        return res.status(404).send({
            success: false,
            status: 404,
            Message: error,
        });
    }
}

module.exports = {
    getMy_loan,
    getRecent_loan
}