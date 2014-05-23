'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Study Buddy'});
};

exports.login = (req, res)=>{
};

exports.showlogin = (req, res)=>{
console.log(req.query.loginType);
  res.render('home/login', {loginType:req.query.loginType});
};
