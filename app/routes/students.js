'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');

exports.index = (req, res)=>{
  if(req.session.userId || req.session.userType !=='student') {
    res.redirect('/');
  }
  Course.findAll(courses=>{
    res.render('students/index', {courses: courses, title: 'Students Index'});
  });
};
