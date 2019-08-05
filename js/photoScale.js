'use strict';

(function () {
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

  window.imageBlock = imageBlock;
  window.image = image;
  window.inputValue = inputValue;

})();
