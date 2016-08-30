/// <binding AfterBuild='deploy' />
var gulp = require('gulp');

var Candyman = require('candyman');

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

gulp.task('default', function () {
    console.log("running the default gulp task");
});

gulp.task('deploy', function () {
    return candyman.deploy();
});