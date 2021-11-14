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
        <div class="form_container">
            <div class="title">
            新增職缺內容
            </div>
            <div class="btn_area">
                <a href="admin.php"><input type="button" value="回到管理頁面"/></a>
            </div>
            <form class="add_job_form" action="handle_add.php" method="POST">
                <div class="form__title">
                    <label for="title">職缺: </label><input type="text" name="title" id="title"/>
                </div>
                <div class="form__descri">
                    <label for="descri">職缺內容: </label><textarea rows="10" name="descri" id="descri"></textarea>
                </div>
                <div class="form__salary">
                    <label for="salary">薪水範圍: </label><input type="text" name="salary" id="salary"/>
                </div>
                <div class="form__link">
                    <label for="link">職缺連結: </label><input type="text" name="link" id="link"/>
                </div>
                <div class="form__due_date">
                    <label for="due_date">職缺到期時間: </label><input type="date" name="due_date" id="due_date"/>
                </div>
                <div class="form__submit">
                    <input type="submit" value="送出"/>
                </div>
            </form>
        </div>
    </div>
</body>
</html>