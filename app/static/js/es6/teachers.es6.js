/* global ajax */
/* jshint unused:false */


(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#createCourse').click(createCourse);
    $('#courses').on('click', 'form .add', addQuestion);
    $('#courses').on('submit', 'form', submitTest);
  }

  function submitTest(){
    alert('I work!');
  }

  function addQuestion(e){
    var question = $('#courses > form .questionField:last-child');
    console.log(question);
    $('#questions').append(question.clone());
    e.preventDefault();
  }

  function createCourse(){
    console.log('you clicked the CREATE COURSE button');
    ajax(`/courses/new`, 'GET', null, html=>{
      $('#courses').append(html);
    });
  }

})();
