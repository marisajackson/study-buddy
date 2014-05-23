/*jshint unused: false*/
/* global ajax */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('.video').click(video);
    $('.test').click(test);
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
    });
  }


})();
