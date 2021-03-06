'use strict';

(function () {
  var EffectParameter = {
    chrome: {
      CLASS: 'effects__preview--chrome',
      PROPERTY: 'grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    sepia: {
      CLASS: 'effects__preview--sepia',
      PROPERTY: 'sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    marvin: {
      CLASS: 'effects__preview--marvin',
      PROPERTY: 'invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      UNIT: '%'
    },
    phobos: {
      CLASS: 'effects__preview--phobos',
      PROPERTY: 'blur',
      MIN_VALUE: 0,
      MAX_VALUE: 3,
      UNIT: 'px'
    },
    heat: {
      CLASS: 'effects__preview--heat',
      PROPERTY: 'brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: ''
    }
  };
  var EffectValue = {
    MAX: 100,
    DEFAULT: 100,
  };
  var PinValue = {
    MIN: 0,
    MAX: 100
  };
  var DEFAULT_EFFECT = 'none';

  var imgUploadElement = document.querySelector('.img-upload');
  var effectLevelElement = imgUploadElement.querySelector('.effect-level');
  var imgPreviewElement = imgUploadElement.querySelector('.img-upload__preview img');
  var effectPinElement = effectLevelElement.querySelector('.effect-level__pin');
  var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
  var effectLineElement = effectLevelElement.querySelector('.effect-level__line');
  var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
  var effectsListElement = imgUploadElement.querySelector('.effects__list');
  var currentEffectName = effectsListElement.querySelector('.effects__radio:checked').value;
  var currentEffectClass = 'effects__preview--' + currentEffectName;

  // Задает положение пина по умолчанию
  var setDefaultPinPosition = function () {
    effectPinElement.style.left = EffectValue.DEFAULT + '%';
    effectDepthElement.style.width = effectPinElement.style.left;
  };

  // Рассчитывает значение фильтра
  var getFilterValue = function (effect, value) {
    return value * (EffectParameter[effect].MAX_VALUE - EffectParameter[effect].MIN_VALUE) / EffectValue.MAX + EffectParameter[effect].MIN_VALUE + EffectParameter[effect].UNIT;
  };

  // Применяет эффект к фото в зависимости от положения пина
  var applyEffect = function (value) {
    imgPreviewElement.style.filter = currentEffectName !== DEFAULT_EFFECT ? EffectParameter[currentEffectName].PROPERTY + '(' + getFilterValue(currentEffectName, value) + ')' : 'none';
  };

  // По клику на эффект добавляет его к фото
  var onImageEffectClick = function (evt) {
    var target = evt.target;
    if (target.tagName !== 'INPUT') {
      return;
    }

    imgPreviewElement.classList.remove(currentEffectClass);
    currentEffectName = target.value;

    currentEffectClass = 'effects__preview--' + currentEffectName;

    if (currentEffectClass !== 'effects__preview--none') {
      effectLevelElement.classList.remove('hidden');
      imgPreviewElement.classList.add(currentEffectClass);
    } else {
      effectLevelElement.classList.add('hidden');
      imgPreviewElement.classList.add(currentEffectClass);
    }

    // При смене эффекта, его значение и значение пина
    // сбрасываются на дефолтные
    setDefaultPinPosition();
    effectLevelValueElement.value = EffectValue.DEFAULT;
    applyEffect(EffectValue.DEFAULT);
  };

  // Обработчик смены эффекта у фото в форме
  effectsListElement.addEventListener('click', onImageEffectClick);

  // Задает положение пина
  var setPinPosition = function (value) {
    effectPinElement.style.left = value + '%';
    effectLevelValueElement.value = Math.round(value);
    effectDepthElement.style.width = effectPinElement.style.left;
  };

  // Задает эффект по умолчанию
  var setDefaultEffect = function () {
    var defaultRadioElement = effectsListElement.querySelector('#effect-' + DEFAULT_EFFECT);
    defaultRadioElement.checked = true;

    imgPreviewElement.style = '';
    imgPreviewElement.classList.remove(currentEffectClass);
    effectLevelValueElement.value = EffectValue.DEFAULT;

    effectLevelElement.classList.add('hidden');
    imgPreviewElement.classList.add('effects__preview--' + DEFAULT_EFFECT);
  };

  // По нажатию на слайдер перемещает пин в место клика
  // Если продолжить двигать мышь, то положение пина изменится
  var onMouseDown = function (evt) {
    var startCoord = evt.clientX;
    var sliderEffectLineRect = effectLineElement.getBoundingClientRect();
    var clickedPosition = (startCoord - sliderEffectLineRect.left) / sliderEffectLineRect.width * 100;

    setPinPosition(clickedPosition);
    applyEffect(clickedPosition);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;

      var movePosition = (effectPinElement.offsetLeft - shift) / sliderEffectLineRect.width * 100;

      if (movePosition <= PinValue.MIN) {
        movePosition = PinValue.MIN;
        effectLevelValueElement.value = PinValue.MIN;
      } else if (movePosition >= PinValue.MAX) {
        movePosition = PinValue.MAX;
        effectLevelValueElement.value = PinValue.MAX;
      }

      setPinPosition(movePosition);
      applyEffect(movePosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Обработчик по нажатию на слайдер
  effectLineElement.addEventListener('mousedown', onMouseDown);

  window.effects = {
    setDefaultPin: setDefaultPinPosition,
    setDefaultEffect: setDefaultEffect
  };
})();
