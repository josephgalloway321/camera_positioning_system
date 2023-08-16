let video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({video: true})
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch (function (error) {
      console.log("Something went wrong!");
    })
}
else {
  console.log("getUserMedia not supported!");
}




const constraints = {
    'video': true,
    'audio': true
}
navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        console.log('Got MediaStream:', stream);
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });
