<?php
    // 先導入資料庫
    // require_once('conn_db.php');
    require_once('test_pgdb.php');
    $id = $_GET['id'];
    $sql = "DELETE FROM jobs WHERE id = :id";
    $result = $conn->prepare($sql);
    if($result->execute(array(":id"=>$id))){
        header("Location: ./admin.php");
    }else{
        echo "刪除失敗!" . "<br>" . $conn->error; 
    }
?>