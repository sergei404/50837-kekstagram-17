'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var section = document.querySelector('.big-picture');
  var commentListElem = section.querySelector('.social__comments');
  var commentTemplate = section.querySelector('.social__comment');
  section.querySelector('.social__comment-count').classList.add('visually-hidden');
  section.querySelector('.comments-loader').classList.add('visually-hidden');
  var buttonCloseSection = section.querySelector('.big-picture__cancel');

  function overlayEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      overlayCloseSection();
    }
  }

  function overlayCloseSection() {
    section.classList.add('hidden');
    document.removeEventListener('keydown', overlayEscPress);
  }

  buttonCloseSection.addEventListener('click', overlayCloseSection);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      overlayCloseSection();
    }
  });

  function renderComment(comment) {
    var commentElem = commentTemplate.cloneNode(true);

    commentElem.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
    commentElem.querySelector('.social__text').textContent = comment.message;

    return commentElem;
  }

  function commentsRender(comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    commentListElem.innerHTML = '';
    commentListElem.appendChild(fragment);
  }

  function onViewAnyPhoto(photo) {
    section.querySelector('.big-picture__img img').src = photo.url;
    section.querySelector('.likes-count').textContent = photo.likes;
    section.querySelector('.comments-count').textContent = photo.comments.length;
    section.querySelector('.social__caption').textContent = photo.description;
    commentsRender(photo.comments);
    section.classList.remove('hidden');
  }

  window.onViewAnyPhoto = onViewAnyPhoto;

})();
