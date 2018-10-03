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
  window.render = function (data) {
    window.picturesData = data;
    var fragment = document.createDocumentFragment();

    data.forEach(function (element) {
      fragment.appendChild(createPhoto(element));
    });
    picturesElement.appendChild(fragment);
  };
})();
