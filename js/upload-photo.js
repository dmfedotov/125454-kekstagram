'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previewElement = document.querySelector('.img-upload__preview img');
  var fileChooserElement = document.querySelector('#upload-file');

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
