const gulp = require('gulp');
const gulpif = require('gulp-if');
const typescript = require('gulp-typescript');
const mergeStream = require('merge-stream');
const polymer = require('polymer-build');
const Transform = require('stream').Transform;

const PolymerProject = polymer.PolymerProject;

let polymerProject = new PolymerProject({
  entrypoint: 'index.html',
  shell: 'src/my-app.html',
});

let tsProject = typescript.createProject('tsconfig.json');

gulp.task('build', ['build:ts'], () => {
  return mergeStream(
      // tsProject.src().pipe(typescript(tsProject)),
      polymerProject.sources(),
      polymerProject.dependencies()
    )
    .pipe(gulp.dest('build'));
});

gulp.task('build:ts', () => {
  return tsProject.src()
    .pipe(typescript(tsProject))
    .pipe(gulp.dest('build/src'));
});
