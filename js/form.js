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
  var mainElement = document.querySelector('main');
  var imgUploadElement = mainElement.querySelector('.img-upload');
  var formElement = imgUploadElement.querySelector('.img-upload__form');
  var imgHashtagFieldElement = imgUploadElement.querySelector('.text__hashtags');
  var imgCommentFieldElement = imgUploadElement.querySelector('.text__description');
  var imgSubmitButtonElement = imgUploadElement.querySelector('.img-upload__submit');

  // Счиает кол-во повторяющихся элементов в массиве
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

  // Проверяет хештег поле на валидность
  var imgHashtagValidity = function () {
    imgHashtagFieldElement.style.outline = '';
    var errorMessage = '';
    var hashtagValue = imgHashtagFieldElement.value.trim();

    if (hashtagValue === '') {
      imgHashtagFieldElement.setCustomValidity(errorMessage);
      return;
    }

    var hashtagList = hashtagValue.toLowerCase().split(' ');
    var hashtagRepeats = calculateSameElements(hashtagList);

    hashtagList.forEach(function (hashtagText) {
      if (hashtagText.charAt(0) !== Hashtag.HASH_SYMBOL) {
        errorMessage = 'Хэш-тег должен начинаться с символа #';
      } else if (hashtagText.indexOf(Hashtag.HASH_SYMBOL, 1) > 0) {
        errorMessage = 'Хэш-теги разделяются пробелами';
      } else if (hashtagText.charAt(0) === Hashtag.HASH_SYMBOL && hashtagText.length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtagList.length > Hashtag.QUANTITY) {
        errorMessage = 'Максимальное количество хеш-тегов: 5';
      } else if (hashtagText.length > Hashtag.MAX_LENGTH) {
        errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
      }
    });

    if (hashtagRepeats > 0) {
      errorMessage = 'Один и тот же хэш-тег не может быть использован дважды';
    }
    imgHashtagFieldElement.setCustomValidity(errorMessage);
  };

  // Подсвечивает невалидные поля
  var highlightInvalidField = function (field) {
    if (!field.validity.valid) {
      field.style.outline = '2px solid red';
    }
  };

  imgHashtagFieldElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.gallery.onEscPress);
  });
  imgCommentFieldElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', window.gallery.onEscPress);
  });
  imgHashtagFieldElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.gallery.onEscPress);
  });

  imgHashtagFieldElement.addEventListener('input', imgHashtagValidity);

  imgSubmitButtonElement.addEventListener('click', function () {
    highlightInvalidField(imgHashtagFieldElement);
    highlightInvalidField(imgCommentFieldElement);
  });

  // Сбрасывает значения формы на дефолтные
  var resetForm = function () {
    window.scale.setDefault();
    window.effects.setDefaultPin();
    window.effects.setDefaultEffect();
  };

  // Добавляет в DOM сообщение об успешной загрузки картинки
  var renderSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    mainElement.appendChild(successElement);
  };

  // Закрывает сообщение успеха о загрузке
  var closeSuccess = function () {
    var successElement = mainElement.querySelector('.success');
    mainElement.removeChild(successElement);

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', closeSuccess);
  };

  // Закрывает сообщение успеха по ESC
  var onEscPress = function (evt) {
    if (window.util.isEscEvent(evt)) {
      closeSuccess();
    }
  };

  // Коллбек успешной обработки данных
  var onSuccess = function () {
    resetForm();
    window.gallery.closePopup();
    renderSuccess();

    var successButtonElement = document.querySelector('.success__button');

    mainElement.removeEventListener('click', window.gallery.photoClick);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', closeSuccess);
    successButtonElement.addEventListener('click', closeSuccess);
  };

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), onSuccess, window.error.show);
    evt.preventDefault();
  });
})();
