'use strict';

(function () {
  var COUNT = 25;
  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var names = ['Лао-Цзы', 'Ашшурбанапал', 'Костя', 'Шамашшумукин ', 'Жан-Батист'];

  //  заполняем массив comments
  function getComments() {
    var comments = [];
    for (var i = 0; i < COUNT; i++) {
      comments.push({
        avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
        name: window.utils.shuffle(names).slice(0, 1).toString(),
        message: window.utils.shuffle(messages).slice(0, window.utils.getRandomNumber(1, 2)).join()
      });
    }
    return comments;
  }

  //  массив фотографий пользователей, вкл лайки, комментарии и фото
  function getPhotos() {
    var photos = [];
    for (var i = 0; i < COUNT; i++) {
      photos.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.utils.getRandomNumber(15, 200),
        comments: window.utils.shuffle(getComments()).slice(0, window.utils.getRandomNumber(1, 3))
      });
    }
    return photos;
  }

  window.getPhotos = getPhotos;

})();
