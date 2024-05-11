const querys=require("../modeal/quers");
const connect=require("../modeal/connection");

exports.GetTransactions = async (req, res, next) => {
    try {
        // Fetch transactions for the logged-in user
        const gettTransactionQuery = querys.query_transactions.GET_transactions_BY_USER_ID_QUERY;
        const result = await connect.query(gettTransactionQuery, [req.session.userId]);

        // Render the 'Transactions' page with the retrieved transactions
        res.render('Transactions', { transactions: result.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

    exports.Post_Transactions = async (req, res, next) => {
        try {

              // Insert the transaction into finance_transaction table
          
            // Create account
            const insertTransactionQuery = querys.query_transactions.POST_transactions_QUERY;
            const queryParams = [
                req.body.Amount,
                req.body.Type,
                req.body.category ,
                req.body.date,
                req.session.Budg_id
            ];

            const transactionResult = await connect.query(insertTransactionQuery, queryParams);
              const transId = transactionResult.rows[0].trans_id;


              if (  req.body.Type === 'Income') {
                // Increase budget for income
                const increaseBudgetQuery = 'UPDATE public.finance_budget SET amount = amount + $1 WHERE budg_id = $2';
                await connect.query(increaseBudgetQuery, [ req.body.Amount,  req.session.Budg_id]);
            } else if ( req.body.Type === 'Expense') {
                // Decrease budget for expense
                const budgetCheckQuery = 'SELECT amount FROM public.finance_budget WHERE budg_id = $1';
                const budgetCheckResult = await connect.query(budgetCheckQuery, [req.session.Budg_id]);
        
                const currentBudgetAmount = budgetCheckResult.rows[0].amount;
              console.log( + ' ' +  req.body.Amount)
        
                if (parseInt(currentBudgetAmount) < req.body.Amount) {
                    // If budget amount is insufficient, return an error response
                    return res.status(400).send({ message: 'Insufficient budget amount' });
                }


                const decreaseBudgetQuery = 'UPDATE public.finance_budget SET amount = amount - $1 WHERE budg_id = $2';
                await connect.query(decreaseBudgetQuery, [ req.body.Amount,  req.session.Budg_id]);
            }
            res.redirect('/Transactions');
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
          