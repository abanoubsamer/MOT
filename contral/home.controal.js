const querys=require("../modeal/quers");
const connect=require("../modeal/connection");


exports.getHome = async (req, res, next) => {
    try {
        // Fetch dashboard data for the logged-in user
        const DashboardQuery = querys.query_Dashboard.POST_Dashboard_QUERY;
        const Dashboard = await connect.query(DashboardQuery, [req.session.userId]);
console.log(Dashboard.rows[0]);
        // Fetch transactions for the logged-in user
        const TransactionsQuery = querys.query_transactions.GET_transactions_BY_USER_ID_QUERY;
        const Transactions = await connect.query(TransactionsQuery, [req.session.userId]);
        
        // Render the 'home' page with the retrieved dashboard data and transactions
        res.render('home', { Dashboard: Dashboard.rows[0], Transactions: Transactions.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
