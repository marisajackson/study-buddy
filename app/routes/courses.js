'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
// var User = traceur.require(__dirname + '/../models/user.js');

exports.create = (req, res)=>{
  console.log('you have created a course using the course form');
  console.log(req.body);
  // Course.create(req.session.userId, req.body, ()=>res.redirect('/teachers/index'));
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
    course.grade(req.body, req.session.userId);
    console.log(course);
    course.save(()=>{
      res.redirect('/students');
    });
  });
};
