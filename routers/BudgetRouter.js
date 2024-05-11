const router = require('express').Router();
const BudgetControal= require('../contral/Budget.contral');
let body=require('body-parser');
 body=body.urlencoded ({extended: true});


router.get('/',BudgetControal.GetBudget)
router.post('/',body,BudgetControal.PostBudget)

module.exports= router;