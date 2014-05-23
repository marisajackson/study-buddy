'use strict';


var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');

class Course {
  // static create(userId, order, fn){
  //   var c = new Course();
  //   c.userId = Mongo.ObjectID(userId);
  //   c.date = new Date();
  // }
  //
  //
  //
  //
  //


static findByCourseId(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id:courseId}, (err, course)=>{
      fn(course);
    });
  }


}


module.exports = Course;
