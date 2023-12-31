# Camera Positioning System :camera:

## Overview
The goal of this project was to create a camera positioning system that was controlled by a web interface. This setup allowed a user to view live video feed while pivoting a camera to view its surroundings. ROS Noetic was the framework used to communicate between each part of the system. I developed this project with the goal of using it as a subsystem for my future robots. 
<br><br>
The purpose of this repository is to show demonstrations and provide some project details. It is not meant to be a step-by-step instructional on how to recreate the project. I plan on making that at a later time.
<br><br>

___
## Table of Contents
- [Hardware](#hardware)
- [Circuit & Setup](#circuit--setup)
- [Demonstration](#demonstration)
- [Final Thoughts](#final-thoughts)
- [Acknowledgments](#acknowledgments)
- [Resources](#resources)
- [License](./LICENSE)
<br><br>

___
## Hardware
The following material was used to complete the project:
| Item | Price | Quantity |
| ---- | ----  | ---- |
| [Arduino Uno](https://www.amazon.com/Arduino-A000066-ARDUINO-UNO-R3/dp/B008GRTSV6/ref=sr_1_3?keywords=arduino+uno&qid=1689642553&sr=8-3) | $ 29 | 1 |
| [Arduino Uno Cable](https://www.amazon.com/Arduino-Data-Sync-Cable-Microcontroller/dp/B08RCJXY1Z/ref=sr_1_1_sspa?crid=2WYUJO4I79DHZ&keywords=arduino+uno+cable&qid=1689642672&sprefix=arduino+uno+cabl%2Caps%2C135&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1) | $ 8 | 1 |
| [Promodeler Servo, DS130DLHV](https://www.promodeler.com/DS130DLHV) | $ 35 | 2 | 
| [Intel Realsense d435i](https://store.intelrealsense.com/buy-intel-realsense-depth-camera-d435i.html) | $ 334 | 1 |
| [Servo Brackets](https://www.amazon.com/gp/product/B07PQ12TXS/ref=ppx_yo_dt_b_asin_title_o06_s00?ie=UTF8&psc=1) | $ 13 | 1 |
| [Dupont Wires](https://www.amazon.com/Elegoo-EL-CP-004-Multicolored-Breadboard-arduino/dp/B01EV70C78/ref=sr_1_3?crid=2MZNUXHYSTB8N&keywords=dupont+wires&qid=1689642185&sprefix=dupont+wire%2Caps%2C277&sr=8-3) | $ 7 | 1 |
| [Capacitor Kit](https://www.amazon.com/BOJACK-Electrolytic-Capacitor-Assortment-0-1uF%EF%BC%8D1000uF/dp/B07PBQXQNQ/ref=sr_1_1_sspa?keywords=capacitor&qid=1689642214&sprefix=capactiro%2Caps%2C138&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1) | $ 17 | 1 |
| [Breadboards](https://www.amazon.com/Breadboards-Solderless-Breadboard-Distribution-Connecting/dp/B07DL13RZH/ref=sr_1_4?crid=1RXYCQJNQH6CH&keywords=breadboard&qid=1689642300&sprefix=breadbor%2Caps%2C144&sr=8-4) | $ 10 | 1 |
| [Right Angle USB-C Adapter](https://www.amazon.com/dp/B0B77CJD7T?psc=1&ref=ppx_yo2ov_dt_b_product_details) | $ 9 | 1 |
| [Vise Clamps](https://www.amazon.com/dp/B08PYFQ89M?psc=1&ref=ppx_yo2ov_dt_b_product_details) | $ 31 | 1 |
| [DC Power Supply](https://www.amazon.com/KORAD-KD3005D-Precision-Adjustable-Regulated/dp/B00FPU6G4E/ref=asc_df_B00FPU6G4E/?tag=hyprod-20&linkCode=df0&hvadid=309770211034&hvpos=&hvnetw=g&hvrand=3493489947175252538&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9028092&hvtargid=pla-535939866900&psc=1) | $85 | 1 |

*Note: The links provided are only suggestions. They are not the only options for purchasing these specific products. I do not have any affiliation with the companies selling these products. The prices shown now may not be up to date.*
<br><br>
*Note: The vise clamps were only used to temporarily mount the servos. It's not necessary for operation if the user can mount them a different way.*
<br><br>


___
## Circuit & Setup
The following images show the system's circuitry, an overall model of the client and servers, and a screenshot of the web page: 
<br><br>
![Circuit](./images/circuit.png)
<br><br>
![client_server_model](./images/overall_client_server_setup.png)
<br><br>
![webpage_screenshot](./images/webpage_screenshot.png)
<br><br>
![overall_system](./images/overall_system.jpg)
<br><br>
![webpage](./images/webpage.jpg)
<br><br>

___
## Demonstration
There are two demonstration [videos](./videos/). The system demonstration video shows what the hardware looks like during operation, and the webpage demonstration video shows the user's point of view during operation. The following are short gifs from the videos mentioned:
<p align="center">
  <img src="./gifs/webpage_pivot_left_to_right.gif" width="350" height="250"/>
  <img src="./gifs/webpage_pivot_up_to_down.gif" width="350" height="250"/>
</p>
<p align="center">
  <img src="./gifs/system_pivot_left_to_right.gif" width="300" height="250"/>
  <img src="./gifs/system_pivot_up_to_down.gif" width="300" height="250"/>
</p>
<br><br>

The following are commands used to start the program:
1. To run the ROSBridge websocket server
```bash
roslaunch rosbridge_server rosbridge_websocket.launch
```
2. To forward Arduino messages to the ROS environment:
```bash
 rosrun rosserial_python serial_node.py /dev/ttyACM0
```
3. To run the /camera/color/image_raw ROS topic:
```bash
roslaunch realsense2_camera rs_camera.launch
```
4. To run the video web server:
```bash
rosrun web_video_server web_video_server
```
<br><br>


___
## Final Thoughts
I learned so much completing this project. I learned a lot about clients and servers, HTML/CSS/JavaScript, ROS tools for web pages, and programming servo motors with Arduino. I intend on using this project in my future robotics projects. 

Please let me know if this project helped in any way! I'd really appreciate any feedback or how someone improved upon this design. I would also really appreciate credit if this project helped.  
<br><br>


___
## Acknowledgments
The credit for all of the information in this project goes to the people who made the content in the resources section below. They were all excellent resources and guides for this project. I'm very grateful and could not have done it without their help.
<br><br>


___
## Resources
- [Intel RealSense ROS Package](https://github.com/IntelRealSense/realsense-ros/tree/ros1-legacy)
- [ROS Web Video Server Tutorial](https://msadowski.github.io/ros-web-tutorial-pt3-web_video_server/)
- [ROS Web Video Server Wiki](http://wiki.ros.org/web_video_server)
- [ROS Web Video Server GitHub](https://github.com/RobotWebTools/web_video_server/tree/master)
- [Control your ROS robot from your phone!](https://www.youtube.com/watch?v=hkkG-Sgi9Sk&t=676s)
- [How to use Cameras in ROS (Sim Camera and Pi Camera)](https://www.youtube.com/watch?v=A3nw2M47K50&t=435s)
- [Web Interfaces For ROS Robots](https://www.youtube.com/playlist?list=PLK0b4e05LnzagmZCkKIQo9KKqtGo_3aKj)
- [RealSense Issue](https://github.com/IntelRealSense/realsense-ros/issues/1408)
- [RealSense Issue Solution](https://github.com/IntelRealSense/librealsense/blob/master/config/99-realsense-libusb.rules)
- [Codecademy's Full-Stack Career Path](https://www.codecademy.com/learn/paths/full-stack-engineer-career-path)
- [ROS and Arduino with ROSserial | ROS tutorial #10
](https://www.youtube.com/watch?v=WLVfZXxpHYI)
- [Circuit Camera Picture](https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F31LOj1gYv1L.jpg&tbnid=zgzUR4V3ne4D0M&vet=12ahUKEwjL1Kzi_uOAAxXPPt4AHVM0DuUQMygNegUIARDZAQ..i&imgrefurl=https%3A%2F%2Fwww.amazon.com%2FIntel-Realsense-D435-Webcam-FPS%2Fdp%2FB07BLS5477&docid=VKsRMmMy0qj1AM&w=756&h=756&q=intel%20realsense%20d435i%204k&ved=2ahUKEwjL1Kzi_uOAAxXPPt4AHVM0DuUQMygNegUIARDZAQ)
- [Circuit Servo Picture](https://www.google.com/imgres?imgurl=https%3A%2F%2Fbackyardbrains.com%2Fexperiments%2Fimg%2Fgripper8.png&tbnid=UEwolziAPu5_tM&vet=12ahUKEwjs5KCC_uOAAxUlOt4AHWKND-wQMygJegQIARBw..i&imgrefurl=https%3A%2F%2Fbackyardbrains.com%2Fexperiments%2Fgripperhand&docid=GAH-3JkChFX6iM&w=388&h=315&q=servo%20fritzing&ved=2ahUKEwjs5KCC_uOAAxUlOt4AHWKND-wQMygJegQIARBw)
- [Circuit Capacitor Picture](https://www.canstockphoto.com/capacitor-31221695.html)
- [Circuit Arduino Uno](https://www.google.com/imgres?imgurl=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F04%2F75%2F30%2F89%2F360_F_475308954_1eVgr4png76zfUX7Y3TFBjKmAq4a4VCy.jpg&tbnid=2JAw6iz9nK9ZKM&vet=12ahUKEwiGwZCr_-OAAxWKE94AHWjeDZYQMygJegUIARDGAQ..i&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Darduino%2Buno&docid=KPE9vXlCBqNrrM&w=505&h=360&q=arduino%20uno%204k&ved=2ahUKEwiGwZCr_-OAAxWKE94AHWjeDZYQMygJegUIARDGAQ)
