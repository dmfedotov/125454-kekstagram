'use strict';

(function () {
  var ScaleValue = {
    MIN: 25,
    STEP: 25,
    MAX: 100,
    DEFAULT: 100
  };
  var imgUploadElement = document.querySelector('.img-upload');
  var imgWrapPreviewElement = imgUploadElement.querySelector('.img-upload__preview');
  var scaleElement = document.querySelector('.scale');
  var scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
  var scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
  var scaleValueElement = scaleElement.querySelector('.scale__control--value');

  // Задает масштаб фото в форме
  var setPhotoScale = function (direction) {
    var currentScale = parseInt(scaleValueElement.value, 10);
    currentScale = currentScale + (ScaleValue.STEP * direction);

    if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
      scaleValueElement.value = currentScale + '%';
      imgWrapPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
    }
  };

  // Задает масштаб по умолчанию
  var setDefaultPhotoScale = function () {
    scaleValueElement.value = ScaleValue.DEFAULT + '%';
    imgWrapPreviewElement.style.transform = 'scale(' + ScaleValue.DEFAULT / 100 + ')';
  };

  // Обработчики масштабирования фото в форме
  scaleBiggerElement.addEventListener('click', function () {
    setPhotoScale(1);
  });
  scaleSmallerElement.addEventListener('click', function () {
    setPhotoScale(-1);
  });

  window.scale = {
    setDefault: setDefaultPhotoScale
  };
})();
