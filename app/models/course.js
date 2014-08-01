'use strict';


var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');
var _ = require('lodash');
var moment = require('moment');

class Course {
  static create(userId, crsData, fn){
    var flashcards = crsData.sideA.map((q, i)=>{
      return {sideA: crsData.sideA[i], sideB: crsData.sideB[i]};
    });
    var answers = _.zip(crsData.correct, crsData.wrong1, crsData.wrong2, crsData.wrong3);
    var test = crsData.questions.map((q,i)=>{
      return { question:q, answers:answers[i] };
    });
    var c = new Course();
    c.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    c.teacherId = Mongo.ObjectID(userId);
    c.title = crsData.title;
    c.videoURL = crsData.videoURL;
    c.test = test;
    c.students = {};
    c.flashcards = flashcards;
    c.save(()=>{
      fn();
    });
  }

  static removeRecord(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.remove({_id: courseId}, ()=>{
      fn();
    });
  }

  static findAllByTeacherId(userId, fn){
    userId = Mongo.ObjectID(userId);
    courses.find({teacherId:userId}).toArray((e,c)=>{
      var course = _.create(Course.prototype, course);
      fn(c);
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
