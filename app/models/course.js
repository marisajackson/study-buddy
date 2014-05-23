var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');

class Course {

static findByCourseId(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id:courseId}, (err, course)=>{
      fn(course);
    });
  }


}


module.exports = Course;
