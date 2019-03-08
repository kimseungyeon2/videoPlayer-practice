<?php
  class DAO{
    /*
      simple DAO

      query:
      create table test_image(
        id int auto_increment primary key,
        image TEXT TEXT
      );

    */
    private $db;
    function __construct(){
      try {
        $this->db = new PDO("mysql:host=localhost;port=3307;dbname=project","root","0000");
        $this->db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
        exit($e->getMessage());
      }
    }
    public function select($id){
      try {
        $sql="select * from test_image where id= :id";
        $pstmt=$this->db->prepare($sql);
        $pstmt->bindValue(":id",$id,PDO::PARAM_STR);
        $pstmt->execute();
        $result = $pstmt->fetchAll(PDO::FETCH_ASSOC);

      } catch (PDOException $e) {
        exit($e->getMessage());
      }
      return $result;
    }

    public function Insert($img){
      try {
        $sql = "insert into test_image(image) values(:img)";
        $pstmt=$this->db->prepare($sql);
        $pstmt->bindValue(":img",$img,PDO::PARAM_STR);
        $pstmt->execute();
      } catch (PDOException $e) {
        exit($e->getMessage());
      }
      return "success";
    }
  }

 ?>
