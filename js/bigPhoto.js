'use strict';

(function () {
  var section = document.querySelector('.big-picture');
  section.classList.remove('hidden');
  var imageBig = section.querySelector('.big-picture__img img');
  var likes = section.querySelector('.likes-count');
  var comments = section.querySelector('.comments-count');
  var socialImg = section.querySelector('.social__picture');
  var commentText = section.querySelector('.social__text');
  var descriptionText = section.querySelector('.social__caption');
  section.querySelector('.social__comment-count').classList.add('visually-hidden');
  section.querySelector('.comments-loader').classList.add('visually-hidden');
  var photoData = [];


  function onBigPhotoData(data) {
    photoData = data;
    var num = window.utils.getRandomNumber(0, 6);// [window.utils.getRandomNumber(0, photoData[0].comments.length)];
    imageBig.src = photoData[0].url;
    likes.textContent = photoData[0].likes;
    comments.textContent = photoData[0].comments.length;
    socialImg.src = 'img/avatar-' + num + '.svg'; // photoData[0].comments[num].avatar;
    commentText.textContent = 'фотошоп рулит'; // photoData[0].comments[num].message;
    descriptionText.textContent = photoData[0].description;
  }


  window.load(onBigPhotoData);

})();
