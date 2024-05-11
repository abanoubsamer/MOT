const router = require('express').Router();
const InvestmentControal= require('../contral/Investment.contral');
let body=require('body-parser');
 body=body.urlencoded ({extended: true});
router.get('/',InvestmentControal.GetInvestment)
router.post('/',body,InvestmentControal.postInvestment)
module.exports= router;