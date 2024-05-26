const router = require('express').Router();
let body=require('body-parser');
 body=body.urlencoded ({extended: true});
 const authcontroal=require("../contral/athu.control");
 const auth_gured= require('./gareds/auth.gured');
 const check  = require('express-validator').check;



router.get('/signup',auth_gured.notAuth,authcontroal.getsingin)

router.post('/signup',auth_gured.notAuth,body,
check("email").isEmail().withMessage("i nvalid Email"),
check("password").isLength({ min: 6, max: 20 }).withMessage("Password must be between 6 and 20 characters"),
authcontroal.author_create_account);



router.get('/login',auth_gured.notAuth,authcontroal.getlogin)

router.post('/login',auth_gured.notAuth,body,authcontroal.author_login_account);



//logout from website

router.all('/logout',auth_gured.isAuth,authcontroal.logout)

module.exports= router;