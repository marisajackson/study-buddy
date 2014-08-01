'use strict';

// var _ = require('lodash');
var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
// var User = traceur.require(__dirname + '/../models/user.js');

exports.create = (req, res)=>{
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

exports.flashcards = (req, res)=>{
  Course.findByCourseId(req.params.courseId, course=>{

    console.log('===================');
    console.log(course);

    res.render('courses/flashcards', {course: course});
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

exports.destroy = (req, res)=>{
  Course.removeRecord(req.params.courseId, ()=>{
    Course.findAllByTeacherId(req.session.userId, courses=>{
      res.render('teachers/courses', {courses:courses, title: 'Welcome Teacher'});
    });
  });
};
