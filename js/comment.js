'use strict';

(function () {
  // коментарии
  var comment = window.overlayImage.querySelector('.text__description');
  comment.addEventListener('invalid', function () {
    if (comment.validity.tooShort) {
      comment.setCustomValidity('Комментарий должно состоять минимум из 2-х символов');
    } else {
      comment.setCustomValidity('');
    }
  });

  window.comment = comment;

})();
