'use strict';

var PHOTOS_QUANITY = 25;
var BIG_PHOTO_INDEX = 0;
var DISPLAY_COMMENTS = 5;
var photoParams = {
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
var bigPictureElement = document.querySelector('.big-picture');
var bigPhoto;
var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var socialCommentsList = document.querySelector('.social__comments');
var socialCommentElement = document.querySelector('.social__comment');
var commentCountElement = document.querySelector('.social__comment-count');
var commentsLoaderElement = document.querySelector('.comments-loader');

var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
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

var generatePhotos = function (quanity, params) {
  var photos = [];

  var urls = getRandomUrls(PHOTOS_QUANITY);
  for (var i = 0; i < quanity; i++) {
    var commentsQuanity = getRandomNum(photoParams.commentsQuanity.MIN, photoParams.commentsQuanity.MAX);
    var commentsArr = getCommentsArr(commentsQuanity, photoParams);
    var descriptionIndex = getRandomNum(0, params.DESCRIPTIONS.length - 1);

    var photo = {
      URL: 'photos/' + urls[i] + '.jpg',
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

  pictureElement.querySelector('.picture__img').src = photo.URL;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  return pictureElement;
};

var photos = generatePhotos(PHOTOS_QUANITY, photoParams);
var renderPhotos = function (elements) {
  var photosFragment = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    photosFragment.appendChild(createPhoto(elements[i]));
  }
  picturesElement.appendChild(photosFragment);
};

var createComment = function (comment) {
  var socialComment = socialCommentElement.cloneNode(true);
  var randomAvatar = getRandomNum(photoParams.commentAvatar.MIN, photoParams.commentAvatar.MAX);

  socialComment.querySelector('.social__picture').src = 'img/avatar-' + randomAvatar + '.svg';
  socialComment.querySelector('.social__text').textContent = comment;

  return socialComment;
};

var deleteElement = function (element) {
  var parent = element.parentNode;

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

var renderComments = function (comments) {
  var commentsFragment = document.createDocumentFragment();
  deleteElement(socialCommentElement);

  for (var i = 0; i < comments.length; i++) {
    var comment = createComment(comments[i]);
    if (i >= DISPLAY_COMMENTS) {
      comment.classList.add('visually-hidden');
      commentsFragment.appendChild(comment);
    }
    commentsFragment.appendChild(comment);
  }
  socialCommentsList.appendChild(commentsFragment);
};

var renderBigPhoto = function (photo) {
  var bigPicture = document.querySelector('.big-picture');

  bigPicture.querySelector('.big-picture__img img').src = photo.URL;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

  renderComments(bigPhoto.comments);
  return bigPicture;
};

renderPhotos(photos);
bigPictureElement.classList.remove('hidden');
bigPhoto = photos[BIG_PHOTO_INDEX];
renderBigPhoto(bigPhoto);
commentCountElement.classList.add('.visually-hidden');
commentsLoaderElement.classList.add('.visually-hidden');
