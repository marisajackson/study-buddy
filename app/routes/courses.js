'use strict';

// var _ = require('lodash');
var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
// var User = traceur.require(__dirname + '/../models/user.js');

exports.create = (req, res)=>{
//   var answers = _.zip(req.body.correct, req.body.wrong1, req.body.wrong2, req.body.wrong3);
//   var test = req.body.questions.map((q,i)=>{
//     return { q:q, a:answers[i] };
//   });
// console.log(test);
  Course.create(req.session.userId, req.body, ()=>res.redirect('/teachers'));
};

exports.new = (req, res)=>{
  res.render('courses/new', {title:'New Course Form'});
};

exports.show = (req, res)=>{
 Course.findByCourseId(req.params.courseId, course=>{
   res.render('courses/show', {course: course});
 });
};

exports.video = (req, res)=>{
  Course.findByCourseId(req.params.courseId, course=>{
    var video = course.getVideoURL();
    res.render('courses/video', {video: video});
  });
};

exports.test = (req, res)=>{
  Course.findByCourseId(req.params.courseId, course=>{
    course.answerScramble();
    res.render('courses/test', {course: course});
  });
};

exports.grade = (req, res)=>{
  Course.findByCourseId(req.params.courseId, course=>{
    course.grade(req.body);
  });
};
