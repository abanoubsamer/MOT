
const querys=require("../modeal/quers");
const connect=require("../modeal/connection");

exports.GetInvestment =async (req, res, next) => {
    try {
        // Fetch transactions for the logged-in user
        const createAccountQuery = querys.query_Investment.GET_Investment_BY_USER_ID_QUERY;
        const all_transactions = querys.query_Investment.GET_ALL_INVES_QUERY;
        const result = await connect.query(createAccountQuery, [req.session.Budg_id]);
        const inves = await  connect.query(all_transactions);
       console.log(result.rows );
        // Render the 'Transactions' page with the retrieved transactions
        res.render('Investment', { Investment: result.rows 
            ,Investments:inves.rows
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
    
    }

    
    exports.postInvestment = async (req, res, next) => {
        try {
            // Check if budget amount is sufficient
            const budgetCheckQuery = 'SELECT amount FROM public.finance_budget WHERE budg_id = $1';
            const budgetCheckResult = await connect.query(budgetCheckQuery, [req.session.Budg_id]);



                console.log(req.session.Budg_id);
            const currentBudgetAmount = budgetCheckResult.rows[0].amount;
            const investmentAmount = req.body.Amount;
            console.log(currentBudgetAmount +"         " +investmentAmount);
            if (parseInt(currentBudgetAmount) < investmentAmount) {
                // If budget amount is insufficient, return an error response
                return res.status(400).send({ message: 'Insufficient budget amount' });
            }
            // Decrease budget amount
            const decreaseBudgetQuery = 'UPDATE public.finance_budget SET amount = amount - $1 WHERE budg_id = $2';
            await connect.query(decreaseBudgetQuery, [investmentAmount, req.session.Budg_id]);
    
            // Create investment account
            const createAccountQuery = querys.query_Investment.POST_Investment_QUERY;
            const queryParams = [
                req.body.Type,
                req.session.Budg_id,
                investmentAmount,
                req.body.Date,
            ];
            await connect.query(createAccountQuery, queryParams);
    
            // Redirect to Investment page
            res.redirect('/Investment');
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
    
       
        
   