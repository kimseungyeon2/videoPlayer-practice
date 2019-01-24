<?php
  /*
    srt file parser basic
  */
  namespace Google\Cloud\Samples\Language;
  require '../api/vendor/autoload.php';
  use Google\Cloud\Language\LanguageClient;

  require_once("../api/test3.php");

  $arr = file('../video/word.srt');

  $arr_total = array();
  $num = 0;
  $check = 2;
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
  // $language_api = new text_analysis($text);
  $arr_total_json = array();
  for ($i=0; $i <count($arr_total); $i++) {
    $arr_total[$i] = substr($arr_total[$i],1);
    $arr_total_create[$i] = explode("#",$arr_total[$i]);
    // for ($s=2; $s <count($arr_total_create[$i]); $s++) {
    //   $text = $arr_total_create[$i][$s];
    //   $tokens = $language_api->analyze_syntax($text);
    // }
  }

  echo json_encode($arr_total_create);

?>
