'use strict';

var PHOTOS_QUANITY = 25;
var BIG_PHOTO_INDEX = 0;
var bigPictureElement = document.querySelector('.big-picture');
var bigPhoto;
var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content
.querySelector('.picture');
var socialCommentsList = document.querySelector('.social__comments');
var socialCommentElement = document.querySelector('.social__comment');
var commentCountElement = document.querySelector('.social__comment-count');
var commentsLoaderElement = document.querySelector('.comments-loader');
var fragment = document.createDocumentFragment();
var commentsFragment = document.createDocumentFragment();

var photoParams = {
  likes: {
    MIN: 15,
    MAX: 200
  },
  COMMENTS: ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  commentsQuanity: {
    MIN: 1,
    MAX: 3
  },
  DESCRIPTIONS: ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!']
};

var getRandomNum = function (min, max) {
  var number = min + Math.random() * (max + 1 - min);

  return Math.floor(number);
};

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

var generatePhotos = function (quanity, params) {
  var photos = [];

  var urls = getRandomUrls(PHOTOS_QUANITY);
  for (var i = 0; i < quanity; i++) {
    var commentsQuanity = getRandomNum(photoParams.commentsQuanity.MIN, photoParams.commentsQuanity.MAX);
    var commentsArr = [];
    var descriptionIndex = getRandomNum(0, params.DESCRIPTIONS.length - 1);

    var count = 0;
    while (count < commentsQuanity) {
      var commentsIndex = getRandomNum(0, params.COMMENTS.length - 1);
      commentsArr.push(photoParams.COMMENTS[commentsIndex]);
      count++;
    }

    var photo = {
      url: 'photos/' + urls[i] + '.jpg',
      likes: getRandomNum(params.likes.MIN, params.likes.MAX),
      comments: commentsArr,
      description: params.DESCRIPTIONS[descriptionIndex]
    };
    photos.push(photo);
  }

  return photos;
};

var createPhoto = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  pictureElement.querySelector('.picture__likes').textContent = photo.comments;

  return pictureElement;
};

var photos = generatePhotos(PHOTOS_QUANITY, photoParams);
var renderPhotos = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(createPhoto(elements[i]));
  }
  picturesElement.appendChild(fragment);
};

var createComment = function (comment) {
  var socialComment = socialCommentElement.cloneNode(true);
  var randomAvatar = getRandomNum(photoParams.commentsQuanity.MIN, photoParams.commentsQuanity.MAX);

  socialComment.querySelector('.social__picture').src = 'img/avatar-' + randomAvatar + '.svg';
  socialComment.querySelector('.social__text').textContent = comment;

  return socialComment;
};

var renderComments = function (comments) {
  for (var i = 0; i < comments.length; i++) {
    commentsFragment.appendChild(createComment(comments[i]));
  }
  socialCommentsList.appendChild(commentsFragment);
};

var renderBigPhoto = function (photo) {
  var bigPicture = document.querySelector('.big-picture');

  bigPicture.querySelector('.big-picture__img').src = photo.url;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

  renderComments(comments);
  return bigPicture;
};

renderPhotos(photos);
bigPictureElement.classList.remove('hidden');
bigPhoto = photos[BIG_PHOTO_INDEX];
var comments = bigPhoto.comments;
renderBigPhoto(bigPhoto);
commentCountElement.classList.add('.visually-hidden');
commentsLoaderElement.classList.add('.visually-hidden');

