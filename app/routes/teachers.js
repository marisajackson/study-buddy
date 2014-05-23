'use strict';

exports.index = (req, res)=>{
  res.render('teachers/index', {title: 'Welcome Teacher'});
};
