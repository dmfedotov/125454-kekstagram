'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  // Закрывает сообщение с ошибкой загрузки данных
  var closeError = function () {
    var errorElement = mainElement.querySelector('.error');
    mainElement.removeChild(errorElement);
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', closeError);
  };

  // Закрывает сообщение с ошибкой загрузки данных по ESC
  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeError();
    }
  };

  // Добавляет в DOM сообщение об ошибке загрузки данных
  var renderError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorTitleElement = errorElement.querySelector('.error__title');
    errorTitleElement.style.lineHeight = '1.2';
    errorTitleElement.textContent = message;
    mainElement.appendChild(errorElement);
  };

  // Коллбек не успешной загрузки данных
  var onError = function (errorMessage) {
    window.gallery.closePopup();
    renderError(errorMessage);

    var errorButtonElement = document.querySelector('.error__button');
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', closeError);
    errorButtonElement.addEventListener('click', closeError);
  };

  window.showError = onError;
})();
