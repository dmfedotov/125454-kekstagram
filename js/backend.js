'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;

  var createRequest = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        success(xhr.response);
      } else {
        error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();

  };
  var save = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    download: load,
    save: save
  };
})();
