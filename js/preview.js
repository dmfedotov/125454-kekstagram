'use strict';

(function () {
  var DISPLAY_COMMENTS = 5;
  var Avatar = {
    MIN: 1,
    MAX: 6
  };
  var bigPictureElement = document.querySelector('.big-picture');
  var socialCommentsListElement = bigPictureElement.querySelector('.social__comments');
  var socialCommentElement = socialCommentsListElement.querySelector('.social__comment');
  var loadButtonElement = bigPictureElement.querySelector('.comments-loader');

  // Создает DOM элемент с комментарием и наполняет его информацией
  var createComment = function (comment) {
    var socialComment = socialCommentElement.cloneNode(true);
    var randomAvatar = window.util.getRandomNum(Avatar.MIN, Avatar.MAX);

    socialComment.querySelector('.social__picture').src = 'img/avatar-' + randomAvatar + '.svg';
    socialComment.querySelector('.social__text').textContent = comment;

    return socialComment;
  };

  // Добавляет комментарии в DOM
  var renderComments = function (comments) {
    var commentsFragment = document.createDocumentFragment();

    comments.forEach(function (element, index) {
      var comment = createComment(element);
      if (index >= DISPLAY_COMMENTS) {
        comment.classList.add('visually-hidden');
        commentsFragment.appendChild(comment);
      }
      commentsFragment.appendChild(comment);
    });
    socialCommentsListElement.appendChild(commentsFragment);
  };

  // Удаляет стандартные комментарии из разметки
  var deleteStandartComments = function () {
    socialCommentsListElement.innerHTML = '';
  };
  deleteStandartComments();

  // Получает объект картинки на миниатюру которой нажал пользователь
  var getPhotoObject = function (evt) {
    var target = evt.target;
    var imageSrc = target.getAttribute('src');

    for (var i = 0; i < window.picturesData.length; i++) {
      var photoObj = window.picturesData[i];
      if (photoObj.url === imageSrc) {
        break;
      }
    }

    return photoObj;
  };

  // Создает DOM елемент с большим фото и наполняет его информацией
  var renderBigPhoto = function (photo) {
    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.social__caption').textContent = window.getDescription(photo);
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;

    renderComments(photo.comments);
    window.comments.showCount(photo.comments);
  };

  // Показыает большое фото
  var showBigPhoto = function (evt) {
    bigPictureElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    var photoObj = getPhotoObject(evt);
    renderBigPhoto(photoObj);

    if (photoObj.comments.length <= DISPLAY_COMMENTS) {
      loadButtonElement.classList.add('hidden');
      return;
    }
    loadButtonElement.addEventListener('click', window.comments.load);
    loadButtonElement.addEventListener('click', function () {
      window.comments.showCount(photoObj.comments);
    });
  };

  // Скрывает большое фото
  var hideBigPhoto = function () {
    deleteStandartComments();
    loadButtonElement.classList.remove('hidden');
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    loadButtonElement.removeEventListener('click', window.comments.load);
    document.removeEventListener('keydown', window.util.isEscEvent);
  };

  window.preview = {
    show: showBigPhoto,
    hide: hideBigPhoto
  };
})();
