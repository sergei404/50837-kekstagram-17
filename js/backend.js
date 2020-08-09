'use strict';

(function () {
  var templateError = document.querySelector('#error').content;
  var templateSuccess = document.querySelector('#success').content;
  var main = document.querySelector('main');
  var URL_UPLOAD = 'https://javascript.pages.academy/kekstagram';
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var TIMEOUT = 10000;
  var XHR_STATUS = 200;

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
      if (xhr.status === XHR_STATUS) {
        onAchievement();
      } else {
        onFailing();
      }
    });

    xhr.open('POST', URL_UPLOAD);
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


  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

})();
