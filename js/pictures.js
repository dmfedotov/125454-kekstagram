'use strict';

var PHOTOS_QUANITY = 25;
var DISPLAY_COMMENTS = 5;
var PhotoParameter = {
  COMMENTS: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  DESCRIPTIONS: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ],
  likes: {
    MIN: 15,
    MAX: 200
  },
  commentsQuanity: {
    MIN: 1,
    MAX: 10
  },
  commentAvatar: {
    MIN: 1,
    MAX: 6
  }
};
var KeyCode = {
  ENTER: 13,
  ESC: 27
};
var EffectParameter = {
  MAX_VALUE: 100,
  DEFAULT_VALUE: 100,
  MIN_VALUE: 0,
  LINE_UNIT: '%',
  DEFAULT_CLASS: 'effects__preview--heat',

  chrome: {
    CLASS: 'effects__preview--chrome',
    PROPERTY: 'grayscale',
    MAX_VALUE: 1,
    UNITS: ''
  },
  sepia: {
    CLASS: 'effects__preview--sepia',
    PROPERTY: 'sepia',
    MAX_VALUE: 1,
    UNITS: ''
  },
  marvin: {
    CLASS: 'effects__preview--marvin',
    PROPERTY: 'invert',
    MAX_VALUE: 100,
    UNITS: '%'
  },
  phobos: {
    CLASS: 'effects__preview--phobos',
    PROPERTY: 'blur',
    MAX_VALUE: 3,
    UNITS: 'px'
  },
  heat: {
    CLASS: 'effects__preview--heat',
    PROPERTY: 'brightness',
    MAX_VALUE: 3,
    UNITS: ''
  }
};
var ScaleValue = {
  MIN: 25,
  STEP: 25,
  MAX: 100,
  DEFAULT: 100
};

// Для работы с картинками
var bodyElement = document.querySelector('body');
var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var bigPictureElement = document.querySelector('.big-picture');
var closeBigPictureElement = bigPictureElement.querySelector('.big-picture__cancel');

// Для работы с комментариями
var socialCommentsListElement = bigPictureElement.querySelector('.social__comments');
var socialCommentElement = bigPictureElement.querySelector('.social__comment');
var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

// Для работы с формой загрузки фото
var imgUploadElement = document.querySelector('.img-upload');
var inputLoadFileElement = imgUploadElement.querySelector('#upload-file');
var uploadPopupElement = imgUploadElement.querySelector('.img-upload__overlay');
var imgWrapPreviewElement = imgUploadElement.querySelector('.img-upload__preview');
var imgPreviewElement = imgWrapPreviewElement.querySelector('.img-upload__preview img');
var closePopupElement = imgUploadElement.querySelector('#upload-cancel');

// Для работы со слайдером
var effectLevelElement = imgUploadElement.querySelector('.effect-level');
var effectPinElement = effectLevelElement.querySelector('.effect-level__pin');
var effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');
var effectLineElement = effectLevelElement.querySelector('.effect-level__line');
var effectDepthElement = effectLevelElement.querySelector('.effect-level__depth');
var effectsListElement = imgUploadElement.querySelector('.effects__list');

// Для работы с изменением размера фото в форме
var scaleElement = document.querySelector('.scale');
var scaleSmallerElement = scaleElement.querySelector('.scale__control--smaller');
var scaleBiggerElement = scaleElement.querySelector('.scale__control--bigger');
var scaleValueElement = scaleElement.querySelector('.scale__control--value');

// Для работы с эффектами в форме
var radioChecked = effectsListElement.querySelector('.effects__radio[checked]');
var previewEffectName = radioChecked.value;
var currentEffect = 'effects__preview--' + previewEffectName;

// Координаты пина и линии эффекта в слайдере
var coords = {};
var sliderEffectLineWidth;

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
    var commentsIndex = getRandomNum(0, photo.COMMENTS.length - 1);
    commentsArr.push(photo.COMMENTS[commentsIndex]);
    count++;
  }

  return commentsArr;
};

// Создает массив объектов, где объект - это фото, комментарии и прочее
var generatePhotos = function (quanity, parameter) {
  var photos = [];

  var urls = getRandomUrls(quanity);
  for (var i = 0; i < quanity; i++) {
    var commentsQuanity = getRandomNum(parameter.commentsQuanity.MIN, parameter.commentsQuanity.MAX);
    var commentsArr = getCommentsArr(commentsQuanity, parameter);
    var descriptionIndex = getRandomNum(0, parameter.DESCRIPTIONS.length - 1);

    var photo = {
      URL: 'photos/' + urls[i] + '.jpg',
      likes: getRandomNum(parameter.likes.MIN, parameter.likes.MAX),
      comments: commentsArr,
      description: parameter.DESCRIPTIONS[descriptionIndex]
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

var photos = generatePhotos(PHOTOS_QUANITY, PhotoParameter);

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
  var randomAvatar = getRandomNum(PhotoParameter.commentAvatar.MIN, PhotoParameter.commentAvatar.MAX);

  socialComment.querySelector('.social__picture').src = 'img/avatar-' + randomAvatar + '.svg';
  socialComment.querySelector('.social__text').textContent = comment;

  return socialComment;
};

// Удаляет комментарии к фото
var deleteSocialComment = function () {
  socialCommentsListElement.innerHTML = '';
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
  bigPictureElement.querySelector('.big-picture__img img').src = photo.URL;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;

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

// Показывает большое фото
var showBigPhoto = function (evt) {
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
};

// Вешаем на каждую картинку обработчик, который показывает большое фото
var pictureElements = document.querySelectorAll('.picture');
for (var i = 0; i < pictureElements.length; i++) {
  pictureElements[i].addEventListener('click', showBigPhoto);
}

// Закрывает большое фото
var closeBigPhoto = function () {
  deleteSocialComment();
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);
};

// Обработчик закрытия большого фото
closeBigPictureElement.addEventListener('click', closeBigPhoto);

// Задает масштаб фото в форме по умолчанию
var setDefaultPhotoScale = function () {
  scaleValueElement.value = ScaleValue.DEFAULT + '%';
  imgWrapPreviewElement.style.transform = 'scale(' + ScaleValue.DEFAULT / 100 + ')';
};

// Задает масштаб фото в форме
var setPhotoScale = function (direction) {
  var currentScale = parseInt(scaleValueElement.value, 10);
  currentScale = currentScale + (ScaleValue.STEP * direction);

  if (currentScale >= ScaleValue.MIN && currentScale <= ScaleValue.MAX) {
    scaleValueElement.value = currentScale + '%';
    imgWrapPreviewElement.style.transform = 'scale(' + currentScale / 100 + ')';
  }
};

// Обработчики масштабирования фото в форме
scaleBiggerElement.addEventListener('click', function () {
  setPhotoScale(1);
});
scaleSmallerElement.addEventListener('click', function () {
  setPhotoScale(-1);
});

// Применяет эффект к фото
var applyEffect = function (value) {
  switch (currentEffect) {
    case 'effects__preview--chrome':
      imgPreviewElement.style.filter = EffectParameter.chrome.PROPERTY + '(' + (value) / EffectParameter.MAX_VALUE + EffectParameter.chrome.UNITS + ')';
      break;
    case 'effects__preview--sepia':
      imgPreviewElement.style.filter = EffectParameter.sepia.PROPERTY + '(' + (value) / EffectParameter.MAX_VALUE + EffectParameter.sepia.UNITS + ')';
      break;
    case 'effects__preview--marvin':
      imgPreviewElement.style.filter = EffectParameter.marvin.PROPERTY + '(' + (value) * EffectParameter.marvin.MAX_VALUE / EffectParameter.MAX_VALUE + EffectParameter.marvin.UNITS + ')';
      break;
    case 'effects__preview--phobos':
      imgPreviewElement.style.filter = EffectParameter.phobos.PROPERTY + '(' + (value) * EffectParameter.phobos.MAX_VALUE / EffectParameter.MAX_VALUE + EffectParameter.phobos.UNITS + ')';
      break;
    case 'effects__preview--heat':
      imgPreviewElement.style.filter = EffectParameter.heat.PROPERTY + '(' + (value) * EffectParameter.heat.MAX_VALUE / EffectParameter.MAX_VALUE + EffectParameter.heat.UNITS + ')';
      break;
    default:
      imgPreviewElement.style.filter = 'none';
  }
};

// Обработчик по клавише ESC
var onEscPress = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
    inputLoadFileElement.value = null;
    closeUploadPopup();
    closeBigPhoto();
  }
};

// Устанавливает ползунок по умолчанию
var setDefaultPinPosition = function () {
  effectPinElement.style.left = EffectParameter.DEFAULT_VALUE + '%';
  effectDepthElement.style.width = effectPinElement.style.left;
};

var setDefaultEffect = function () {
  imgPreviewElement.classList = '';
  imgPreviewElement.classList.add(EffectParameter.DEFAULT_CLASS);
};

// Открывает попап формы
var openUploadPopup = function () {
  uploadPopupElement.classList.remove('hidden');

  setDefaultPhotoScale();

  imgPreviewElement.classList.add('effects__preview--' + previewEffectName);

  setDefaultPinPosition();
  effectLevelValueElement.setAttribute('value', EffectParameter.DEFAULT_VALUE);
  applyEffect(EffectParameter.DEFAULT_VALUE);

  document.addEventListener('keydown', onEscPress);
};

// Обработчик открытия попапа формы
inputLoadFileElement.addEventListener('change', openUploadPopup);

// Закрывает попап формы
var closeUploadPopup = function () {
  setDefaultPhotoScale();
  inputLoadFileElement.value = null;

  imgPreviewElement.classList.remove('effects__preview--' + previewEffectName);
  setDefaultEffect();
  uploadPopupElement.classList.add('hidden');

  document.removeEventListener('keydown', onEscPress);
};

// Обработчики закрытия попапа формы
closePopupElement.addEventListener('click', function () {
  inputLoadFileElement.value = null;
  setDefaultEffect();
  closeUploadPopup();
});

// Считает уровень эффекта к фото по расположению пина в слайдере
var getEffectLevel = function () {
  var pinPositionX = (coords.pin.offsetLeft + coords.pin.width / 2) - coords.line.offsetLeft;
  var effectValue = Math.round(pinPositionX / sliderEffectLineWidth * 100);

  return effectValue;
};

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
  effectLevelValueElement.setAttribute('value', EffectParameter.DEFAULT_VALUE);
  applyEffect(EffectParameter.DEFAULT_VALUE);
};

// Обработчик смены эффекта у фото в форме
effectsListElement.addEventListener('click', onImageEffectClick);

// Обработчик по нажатию на пин слайдера. Считает расположение
// пина относительно слайдера и добавляет обработчик
// отпускания мыши, по которому применяется эффект к фото
effectPinElement.addEventListener('mousedown', function () {
  var sliderPinRect = effectPinElement.getBoundingClientRect();
  var sliderEffectLineRect = effectLineElement.getBoundingClientRect();

  sliderEffectLineWidth = sliderEffectLineRect.width;

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
