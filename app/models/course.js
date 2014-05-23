'use strict';


var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');
var _ = require('lodash');

class Course {
  static create(userId, order, fn){
    var c = new Course();
    c.date = new Date();
    c.teacherId = Mongo.ObjectID(userId);
    c.videoURL = null;
    c.test = [];
    c.students = [];
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

  grade(answers, userId){
    var questions = Object.keys(answers).toString().split(',');
    var answerArray = questions.map(x=>{
      return answers[x];
    });
    var score = this.test.length;

    answerArray.map((a, i)=>{
      if(answerArray[i] !== this.test[i].answers[0]){
        score -= 1;
      }
    });
    
    var percentScore = (score / this.test.length).toFixed(2) * 100;
    this.students[userId] = percentScore;
  }

  save(fn){
    courses.save(this, (e,c)=>{
      fn(c);
    });
  }

}


module.exports = Course;
