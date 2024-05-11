const router = require('express').Router();
const TransactionsControal= require('../contral/Transactions.contral');
let body=require('body-parser');
body=body.urlencoded ({extended: true});
router.get('/',TransactionsControal.GetTransactions)
router.post('/',body,TransactionsControal.Post_Transactions)
module.exports= router;