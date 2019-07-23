'use strict';

(function () {
  // показ и закрытие формы редактирования изображения
  // удалять классы эффектов при закрытии
  var ESC_KEYCODE = 27;
  var photoFeild = document.querySelector('.img-upload__input');
  var overlayImage = document.querySelector('.img-upload__overlay');
  var closeBtn = overlayImage.querySelector('#upload-cancel');

  var overlayEscPress = function (evt) {
    if (document.activeElement !== window.comment && evt.keyCode === ESC_KEYCODE) {
      overlayClose();
    }
  };


  function overlayOpen() {
    overlayImage.classList.remove('hidden');
    document.addEventListener('keydown', overlayEscPress);
  }

  function overlayClose() {
    overlayImage.classList.add('hidden');
    document.removeEventListener('change', overlayOpen);
    document.removeEventListener('keydown', overlayEscPress);
    photoFeild.value = '';
    window.image.removeAttribute('class');
    window.image.removeAttribute('style');
  }

  photoFeild.addEventListener('change', overlayOpen);

  closeBtn.addEventListener('click', overlayClose);

  closeBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      overlayClose();
    }
  });

  window.overlayImage = overlayImage;

})();
