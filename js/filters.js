'use strict';

(function () {
  var NewPhoto = {
    MIN: 0,
    MAX: 10
  };
  var filtersElement = document.querySelector('.img-filters');
  var filtersFormElement = filtersElement.querySelector('.img-filters__form');
  var filterPopularElement = filtersFormElement.querySelector('#filter-popular');
  var filterNewElement = filtersFormElement.querySelector('#filter-new');
  var filterDiscussedElement = filtersFormElement.querySelector('#filter-discussed');

  // Возвращает 10 случайных фото
  var getTenNewPhotos = function (photos) {
    return window.util.shuffleArray(photos).slice(NewPhoto.MIN, NewPhoto.MAX);
  };

  // Сортирует по убыванию кол-ва комментариев
  var sortByComments = function (posts) {
    return posts.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  window.showFilters = function (data) {
    filtersElement.classList.remove('img-filters--inactive');

    // Смена фильтра
    var changeFilters = function (evt) {
      switch (evt.target) {
        case filterPopularElement:
          window.render(data);
          break;
        case filterNewElement:
          window.render(getTenNewPhotos(data));
          break;
        case filterDiscussedElement:
          window.render(sortByComments(data));
          break;
      }
    };

    // Смена активного класса у кнопки с фильтром
    var changeActiveClass = function (currentFilter) {
      var filtersElements = filtersFormElement.querySelectorAll('.img-filters__button');
      filtersElements.forEach(function (filter) {
        filter.classList.remove('img-filters__button--active');
      });
      currentFilter.classList.add('img-filters__button--active');
    };

    var changeFiltersDebounced = window.debounce(changeFilters);
    filtersFormElement.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.tagName === 'BUTTON') {
        changeActiveClass(target);
        changeFiltersDebounced(evt);
      }
    });
  };
})();
