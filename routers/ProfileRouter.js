const router = require('express').Router();
const ProfileControal= require('../contral/Profile.contral');

router.get('/',ProfileControal.GetProfile)
module.exports= router;