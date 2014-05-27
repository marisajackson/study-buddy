(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('.teacher, .student').click(login);
  }
  function login() {
    var loginType = 'student';
    if ($(this).hasClass('teacher')) {
      loginType = 'teacher';
    }
    ajax('/showlogin', 'get', {loginType: loginType}, (function(html) {
      $('#splash-login').empty().append(html);
    }));
  }
})();

//# sourceMappingURL=login.map
