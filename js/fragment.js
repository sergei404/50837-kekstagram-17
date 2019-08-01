'use strict';

(function () {
  var similarPictures = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content;
  var imgFilterButtonContainer = document.querySelector('.img-filters');
  var photoData = [];

  function renderPhoto(pht) {
    var photoElem = photoTemplate.cloneNode(true);

    photoElem.querySelector('img').src = pht.url;
    photoElem.querySelector('.picture__comments').textContent = pht.comments.length;
    photoElem.querySelector('.picture__likes').textContent = pht.likes;

    return photoElem;
  }

  imgFilterButtonContainer.querySelectorAll('.img-filters__button')[0].addEventListener('click', onFilterButton);
  imgFilterButtonContainer.querySelectorAll('.img-filters__button')[1].addEventListener('click', onFilterButton);
  imgFilterButtonContainer.querySelectorAll('.img-filters__button')[2].addEventListener('click', onFilterButton);


  var lastTimeout;
  function renderByFilter(filter) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      switch (filter) {
        case 'filter-popular':
          photosRenders(photoData);
          break;
        case 'filter-new':
          var photoDataSlice = window.utils.shuffle(photoData.slice()).slice(0, 10);
          photosRenders(photoDataSlice);
          break;
        case 'filter-discussed':
          var photoDataSort = photoData.slice().sort(function (first, second) {
            return second.comments.length - first.comments.length;
          });
          photosRenders(photoDataSort);
          break;
      }
    }, 500);
  }

  function onFilterButton(evt) {
    var currentFilter = evt.target;
    var prevFilter = imgFilterButtonContainer.querySelector('.img-filters__button--active');
    prevFilter.classList.remove('img-filters__button--active');
    currentFilter.classList.add('img-filters__button--active');
    clearPictures();
    renderByFilter(currentFilter.id);
  }

  function clearPictures() {
    var pictureList = similarPictures.querySelectorAll('.picture');
    for (var i = 0; i < pictureList.length; i++) {
      pictureList[i].remove();
    }
  }

  function photosRenders(photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    similarPictures.appendChild(fragment);
  }


  function onSuccess(data) {
    photoData = data;
    photosRenders(photoData);
    imgFilterButtonContainer.classList.remove('img-filters--inactive');
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.load(onSuccess, onError);
  window.similarPictures = similarPictures;

})();
