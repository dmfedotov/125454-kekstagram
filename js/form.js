'use strict';

(function () {
  var Hashtag = {
    QUANITY: 5,
    HASH_SYMBOL: '#',
    MAX_LENGTH: 20
  };
  // Для работы с формой загрузки фото
  var imgUploadElement = document.querySelector('.img-upload');
  var imgHashtagField = imgUploadElement.querySelector('.text__hashtags');
  var imgCommentField = imgUploadElement.querySelector('.text__description');
  var imgSubmitButton = imgUploadElement.querySelector('.img-upload__submit');

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
      } else if (hashtagList.length > Hashtag.QUANITY) {
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

  // Подсвечивает невалидные поля
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
})();
