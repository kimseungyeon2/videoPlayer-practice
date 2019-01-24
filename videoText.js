window.onload = function() {
  //html elements
  let videoText = document.getElementById("videoText");
  let textCheck = document.getElementById("textCheck");
  let textLoop = document.getElementById("textLoop");
  //value
  let srt_data = "";
  let check_num = 0;
  let video_hidden_check = true;
  //
  let data_s = "data";
  let loop_check = true;
  $.ajax({
    url: './videoBack/videoText_parser.php', //save
    type: 'POST',
    data: {
      data: data_s
    },
    success: function(data) {
      srt_data = eval(data);
    },
    error: function(error) {
      alert("자막 에러");
    }
  });
  //video_text send
  function video_text_visible_loop() {
    if (video.paused) {} else {
      let total_time_1 = 0;
      let total_time_2 = 0;
      for (let i = 0; i < srt_data.length; i++) {
        let textTime = srt_data[i][1].split("-->");

        for (let s = 0; s < textTime.length; s++) {
          let textTime_m = textTime[s].split(":");
          let hour = textTime_m[0];
          let minute = textTime_m[1];
          // second s, m
          let second_off = textTime_m[2].split(",");
          let second = second_off[0];
          let m_second = second_off[1];
          //total time
          if (s == 0) {
            total_time_1 = hour * 60 * 60 + minute * 60 + parseInt(second) + (m_second / 1000);
          } else {
            total_time_2 = hour * 60 * 60 + minute * 60 + parseInt(second) + (m_second / 1000);
          }
        }
        if (video.currentTime.toFixed(1) === total_time_1.toFixed(1)) {
          videoText.innerHTML = "";
          for (let r = 2; r < srt_data[i].length; r++) {
            let text = srt_data[i][r];
            console.log("for" + i);
            $.ajax({
              url: './api/test2.php', //save
              type: 'POST',
              data: {
                data: text
              },
              success: function(datas) {
                let data_s = eval(datas);
                for (let i = 0; i < data_s.length; i++) {
                  let text_button = document.createElement("button");
                  let text_small = document.createTextNode(data_s[i]['text']['content']);
                  text_button.appendChild(text_small);
                  document.getElementById("text_box").appendChild(text_button);
                  videoText.innerHTML = videoText.innerHTML + data_s[i]['text']['content'] + "|";
                }
                videoText.innerHTML = videoText.innerHTML + "\n";
                let text_br = document.createElement("hr");
                document.getElementById("text_box").appendChild(text_br);
              },
              error: function(error) {
                alert("parser error");
              }
            });
          }
          check_num = srt_data[i][0];
          console.log(check_num);
        } else if (video.currentTime.toFixed(1) === total_time_2.toFixed(1)) {
          videoText.innerHTML = "";
          check_num++;
        }
      }
    }
  }

  //video_text
  let video_text_visible = setInterval(video_text_visible_loop, 90);
  document.getElementById("video_play").click = video_text_visible;
  // video text on / off
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
      video_text_visible = setInterval(video_text_visible_loop, 90);
    }
  });

} //end
