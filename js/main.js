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

// показ и закрытие формы редактирования изображения
// удалять классы эффектов при закрытии

var ESC_KEYCODE = 27;
var photoFeild = document.querySelector('.img-upload__input');
var overlayImage = document.querySelector('.img-upload__overlay');
var closeBtn = overlayImage.querySelector('#upload-cancel');

var overlayEscPress = function (evt) {
  if (document.activeElement !== comment && evt.keyCode === ESC_KEYCODE) {
    overlayClose();
  }
};


function overlayOpen() {
  overlayImage.classList.remove('hidden');
  document.addEventListener('keydown', overlayEscPress);
}

function overlayClose() {
  overlayImage.classList.add('hidden');
  document.removeEventListener('change', overlayOpen);
  document.removeEventListener('keydown', overlayEscPress);
  photoFeild.value = '';
  image.removeAttribute('class');

}

photoFeild.addEventListener('change', overlayOpen);

closeBtn.addEventListener('click', overlayClose);

closeBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    overlayClose();
  }
});

// маштабирование фото и кнопки + -

var STEP = 25;
var buttonSmaller = document.querySelector('.scale__control--smaller');
var buttonBigger = document.querySelector('.scale__control--bigger');
var inputValue = document.querySelector('.scale__control--value');
var imageBlock = document.querySelector('.img-upload__preview');
var image = document.querySelector('.img-upload__preview img');

buttonSmaller.addEventListener('click', function () {
  var currentValue = parseInt(inputValue.value, 10);
  if (currentValue <= STEP) {
    currentValue = STEP;
  } else {
    currentValue -= STEP;
  }
  inputValue.value = currentValue + '%';
  imageBlock.style.transform = 'scale(' + parseInt(inputValue.value, 10) / 100 + ')';
});

buttonBigger.addEventListener('click', function () {
  var currentValue = parseInt(inputValue.value, 10);
  if (currentValue >= 100) {
    currentValue = 100;
  } else {
    currentValue += STEP;
  }
  inputValue.value = currentValue + '%';
  imageBlock.style.transform = 'scale(' + parseInt(inputValue.value, 10) / 100 + ')';
});

// эффекты

var effect = document.querySelector('.img-upload__effects');
var effectRange = document.querySelector('.img-upload__effect-level');

var currenEffect = 'none';
effect.addEventListener('change', function (evt) {
  var eff = evt.target.value;
  image.classList.remove('effects__preview--' + currenEffect);
  image.classList.add('effects__preview--' + eff);
  currenEffect = eff;
  if (currenEffect === 'none') {
    effectRange.style.display = 'none';
  } else {
    effectRange.style.display = 'block';
  }
});

// pin
var blockPin = overlayImage.querySelector('.img-upload__effect-level');
var pin = blockPin.querySelector('.effect-level__pin');
var depth = blockPin.querySelector('.effect-level__depth');
var pinValue = blockPin.querySelector('.effect-level__value');

pin.addEventListener('mouseup', function () {
  pin.style.left = '100%';
  depth.style.width = pin.style.left;
  pinValue.value = pin.style.left;
})


// коментарии
var comment = overlayImage.querySelector('.text__description');
comment.addEventListener('invalid', function () {
  if (comment.validity.tooShort) {
    comment.setCustomValidity('Комментарий должно состоять минимум из 2-х символов');
  } // else if (comment.validity.tooLong) {
  // comment.setCustomValidity('Максимальная длина комментария 140 символов');
  // }
  else {
    comment.setCustomValidity('');
  }
});

comment.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length > 2) {
    target.setCustomValidity('Комментарий должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});
