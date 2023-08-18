// Connect web page to ROS using ROSBridge
var ros = new ROSLIB.Ros({
  url: 'ws://127.0.0.1:9090'
});

ros.on('connection', function() {
  console.log('Connected to websocket server.');
  const connection_status = document.querySelector('#connection-status');
  connection_status.innerHTML = 'Connected';
  connection_status.style.color = '#a2c11c';
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


// Grab button elements from web page to manipulate
const right_button = document.querySelector('#right-button');
const left_button = document.querySelector('#left-button');
const down_button = document.querySelector('#down-button');
const up_button = document.querySelector('#up-button');
const horizontal_home_button = document.querySelector('#horizontal-home-button');
const vertical_home_button = document.querySelector('#vertical-home-button');


// Write functions to publish commands to motors
function rotateRight() {
  // Set topic information to send message to a specific servo
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo1',
    messageType: 'std_msgs/UInt16'
  });

  // Fill out message information to pivot a specific servo
  let message = new ROSLIB.Message({
    data: 0  // Pivot right
  });
  topic.publish(message);

  // Enable disabled rotate left button
  if(left_button.disabled === true) {
    left_button.disabled = false;
    left_button.innerHTML = 'Rotate Left';
    left_button.style.color = 'white';
  }
}

function rotateLeft() {
  // Set topic information to send message to a specific servo
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo1',
    messageType: 'std_msgs/UInt16'
  });
  // Fill out message information to pivot a specific servo
  let message = new ROSLIB.Message({
    data: 1  // Pivot left
  });
  topic.publish(message);

  // Enable disabled rotate right button
  if(right_button.disabled === true) {
    right_button.disabled = false;
    right_button.innerHTML = 'Rotate Right';
    right_button.style.color = 'white';
  }
}

function homeHorizontal() {
  // Set topic information to send message to a specific servo
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo1',
    messageType: 'std_msgs/UInt16'
  });

  // Fill out message information to pivot a specific servo
  let message = new ROSLIB.Message({
    data: 2  // Pivot to horizontal home position
  });
  topic.publish(message);

  // Enable disabled rotate right button
  if(right_button.disabled === true) {
    right_button.disabled = false;
    right_button.innerHTML = 'Rotate Right';
    right_button.style.color = 'white';
  }

  // Enable disabled rotate left button
  if(left_button.disabled === true) {
    left_button.disabled = false;
    left_button.innerHTML = 'Rotate Left';
    left_button.style.color = 'white';
  }
}

function rotateDown() {
  // Set topic information to send message to a specific servo
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo2',
    messageType: 'std_msgs/UInt16'
  });

  // Fill out message information to pivot a specific servo
  let message = new ROSLIB.Message({
    data: 0  // Pivot down
  });
  topic.publish(message);

  // Enable disabled rotate up button
  if(up_button.disabled === true) {
    up_button.disabled = false;
    up_button.innerHTML = 'Rotate Up';
    up_button.style.color = 'white';
  }
}

function rotateUp() {
  // Set topic information to send message to a specific servo
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo2',
    messageType: 'std_msgs/UInt16'
  });

  // Fill out message information to pivot a specific servo
  let message = new ROSLIB.Message({
    data: 1  // Pivot up
  });
  topic.publish(message);

  // Enable disabled rotate down button
  if(down_button.disabled === true) {
    down_button.disabled = false;
    down_button.innerHTML = 'Rotate Down';
    down_button.style.color = 'white';
  }
}

function homeVertical() {
  // Set topic information to send message to a specific servo
  let topic = new ROSLIB.Topic({
    ros: ros,
    name: '/servo2',
    messageType: 'std_msgs/UInt16'
  });

  // Fill out message information to pivot a specific servo
  let message = new ROSLIB.Message({
    data: 2  // Pivot to vertical home position
  });
  topic.publish(message);

  // Enable disabled rotate down button
  if(up_button.disabled === true) {
    up_button.disabled = false;
    up_button.innerHTML = 'Rotate Up';
    up_button.style.color = 'white';
  }

  // Enable disabled rotate up button
  if(down_button.disabled === true) {
    down_button.disabled = false;
    down_button.innerHTML = 'Rotate Down';
    down_button.style.color = 'white';
  }
}


// Listen for maximum rotation reached to notfy user
let listener = new ROSLIB.Topic({
  ros: ros,
  name: '/rotation_limit_reached',
  messageType: 'std_msgs/UInt16'
});

// Based on the message received above, disable the appropriate button
// and inform the user that the maximum limit has been reached
listener.subscribe(function(message) {
  if(message.data === 0) {
    console.log("Cannot Rotate Servo I, Right Limit Reached");
    right_button.innerHTML = 'Maximum Limit Reached';
    right_button.style.color = 'red';
    right_button.disabled = true;
  }
  else if(message.data === 1) {
    console.log("Cannot Rotate Servo I, Left Limit Reached");
    left_button.innerHTML = 'Maximum Limit Reached';
    left_button.style.color = 'red';
    left_button.disabled = true;
  }
  else if(message.data === 2) {
    console.log("Cannot Rotate Servo II, Down Limit Reached");
    down_button.innerHTML = 'Maximum Limit Reached';
    down_button.style.color = 'red';
    down_button.disabled = true;
  }
  else if(message.data === 3) {
    console.log("Cannot Rotate Servo II, Up Limit Reached");
    up_button.innerHTML = 'Maximum Limit Reached';
    up_button.style.color = 'red';
    up_button.disabled = true;
  }
});