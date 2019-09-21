## Django 網站部署(Blog & To-do-app)
---
### (A)程式學習到的事情：
* (1) 學習使用 Django MTV 框架概念
    * M (Models) 如何使用 ORM 概念不直接接觸資料庫，達到 Creat, Read, Update, Delete 功能
    * T (Templates) 學會使用簡易的 HTML & CSS 概念，並套用 Bootstrap 呈現前端頁面
    * V (Views) 瞭解如何利用視圖作為 Models 與 Templates 溝通的橋樑 
* (2) 資料庫串連與後臺應用
  * 熟悉 SQLite 與 MySQL 在 Django 框架操作，上傳 heroku 後則改用 PostgreSQL 
* (3) 版本控制與 Heroku 部署
  * 練習專案開發時，版本控制與部署網站細節
* (4) 功能頁面 To-do-app MTV串聯
  * 將想法中應呈現給使用者操作的頁面運用 MTV 系統去串連，更熟悉 Django 概念 

### (B)程式描述：
藉由創建一個網站部落格與 To-do-app 應用開發，去考驗自己是否能使用 Django 框架從無到有完成一個簡易的前後端串連。

[Jamie 的自學程式小部落格](https://jamie-web-heroku.herokuapp.com/index/)

[Python Django MTV 簡單實現網站](https://www.youtube.com/watch?v=CHYvN2Z_kn4)

[用 Django 寫網站 (MVC & MTV)概念簡介](https://reurl.cc/gvWk7b)

[Django 實作 To-Do-item 套用 Bootstrap 並上傳 Heroku](https://reurl.cc/rlgdxk)


<img src="https://i.imgur.com/RWxAT44.png" alt="網站首頁" title="width=400" width="500" />
<br/><br/>
<img src="https://i.imgur.com/FVfx6Ri.png" alt="To-do-app" title="width=400" width="500" />


解題想法與概念：
1. Django 文檔與其他教材學習 MTV 概念
2. 瞭解有哪些頁面需要呈現給使用者
3. 在 models.py 定義好 Class 類別要有哪些資訊
4. 建立自己 MTV 習慣的操作順序
    * (1) 中央 urls.py 確認有無對應到地方 urls.py
    * (2) 地方 urls.py 要有哪些頁面給使用者瀏覽
    * (3) 到 views.py 要 input 哪些變數，要跟 models.py 要什麼資訊 ，對應到哪個 templates 頁面，要決定好
    * (4) Templates 要載入 base.html 要細心操作
    * (5) 要作 python manage.py runserver 要想想有沒有動到 models.py ，有動到要作 makemigrations & migrate
5. 學習如何上傳 heroku 進行網站部署與 Git 版本控制