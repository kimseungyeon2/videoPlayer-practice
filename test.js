if (video.paused) {

}
else{
  //
  for(let i = 0; i < srt_data.length; i++){
    if(video.currentTime.toFixed(1) === srt_data[i][1][0].toFixed(1)){
      for (let s = 2; s < srt_data[i].length; s++) {
        videoText.innerHTML = videoText.innerHTML +"\n"+ srt_data[i][s];
      }
      setTimeout(function(){

      },srt_data[i][1][0].toFixed(1)-srt_data[i][1][1].toFixed(2))
    }
  }
  //
}

console.log("for문 출입")
console.log("for문 나감")

for (let i = 0; i < srt_data.length; i++) {
  if(video.currentTime.toFixed(1) === srt_data[i][1][0].toFixed(1)){
    for (let s = 2; s < srt_data[i].length; s++) {
      console.log(i+"start");
      //여기에
      videoText.innerHTML = videoText.innerHTML +"\n"+ srt_data[i][s];
    }
  }
  if(video.currentTime.toFixed(1) === srt_data[i][1][1].toFixed(1)){
    console.log(i+"end");
    videoText.innerHTML = "";
  }
}
