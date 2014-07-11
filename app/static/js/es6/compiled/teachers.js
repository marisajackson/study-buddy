(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#courses').on('click', '#createCourse', createCourse);
    $('#courses').on('click', 'form .addQuestion', addQuestion);
    $('#courses').on('click', 'form .addFlashcard', addFlashcard);
    $('#courses').on('submit', 'form', submitTest);
    $('#courses').on('click', 'form .deleteQuestion', deleteQuestion);
  }
  function addFlashcard(e) {
    var flashcard = $('#courses > form .flashcardField:last-child');
    $('#flashcards').append(flashcard.clone());
    $('#flashcards div:last-child input').each((function(a, b) {
      return $(b).val('');
    }));
    e.preventDefault();
  }
  function deleteQuestion(e) {
    if ($('#courses > form .questionField').length > 1) {
      $(this).parent().remove();
    }
    e.preventDefault();
  }
  function submitTest() {}
  function addQuestion(e) {
    var question = $('#courses > form .questionField:last-child');
    console.log(question);
    $('#questions').append(question.clone());
    $('#questions div:last-child input').each((function(a, b) {
      return $(b).val('');
    }));
    e.preventDefault();
  }
  function createCourse() {
    console.log('you clicked the CREATE COURSE button');
    ajax("/courses/new", 'GET', null, (function(html) {
      $('#courses').empty().append(html);
    }));
  }
})();

//# sourceMappingURL=teachers.map
