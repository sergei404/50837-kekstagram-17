
// var section = document.querySelector('.big-picture');
// section.classList.remove('hidden');
// var imageBig = section.querySelector('.big-picture__img img');
// var likes = section.querySelector('.likes-count');
// var comments = section.querySelector('.comments-count');
// var socialImg = section.querySelector('.social__picture');
// var commentText = section.querySelector('.social__text');

// function onSuccess(data) {
//   photoData = data;
//   console.log(photoData)
//   imageBig.src = photoData[0].url;
//   likes.textContent = photoData[0].likes;
//   comments.textContent = photoData[0].comments.length;
//   socialImg.src = photoData[0].comments[window.utils.getRandomNumber(0, photoData[0].comments.length)];
// }

// function onError(errorMessage) {
//   var node = document.createElement('div');
//   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
//   node.style.position = 'absolute';
//   node.style.left = 0;
//   node.style.right = 0;
//   node.style.fontSize = '30px';

//   node.textContent = errorMessage;
//   document.body.insertAdjacentElement('afterbegin', node);
// }


// window.load(onSuccess, onError);
