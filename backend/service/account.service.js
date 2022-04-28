
const AccountModel = require('../database/account.model');

const list = async (req, res) => { 
    try{
        const results = await AccountModel.find().select("-_id").sort({created_at: -1});
        res.json(results);
    }catch(err){
        res.status(500).send(err.message);
    }
}
const detail = async (req, res) => {
    try{
        const results = await AccountModel.findOne({
            id: req.params.accountId
        }).select("-_id").sort({created_at: -1});
        res.json(results);
    }catch(err){
        res.status(500).send(err.message);
    }
 }
module.exports = {
    list,
    detail
}