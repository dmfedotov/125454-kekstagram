'use strict';

(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    },
    getRandomNum: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    shuffleArray: function (arr) {
      var resultArr = [];

      for (var i = 0; i < arr.length; i++) {
        var element = this.getRandomElement(arr);
        if (resultArr.indexOf(element) !== -1) {
          element = this.getRandomElement(arr);
          i--;
        } else {
          resultArr.push(element);
        }
      }

      return resultArr;
    }
  };
})();
