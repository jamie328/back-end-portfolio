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
        <div class="btn_area">
            <div>
                <a href="admin.php"><input class='btn_admin' type="button" value="職缺管理"/></a>
            </div>
            <div class="remove_due">
                <input class='btn_due_date' type="button" value="只顯示未過期職缺"/>
            </div>
            <div class="sort_by_update">
                <input class='btn_update_date' type="button" value="以更新日期排序(新到舊)"/>
            </div>
            <div class="sort_by_due_date">
                <input class='btn_sort_by_due_date' type="button" value="以職缺到期日排序(新到舊)"/>
            </div>
        </div>
        <div class="jobs">
            <?php 
                // require_once('conn_db.php');
                require_once('test_pgdb.php');
                // $sql = "SELECT * FROM jobs ORDER BY create_at DESC";
                $sql = "SELECT * FROM jobs ORDER BY create_at DESC";
                $result = $conn->query($sql);
                if($result->rowCount()>0){
                    while($row = $result->fetchObject()){
                        echo "<div class='job'>";
                            echo "<div class='job__title'>" . "職稱：" . $row->title . "</div>";
                            echo "<div class='job__descri'>" . "工作內容：" . $row->descri . "</div>";
                            echo "<div class='job__salary'>" . "薪水範圍：" . $row->salary . "</div>";
                            echo "<div class='job__link'>" . "<a href='" . $row->link . "'target=_blank
                            >更多資訊</a></div>";
                            echo "<div class='job__due_date' data-due_date=" . $row->due_date 
                            . ">職缺到期日:" . $row->due_date . "</div>";
                            echo "<div class='job__update_date' data-update_date=" . $row->update_date 
                            . ">更新於: " . $row->update_date  . "</div>";
                        echo "</div>";
                    }
                }
            ?>
        </div>
    </div>
    <script type="text/javascript" src="./all.js"></script>
</body>
</html>