<?php
    // 1. 引入資料庫
    // require_once('conn_db.php');
    require_once('test_pgdb.php');
    //把post參數拿到
    $id = $_POST['id'];
    $title = $_POST['title'];
    $descri = $_POST['descri'];
    $salary = $_POST['salary'];
    $link = $_POST['link'];
    $update_date = date("Y-m-d");
    $due_date = $_POST['due_date'];
    if (empty($title) || empty($descri) || empty($salary) || empty($link) || empty($due_date) ){
        echo "<a href='admin.php'><input type='button' value='回到職缺管理頁面'></a>";
        die("請重新檢查資料後送出"); //後面皆不會執行
    }
    // 2. 定義 sql 函數
    // $sql = "UPDATE jobs SET title='$title',descri='$descri',salary='$salary',link='$link',update_date='$update_date',due_date='$due_date' WHERE id='$id'";
    $sql = "UPDATE jobs SET title=?,descri=?,salary=?,link=?,update_date=?,due_date=? WHERE id=?";
    $result = $conn->prepare($sql); // 放入但沒放入參數
    // 3. 把sql傳入query
    if($result->execute(array($title,$descri,$salary,$link,$update_date,$due_date,$id))){
        //4. 看是否有傳回值=>有(true)
        header("Location: ./admin.php");
    }else{
        // 5. 失敗印出原因
        echo "更新失敗，原因為:" . $conn->error;
    }
?>