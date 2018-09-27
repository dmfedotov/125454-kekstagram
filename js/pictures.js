'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  // Добавляет созданные DOM элементы с фото на страницу
  var renderPhotos = function (elements) {
    var photosFragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      photosFragment.appendChild(window.data.createPhoto(elements[i]));
    }
    picturesElement.appendChild(photosFragment);
  };

  renderPhotos(window.data.photos);
})();
