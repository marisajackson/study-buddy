'use strict';

exports.index = (req, res)=>{
  if(req.session.userId || req.session.userType !=='student') {
    res.redirect('/');
  }
  res.render('students/index', {title: 'Students Index'});
};
