/* global ajax */
/* jshint unused:false */


(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#createCourse').on('click', createCourse);
    $('#add').on('click', addQuestion);
  }

  function addQuestion(){
    var question = $('form#course > .questionField:last-child');
    $('form#course').append(question.clone());
  }

  function createCourse(){
    ajax(`/courses/new`, 'GET', null, html=>{
      $('#courses').append(html);
    });
  }

})();
