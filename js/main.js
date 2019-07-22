'use strict';

// показ и закрытие формы редактирования изображения
// удалять классы эффектов при закрытии
var ESC_KEYCODE = 27;
var photoFeild = document.querySelector('.img-upload__input');
var overlayImage = document.querySelector('.img-upload__overlay');
var closeBtn = overlayImage.querySelector('#upload-cancel');

var overlayEscPress = function (evt) {
  if (document.activeElement !== comment && evt.keyCode === ESC_KEYCODE) {
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
  image.removeAttribute('class');

}

photoFeild.addEventListener('change', overlayOpen);

closeBtn.addEventListener('click', overlayClose);

closeBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    overlayClose();
  }
});

// маштабирование фото и кнопки + -
var STEP = 25;
var buttonSmaller = document.querySelector('.scale__control--smaller');
var buttonBigger = document.querySelector('.scale__control--bigger');
var inputValue = document.querySelector('.scale__control--value');
var imageBlock = document.querySelector('.img-upload__preview');
var image = document.querySelector('.img-upload__preview img');

buttonSmaller.addEventListener('click', function () {
  var currentValue = parseInt(inputValue.value, 10);
  if (currentValue <= STEP) {
    currentValue = STEP;
  } else {
    currentValue -= STEP;
  }
  inputValue.value = currentValue + '%';
  imageBlock.style.transform = 'scale(' + parseInt(inputValue.value, 10) / 100 + ')';
});

buttonBigger.addEventListener('click', function () {
  var currentValue = parseInt(inputValue.value, 10);
  if (currentValue >= 100) {
    currentValue = 100;
  } else {
    currentValue += STEP;
  }
  inputValue.value = currentValue + '%';
  imageBlock.style.transform = 'scale(' + parseInt(inputValue.value, 10) / 100 + ')';
});

// эффекты
var effect = document.querySelector('.img-upload__effects');
var blockPin = overlayImage.querySelector('.img-upload__effect-level');
var pin = blockPin.querySelector('.effect-level__pin');
var depth = blockPin.querySelector('.effect-level__depth');
var effValue = blockPin.querySelector('.effect-level__value');

var pinEnd = 455 + 'px';
pin.style.left = pinEnd;
depth.style.width = pin.style.left;
var currenEffect = 'none';
effect.addEventListener('change', function (evt) {
  var eff = evt.target.value;
  image.classList.remove('effects__preview--' + currenEffect);
  image.classList.add('effects__preview--' + eff);
  currenEffect = eff;
  if (currenEffect === 'none') {
    blockPin.style.display = 'none';
    image.style.filter = currenEffect;
  } else {
    blockPin.style.display = 'block';
    pin.style.left = pinEnd;
    depth.style.width = pin.style.left;
    getEffects();
  }
});

function getEffects() {
  var num = parseInt(pin.style.left, 10) / 455;
  if (currenEffect === 'chrome') {
    image.style.filter = 'grayscale(' + num + ')';
  } else if (currenEffect === 'sepia') {
    image.style.filter = currenEffect + '(' + num + ')';
  } else if (currenEffect === 'marvin') {
    image.style.filter = 'invert(' + num * 100 + '%)';
  } else if (currenEffect === 'phobos') {
    image.style.filter = 'blur(' + num * 3 + 'px)';
  } else if (currenEffect === 'heat') {
    image.style.filter = 'brightness(' + num + ')';
  }
}
// pin
pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  var dragged = false;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    pin.style.left = (pin.offsetLeft - shift.x) + 'px';
    if (parseInt(pin.style.left, 10) <= 0) {
      pin.style.left = 0;
    } else if (parseInt(pin.style.left, 10) >= parseInt(pinEnd, 10)) {
      pin.style.left = pinEnd;
    }
    depth.style.width = pin.style.left;
    effValue.value = parseInt(depth.style.width, 10);
    getEffects();
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function () {
        // evt.preventDefault();
        pin.removeEventListener('click', onClickPreventDefault);
      };
      pin.addEventListener('click', onClickPreventDefault);
    }

    getEffects();
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


// коментарии
var comment = overlayImage.querySelector('.text__description');
comment.addEventListener('invalid', function () {
  if (comment.validity.tooShort) {
    comment.setCustomValidity('Комментарий должно состоять минимум из 2-х символов');
  } else {
    comment.setCustomValidity('');
  }
});
