'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var createPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.URL;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  var picturesElement = document.querySelector('.pictures');
  // Добавляет созданные DOM элементы с фото на страницу
  var renderPhotos = function (elements) {
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      photosFragment.appendChild(createPhoto(elements[i]));
    }
    picturesElement.appendChild(photosFragment);
  };

  renderPhotos(window.data.getPhotos);
})();
