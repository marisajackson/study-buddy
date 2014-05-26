'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');

exports.index = (req, res)=>{
  if(req.session.userId===null || req.session.userId === undefined || req.session.userType !=='teacher') {
    res.redirect('/');
  }
  Course.findAllByTeacherId(req.session.userId, courses=>{
    res.render('teachers/index', {courses:courses, title: 'Welcome Teacher'});
  });
};
