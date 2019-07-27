'use strict';

(function () {
  var similarPictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content;


  function renderPhoto(pht) {
    var photoElem = photoTemplate.cloneNode(true);

    photoElem.querySelector('img').src = pht.url;
    photoElem.querySelector('.picture__comments').textContent = pht.comments.length;
    photoElem.querySelector('.picture__likes').textContent = pht.likes;

    return photoElem;
  }

  window.load(function (photos) {
    var fragment = document.createDocumentFragment();
    photos = window.utils.shuffle(photos);
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    similarPictures.appendChild(fragment);


  });

})();
