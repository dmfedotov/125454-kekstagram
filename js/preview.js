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

  var deleteStandartComments = function () {
    socialCommentsListElement.innerHTML = '';
  };
  deleteStandartComments();

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

  var renderBigPhoto = function (photo) {
    var displayedComments = 0;
    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.social__caption').textContent = window.getDescription(photo);
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;

    renderComments(photo.comments);

    if (photo.comments.length > DISPLAY_COMMENTS) {
      displayedComments = DISPLAY_COMMENTS;
    } else {
      displayedComments = photo.comments.length;
    }
    var commentsCountString = displayedComments + ' из ' + '<span class="comments-count">' + photo.comments.length + '</span>' + ' комментариев';
    bigPictureElement.querySelector('.social__comment-count').innerHTML = commentsCountString;
  };

  var showBigPhoto = function (evt) {
    bigPictureElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    var photoObj = getPhotoObject(evt);
    renderBigPhoto(photoObj);
  };

  var hideBigPhoto = function () {
    deleteStandartComments();
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    document.removeEventListener('keydown', window.util.isEscEvent);
  };

  window.preview = {
    show: showBigPhoto,
    hide: hideBigPhoto
  };
})();
