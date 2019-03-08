<?php
  /*
    srt file parser basic
  */
  // namespace Google\Cloud\Samples\Language;
  // require '../api/vendor/autoload.php';
  // use Google\Cloud\Language\LanguageClient;
  //
  // function analyze_syntax($text, $projectId = null)
  // {
  //   $language = new LanguageClient([
  //       'projectId' => $projectId,
  //       'keyFilePath' => '../api/MyProject-test.json'
  //   ]);
  //
  //   $annotation = $language->analyzeSyntax($text);
  //   return $tokens = $annotation->tokens();
  //
  // }

  $arr = file('../video/word.srt');

  $arr_total = array();
  $num = 0;
  $check = (int)$arr[0]+1;
  $arr_total[$num] = "";

  for ($i=0; $i <count($arr) ; $i++) {
    $arr[$i] = trim($arr[$i]);
    if($arr[$i] == $check){
      $num++;
      $arr_total[$num] = "";
      $check++;
    }
    if($arr[$i] == ""){
    }
    else{
      $arr_total[$num] = $arr_total[$num]."#".$arr[$i];
    }
  }

  $arr_total_json = array();
  for ($i=0; $i <count($arr_total); $i++) {
    $arr_total[$i] = substr($arr_total[$i],1);
    $arr_total_create[$i] = explode("#",$arr_total[$i]);
  }

  for ($i=0; $i <count($arr_total_create); $i++) {
    $arr_total_create[$i][1] = explode("--> ",$arr_total_create[$i][1]);
    for ($s=0; $s <2; $s++) {
      $time = explode(":",$arr_total_create[$i][1][$s]);
      $time[0] = (int)$time[0]*60*60;
      $time[1] = (int)$time[1]*60;
      $time[2] = explode(",",$time[2]);
      $time[2][0] = (int)$time[2][0];
      $arr_total_create[$i][1][$s] = $time[0] + $time[1] + $time[2][0] + (int)$time[2][1]/1000;
    }
  }

  // $projectId = 'my-project-test-229113';
  // for ($i=0; $i <count($arr_total_create); $i++) {
  //   for ($s=2; $s <count($arr_total_create[$i]); $s++) {
  //     $text = $arr_total_create[$i][$s];
  //     $tokens = analyze_syntax($text, $projectId);
  //     $arr_total_create[$i][$s] = $tokens;
  //   }
  // }
  // echo json_encode($tokens[0]);

  echo json_encode($arr_total_create);

?>
