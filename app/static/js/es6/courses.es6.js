/*jshint unused: false*/
/* global ajax */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('.video').click(video);
    $('.test').click(test);
    $('#course').on('click', '.next', next);
  }

  function next(e){
    if($(this).parent().children('#answers').children('.answer').children('input:checked').length){
      if($(this).parent().next('.hidden').next().length === 0){
        $(this).parent().next('.hidden').children('.next').remove();
        $('.submitTest').removeClass('hidden');
      }
      $(this).parent().removeClass('expandUp');
      $(this).parent().addClass('hidden');
      $(this).parent().next('.hidden').addClass('expandUp');
    }
    e.preventDefault();
  }

  function video(){
    var courseId = $('.course').attr('data-id');
    ajax(`/courses/${courseId}/video`, 'get', null, html=>{
      $('#course').empty().append(html);
    });
  }

  function test(){
    var courseId = $('.course').attr('data-id');
    ajax(`/courses/${courseId}/test`, 'get', null, html=>{
      $('#course').empty().append(html);
      $('.question1').removeClass('hidden');
    });
  }


})();
