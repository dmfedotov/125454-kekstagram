'use strict';

var PHOTOS_QUANITY = 25;
var DISPLAY_COMMENTS = 5;
var PHOTO_PARAMS = {
  comments: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  descriptions: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ],
  likes: {
    min: 15,
    max: 200
  },
  commentsQuanity: {
    min: 1,
    max: 10
  },
  commentAvatar: {
    min: 1,
    max: 6
  }
};
var KEY_CODE = {
  enter: 13,
  esc: 27
};
var EFFECT_PARAMETERS = {
  maxValue: 100,
  defaultValue: 100,
  minValue: 0,
  lineUnit: '%',

  chrome: {
    class: 'effects__preview--chrome',
    property: 'grayscale',
    maxValue: 1,
    units: ''
  },
  sepia: {
    class: 'effects__preview--sepia',
    property: 'sepia',
    maxValue: 1,
    units: ''
  },
  marvin: {
    class: 'effects__preview--marvin',
    property: 'invert',
    maxValue: 100,
    units: '%'
  },
  phobos: {
    class: 'effects__preview--phobos',
    property: 'blur',
    maxValue: 3,
    units: 'px'
  },
  heat: {
    class: 'effects__preview--heat',
    property: 'brightness',
    maxValue: 3,
    units: ''
  }
};
var SCALE_PHOTO = {
  min: 25,
  step: 25,
  max: 100,
  default: 100
};
var SLIDER_EFFECT_LINE_WIDTH;

var bodyElement = document.querySelector('body');

var bigPictureElement = bodyElement.querySelector('.big-picture');
var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');
var picturesElement = bodyElement.querySelector('.pictures');
var pictureTemplate = bodyElement.querySelector('#picture')
  .content
  .querySelector('.picture');

var socialCommentsListElement = bodyElement.querySelector('.social__comments');
var socialCommentElement = bodyElement.querySelector('.social__comment');
var commentCountElement = bodyElement.querySelector('.social__comment-count');
var commentsLoaderElement = bodyElement.querySelector('.comments-loader');

var inputLoadFileElement = bodyElement.querySelector('#upload-file');
var uploadPopupElement = bodyElement.querySelector('.img-upload__overlay');

var imgWrapPreviewElement = bodyElement.querySelector('.img-upload__preview');
var imgPreviewElement = imgWrapPreviewElement.querySelector('.img-upload__preview img');
var radioChecked = uploadPopupElement.querySelector('.effects__radio[checked]');
var previewEffectName = radioChecked.value;
var currentEffect = 'effects__preview--' + previewEffectName;
var closePopupElement = bodyElement.querySelector('#upload-cancel');

var effectLevelElement = bodyElement.querySelector('.effect-level');
var effectPinElement = bodyElement.querySelector('.effect-level__pin');
var effectLevelValueElement = bodyElement.querySelector('.effect-level__value');
var effectLineElement = bodyElement.querySelector('.effect-level__line');
var effectDepthElement = bodyElement.querySelector('.effect-level__depth');
var effectsListElement = bodyElement.querySelector('.effects__list');

var scaleSmallerElement = bodyElement.querySelector('.scale__control--smaller');
var scaleBiggerElement = bodyElement.querySelector('.scale__control--bigger');
var scaleValueElement = bodyElement.querySelector('.scale__control--value');
var coords = {};

// Генерирует рандомное число в заданном промежутке
var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Создает массив уникальных адресов для картинок
var getRandomUrls = function (quanity) {
  var urls = [];

  for (var i = 0; i < quanity; i++) {
    var randomUrl = getRandomNum(1, quanity);
    if (urls.indexOf(randomUrl) !== -1) {
      randomUrl = getRandomNum(1, quanity);
      i--;
    } else {
      urls.push(randomUrl);
    }
  }

  return urls;
};

// Создает массив комментариев к фото
var getCommentsArr = function (quanity, photo) {
  var commentsArr = [];
  var count = 0;

  while (count < quanity) {
    var commentsIndex = getRandomNum(0, photo.comments.length - 1);
    commentsArr.push(photo.comments[commentsIndex]);
    count++;
  }

  return commentsArr;
};

// Создает массив объектов, где объект - это фото, комментарии и прочее
var generatePhotos = function (quanity, params) {
  var photos = [];

  var urls = getRandomUrls(PHOTOS_QUANITY);
  for (var i = 0; i < quanity; i++) {
    var commentsQuanity = getRandomNum(PHOTO_PARAMS.commentsQuanity.min, PHOTO_PARAMS.commentsQuanity.max);
    var commentsArr = getCommentsArr(commentsQuanity, PHOTO_PARAMS);
    var descriptionIndex = getRandomNum(0, params.descriptions.length - 1);

    var photo = {
      URL: 'photos/' + urls[i] + '.jpg',
      likes: getRandomNum(params.likes.min, params.likes.max),
      comments: commentsArr,
      description: params.descriptions[descriptionIndex]
    };
    photos.push(photo);
  }

  return photos;
};

// Создает DOM элемент с фото и наполняет его
var createPhoto = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.URL;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

var photos = generatePhotos(PHOTOS_QUANITY, PHOTO_PARAMS);

// Добавляет созданные DOM элементы с фото на страницу
var renderPhotos = function (elements) {
  var photosFragment = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    photosFragment.appendChild(createPhoto(elements[i]));
  }
  picturesElement.appendChild(photosFragment);
};

// Создает DOM элемент с комментарием
var createComment = function (comment) {
  var socialComment = socialCommentElement.cloneNode(true);
  var randomAvatar = getRandomNum(PHOTO_PARAMS.commentAvatar.min, PHOTO_PARAMS.commentAvatar.max);

  socialComment.querySelector('.social__picture').src = 'img/avatar-' + randomAvatar + '.svg';
  socialComment.querySelector('.social__text').textContent = comment;

  return socialComment;
};

// Удаляет комментарии к фото
var deleteSocialComment = function () {
  var parent = socialCommentsListElement;

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
deleteSocialComment();

// Добавляет созданные DOM элементы с комментариями на страницу
var renderComments = function (comments) {
  var commentsFragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    var comment = createComment(comments[i]);
    if (i >= DISPLAY_COMMENTS) {
      comment.classList.add('visually-hidden');
      commentsFragment.appendChild(comment);
    }
    commentsFragment.appendChild(comment);
  }
  socialCommentsListElement.appendChild(commentsFragment);
};

// Создаем DOM элемент с большим фото и наполянет его
var renderBigPhoto = function (photo) {
  var bigPicture = bodyElement.querySelector('.big-picture');

  bigPicture.querySelector('.big-picture__img img').src = photo.URL;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

  renderComments(photo.comments);
};

renderPhotos(photos);
commentCountElement.classList.add('.visually-hidden');
commentsLoaderElement.classList.add('.visually-hidden');

// Находит объект с фото, на который нажал пользователь
var getPhotoObject = function (evt) {
  var target = evt.target;
  var imageSrc = target.getAttribute('src');

  for (var i = 0; i < photos.length; i++) {
    var photoObj = photos[i];

    if (photoObj.URL === imageSrc) {
      break;
    }
  }

  return photoObj;
};

// Задает масштаб фото в форме по умолчанию
var setDefaultScale = function () {
  scaleValueElement.value = SCALE_PHOTO.default + '%';
  imgWrapPreviewElement.style.transform = 'scale(' + SCALE_PHOTO.default / 100 + ')';
};

// Увеличивает масштаб фото в форме
var scaleUp = function () {
  var currentScale = parseInt(scaleValueElement.value, 10);

  if (currentScale === SCALE_PHOTO.max) {
    scaleValueElement.value = currentScale + '%';
    imgWrapPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
    return;
  }
  currentScale += SCALE_PHOTO.step;
  scaleValueElement.value = currentScale + '%';
  imgWrapPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
};

// Уменьшает масштаб фото в форме
var scaleDown = function () {
  var currentScale = parseInt(scaleValueElement.value, 10);

  if (currentScale === SCALE_PHOTO.min) {
    scaleValueElement.value = currentScale + '%';
    imgWrapPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
    return;
  }
  currentScale -= SCALE_PHOTO.step;
  scaleValueElement.value = currentScale + '%';
  imgWrapPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
};

// Применяет эффект к фото
var applyEffect = function (value) {
  switch (currentEffect) {
    case 'effects__preview--chrome':
      imgPreviewElement.style.filter = EFFECT_PARAMETERS.chrome.property + '(' + (value) / EFFECT_PARAMETERS.maxValue + EFFECT_PARAMETERS.chrome.units + ')';
      break;
    case 'effects__preview--sepia':
      imgPreviewElement.style.filter = EFFECT_PARAMETERS.sepia.property + '(' + (value) / EFFECT_PARAMETERS.maxValue + EFFECT_PARAMETERS.sepia.units + ')';
      break;
    case 'effects__preview--marvin':
      imgPreviewElement.style.filter = EFFECT_PARAMETERS.marvin.property + '(' + (value) * EFFECT_PARAMETERS.marvin.maxValue / EFFECT_PARAMETERS.maxValue + EFFECT_PARAMETERS.marvin.units + ')';
      break;
    case 'effects__preview--phobos':
      imgPreviewElement.style.filter = EFFECT_PARAMETERS.phobos.property + '(' + (value) * EFFECT_PARAMETERS.phobos.maxValue / EFFECT_PARAMETERS.maxValue + EFFECT_PARAMETERS.phobos.units + ')';
      break;
    case 'effects__preview--heat':
      imgPreviewElement.style.filter = EFFECT_PARAMETERS.heat.property + '(' + (value) * EFFECT_PARAMETERS.heat.maxValue / EFFECT_PARAMETERS.maxValue + EFFECT_PARAMETERS.heat.units + ')';
      break;
    default:
      imgPreviewElement.style.filter = 'none';
  }
};

// Обработчик по клавише ESC
var onEscPress = function (evt) {
  if (evt.keyCode === KEY_CODE.esc) {
    inputLoadFileElement.value = null;
    closeUploadPopup();
    closeBigPhoto();
  }
};

// Закрывает большое фото
var closeBigPhoto = function () {
  deleteSocialComment();
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);
};

// Устанавливает ползунок по умолчанию
var setDefaultPinPosition = function () {
  effectPinElement.style.left = EFFECT_PARAMETERS.defaultValue + '%';
  effectDepthElement.style.width = effectPinElement.style.left;

  document.removeEventListener('keydown', onEscPress);
};

// Открывает попап формы
var openUploadPopup = function () {
  uploadPopupElement.classList.remove('hidden');

  setDefaultScale();

  imgPreviewElement.classList.add('effects__preview--' + previewEffectName);

  setDefaultPinPosition();
  effectLevelValueElement.setAttribute('value', EFFECT_PARAMETERS.defaultValue);
  applyEffect(EFFECT_PARAMETERS.defaultValue);

  document.addEventListener('keydown', onEscPress);
};

// Закрывает попап формы
var closeUploadPopup = function () {
  setDefaultScale();
  inputLoadFileElement.value = null;

  imgPreviewElement.classList.remove('effects__preview--' + previewEffectName);
  uploadPopupElement.classList.add('hidden');

  document.removeEventListener('keydown', onEscPress);
};

// Обработчик открытия попапа формы
inputLoadFileElement.addEventListener('change', openUploadPopup);
inputLoadFileElement.addEventListener('change', function (evt) {
  if (evt.keyCode === KEY_CODE.enter) {
    openUploadPopup();
  }
});

// Обработчик показа большого фото по клику на маленькое изображение
picturesElement.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName !== 'IMG') {
    return;
  }
  if (target.parentNode.tagName === 'A') {
    evt.preventDefault();
  }

  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  var photoObj = getPhotoObject(evt);
  renderBigPhoto(photoObj);

  document.addEventListener('keydown', onEscPress);
});

// Обработчики масштабирования фото в форме
scaleBiggerElement.addEventListener('click', scaleUp);
scaleSmallerElement.addEventListener('click', scaleDown);

// Обработчики закрытия попапа формы
closePopupElement.addEventListener('click', function () {
  inputLoadFileElement.value = null;
  closeUploadPopup();
});
closePopupElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.enter) {
    inputLoadFileElement.value = null;
    closeUploadPopup();
  }
});

// Обработчики закрытия большого фото
closeBigPictureElement.addEventListener('click', closeBigPhoto);
closeBigPictureElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEY_CODE.enter) {
    closeBigPhoto();
  }
});

// Считает уровень эффекта к фото по расположению пина в слайдере
var getEffectLevel = function () {
  var pinPositionX = (coords.pin.offsetLeft + coords.pin.width / 2) - coords.line.offsetLeft;
  var effectValue = Math.round(pinPositionX / SLIDER_EFFECT_LINE_WIDTH * 100);

  return effectValue;
};

// Обработчик по нажатию на пин слайдера. Считает расположение
// пина относительно слайдера и добавляет обработчик
// отпускания мыши, по которому применяется эффект к фото
effectPinElement.addEventListener('mousedown', function () {
  var sliderPinRect = effectPinElement.getBoundingClientRect();
  var sliderEffectLineRect = effectLineElement.getBoundingClientRect();

  SLIDER_EFFECT_LINE_WIDTH = sliderEffectLineRect.width;

  coords.line = {
    offsetLeft: sliderEffectLineRect.left
  };
  coords.pin = {
    offsetLeft: sliderPinRect.left,
    width: sliderPinRect.width
  };

  var effectValue = getEffectLevel();

  var onMouseUp = function () {
    document.removeEventListener('mouseup', getEffectLevel);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mouseup', function () {
    getEffectLevel();
    effectLevelValueElement.setAttribute('value', effectValue);
    applyEffect(effectValue);
  });
  document.addEventListener('mouseup', onMouseUp);
});

// По клику на эффект добавляет его к фото
var onImageEffectClick = function (evt) {
  var target = evt.target;
  if (target.tagName !== 'INPUT') {
    return;
  }

  imgPreviewElement.classList = '';
  var effectName = target.value;

  currentEffect = 'effects__preview--' + effectName;

  if (currentEffect !== 'effects__preview--none') {
    effectLevelElement.classList.remove('hidden');
    imgPreviewElement.classList.add(currentEffect);
  } else {
    effectLevelElement.classList.add('hidden');
    imgPreviewElement.classList.add(currentEffect);
  }

  // При смене эффекта, его значение и значение пина
  // сбрасываются на дефолтные
  setDefaultPinPosition();
  effectLevelValueElement.setAttribute('value', EFFECT_PARAMETERS.defaultValue);
  applyEffect(EFFECT_PARAMETERS.defaultValue);
};

effectsListElement.addEventListener('click', function (evt) {
  onImageEffectClick(evt);
});
