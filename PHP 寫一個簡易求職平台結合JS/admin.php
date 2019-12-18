<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>新鮮人求職平台</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <div class="container">
        <div class="title">
            Winter is coming ! We hope we can get more work opporunities !! 
            Give me a chance !
        </div>
        
        <div class="jobs">
            <div class="btn_area">
                <div class="job_add">
                    <a href="jobs_add.php" target="_blank"><input type="button" value="新增職缺"/></a>
                </div>
                <div>
                    <a href="index.php"><input type="button" value="返回前端頁面"/></a>
                </div>
            </div>
            <?php 
                // require_once('conn_db.php');
                require_once('test_pgdb.php');
                $sql = "SELECT * FROM jobs ORDER BY create_at DESC";
                $result = $conn->query($sql);
                if($result->rowCount() > 0){
                    while($row = $result->fetchObject()){
                        echo "<div class='job'>";
                            echo "<div class='job__title'>" . "職稱：" . $row->title . "</div>";
                            echo "<div class='job__descri'>" . "工作內容：" . $row->descri . "</div>";
                            echo "<div class='job__salary'>" . "薪水範圍：" . $row->salary . "</div>";
                            echo "<div class='job__due_date'>" . "職缺到期日:" . $row->due_date . "</div>";
                            echo "<div class='job__link'>" . 
                                "<a href='" . $row->link . "'target=_blank>更多資訊</a>"
                                . " <a href='jobs_edit.php?id=" . $row->id . "'>編輯職缺</a>"
                                . " <a href='jobs_delete.php?id=" .$row->id . "'>刪除職缺</a>" . "</div>";
                        echo "</div>";
                    }
                }
            ?>
        </div>
    </div>
</body>
</html>