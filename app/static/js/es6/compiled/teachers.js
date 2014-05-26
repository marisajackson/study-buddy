(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#createCourse').click(createCourse);
    $('#courses').on('click', 'form .add', addQuestion);
    $('#courses').on('submit', 'form', submitTest);
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
      $('#courses').append(html);
    }));
  }
})();

//# sourceMappingURL=teachers.map
