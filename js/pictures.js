'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var createPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  var picturesElement = document.querySelector('.pictures');
  // Добавляет созданные DOM элементы с фото на страницу
  var onLoad = function (picturesData) {
    window.picturesData = picturesData;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picturesData.length; i++) {
      fragment.appendChild(createPhoto(picturesData[i]));
    }
    picturesElement.appendChild(fragment);
  };

  window.backend.download(onLoad, window.showError);
})();
