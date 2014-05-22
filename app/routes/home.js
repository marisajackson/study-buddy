'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Study Buddy'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};
