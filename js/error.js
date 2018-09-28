'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var closeError = function () {
    var error = document.querySelector('main').querySelector('.error');
    document.querySelector('main').removeChild(error);

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', closeError);
  };

  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeError();
    }
  };

  var renderError = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorElement);
  };

  var onError = function () {
    window.gallery.closePopup();
    renderError();

    var errorButtonElement = document.querySelector('.error__button');
    document.querySelector('main').removeEventListener('click', window.gallery.photoClick);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', closeError);
    errorButtonElement.addEventListener('click', closeError);
  };

  window.showError = onError;
})();
