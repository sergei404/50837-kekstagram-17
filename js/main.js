'use strict';

(function () {
  var photos = window.getPhotos();
  var similarPictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content;


  function renderPhoto(pht) {
    var photoElem = photoTemplate.cloneNode(true);

    photoElem.querySelector('img').src = pht.url;
    photoElem.querySelector('.picture__comments').textContent = pht.comments.length;
    photoElem.querySelector('.picture__likes').textContent = pht.likes;

    return photoElem;
  }

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < photos.length; j++) {
    fragment.appendChild(renderPhoto(photos[j]));
  }

  similarPictures.appendChild(fragment);
})();
