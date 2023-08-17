/*************************************************** 
Author: Joseph D. Galloway II

This is a program that subscribes to commands given 
by messages published on servo1 and servo2 topics. The
messages received are in the form of rotating the
desired servo a certain amount each time it's
requested to do so. 
 ****************************************************/

#include <Servo.h> 
#include <ros.h>
#include <std_msgs/UInt16.h>

ros::NodeHandle  nh;

std_msgs::UInt16 msg;
ros::Publisher pub1("rotation_limit_reached", &msg);

Servo servo1;
Servo servo2;

// Set the minimum and maximum angle limits for each servo (deg)
const int16_t servo1_min_limit = 25;
const int16_t servo1_max_limit = 170;
const int16_t servo2_min_limit = 75;
const int16_t servo2_max_limit = 170;

// Set how much each servo will rotate when commanded to do so (deg)
const int16_t rotate = 20;

// Set the initial angle for each servo
// Use these variables to keep track of each servo angles
int16_t home_angle = 90;
int16_t servo1_angle = home_angle;
int16_t servo2_angle = home_angle;

// Set a placeholder variable to calculate current angle plus requested rotation
// then use the variable to determine if the final angle will stay within angle limits
int16_t requested_angle = 0;

// Callback functions for each servo
// Expecting numbers 0 through 1, inclusive, to
// determine the direction of motion 
// 0 for rotate right, 1 for rotate left
void servo_cb1( const std_msgs::UInt16& cmd_msg) {
  // Command servo 1 to rotate right
  if (cmd_msg.data == 0) {
    // Check if servo 1 angle within limits after rotation
    requested_angle = servo1_angle - rotate;
    if (requested_angle >= servo1_min_limit) {
      nh.loginfo("Rotate Servo I Right");
      servo1.write(requested_angle);
      servo1_angle = requested_angle;
    }
    else {
      nh.loginfo("Cannot Rotate Servo I, Right Limit Reached");
      msg.data = 0;
      pub1.publish(&msg);
    }
  }

  // Command servo 1 to rotate left
  else if (cmd_msg.data == 1){
    // Check if servo 1 angle within limits after rotation
    requested_angle = servo1_angle + rotate;
    if (requested_angle <= servo1_max_limit) {
      nh.loginfo("Rotate Servo I Left");
      servo1.write(requested_angle);
      servo1_angle = requested_angle;
    }
    else {
      nh.loginfo("Cannot Rotate Servo I, Left Limit Reached");
      msg.data = 1;
      pub1.publish(&msg);
    }
  }

  // Command servo 1 to rotate to home angle
  else if (cmd_msg.data == 2){
    nh.loginfo("Rotate Servo I to Home Angle");
    servo1.write(home_angle);
    servo1_angle = home_angle;
  }

  else {
    nh.loginfo("Command for Servo I Unknown, please choose 0 or 1");
  }
}

void servo_cb2( const std_msgs::UInt16& cmd_msg){
  // Command servo 2 to rotate down
  if (cmd_msg.data == 0) {
    // Check if servo 2 angle within limits after rotation
    requested_angle = servo2_angle - rotate;
    if (requested_angle >= servo2_min_limit) {
      nh.loginfo("Rotate Servo II Down");
      servo2.write(requested_angle);
      servo2_angle = requested_angle;
    }
    else {
      nh.loginfo("Cannot Rotate Servo II, Down Limit Reached");
      msg.data = 2;
      pub1.publish(&msg);
    }
  }

  // Command servo 2 to rotate up
  else if (cmd_msg.data == 1){
    // Check if servo 2 angle within limits after rotation
    requested_angle = servo2_angle + rotate;
    if (requested_angle <= servo2_max_limit) {
      nh.loginfo("Rotate Servo II Up");
      servo2.write(requested_angle);
      servo2_angle = requested_angle;
    }
    else {
      nh.loginfo("Cannot Rotate Servo II, Up Limit Reached");
      msg.data = 3;
      pub1.publish(&msg);
    }
  }

  // Command servo 2 to rotate to home angle
  else if (cmd_msg.data == 2){
    nh.loginfo("Rotate Servo II to Home Angle");
    servo2.write(home_angle);
    servo2_angle = home_angle;
  }

  else {
    nh.loginfo("Command for Servo II Unknown, please choose 0 or 1");
  }
}


ros::Subscriber<std_msgs::UInt16> sub1("servo1", servo_cb1);
ros::Subscriber<std_msgs::UInt16> sub2("servo2", servo_cb2);

void setup(){

  nh.initNode();
  nh.subscribe(sub1);
  nh.subscribe(sub2);
  nh.advertise(pub1);
  
  servo1.attach(6);
  servo2.attach(9);

  // Set the starting angle for both servos
  servo1.write(servo1_angle);
  servo2.write(servo2_angle);
}

void loop(){
  nh.spinOnce();
  delay(1);
}



// Debugging
/*
// Print Servo Angle Before Action
char before[40];
sprintf(before, "Before Servo I Angle = %d", servo1_angle);
nh.loginfo(before);

// Print Servo Angle Before Action
char after[40];
sprintf(after, "After Servo I Angle = %d\n", servo1_angle);
nh.loginfo(after);
*/
