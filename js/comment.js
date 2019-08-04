'use strict';

(function () {
  var MAX_HASHTAG_COUNT = 5;
  var MIN_HASHTAG_LENGTH = 2;
  var MAX_HASHTAG_LENGTH = 20;
  var comment = window.overlayImage.querySelector('.text__description');
  var hashtag = window.overlayImage.querySelector('.text__hashtags');

  hashtag.addEventListener('input', function (evt) {
    var targetValue = evt.target.value.toLowerCase();
    var hashtags = targetValue.split(' ');

    var cleanArray = hashtags.filter(Boolean); // hashtags.filter(v=>v!='');
    evt.target.setCustomValidity('');
    if (cleanArray.length > MAX_HASHTAG_COUNT) {
      evt.target.setCustomValidity('Не может быть больше 5 хештегов');
      return;
    }
    for (var i = 0; i < cleanArray.length; i++) {
      if (cleanArray[i][0] !== '#') {
        evt.target.setCustomValidity('Хештег должен начинатьсяс символа "#"');
        return;
      }
      if (cleanArray[i].length > MAX_HASHTAG_LENGTH) {
        evt.target.setCustomValidity('Длина хештега должна не быть больше 20 символов');
        return;
      }
      if (cleanArray[i].length < MIN_HASHTAG_LENGTH) {
        evt.target.setCustomValidity('Длина хештега не должна быть меньше 2 символов');
        return;
      }
      if (cleanArray.some(function (item, arr) {
        return item === arr[0];
      })) {
        evt.target.setCustomValidity('Хештеги не должны повторяться');
      }
    }
  });

  comment.addEventListener('invalid', function () {
    if (comment.validity.tooShort) {
      comment.setCustomValidity('Комментарий должно состоять минимум из 2-х символов');
    } else {
      comment.setCustomValidity('');
    }
  });

  window.comment = comment;

})();
