const router = require('express').Router();
const BudgetControal= require('../contral/Budget.contral');
let body=require('body-parser');
 body=body.urlencoded ({extended: true});



router.get('/input_budget',BudgetControal.GetBudget)
router.get('/',BudgetControal.GetBudgethome)
router.post('/input_budget',body,BudgetControal.PostBudget)

module.exports= router;