var tsl2561 = require('./tsl2561.js');
var async = require('async');



var nrOfSec = 2000;
var sens = new tsl2561();

sens.on('newSensorValues', function (allData) {
    console.log('received event "newSensorValues" - calculating ...');
    var ir = allData.sensValues.rawData.addr_0x0F << 8 | allData.sensValues.rawData.addr_0x0E;
    var full = allData.sensValues.rawData.addr_0x0D << 8 | allData.sensValues.rawData.addr_0x0C;
    console.log('IR      : ' + ir);
    console.log('FULL    : ' + full);
    console.log('VISIBLE : ' + (full - ir));
    console.log('LUX     : ' + allData.sensValues.devData.light.value);
});

function sensRead() {
    async.timesSeries(nrOfSec, function (n, next) {
        setTimeout(function () {
            sens.getAllValues(next);
        }, 1000);
    }, function (err, res) {
        // finished
    });
}

console.log('sensor init ...');
sens.init(function (err, val) {
    if (err) {
        console.log('error on sensor init: ' + err);
    } else {
        console.log('sensor init completed');
        sensRead();
    }
});
