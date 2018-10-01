'use strict';

(function () {
  var NewPhoto = {
    MIN: 0,
    MAX: 10
  };
  window.filters = {
    init: function (filterElement, picturesContainer, data) {
      var filterPopular = filterElement.querySelector('#filter-popular');
      var filterNew = filterElement.querySelector('#filter-new');
      var filterDiscussed = filterElement.querySelector('#filter-discussed');

      var getTenNewPhotos = function (photos) {
        return window.util.shuffleArray(photos).slice(NewPhoto.MIN, NewPhoto.MAX);
      };

      var sortByComments = function (posts) {
        return posts.slice().sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
      };

      var changeFilters = function (evt) {
        var pictures = picturesContainer.querySelectorAll('.picture');
        pictures.forEach(function (picture) {
          picturesContainer.removeChild(picture);
        });
        switch (evt.target) {
          case filterPopular:
            window.render(data);
            break;
          case filterNew:
            window.render(getTenNewPhotos(data));
            break;
          case filterDiscussed:
            window.render(sortByComments(data));
            break;
        }
      };

      var changeActiveClass = function (currentFilter) {
        var filters = filterElement.querySelectorAll('.img-filters__button');
        filters.forEach(function (filter) {
          filter.classList.remove('img-filters__button--active');
        });
        currentFilter.classList.add('img-filters__button--active');
      };

      var changeFiltersDebounced = window.debounce(changeFilters);
      filterElement.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.tagName === 'BUTTON') {
          changeActiveClass(target);
          changeFiltersDebounced(evt);
        }
      });
    }
  };
})();
