'use strict';

exports.index = (req, res)=>{
  if(req.session.userId===null || req.session.userId === undefined || req.session.userType !=='teacher') {
    res.redirect('/');
  }

  res.render('teachers/index', {title: 'Welcome Teacher'});
};
