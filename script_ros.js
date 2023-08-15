// Connect web page to ROS using ROSBridge
var ros = new ROSLIB.Ros({
  url: 'ws://127.0.0.1:9090'
});

ros.on('connection', function() {
  console.log('Connected to websocket server.');
});

ros.on('error', function() {
  console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
});


