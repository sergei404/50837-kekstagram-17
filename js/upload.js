'use strict';

(function () {
  var templateError = document.querySelector('#error').content;
  var templateSuccess = document.querySelector('#success').content;
  var main = document.querySelector('main');
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
      if (xhr.status === 200) {
        onAchievement();
      } else {
        onFailing();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  function onAchievement() {
    var success = templateSuccess.querySelector('.success').cloneNode(true);
    main.appendChild(success);
    var buttonSuccess = success.querySelector('.success__button');

    buttonSuccess.addEventListener('click', onPopupSuccessClose);

    document.addEventListener('click', onPopupSuccessClose);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        onPopupSuccessClose();
      }
    });

    function onPopupSuccessClose() {
      success.remove();
      buttonSuccess.removeEventListener('click', onPopupSuccessClose);
      document.removeEventListener('click', onPopupSuccessClose);
      document.removeEventListener('keydown', onPopupSuccessClose);
    }
  }

  function onFailing() {
    var error = templateError.querySelector('.error').cloneNode(true);
    main.appendChild(error);
    var buttonErrorOne = error.querySelectorAll('.error__button')[0];
    var buttonErrorTwo = error.querySelectorAll('.error__button')[1];

    buttonErrorOne.addEventListener('click', onPopupErrorClose);
    buttonErrorTwo.addEventListener('click', onPopupErrorClose);

    document.addEventListener('click', onPopupErrorClose);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        onPopupErrorClose();
      }
    });

    function onPopupErrorClose() {
      error.remove();
      buttonErrorOne.removeEventListener('click', onPopupErrorClose);
      buttonErrorTwo.removeEventListener('click', onPopupErrorClose);
      document.removeEventListener('click', onPopupErrorClose);
      document.removeEventListener('keydown', onPopupErrorClose);
    }
  }

})();
