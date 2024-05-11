const querys=require("../modeal/quers");
const connect=require("../modeal/connection");

exports.GetBudget =async (req, res, next) => {

    try {
        // Fetch transactions for the logged-in user
        const createAccountQuery = querys.query_Budget.GET_Budget_BY_USER_ID_QUERY;
        const result = await connect.query(createAccountQuery, [req.session.userId]);
        // Render the 'Transactions' page with the retrieved transactions
        if (result.rows.length > 0) {
            // Store the budg_id associated with the user in the session
            req.session.Budg_id = result.rows[0].budg_id;
     
        } else {
        }
        res.render('Budget', { Budget: result.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
    
    }

    exports.PostBudget = async (req, res, next) => {
        try {
            // Create account
            const createAccountQuery = querys.query_Budget.POST_Budget_QUERY;
            const queryParams = [
                req.body.Amount,
                req.session.userId
            ];

            await connect.query(createAccountQuery, queryParams);
            res.redirect('/Budget');
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    };