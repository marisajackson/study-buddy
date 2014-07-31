'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var teachers = traceur.require(__dirname + '/../routes/teachers.js');
  var courses = traceur.require(__dirname + '/../routes/courses.js');
  var students = traceur.require(__dirname + '/../routes/students.js');

  app.all('*', home.lookup);

  app.get('/', dbg, home.index);
  app.post('/login', dbg, home.login);

  app.get('/logout', dbg, home.logout);
  app.get('/showlogin', dbg, home.showlogin);

  app.get('/teachers', dbg, teachers.index);

  app.get('/students', dbg, students.index);

  app.post('/courses', dbg, courses.create);
  app.get('/courses/new', dbg, courses.new);
  app.get('/courses/:courseId', dbg, courses.show);
  app.get('/courses/:courseId/video', dbg, courses.video);
  app.get('/courses/:courseId/flashcards', dbg, courses.flashcards);
  app.get('/courses/:courseId/test', dbg, courses.test);
  app.put('/courses/:courseId/test', dbg, courses.grade);
  app.delete('/courses/:courseId', dbg, courses.destroy);

  console.log('Routes Loaded');
  fn();
}
