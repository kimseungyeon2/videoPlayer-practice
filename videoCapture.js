let capture_btn = $("#capture");
let save_btn = $("#save");
let canvas = $("#canvas");
let image = $("#image");
/*
  snapshot function
*/
function capture_draw(){
  let ctx = canvas[0].getContext("2d");
  let img = $("#video");
  ctx.drawImage(img[0], 10, 10);
  image[0].src = canvas[0].toDataURL("image/png");
}
function save(){
  let data = canvas[0].toDataURL("image/png");
  $.ajax({
      url:'../project_videoPlayer/videoBack/Save.php',//save
      type:'POST',
      data:{
        data: data
      },
      success:function(data){
          alert(data);
      }
  })
}
capture_btn.click(function(){
  capture_draw();
});
save_btn.click(function(){
  save();
});
