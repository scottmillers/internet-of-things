var sensorLib = require('node-dht-sensor');


var sensor = {

    sensors: [{
        name: "Indoor",
        type: 22,
        pin: 21
    }],
    read: function () {
        for (var a in this.sensors) {
            var b = sensorLib.readSpec(this.sensors[a].type, this.sensors[a].pin);
            var f = (9.0 * b.temperature) / 5 + 32;
            console.log(this.sensors[a].name + ":" +
                b.temperature.toFixed(1) + "C, " +
                f.toFixed(1) + "F, " +
                b.humidity.toFixed(1) + "%");
        }
        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

sensor.read();
