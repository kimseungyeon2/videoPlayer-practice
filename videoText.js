window.onload = function(){
  let video = document.getElementById("video");
  let videoText = document.getElementById("videoText");
  let textCheck = document.getElementById("textCheck");
  let textCheck2 = document.getElementById("textCheck2");

  let srt_data = "";
  let video_hidden_check = true;
  //
  $.ajax({
    url: './videoBack/videoText_parser.php', //save
    type: 'POST',
    anync:false,
    success: function(data) {
      srt_data = eval(data);
      alert("자막다운OK"); //자막 다운 다받고 이벤트 되도록 처리
    },
    error: function(error) {
      alert("자막 에러");
    }
  });

  function text_ajax(){
    $.ajax({
      url:'./api/test2.php',
      type:'POST',
      anync:true,
      data:{
        data: textCheck2.innerHTML
      },
      success:function(datas){
        let data_s = eval(datas);
        for (let i = 0; i < data_s.length; i++) {
          let text_button = document.createElement("button");
          let text_small = document.createTextNode(data_s[i]['text']['content']);
          text_button.appendChild(text_small);
          document.getElementById("text_box").appendChild(text_button);
        }
        let text_br = document.createElement("hr");
        document.getElementById("text_box").appendChild(text_br);
      },
      error:function(error){
        alert("parser error");
      }
    });
  }

  function text(){
    if(video.paused){

    }else{
      //
      console.log("돌기");
      for (let i = 0; i < srt_data.length; i++) {
        if(video.currentTime.toFixed(1) === srt_data[i][1][0].toFixed(1)){
          for (let s = 2; s < srt_data[i].length; s++) {
            videoText.innerHTML = videoText.innerHTML +"\n"+ srt_data[i][s];
            textCheck2.innerHTML = videoText.innerHTML +"\n"+ srt_data[i][s];
            checkText = textCheck2.innerHTML;
          }
          textCheck2.removeEventListener("click",text_ajax);
          textCheck2.addEventListener("click",text_ajax);
        }
        if(video.currentTime.toFixed(1) === srt_data[i][1][1].toFixed(1)){
          videoText.innerHTML = "";
        }
      }
    }
  }//f-text-end

  let video_text_visible = setInterval(text, 100);
  document.getElementById("video_play").click = video_text_visible;

  textCheck.addEventListener("click", function(event) {
    if (video_hidden_check === true) {
      videoText.style.visibility = "hidden";
      video_hidden_check = false;
      document.getElementById("textCheck").innerHTML = "off";
      clearInterval(video_text_visible);
    } else if (video_hidden_check === false) {
      videoText.style.visibility = "visible";
      video_hidden_check = true;
      document.getElementById("textCheck").innerHTML = "on";
      video_text_visible = setInterval(text, 100);
    }
  });
}//end
