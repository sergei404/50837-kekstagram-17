'use strict';

(function () {
  var CHUNK_SIZE = 5;
  var bigPhoto = document.querySelector('.big-picture');
  var commentListElem = bigPhoto.querySelector('.social__comments');
  var elemComment = bigPhoto.querySelector('.social__comment');
  var buttonLoader = bigPhoto.querySelector('.social__comments-loader');
  var numberOfComments = bigPhoto.querySelector('.comments-count__shown');
  var buttonCloseSection = bigPhoto.querySelector('.big-picture__cancel');
  var array = [];

  function overlayEscPress(evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      overlayCloseSection();
    }
  }

  function overlayCloseSection() {
    bigPhoto.classList.add('hidden');
    document.removeEventListener('keydown', overlayEscPress);
  }

  buttonCloseSection.addEventListener('click', overlayCloseSection);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      overlayCloseSection();
    }
  });

  function renderComment(comment) {
    var commentElem = elemComment.cloneNode(true);
    commentElem.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
    commentElem.querySelector('.social__text').textContent = comment.message;
    return commentElem;
  }

  function drawInitialComments(comments) {
    array = comments;
    commentListElem.innerHTML = '';
    commentListElem.appendChild(commentsRender(array.slice(0, CHUNK_SIZE)));
    numberOfComments.textContent = commentListElem.children.length;
    if (commentListElem.children.length < CHUNK_SIZE) {
      buttonLoader.style.display = 'none';
    } else {
      buttonLoader.style.display = 'block';
    }
  }

  function commentsRender(arrayComments) {
    var fragment = document.createDocumentFragment();
    arrayComments.forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });

    return fragment;
  }

  function onViewAnyPhoto(photo) {
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    drawInitialComments(photo.comments);
    bigPhoto.classList.remove('hidden');

  }

  var num = 5;
  buttonLoader.addEventListener('click', function (evt) {
    var commentsToRender = array.slice(num, num + CHUNK_SIZE);
    commentListElem.appendChild(commentsRender(commentsToRender));
    num += CHUNK_SIZE;
    numberOfComments.textContent = commentListElem.children.length;

    if (array.length === commentListElem.children.length) {
      evt.currentTarget.style.display = 'none';
      num = 5;
      return;
    }
  });

  window.onViewAnyPhoto = onViewAnyPhoto;


})();
