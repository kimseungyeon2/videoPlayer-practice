<?php
require_once('DAO.php');
$dao = new DAO();
$data = $_REQUEST['data'];

$data = explode(",",$data);
$data = str_replace( 'data : image / png; base64,', '', $data[1]);
$data = str_replace ( '', '+', $data);
$data = base64_decode($data);

$im = imagecreatefromstring($data);
if ($im !== false) {
  $filename = date("Y-m-d-H_m_s")."image.png";
  $path = "../image/".$filename."";
  $data = imagepng($im,$path);
  imagedestroy($im);

  $dao->insert($filename);
  echo "success";
}
else {
  echo 'An error occurred.';
}

?>
