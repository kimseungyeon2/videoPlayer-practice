//html elements
let video = document.getElementById("video");
let play = document.getElementById("video_play");
let seekBar = document.getElementById("seekBar");
let loop = document.getElementById("video_loop");
let audioBar = document.getElementById("audioBar");
let audio = document.getElementById("video_audio");
let speedBar = document.getElementById("speedBar");
//value
let start = 0; //loop start time
let end = 0; //loop end time
let check = true; //loop play/stop
/*
  video size
*/
//Big
document.getElementById("videoBig").addEventListener("click",function(){
  video.width = 1000;
});
//Small
document.getElementById("videoSmall").addEventListener("click",function(){
  video.width = 300;
});
//Normal
document.getElementById("videoNormal").addEventListener("click",function(){
  video.width = 450;
});
/*
  video play and stop method
*/
function playPause() {
  if (video.paused) {
    video.play();
    play.innerHTML = "Play";
  } else {
    video.pause();
    play.innerHTML = "Stop";
  }
}
//evnet
play.addEventListener("click", playPause);

/*
  videoSpeed method
*/
function videoSpeed() {
  if (video.paused) {} else {
    video.pause();
  }
  let speed = speedBar.value;
  alert(speed / 10);
  video.playbackRate = parseInt(speed / 10);
  video.play();
}
//event change
speedBar.addEventListener("change", videoSpeed);
/*
  seekBar and Loop method
*/
//seekBar event
//videoEvent videoLocation_now event
video.addEventListener("timeupdate", function() {
  // duration = Now video length
  // currentTime = Now video location
  let value = (100 / video.duration) * video.currentTime;
  seekBar.value = value;
});
//seekbar change
seekBar.addEventListener("change", function() {
  let time = video.duration * (seekBar.value / 100);
  video.currentTime = time;
});
//seekBar down pause
//-> seekBar mousedown case2: video.pause();
//up play
seekBar.addEventListener("mouseup", function() {
  video.play();
});
//Loop event
//loop start event
seekBar.addEventListener("dblclick", function(evt) {
  console.log("1");
  if (video.paused) {

  } else {
    video.pause();
  }
  start = seekBar.value;
});
//loop end event
seekBar.addEventListener("mousedown", function(evt) {
  switch (evt.which) {
    case 2:
      video.pause();
    case 3:
      console.log("2");
      end = seekBar.value;
      video.play();
      alert("반복시간(" + start + "~" + end + ")" + "play버튼을 누르면 실행됩니다.");
      break;
  }
});
//loop event play
loop.addEventListener("click", function(evt) {
  if (check) {
    video.addEventListener("timeupdate", f = function() {
      console.log("4");
      if (video.currentTime > end) {
        video.currentTime = start;
      }
    });
    check = false;
    loop.innerHTML = "Stop";
  } else {
    video.removeEventListener('timeupdate', f);
    check = true;
    loop.innerHTML = "Play";
  }
  console.log("3");
});
/*
  audio and audioBar
*/
//audio event
audio.addEventListener("click", function() {
  if (video.muted == false) {
    // video audieo on
    video.muted = true;
    // btn text update
    audio.innerHTML = "on";
  } else {
    // video audieo off
    video.muted = false;
    // audieo off
    audio.innerHTML = "off";
  }
});
//audioBar event
audioBar.addEventListener("change", function() {
  video.volume = audioBar.value / 100;
});
