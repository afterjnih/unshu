'use strict';

var gulp = require('gulp');
var espower = require('gulp-espower');
var mocha = require('gulp-mocha');
var paths = {
  test: './test/client/*.js'
};

gulp.task('test', function(){
  gulp.src(paths.test)
      .pipe(espower())
      .pipe(mocha());
});
