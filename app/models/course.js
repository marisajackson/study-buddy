var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');

class Course {
  constructor(userId){
    this.userId = userId;
  }

static findByCourseId(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id:courseId}, (err, course)=>{
      fn(course);
    });
  }


}


module.exports = Course;
