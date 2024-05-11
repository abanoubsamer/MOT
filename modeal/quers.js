exports.query_signin = {
    POST_SIGNIN_QUERY: 'INSERT INTO public.finance_user(pass, email, age, name, address) VALUES ($1, $2, $3, $4, $5);',
};
exports.query_login = {
    POST_Login_QUERY: 'SELECT * FROM public.finance_user WHERE email = $1;',
    // Other queries if needed
};




exports.query_transactions = {
    POST_transactions_QUERY: 'INSERT INTO public.finance_transaction(amount, type, category, date, trans_budg) VALUES ($1, $2, $3, $4, $5) RETURNING trans_id',
    GET_transactions_BY_USER_ID_QUERY: 'SELECT trans_id, amount, type, category, date, trans_budg FROM public.finance_transaction WHERE trans_budg IN (SELECT budg_id FROM public.finance_budget WHERE budg_user = $1);',
};

exports.query_Budget  = {
    POST_Budget_QUERY: 'INSERT INTO public.finance_budget(amount, budg_user) VALUES ($1, $2);',
    // Other queries if needed
    GET_Budget_BY_USER_ID_QUERY: 'SELECT budg_id, amount  FROM  public.finance_budget  WHERE budg_user = $1;',
};






exports.query_home = {
    GET_transactions_BY_USER_ID_QUERY: 'SELECT SUM(amount) AS total_amount FROM public.finance_transactions WHERE trans_user = $1;',
    // Other queries if needed

};





exports.query_Investment  = {
    POST_Investment_QUERY: 'INSERT INTO public.Finance_Invest_User(invest_id,budg_id,amount, date) VALUES ($1, $2, $3, $4);',
    // Other queries if needed
    GET_ALL_INVES_QUERY: 'SELECT * FROM Finance_Investment',

    GET_Investment_BY_USER_ID_QUERY: `SELECT fi.Type, fi."return", fiu.amount, fiu.date 
    FROM Finance_Investment fi 
    INNER JOIN Finance_Invest_User fiu ON fi.inve_id = fiu.invest_id 
    WHERE fiu.budg_id = $1;
    `,
};






exports.query_Financial  = {
    POST_Financial_QUERY: 'INSERT INTO  public.finance_financialgoal(category, target_amount, date,amount_budg) VALUES ($1, $2, $3, $4);',
    // Other queries if needed
    GET_Financial_BY_USER_ID_QUERY: 'SELECT fg.goal_id, fg.category, fg.target_amount, fg.date, fb.amount FROM public.finance_financialgoal fg JOIN public.finance_budget fb ON fg.amount_budg = fb.budg_id  WHERE fb.budg_id =$1;',

    UPDATE_Financial_QUERY:"UPDATE   public.finance_financialgoal SET category=$2, currentamount=$3, targetamount=$4, date=$5 WHERE goalid=$1;",

    DELETE_Financial_QUERY:"DELETE FROM   public.finance_financialgoal WHERE goal_id=$1;"

};
exports.query_Dashboard = {
    
        POST_Dashboard_QUERY: `
        SELECT 
            (SELECT SUM(amount) FROM finance_invest_user WHERE budg_id IN (SELECT budg_id FROM finance_budget WHERE budg_user = $1)) AS TotalInvestments, 
            (SELECT SUM(amount) FROM finance_transaction WHERE type = 'Expense' AND trans_budg IN (SELECT budg_id FROM finance_budget WHERE budg_user = $1)) AS TotalExpenses,
            (SELECT SUM(amount) FROM finance_transaction WHERE date >= CURRENT_DATE - INTERVAL '1 month' AND trans_budg IN (SELECT budg_id FROM finance_budget WHERE budg_user = $1)) AS TotalRecentTransactions,
            (SELECT SUM(amount) FROM finance_budget WHERE budg_user = $1) AS TotalBudgets
    `
       
};
