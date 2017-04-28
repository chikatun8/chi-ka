var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var argv   = require('minimist')(process.argv);
var gulpif = require('gulp-if');
var prompt = require('gulp-prompt');
var rsync  = require('gulp-rsync');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('deploy', function() {

  // Dirs and Files to sync
  rsyncPaths = [path.dist, 'lang', 'lib', 'templates', './*.php', './style.css' ];

  // Default options for rsync
  rsyncConf = {
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: [],
  };

  // Staging
  if (argv.staging) {

    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go

  // Production
  } else if (argv.production) {

    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go


  // Missing/Invalid Target
  } else {
    throwError('deploy', gutil.colors.red('Missing or invalid target'));
  }


  // Use gulp-rsync to sync the files
  return gulp.src(rsyncPaths)
  .pipe(gulpif(
      argv.production,
      prompt.confirm({
        message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
        default: false
      })
  ))
  .pipe(rsync(rsyncConf));

});


function throwError(taskName, msg) {
  throw new gutil.PluginError({
      plugin: taskName,
      message: msg
    });
}

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
