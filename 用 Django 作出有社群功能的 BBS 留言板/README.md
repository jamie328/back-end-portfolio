## 用 Django 作出有社群功能的 BBS 留言板  <br/>[Portfolio_Code頁面](https://huangjamison.github.io/Portfolio_Code/)
---
### (A)程式學習到的事情：
* (1) 練習開發社群互動的功能
  * 思考一個 BBS 社群頁面上哪些資訊要顯示於頁面
* (2) 熟習操作 ORM 與資料庫觀念
  * 文章下面評論使用 ForeignKey 概念 (一篇文章多個評論)
* (3) 設計表單顯示新建文章與評論資訊
  * 思考哪些資訊要在模板中予以使用者填寫，哪些於 Views 定義
* (4) MTV 連貫性操作與邏輯思考
  * 哪些參數要利用 urls 傳回，有利於自己於 Views 得到想要的資料 <br/>
    例如： post.id (要修改的文章id) comment.id (要修改的評論內容)
  * 思考 Views 要如何與資料庫交互，要哪些內容，以及要傳哪些資訊到模板顯示給使用者
  * 用 MTV 達到 文章以及留言的 CRUD
* (5) Views 與 Templates 細節 
  * 重定向使用與表單使用
  * Forms 與 POST 搭配使用
  * form.save(commit=False) 於 Views 中應用


### (B)程式描述：
一直都想作有社群開發的功能，在學習程式一小段時間後，累積 Django 知識後，想作出有
文章、讚、噓、留言功能的 BBS，並熟悉 MTV 與 ORM 操作

[Jamie 的自學程式小部落格](https://jamie-web-heroku.herokuapp.com/index/)

[如何用 Django 打造出有社群互動的 BBS 留言版說明影片](https://www.youtube.com/watch?v=7dbbhSYy2Ag)

[用 Django 作出有社群功能的 BBS 留言板的開發與知識紀錄](https://reurl.cc/9zOMoj)


<img src="https://i.imgur.com/SEb543F.png" alt="網站登入功能" title="width=400" width="500" />
<br/><br/>


解題想法與概念：
1. 先想好 BBS 整體要有哪些功能 (讚、噓、文章、留言、修改、刪除)
2. 在 Models 定義好要的內容與設定，留言是多對一，使用 ForeignKey
3. 設計新建文章與留言的表單，並於 Templates Display
4. 用 MTV 設計 CRUD 並在 Views 開發時瞭解哪些參數需要藉由 url 傳入與重定向使用時機
5. 在使用 Django 設計過程中瞭解自己對於 HTML 與 CSS 知識缺乏，未來會補強這方面的知識