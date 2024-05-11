const router = require('express').Router();
const FinancialControal= require('../contral/Financial.contral');
let body=require('body-parser');
 body=body.urlencoded ({extended: true});
router.get('/',FinancialControal.GetFinancial)
router.post('/',body,FinancialControal.postFinancial)
router.post('/update/:id',body,FinancialControal.updateFinancial)
router.post('/delete/:id',body,FinancialControal.deleteFinancial)

module.exports= router;