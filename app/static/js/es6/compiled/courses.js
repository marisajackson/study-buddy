(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('.video').click(video);
    $('.flashcards').click(flashcards);
    $('.test').click(test);
    $('#course').on('click', '.next', next);
    $('#course').on('click', '.next-flashcard', nextCard);
    $('#course').on('click', '.card', flip);
  }
  function flip() {
    $(this).addClass('rotate');
  }
  function nextCard() {
    if ($(this).parent().next('.hidden').next().length === 0) {
      $(this).parent().next('.hidden').children('.next').remove();
      $('.submitTest').removeClass('hidden');
    }
    $(this).parent().removeClass('expandUp');
    $(this).parent().addClass('hidden');
    $(this).parent().next('.hidden').addClass('expandUp');
  }
  function next(e) {
    if ($(this).parent().children('#answers').children('.answer').children('input:checked').length) {
      if ($(this).parent().next('.hidden').next().length === 0) {
        $(this).parent().next('.hidden').children('.next').remove();
        $('.submitTest').removeClass('hidden');
      }
      $(this).parent().removeClass('expandUp');
      $(this).parent().addClass('hidden');
      $(this).parent().next('.hidden').addClass('expandUp');
    }
    e.preventDefault();
  }
  function flashcards() {
    var courseId = $('.course').attr('data-id');
    ajax(("/courses/" + courseId + "/flashcards"), 'get', null, (function(html) {
      $('#course').empty().append(html);
      $('.flashcard1').removeClass('hidden');
    }));
  }
  function video() {
    var courseId = $('.course').attr('data-id');
    ajax(("/courses/" + courseId + "/video"), 'get', null, (function(html) {
      $('#course').empty().append(html);
    }));
  }
  function test() {
    var courseId = $('.course').attr('data-id');
    ajax(("/courses/" + courseId + "/test"), 'get', null, (function(html) {
      $('#course').empty().append(html);
      $('.question1').removeClass('hidden');
    }));
  }
})();

//# sourceMappingURL=courses.map
