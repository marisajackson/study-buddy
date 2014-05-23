'use strict';

exports.index = (req, res)=>{
  if(req.session.userId===null || req.session.userId === undefined || req.session.userType !=='student') {
    res.redirect('/');
  }
  res.render('students/index', {title: 'Students Index'});
};
