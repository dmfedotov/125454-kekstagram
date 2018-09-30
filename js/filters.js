'use strict';

(function () {
  var newPhoto = {
    MIN: 0,
    MAX: 10
  };
  window.filters = {
    init: function (filterElement, picturesContainer, data) {
      var filterPopular = filterElement.querySelector('#filter-popular');
      var filterNew = filterElement.querySelector('#filter-new');
      var filterDiscussed = filterElement.querySelector('#filter-discussed');

      var changeFilters = function (evt) {
        var pictures = picturesContainer.querySelectorAll('.picture');
        var sortFunction = null;
        pictures.forEach(function (picture) {
          picturesContainer.removeChild(picture);
        });
        switch (evt.target) {
          case filterPopular:
            sortFunction = null;
            window.render(data);
            break;
          case filterNew:
            window.render(window.util.shuffleArray(data).slice(newPhoto.MIN, newPhoto.MAX));
            break;
          case filterDiscussed:
            sortFunction = function (first, second) {
              return second.comments.length - first.comments.length;
            };
            window.render(sortFunction ? data.slice().sort(sortFunction) : data);
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
