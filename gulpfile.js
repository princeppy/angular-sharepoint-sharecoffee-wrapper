// Include Gulp
var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var path = require('path');
var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', '!gulp-release-it'],
    replaceString: /\bgulp[\-.]/,
    lazy: true
});
require('gulp-release-it')(gulp);

var config = {
    src: 'src/',
    dest: 'dist/',
};

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/**
 * Copy js
 * @return {Stream}
 */
gulp.task('js', function () {
    return gulp.src([
        './bower_components/ShareCoffee/dist/ShareCoffee.js',
        './bower_components/ShareCoffee.Search/dist/ShareCoffee.Search.js',
        './bower_components/ShareCoffee.UserProfiles/dist/ShareCoffee.UserProfiles.js',
        './bower_components/ShareCoffee/dist/ShareCoffee.js',
        config.src + 'module.js',
        config.src + 'services/**/*.js'
    ])
        .pipe($.filter('**/*.js'))
        .pipe($.order([
            'module.js',
            '*.app.js',
            '*.module.js',
            '*'
        ]))
        .pipe($.using({}))
        //.pipe($.uglify())
        .pipe($.concat('angular-sharepoint-sharecoffee-wrapper.js'))
        .pipe(gulp.dest(config.dest))
        .pipe($.rename('angular-sharepoint-sharecoffee-wrapper.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(config.dest));
});

/*
gulp.task('bump-patch', function(){
    gulp.src('./*.json')
        .pipe($.bump({type:'patch'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function(){
    gulp.src('./*.json')
        .pipe($.bump({type:'minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function(){
    gulp.src('./*.json')
        .pipe($.bump({type:'major'}))
        .pipe(gulp.dest('./'));
});

bower register angular-sharepoint-rest-api git://github.com/princeppy/angular-sharepoint-sharecoffee-wrapper.git
bower info angular-sharepoint-rest-api    
*/
gulp.task('build', ['js']);