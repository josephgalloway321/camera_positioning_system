// Connect web page to ROS using ROSBridge
var ros = new ROSLIB.Ros({
  url: 'ws://127.0.0.1:9090'
});

ros.on('connection', function() {
  console.log('Connected to websocket server.');
  const connection_status = document.querySelector('#connection-status');
  connection_status.innerHTML = 'Connected';
  connection_status.style.color = 'green';
});

ros.on('error', function() {
  console.log('Error connecting to websocket server: ', error);
  const connection_status = document.querySelector('#connection-status');
  connection_status.innerHTML = 'Error';
  connection_status.style.color = 'orange';
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
  const connection_status = document.querySelector('#connection-status');
  connection_status.innerHTML = 'Disconnected';
  connection_status.style.color = 'red';
});


// Write functions to publish commands to motors
function rotateRight() {
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo1',
    messageType: 'std_msgs/UInt16'
  });

  let message = new ROSLIB.Message({
    data: 0
  });
  topic.publish(message);
}

function rotateLeft() {
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo1',
    messageType: 'std_msgs/UInt16'
  });

  let message = new ROSLIB.Message({
    data: 1
  });
  topic.publish(message);
}

function rotateDown() {
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo2',
    messageType: 'std_msgs/UInt16'
  });

  let message = new ROSLIB.Message({
    data: 0
  });
  topic.publish(message);
}

function rotateUp() {
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo2',
    messageType: 'std_msgs/UInt16'
  });

  let message = new ROSLIB.Message({
    data: 1
  });
  topic.publish(message);
}