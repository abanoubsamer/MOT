
const querys=require("../modeal/quers");
const connect=require("../modeal/connection");
const { parse } = require("path");


exports.GetFinancial = async (req, res, next) => {
    try {
        // Fetch transactions for the logged-in user
        const createAccountQuery = querys.query_Financial.GET_Financial_BY_USER_ID_QUERY;
        const result = await connect.query(createAccountQuery, [req.session.Budg_id]);
        // Render the 'Transactions' page with the retrieved transactions
        res.render('FinancialGoals', { Financial: result.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }

    }

    

    exports.postFinancial = async(req, res, next) => {
        try {
            // Create account
            const createAccountQuery = querys.query_Financial.POST_Financial_QUERY;
            const queryParams = [
                req.body.category,
                req.body.target,
                req.body.date,
                req.session.Budg_id
            ];

            await connect.query(createAccountQuery, queryParams);
            res.redirect('/FinancialGoals');
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
        
        }
        exports.updateFinancial = async (req, res, next) => {
            try {
                 const data=JSON.parse(req.body.newdata);
                 const  Category=data.Category,
                 currentamount=Number(data. current_amount),
                  targetamount = Number(data. target_amount),
                   date =data.date // Assuming these values are provided in the request body

                const updateQuery = querys.query_Financial.UPDATE_Financial_QUERY;
        console.log(Category)
                // Execute the query with parameters
                await connect.query(updateQuery, [req.params.id, Category, currentamount, targetamount, date]);
        
                res.redirect('/FinancialGoals'); // Redirect to the appropriate page after successful update
            } catch (error) {
                console.error(error);
                return res.status(500).send({ message: 'Internal server error' });
            }
        }
        
        

        exports.deleteFinancial = async (req, res, next) => {
            try {
                const  goalid  = req.params.id; // Assuming goalid is sent as a parameter
                // Delete query
                const deleteQuery = querys.query_Financial.DELETE_Financial_QUERY;
                
                // Execute the query
                await connect.query(deleteQuery, [goalid]);
                
                res.redirect('/FinancialGoals'); // Redirect to FinancialGoals page after successful deletion
            } catch (error) {
                console.error(error);
                return res.status(500).send({ message: 'Internal server error' });
            }
        }
       