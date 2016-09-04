/// <binding AfterBuild='deploy' />
var gulp = require('gulp');
    debug = require('gulp-debug');

/*var Candyman = require('candyman');

var candyman = new Candyman({
    targetDevices: [
        { devicename: 'millerspi', hostname: 'millerspi' }
    ],
    user: 'pi',
    password: 'S51ada51377$',
    root: '/home/pi',
    projectName: 'cylon',
    startFile: 'app.js'
});
*/
gulp.task('default', function () {
    console.log("running the default gulp task");
});

gulp.task('copytopi', function() {
    console.log("copy files to raspberry pi share");
    gulp.src("./*.js")
    .pipe(debug({verbose:true}))
    .pipe(gulp.dest("//MILLERSPI/PiShare"));
})

/*gulp.task('deploy', function () {
    return candyman.deploy();
});
*/