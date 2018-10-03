'use strict';

(function () {
  var Hashtag = {
    QUANTITY: 5,
    HASH_SYMBOL: '#',
    MAX_LENGTH: 20
  };
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var imgUploadElement = document.querySelector('.img-upload');
  var form = imgUploadElement.querySelector('.img-upload__form');
  var imgHashtagField = imgUploadElement.querySelector('.text__hashtags');
  var imgCommentField = imgUploadElement.querySelector('.text__description');
  var imgSubmitButton = imgUploadElement.querySelector('.img-upload__submit');

  var calculateSameElements = function (arr) {
    var repeats = 0;

    for (var j = 0; j < arr.length; j++) {
      for (var k = j + 1; k < arr.length; k++) {
        if (arr[k] === arr[j]) {
          repeats++;
        }
      }
    }

    return repeats;
  };

  var imgHashtagValidity = function () {
    imgHashtagField.style.outline = '';
    var errorMessage = '';
    var hashtagValue = imgHashtagField.value.trim();

    if (hashtagValue === '') {
      imgHashtagField.setCustomValidity(errorMessage);
      return;
    }

    var hashtagList = hashtagValue.toLowerCase().split(' ');
    var hashtagRepeats = calculateSameElements(hashtagList);

    for (var l = 0; l < hashtagList.length; l++) {
      if (hashtagList[l].charAt(0) !== Hashtag.HASH_SYMBOL) {
        errorMessage = 'Хэш-тег должен начинаться с символа #';
      } else if (hashtagList[l].indexOf(Hashtag.HASH_SYMBOL, 1) > 0) {
        errorMessage = 'Хэш-теги разделяются пробелами';
      } else if (hashtagList[l].charAt(0) === Hashtag.HASH_SYMBOL && hashtagList[l].length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtagList.length > Hashtag.QUANTITY) {
        errorMessage = 'Максимальное количество хеш-тегов: 5';
      } else if (hashtagList[l].length > Hashtag.MAX_LENGTH) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
      }
    }

    if (hashtagRepeats > 0) {
      errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
    }
    imgHashtagField.setCustomValidity(errorMessage);
  };

  var highlightInvalidField = function (field) {
    if (!field.validity.valid) {
      field.style.outline = '2px solid red';
    }
  };

  imgHashtagField.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.gallery.onEscPress);
  });
  imgCommentField.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.gallery.onEscPress);
  });
  imgHashtagField.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.gallery.onEscPress);
  });

  imgHashtagField.addEventListener('input', imgHashtagValidity);

  imgSubmitButton.addEventListener('click', function () {
    highlightInvalidField(imgHashtagField);
    highlightInvalidField(imgCommentField);
  });

  var resetForm = function () {
    window.defaultScale();
    window.effects.setDefaultPin();
    window.effects.setDefaultEffect();
  };

  var renderSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
  };

  var closeSuccess = function () {
    var success = document.querySelector('main').querySelector('.success');
    document.querySelector('main').removeChild(success);

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', closeSuccess);
  };

  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeSuccess();
    }
  };

  var onSuccess = function () {
    resetForm();
    window.gallery.closePopup();
    renderSuccess();

    var successButtonElement = document.querySelector('.success__button');

    document.querySelector('main').removeEventListener('click', window.gallery.photoClick);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', closeSuccess);
    successButtonElement.addEventListener('click', closeSuccess);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, window.showError);
    evt.preventDefault();
  });
})();
