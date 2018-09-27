'use strict';

(function () {
  var DISPLAY_COMMENTS = 5;
  var bigPictureElement = document.querySelector('.big-picture');
  var socialCommentsListElement = bigPictureElement.querySelector('.social__comments');

  // Добавляет комментарии в DOM
  var renderComments = function (comments) {
    var commentsFragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var comment = window.data.createComment(comments[i]);
      if (i >= DISPLAY_COMMENTS) {
        comment.classList.add('visually-hidden');
        commentsFragment.appendChild(comment);
      }
      commentsFragment.appendChild(comment);
    }
    socialCommentsListElement.appendChild(commentsFragment);
  };

  var deleteStandartComments = function () {
    socialCommentsListElement.innerHTML = '';
  };


  window.preview = {
    deleteStandartComments: deleteStandartComments,

    renderBigPhoto: function (photo) {
      bigPictureElement.querySelector('.big-picture__img img').src = photo.URL;
      bigPictureElement.querySelector('.social__caption').textContent = photo.description;
      bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
      bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;

      renderComments(photo.comments);
    },

    showBigPhoto: function () {
      bigPictureElement.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
    },

    closeBigPhoto: function () {
      deleteStandartComments();
      bigPictureElement.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');

      document.removeEventListener('keydown', window.util.isEscEvent);
    },

    getPhotoObject: function (evt) {
      var target = evt.target;
      var imageSrc = target.getAttribute('src');

      for (var i = 0; i < window.data.photos.length; i++) {
        var photoObj = window.data.photos[i];

        if (photoObj.URL === imageSrc) {
          break;
        }
      }

      return photoObj;
    }
  };
})();
