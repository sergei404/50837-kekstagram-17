'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var section = document.querySelector('.big-picture');
  var imageBig = section.querySelector('.big-picture__img img');
  var likes = section.querySelector('.likes-count');
  var comments = section.querySelector('.comments-count');
  var socialImg = section.querySelector('.social__picture');
  var commentText = section.querySelector('.social__text');
  var descriptionText = section.querySelector('.social__caption');
  section.querySelector('.social__comment-count').classList.add('visually-hidden');
  section.querySelector('.comments-loader').classList.add('visually-hidden');
  var buttonCloseSection = section.querySelector('.big-picture__cancel');
  var photoData = [];

  // function overlayEscPress(evt) {
  //   if (evt.keyCode === ESC_KEYCODE) {
  //     overlayCloseSection();
  //   }
  // }

  // function overlayCloseSection() {
  //   section.classList.add('hidden');
  //   //document.removeEventListener('click', onViewAnyPhoto);
  //   //document.removeEventListener('keydown', overlayEscPress);
  // }

  buttonCloseSection.addEventListener('click', function () {
    section.classList.add('hidden');
  });


  buttonCloseSection.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      section.classList.add('hidden');
    }
  });

  window.similarPictures.addEventListener('click', onViewAnyPhoto);

  function onViewAnyPhoto(evt) {
    var target = evt.target;
    var targetNum = parseInt(target.src.split('/')[4], 10);
    var num = window.utils.getRandomNumber(0, 6);// [window.utils.getRandomNumber(0, photoData[0].comments.length)];
    if (target.classList.contains('picture__img')) {
      evt.preventDefault();
      for (var i = 0; i < photoData.length; i++) {
        if (targetNum === parseInt(photoData[i].url.split('/')[1], 10)) {
          imageBig.src = photoData[i].url;
          likes.textContent = photoData[0].likes;
          comments.textContent = photoData[0].comments.length;
          socialImg.src = 'img/avatar-' + num + '.svg'; // photoData[0].comments[num].avatar;
          commentText.textContent = 'фотошоп рулит'; // photoData[0].comments[num].message;
          descriptionText.textContent = photoData[0].description;
          section.classList.remove('hidden');
        }
      }
    }
  }

  function onBigPhotoData(data) {
    photoData = data;
    // console.log(photoData);
    // var num = window.utils.getRandomNumber(0, 6);// [window.utils.getRandomNumber(0, photoData[0].comments.length)];
    // imageBig.src = photoData[0].url;
    // likes.textContent = photoData[0].likes;
    // comments.textContent = photoData[0].comments.length;
    // socialImg.src = 'img/avatar-' + num + '.svg'; // photoData[0].comments[num].avatar;
    // commentText.textContent = 'фотошоп рулит'; // photoData[0].comments[num].message;
    // descriptionText.textContent = photoData[0].description;
  }

  // var photos = [];
  // var pictureElems = [];

  // for(var i = 0; i < pictureElems.length; i++) {
  //  pictureElems[i].addEventListener('click', function() {
  //    showBigPicture(photos[i]);
  //   });
  // }

  window.load(onBigPhotoData);

})();
