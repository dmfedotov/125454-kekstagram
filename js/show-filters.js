'use strict';

(function () {
  window.showFilters = function () {
    var filtersElement = document.querySelector('.img-filters');
    filtersElement.classList.remove('img-filters--inactive');
  };
})();
