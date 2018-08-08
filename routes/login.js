var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var UserInfo = require('../models/user.js');

// var request = require('request');

router.get('/',function(req, res){
    res.render('login');   //渲染login.ejs
});

router.post('/', function(req, res){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    UserInfo.find({username: username}, function(err, obj){
        if(err){
            console.log("Error:" + err);
        }else{
            if(obj.length == 0){
                res.send({code: 0, message: "此用户不存在"});
            }else{
                console.log(obj);
                for(var i = 0; i < obj.length; i++){
                    if(obj[i].username == username && obj[i].userpswd == password){
                        req.session.user = req.body.username;
                        res.render('index',{code: 1, title: "登陆了 还可以"});
                        // res.redirect('/index');
                    }
                }
            }
        }
    });

});

module.exports = router;