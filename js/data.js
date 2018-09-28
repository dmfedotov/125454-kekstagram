'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;
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
    Like: {
      MIN: 15,
      MAX: 200
    },
    Comment: {
      MIN: 1,
      MAX: 10
    }
  };

  // Создает массив комментариев к фото
  var getComments = function (quantity) {
    var comments = [];
    var count = 0;

    while (count < quantity) {
      var commentsIndex = window.util.getRandomNum(0, PhotoParameter.COMMENTS.length - 1);
      comments.push(PhotoParameter.COMMENTS[commentsIndex]);
      count++;
    }

    return comments;
  };

  // Создает массив объектов, где объект - это фото, комментарии и прочее
  var generatePhotos = function (quantity) {
    var photos = [];

    for (var i = 0; i < quantity; i++) {
      var commentsQuanity = window.util.getRandomNum(PhotoParameter.Comment.MIN, PhotoParameter.Comment.MAX);

      var photo = {
        URL: 'photos/' + [i + 1] + '.jpg',
        likes: window.util.getRandomNum(PhotoParameter.Like.MIN, PhotoParameter.Like.MAX),
        comments: getComments(commentsQuanity),
        description: window.util.getRandomElement(PhotoParameter.DESCRIPTIONS)
      };
      photos.push(photo);
    }

    return photos;
  };

  var photos = generatePhotos(PHOTOS_QUANTITY);

  window.data = {
    getPhotos: photos,
    getParameters: PhotoParameter
  };
})();
