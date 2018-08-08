var express = require('express');
var router = express.Router();

// var request = require('request');

router.get('/',function(req, res, next){
    req.session.destroy();
    res.render('login');   //渲染login.ejs
});


module.exports = router;