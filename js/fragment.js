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

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < window.getPhotos().length; j++) {
    fragment.appendChild(renderPhoto(window.getPhotos()[j]));
  }

  similarPictures.appendChild(fragment);
})();
