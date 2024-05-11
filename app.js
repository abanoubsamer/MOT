const express = require('express');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const port = process.env.PORT || 3000;
require("dotenv").config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());



const { Pool } = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

// Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Create a session store using connect-pg-simple
const store = new pgSession({
    pool: pool,
    tableName: 'session' // Specify the table name for session storage
});

// Configure Express to use sessions
app.use(session({
    store: store, // Use the PostgreSQL session store
    secret: "this my seecret to increbt to session storage.....",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}))




const authRouter = require('./routers/authrouter');
const homeRouter=require('./routers/home.router');
const TransactionsRouter= require('./routers/TransactionsRouter');
const BudgetRouter=require('./routers/BudgetRouter');
const FinancialRouter=require('./routers/FinancialRouter');
const InvestmentRouter=require('./routers/InvestmentRouter');
const ProfileRouter= require('./routers/ProfileRouter')


app.use('/', authRouter);
app.use('/', homeRouter);
app.use('/Transactions', TransactionsRouter);
app.use('/Budget', BudgetRouter);
app.use('/FinancialGoals', FinancialRouter);
app.use('/Investment', InvestmentRouter);
app.use('/profile', ProfileRouter);

app.listen(port, (err) => {
    if (err)
        console.log(err);
    else
        console.log("listening on port:", port)
});