/* global ajax */
/* jshint unused:false */


(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#createCourse').click(createCourse);
    $('#courses').on('click', 'form .add', addQuestion);
    $('#courses').on('submit', 'form', submitTest);
    $('#courses').on('click', 'form .deleteQuestion', deleteQuestion);
  }


  function deleteQuestion(e){
    if($('#courses > form .questionField').length > 1){
      $(this).parent().remove();
    }
    e.preventDefault();
  }

  function submitTest(){
  }

  function addQuestion(e){
    var question = $('#courses > form .questionField:last-child');
    console.log(question);
    $('#questions').append(question.clone());
    $('#questions div:last-child input').each((a,b)=>$(b).val(''));
    e.preventDefault();
  }

  function createCourse(){
    console.log('you clicked the CREATE COURSE button');
    ajax(`/courses/new`, 'GET', null, html=>{
      $('#courses').append(html);
    });
  }

})();
