'use strict';

(function () {
  var closeBigPictureElement = document.querySelector('.big-picture__cancel');
  var imgUploadElement = document.querySelector('.img-upload');
  var inputLoadFileElement = imgUploadElement.querySelector('#upload-file');
  var closePopupElement = imgUploadElement.querySelector('#upload-cancel');
  var uploadPopupElement = imgUploadElement.querySelector('.img-upload__overlay');

  // Клик по маленькому фото
  var onPhotoClick = function (evt) {
    var target = evt.target;
    if (target.tagName !== 'IMG') {
      return;
    }
    evt.preventDefault();

    window.preview.show(evt);

    document.addEventListener('keydown', onEscPress);
  };

  // Вешаем на каждую картинку обработчик, который показывает большое фото
  var pictureElements = document.querySelectorAll('.picture');
  for (var i = 0; i < pictureElements.length; i++) {
    pictureElements[i].addEventListener('click', onPhotoClick);
  }

  // Обработчик закрытия большого фото
  closeBigPictureElement.addEventListener('click', window.preview.hide);

  // Обработчик по клавише ESC
  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      inputLoadFileElement.value = null;
      closeUploadPopup();
      window.preview.hide();
    }
  };

  // Открывает попап формы
  var openUploadPopup = function () {
    uploadPopupElement.classList.remove('hidden');

    window.defaultScale();
    window.effects.setDefaultEffect();
    window.effects.setDefaultPin();

    document.addEventListener('keydown', onEscPress);
  };

  // Обработчик открытия попапа формы
  inputLoadFileElement.addEventListener('change', openUploadPopup);

  // Закрывает попап формы
  var closeUploadPopup = function () {
    window.defaultScale();
    inputLoadFileElement.value = null;
    window.effects.setDefaultEffect();
    uploadPopupElement.classList.add('hidden');

    document.removeEventListener('keydown', onEscPress);
  };

  // Обработчики закрытия попапа формы
  closePopupElement.addEventListener('click', function () {
    inputLoadFileElement.value = null;
    window.effects.setDefaultEffect();
    closeUploadPopup();
  });

  window.onEscPress = onEscPress;
})();
