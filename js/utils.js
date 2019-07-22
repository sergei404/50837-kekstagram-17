'use strict';

(function () {

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
  }

  var getRandomNumber = function (min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  };

  window.utils = {
    shuffle: shuffle,
    getRandomNumber: getRandomNumber
  };

})();
