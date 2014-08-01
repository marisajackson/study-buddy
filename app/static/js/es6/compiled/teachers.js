(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#courses').on('click', '#create-course', createCourse);
    $('#courses').on('click', 'form .add-question', addQuestion);
    $('#courses').on('click', 'form .add-flashcard', addFlashcard);
    $('#courses').on('submit', 'form', submitTest);
    $('#courses').on('click', 'form .delete-question', deleteQuestion);
    $('#courses').on('click', 'form .delete-flashcard', deleteFlashcard);
    $('#past-courses').on('click', '.delete-course', deleteCourse);
  }
  function deleteCourse() {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId), 'DELETE', null, (function(html) {
      $('#past-courses').empty().append(html);
    }));
  }
  function addFlashcard(e) {
    var flashcard = $('#courses > form .flashcard-field:last-child');
    $('#flashcards').append(flashcard.clone());
    $('#flashcards div:last-child input').each((function(a, b) {
      return $(b).val('');
    }));
    e.preventDefault();
  }
  function deleteFlashcard(e) {
    if ($('#courses > form .flashcard-field').length > 1) {
      $(this).parent().remove();
    }
    e.preventDefault();
  }
  function deleteQuestion(e) {
    if ($('#courses > form .question-field').length > 1) {
      $(this).parent().remove();
    }
    e.preventDefault();
  }
  function submitTest() {}
  function addQuestion(e) {
    var question = $('#courses > form .question-field:last-child');
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
