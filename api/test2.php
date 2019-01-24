<?php
  namespace Google\Cloud\Samples\Language;
  require 'vendor/autoload.php';
  use Google\Cloud\Language\LanguageClient;

  function analyze_syntax($text, $projectId = null)
  {
    $language = new LanguageClient([
        'projectId' => $projectId,
        'keyFilePath' => 'MyProject-test.json'
    ]);

    $annotation = $language->analyzeSyntax($text);
    return $tokens = $annotation->tokens();

  }

  $text = isset($_REQUEST["data"])?$_REQUEST["data"]:"";
  $projectId = 'my-project-test-229113';
  $tokens = analyze_syntax($text, $projectId);
  echo json_encode($tokens);
 ?>
