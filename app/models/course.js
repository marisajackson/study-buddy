'use strict';


var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');
var _ = require('lodash');

class Course {
  static create(userId, crsData, fn){
    var answers = _.zip(crsData.correct, crsData.wrong1, crsData.wrong2, crsData.wrong3);
    var test = crsData.questions.map((q,i)=>{
      return { q:q, a:answers[i] };
    });
    var c = new Course();
    c.date = new Date();
    c.teacherId = Mongo.ObjectID(userId);
    c.videoURL = crsData.videoURL;
    c.test = test;
    c.students = {};
    c.save(()=>{
      fn();
    });
  }




  static findAll(fn) {
    courses.find({},{test:false, videoURL:false}).toArray((e,c)=>{
      fn(c);
    });
  }




  static findByCourseId(courseId, fn){
      courseId = Mongo.ObjectID(courseId);
      courses.findOne({_id:courseId}, (err, course)=>{
        course = _.create(Course.prototype, course);
        fn(course);
      });
    }

  getVideoURL(){
    var key = this.videoURL.split('=');
    var videoKey = key[1];
    return videoKey;
    }

  answerScramble(){
    this.test.forEach(question=>{
    question.answers =  _.shuffle(question.answers);
    });
  }

  grade(answers){
    // answers.keys
  }

  save(fn) {
    courses.save(this,(e,c)=>{
      fn(c);
    });
  }

}


module.exports = Course;
