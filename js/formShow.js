'use strict';

(function () {
  // показ и закрытие формы редактирования изображения
  // удалять классы эффектов при закрытии
  var ESC_KEYCODE = 27;
  var photoFeild = document.querySelector('.img-upload__input');
  var overlayImage = document.querySelector('.img-upload__overlay');
  var closeBtn = overlayImage.querySelector('#upload-cancel');

  var overlayEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (document.activeElement !== window.hashtag && document.activeElement !== window.comment) {
        overlayClose();
      }
    }
  };

  function overlayOpen() {
    overlayImage.classList.remove('hidden');
    document.addEventListener('keydown', overlayEscPress);
  }

  function overlayClose() {
    document.removeEventListener('change', overlayOpen);
    document.removeEventListener('keydown', overlayEscPress);
    onResetEffect();
  }

  function onResetEffect() {
    overlayImage.classList.add('hidden');
    photoFeild.value = '';
    window.image.removeAttribute('class');
    window.image.removeAttribute('style');
    window.objEff.pin.style.left = window.objEff.PIN_MAX;
    window.objEff.depth.style.width = window.objEff.pin.style.left;
    window.objEff.blockPin.style.display = 'block';
    window.imageBlock.style.transform = '';

  }

  photoFeild.addEventListener('change', overlayOpen);

  closeBtn.addEventListener('click', overlayClose);

  closeBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      overlayClose();
    }
  });

  window.overlayImage = overlayImage;
  window.photoFeild = photoFeild;
  window.onResetEffect = onResetEffect;
  window.ESC_KEYCODE = ESC_KEYCODE;

})();
