var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user){
      console.log(req.session.user);
      res.render('index', { title: 'Express' });
  }else{
      req.session.error = "请先登录";
      res.redirect('login');
  }
});

module.exports = router;
