'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.index = (req, res)=>{
  if(req.session.userId === undefined || req.session.userId === null) {
    res.render('home/index', {title: 'Study Buddy'});
  }
  else {
    if(req.session.userType === 'teacher') {
    console.log('redirect to teachers');
      res.redirect('/teachers');
    }
    else {
    console.log('redirect to students');
      res.redirect('/students');
    }
  }
};

exports.login = (req, res)=>{
  var user = new User(req.body);
  user.login(u=>{
    req.session.userId = null;
    if(u) { // user exists or was created
      req.session.userId = u._id;
      req.session.userType = u.type;
      if(u.type === 'student') {
        res.redirect('/students');
      }
      else {
        res.redirect('/teachers');
      }
    }
    else {
      res.redirect('/'); // login password incorrect
    }
  });
};

exports.showlogin = (req, res)=>{
console.log(req.query.loginType);
  res.render('home/login', {loginType:req.query.loginType});
};

exports.logout = (req, res)=>{
  req.session.userId = null;
  req.session.userType = null;
  res.redirect('/');
};
