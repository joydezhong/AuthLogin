var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var UserInfo = require('../models/user.js');

router.get('/', function(req, res, next) {
  req.locals = null;
  res.render('register');
});

router.post('/', function(req, res, next){
  console.log('user in session');
  console.log(req.session);
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;

  //验证是否存在账号
  var updateStr = {username: username};
  res.set({'Content-type': 'application/json;charset=utf-8'});
  console.log(updateStr);
  UserInfo.find(updateStr, function(err, obj){
    if(err){
      console.log("Error:" + err);
    }else{
      if(obj.length == 0){
        var newUser = new UserInfo({
            username: username,
            userpswd: password,
            logindata: new Date()
        });
          newUser.save(function(err){
            if(err){
                console.log('注册失败：'+ err);
                return;
            }
        });
        res.send({code: 1, message: "注册成功"});
      }else{
        res.send({code: 0, message: "账号已存在"});
      }
    }
  });
});

module.exports = router;
