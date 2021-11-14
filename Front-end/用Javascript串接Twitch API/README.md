## 用Javascript 串接 Twitch API  <br/>
[串接Twitch連結](https://huangjamison.github.io/front-end-portfolio/popular_twitch/twitch.html)<br/>
---
### (A)程式學習到的事情：
* (1) 了解 API 意義與 API文件閱讀
  * API (應用程式介面)，又名「接口」，分為「提供 API」 與「使用API」，我們把 API 解釋成「功能」，或許又更容易理解一些，因此我這一次要使用 Twitch 提供的 API ，去串接 Twitch API 英雄聯盟與爐石戰記熱門實況的 API功能
  * 在API文件內尋找自己想要的功能並試著去要資料
* (2) 熟悉使用 XMLHttpRequest
  * 理解 open (方法, url, true(同步) )
  * setRequestHeader 設定傳送格式，而官方文件有寫到要傳額外資訊，其中包含 json 以及 Token 才能有權限獲取資料。
  * send() 因為是get 所以不用傳資料
  * req.onload(callback) 代表拿到資訊後處理
    先將傳來檔案轉成json

### (B)程式描述：
一直都想串接遊戲實況，這次實作更了解到 API 以及 如何向提供 API 的平台要資料。

[JS串接 Twitch 心得記錄](https://reurl.cc/0znXox)


<img src="./twitch.png" alt="計算機" title="width=400" width="500" />
<br/><br/>


解題想法與概念：
1. 理解官方 API 文件與自己想要哪些資料
2. 利用 XMLHttpRequest 實作向Twitch 要資料