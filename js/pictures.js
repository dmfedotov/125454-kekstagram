'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var picturesContainerElement = document.querySelector('.pictures');

  // Создает DOM элемент с картинкой и наполняет его информацией
  var createPhoto = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  // Добавляет созданные DOM элементы с фото на страницу
  var render = function (data) {
    var picturesElements = picturesContainerElement.querySelectorAll('.picture');
    picturesElements.forEach(function (picture) {
      picturesContainerElement.removeChild(picture);
    });
    window.picturesData = data;
    var fragment = document.createDocumentFragment();

    data.forEach(function (element) {
      fragment.appendChild(createPhoto(element));
    });
    picturesContainerElement.appendChild(fragment);
  };

  window.pictures = {
    render: render
  };
})();
