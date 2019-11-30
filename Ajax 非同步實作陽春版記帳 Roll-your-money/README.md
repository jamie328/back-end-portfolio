## Ajax 非同步實作記帳App Roll-your-money
  <br/>
[記帳App連結](https://nodejs-jamie.herokuapp.com/roll-money)<br/>[Portfolio_Code頁面](https://huangjamison.github.io/Portfolio_Code/)
---
### (A)程式學習到的事情：
* (1) 理解 Ajax 與 非同步意義
  * 非同步是可以透過瀏覽器提供的API，不換頁與Server作溝通，透過 Javascript (Ajax) 來傳送資料，就可以解決表單的換頁問題。
  * 非同步優先順序劣於同步，非同步在 EventLoop 內優先順序是劣於同步的，等到同步事件處理完再去 Callback queue 把非同步事件移到 Call Stack 內處理。
* (2) 利用 node.js 去串連前後端
  * 前端 JS 處理使用者需求，將資料整理後，輸出給後端
  * 後端與資料庫作溝通，依據前端需求提取資料，輸出給前端
  * 實作 Read , Create , Delete ，更了解該如何用 JS 串連前後端的技巧


### (B)程式描述：
記帳 App 可以去真實反映使用者今天花費是否超標，讓使用者一步一步往自己存款目標邁進。

[Ajax 記帳 App 實作心得記錄](https://reurl.cc/31meOR)


<img src="./roll-money.png" alt="roll-your-money" width="500" height="300" />
<br/><br/>


解題想法與概念：
1. 理解自己想要作的內容與頁面呈現元素
2. 利用前端 inmoney.js 去接收使用者 input 值
3. 再應用 XMLHttpRequest () 依據 GET/POST 去向後端要資料
4. 後端依據 GET / POST 與 Firebase 資料庫作溝通，拿到資料回傳前端
5. 前端再把資料整理後顯示於頁面上