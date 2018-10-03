'use strict';

(function () {
  var SliceValue = {
    START: 0,
    END: 5
  };
  var bigPictureElement = document.querySelector('.big-picture');

  var showCommentsCount = function (comments) {
    var displayedCommentsElements = bigPictureElement.querySelectorAll('.social__comment:not(.visually-hidden)').length;
    var commentsCountString = displayedCommentsElements + ' из ' + '<span class="comments-count">' + comments.length + '</span>' + ' комментариев';
    bigPictureElement.querySelector('.social__comment-count').innerHTML = commentsCountString;
  };

  var loadComments = function (evt) {
    var commentElements = bigPictureElement.querySelectorAll('.social__comment.visually-hidden');
    [].slice.call(commentElements).slice(SliceValue.START, SliceValue.END).forEach(function (comment) {
      comment.classList.remove('visually-hidden');
    });

    if (bigPictureElement.querySelectorAll('.social__comment.visually-hidden').length === 0) {
      evt.target.classList.add('hidden');
    }
  };

  window.comments = {
    load: loadComments,
    showCount: showCommentsCount
  };
})();
