'use strict';

var COUNT = 25;

//  перемешать массив

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
}

//  получить случайное число

var getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

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
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      name: shuffle(names).slice(0, 1).toString(),
      message: shuffle(messages).slice(0, getRandomNumber(1, 2)).join()
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
      likes: getRandomNumber(15, 200),
      comments: shuffle(getComments()).slice(0, getRandomNumber(1, 3))
    });
  }
  return photos;
}

getPhotos();

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

for (var j = 0; j < getPhotos().length; j++) {
  fragment.appendChild(renderPhoto(getPhotos()[j]));
}
similarPictures.appendChild(fragment);
