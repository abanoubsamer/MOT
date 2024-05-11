const querys=require("../modeal/quers");
const connect=require("../modeal/connection");

exports.GetProfile =  (req, res, next) => {
        // Render the 'Transactions' page with the retrieved transactions
        res.render('profile');
   
};