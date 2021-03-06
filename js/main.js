'use strict';

(function () {
  // эффекты
  var effect = document.querySelector('.img-upload__effects');
  var blockPin = window.overlayImage.querySelector('.img-upload__effect-level');
  var pin = blockPin.querySelector('.effect-level__pin');
  var depth = blockPin.querySelector('.effect-level__depth');
  var PIN_MAX = 455 + 'px';
  pin.style.left = PIN_MAX;
  depth.style.width = pin.style.left;
  var currentEffect = 'none';

  window.photoFeild.addEventListener('change', handleFiles);

  function handleFiles() {
    var fileList = window.photoFeild.files;
    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[0];
      if (!file.type.startsWith('image/')) {
        continue;
      }

      var reader = new FileReader();
      reader.onload = (function (image) {
        return function (evt) {
          image.src = evt.target.result;
        };
      })(window.image);
      reader.readAsDataURL(file);
    }
  }

  effect.addEventListener('change', currenToggle);

  function currenToggle(evt) {
    var eff = evt.target.value;
    window.image.classList.remove('effects__preview--' + currentEffect);
    window.image.classList.add('effects__preview--' + eff);
    currentEffect = eff;
    if (currentEffect === 'none') {
      blockPin.style.display = 'none';
      window.image.style.filter = currentEffect;
    } else {
      blockPin.style.display = 'block';
      pin.style.left = PIN_MAX;
      depth.style.width = pin.style.left;
      getEffects();
    }
  }

  function getEffects() {
    var num = parseInt(pin.style.left, 10) / 455;
    if (currentEffect === 'chrome') {
      window.image.style.filter = 'grayscale(' + num + ')';
    } else if (currentEffect === 'sepia') {
      window.image.style.filter = currentEffect + '(' + num + ')';
    } else if (currentEffect === 'marvin') {
      window.image.style.filter = 'invert(' + num * 100 + '%)';
    } else if (currentEffect === 'phobos') {
      window.image.style.filter = 'blur(' + num * 3 + 'px)';
    } else if (currentEffect === 'heat') {
      window.image.style.filter = 'brightness(' + (1 + num * 2) + ')';
    }
  }

  window.objEff = {
    effect: effect,
    pin: pin,
    depth: depth,
    getEffects: getEffects,
    PIN_MAX: PIN_MAX,
    blockPin: blockPin
  };

})();
