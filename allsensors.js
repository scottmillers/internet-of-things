var fs = require('fs');
var tsl2561 = require('./tsl2561.js');

// get the DHT 11 temperature sensor
var tempSensorLib = require('node-dht-sensor');

// get the light sensor
var lightSensor = new tsl2561();


function readTempData(result) {
	var b = tempSensorLib.readSpec(22,21);
	var f = (9.0 * b.temperature) / 5 + 32;
    console.log("Temp & Humidity: " +
                b.temperature.toFixed(1) + "C, " +
                f.toFixed(1) + "F, " +
                b.humidity.toFixed(1) + "%");
    //return {"temperature": b.temperature.toFixed(1), "humidity": b.humidity.toFixed(1)}
	
	result["temperature"] = b.temperature.toFixed(1);
	result["humidity"] = b.humidity.toFixed(1);
}

function readLightData(result) {
	
	
	lightSensor.getLux(function(err,val) {
			if (err) {
				console.log('error on lightsensor getLux: ' + err);
			} else {
				console.log("Light: " + val + ' lux');
				result["lux"] = val;
			}
	});
   
   
  
};

function initSensors() {
// just light sensor	
lightSensor.init(function(err,val) {
    if (err) {
		console.log('error on lightsensor init: ' + err);
		console.log('run i2cdetect -y 1 to see if sensor available ');
	} else {
        start();
	}
});

}


function start() {
	
	// read from all sensors
	var result = {"time": 0,"temperature": 0, "humidity": 0, "lux": 0}
	readLightData(result); 
	readTempData(result);  
	
	
	result["time"] = new Date().getHours();
	
	console.log(JSON.stringify(result, null, 5));
	
	// write it to a file
	setTimeout(function () {
		start();
    }, 2000);
}

function writeData() {
	

}

initSensors();

