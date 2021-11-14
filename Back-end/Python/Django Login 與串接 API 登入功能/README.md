## Django Login 與串接 API 登入功能  <br/>
---
### (A)程式學習到的事情：
* (1) 瞭解登入頁面應有內容
  * Login ,Logout , Login 成功的 Dashboard 意義與設定細節 
* (2) 如何使用 Django Views 函式與作出 Registration 表單
  * 利用 Django UserCreationForm 設計使用者填寫資料網頁 
* (3) 串接第三方 Social-auth API 
  * 設定細節與實際操作   

### (B)程式描述：
在寫網站開發過程，觀察各網站要使用特殊功能都會有會員認證，該如何寫出一個會員認證功能
，並實際操作與開發，是這次想學習的重點

[Jamie 的自學程式小部落格](https://jamie-web-heroku.herokuapp.com/index/)

[Django Login 與 第三方登入 API 串接觀念介紹說明影片](https://www.youtube.com/watch?v=wDQmJvlgXKY)

[Django Login 與串接 API 登入功能的開發與知識紀錄](https://reurl.cc/RdjGox)


<img src="https://i.imgur.com/SEb543F.png" alt="網站登入功能" title="width=400" width="500" />
<br/><br/>


解題想法與概念：
1. 瞭解網站登入應有頁面
2. 利用官方文檔與教學影片進階瞭解重定向與設定細節
3. 繼承官方定義表單，作表單內容的調整
4. 學習利用造好的輪子，並且練習擺放在適合的位置發揮效能
5. 設定會員可使用的功能介面