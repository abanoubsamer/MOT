const queries = require('./quers');
const connect = require('./connection');

exports.isAuth_budget = async (req, res, next) => {
    try {
        const result = await connect.query(
            '', 
            [req.session.userId]
        );

        console.log(req.session.userId);
        console.log(result.rows[0]);

        if (result.rows.length > 0) {
            req.session.Budg_id = result.rows[0].budg_id;
            next();  // Proceed to the next middleware or route handler
        } else {
            res.redirect('/Budget/input_budget');  // Ensure correct path
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
    }
};
