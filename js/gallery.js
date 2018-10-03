'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var filtersElement = document.querySelector('.img-filters__form');
  var closeBigPictureElement = document.querySelector('.big-picture__cancel');
  var imgUploadElement = picturesElement.querySelector('.img-upload');
  var inputLoadFileElement = imgUploadElement.querySelector('#upload-file');
  var closePopupElement = imgUploadElement.querySelector('#upload-cancel');
  var uploadPopupElement = imgUploadElement.querySelector('.img-upload__overlay');

  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      inputLoadFileElement.value = null;
      closeUploadPopup();
      window.preview.hide();
    }
  };

  var onPhotoClick = function (evt) {
    var target = evt.target;
    if (!target.parentNode.classList.contains('picture') || target.tagName !== 'IMG') {
      return;
    }
    evt.preventDefault();

    window.preview.show(evt);

    document.addEventListener('keydown', onEscPress);
  };

  picturesElement.addEventListener('click', onPhotoClick);
  closeBigPictureElement.addEventListener('click', window.preview.hide);

  var openUploadPopup = function () {
    uploadPopupElement.classList.remove('hidden');

    window.defaultScale();
    window.effects.setDefaultEffect();
    window.effects.setDefaultPin();

    document.addEventListener('keydown', onEscPress);
  };

  inputLoadFileElement.addEventListener('change', openUploadPopup);

  var closeUploadPopup = function () {
    window.defaultScale();
    inputLoadFileElement.value = null;
    window.effects.setDefaultEffect();
    uploadPopupElement.classList.add('hidden');

    document.removeEventListener('keydown', onEscPress);
  };

  closePopupElement.addEventListener('click', function () {
    inputLoadFileElement.value = null;
    window.effects.setDefaultEffect();
    closeUploadPopup();
  });

  var onLoad = function (data) {
    window.render(data);
    window.filters.init(filtersElement, picturesElement, data);
  };

  window.backend.download(onLoad, window.showError);

  window.gallery = {
    onEscPress: onEscPress,
    closePopup: closeUploadPopup,
    photoClick: onPhotoClick
  };
})();
