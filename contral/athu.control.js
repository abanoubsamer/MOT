
const querys=require("../modeal/quers");
const connect=require("../modeal/connection");
const bcrypt = require('bcrypt');

///////////////////////////////////(get singin page)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
exports.getsingin = (req, res, next) => {
    res.render('signup');

}
///////////////////////////////////(create account from website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
exports.author_create_account =async  (req, res, next) => {
    try {
        // Check if the user already exists
        const userExistsQuery = 'SELECT * FROM public.finance_user WHERE email = $1';
        const userExistsParams = [req.body.email];
        const existingUser = await connect.query(userExistsQuery, userExistsParams);

        if (existingUser.rows.length > 0) {
            // User already exists, return an error
            res.redirect('/signup');
        }

     
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        // Create account
        const createAccountQuery = querys.query_signin.POST_SIGNIN_QUERY;
        const queryParams = [
            hashedPassword,
            req.body.email,
            req.body.age,
            req.body.firstname + ' ' + req.body.lastname, // Concatenate first and last names
            req.body.Address
        ];
        await connect.query(createAccountQuery, queryParams);
        // Redirect to homepage or wherever you want
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};
///////////////////////////////////(get login page)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
exports.getlogin = (req, res, next) => {
    res.render('login')

}
///////////////////////////////////(login from website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
exports.author_login_account = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Execute the login query
        const query = querys.query_login.POST_Login_QUERY;
        const result = await connect.query(query, [email]); // Provide only the email
        // Check if any rows were returned
        if (result.rows.length === 0) {
            // No matching user found
            return res.status(401).json({ error: 'Invalid email ' });
        }
        // Compare the hashed password with the provided password
        const hashedPassword = result.rows[0].pass;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatch) {
            // Passwords don't match
            return res.status(401).json({ error: 'Invalid password.' });
        }
        // Passwords match, login successful
        const budgquary=querys.query_Budget.GET_Budget_BY_USER_ID_QUERY;
        const budg_id=await connect.query(budgquary,[result.rows[0].user_id])
        req.session.userId =result.rows[0].user_id;
        req.session.username =result.rows[0].name;
        
     
        res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



///////////////////////////////////(logout from website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.logout=(req,res,next)=>{
req.session.destroy(()=>{
    res.redirect('/');
})

}