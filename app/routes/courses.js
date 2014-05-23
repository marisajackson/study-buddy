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

};

exports.test = (req, res)=>{

};

exports.grade = (req, res)=>{

};
