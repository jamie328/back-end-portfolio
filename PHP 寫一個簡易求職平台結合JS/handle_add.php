<?php
    // require_once('conn_db.php');
    require_once('test_pgdb.php');
    require_once('test_config.php');
    $title = $_POST['title'];
    $descri = $_POST['descri'];
    $salary = $_POST['salary'];
    $link = $_POST['link'];
    $due_date = $_POST['due_date'];
    $update_date = date("Y-m-d");
    $create_at = date("Y-m-d");
    if (empty($title) || empty($descri) || empty($salary) || empty($link) || empty($due_date) ){
?>
    <a href="jobs_add.php"><input type="button" value="回上一頁"></a>
<?php
        die("請重新檢查資料後送出"); //後面皆不會執行
    }
    $sql = "INSERT INTO jobs (title,descri,salary,link,due_date,create_at,update_date) VALUES (?,?,?,?,?,?,?)";
    $sql = $conn->prepare($sql);
    if($sql->execute(array($title,$descri,$salary,$link,$due_date,$create_at,$update_date))){
        header("Location: ./admin.php");
    }else{
        echo "新增失敗" . "原因為:" . $conn->error;
    }
?>