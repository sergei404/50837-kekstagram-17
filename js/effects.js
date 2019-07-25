'use strict';

(function () {
  // эффекты
  var effect = document.querySelector('.img-upload__effects');
  var blockPin = window.overlayImage.querySelector('.img-upload__effect-level');
  var pin = blockPin.querySelector('.effect-level__pin');
  var depth = blockPin.querySelector('.effect-level__depth');

  var pinEnd = 455 + 'px';
  pin.style.left = pinEnd;
  depth.style.width = pin.style.left;
  var currenEffect = 'none';
  effect.addEventListener('change', function (evt) {
    var eff = evt.target.value;
    window.image.classList.remove('effects__preview--' + currenEffect);
    window.image.classList.add('effects__preview--' + eff);
    currenEffect = eff;
    if (currenEffect === 'none') {
      blockPin.style.display = 'none';
      window.image.style.filter = currenEffect;
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
      window.image.style.filter = 'grayscale(' + num + ')';
    } else if (currenEffect === 'sepia') {
      window.image.style.filter = currenEffect + '(' + num + ')';
    } else if (currenEffect === 'marvin') {
      window.image.style.filter = 'invert(' + num * 100 + '%)';
    } else if (currenEffect === 'phobos') {
      window.image.style.filter = 'blur(' + num * 3 + 'px)';
    } else if (currenEffect === 'heat') {
      window.image.style.filter = 'brightness(' + (1 + num * 2) + ')';
    }
  }

  window.objEff = {
    pin: pin,
    depth: depth,
    getEffects: getEffects,
    pinEnd: pinEnd,
    blockPin: blockPin
  };

})();

