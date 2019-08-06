'use strict';

(function () {
  var CHUNK_SIZE = 5;
  var bigPhoto = document.querySelector('.big-picture');
  var commentListElem = bigPhoto.querySelector('.social__comments');
  var elemComment = bigPhoto.querySelector('.social__comment');
  var buttonLoader = bigPhoto.querySelector('.social__comments-loader');
  bigPhoto.querySelector('.social__comment-count').classList.add('visually-hidden');
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

  function commentsRender(comments) {
    array = comments;
    var fragment = document.createDocumentFragment();
    comments.slice(0, CHUNK_SIZE).forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });

    commentListElem.innerHTML = '';
    commentListElem.appendChild(fragment);
    if (commentListElem.children.length < CHUNK_SIZE) {
      buttonLoader.style.display = 'none';
    } else {
      buttonLoader.style.display = 'block';
    }
    return fragment;
  }

  function onViewAnyPhoto(photo) {
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    commentsRender(photo.comments);
    bigPhoto.classList.remove('hidden');
  }

  buttonLoader.addEventListener('click', function () {
    var commentsToRender = array.slice(CHUNK_SIZE, array.length);
    commentListElem.appendChild(commentsRender(commentsToRender));
  });

  window.onViewAnyPhoto = onViewAnyPhoto;

})();
