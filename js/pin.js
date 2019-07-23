'use strict';

(function () {
  // pin
  var pin = window.objEff.pin;
  var depth = window.objEff.depth;
  var pinEnd = window.objEff.pinEnd;
  var effValue = window.objEff.blockPin.querySelector('.effect-level__value');

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
      window.objEff.getEffects();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
      }

      window.objEff.getEffects();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
