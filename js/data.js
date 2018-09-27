'use strict';

(function () {
  var PHOTOS_QUANITY = 25;
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

  // Создает массив уникальных адресов для картинок
  var getRandomUrls = function (quanity) {
    var urls = [];

    for (var i = 0; i < quanity; i++) {
      var randomUrl = window.util.getRandomNum(1, quanity);
      if (urls.indexOf(randomUrl) !== -1) {
        randomUrl = window.util.getRandomNum(1, quanity);
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
      var commentsIndex = window.util.getRandomNum(0, photo.COMMENTS.length - 1);
      commentsArr.push(photo.COMMENTS[commentsIndex]);
      count++;
    }

    return commentsArr;
  };

  // Создает массив объектов, где объект - это фото, комментарии и прочее
  var generatePhotos = function (quanity) {
    var photos = [];

    var urls = getRandomUrls(quanity);
    for (var i = 0; i < quanity; i++) {
      var commentsQuanity = window.util.getRandomNum(PhotoParameter.commentsQuanity.MIN, PhotoParameter.commentsQuanity.MAX);
      var commentsArr = getCommentsArr(commentsQuanity, PhotoParameter);
      var descriptionIndex = window.util.getRandomNum(0, PhotoParameter.DESCRIPTIONS.length - 1);

      var photo = {
        URL: 'photos/' + urls[i] + '.jpg',
        likes: window.util.getRandomNum(PhotoParameter.likes.MIN, PhotoParameter.likes.MAX),
        comments: commentsArr,
        description: PhotoParameter.DESCRIPTIONS[descriptionIndex]
      };
      photos.push(photo);
    }

    return photos;
  };

  var photos = generatePhotos(PHOTOS_QUANITY);

  window.data = {
    getPhotos: photos,
    getParameters: PhotoParameter
  };
})();
