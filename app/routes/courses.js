'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');

exports.create = (req, res)=>{

};

exports.new = (req, res)=>{

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

};

exports.grade = (req, res)=>{

};
