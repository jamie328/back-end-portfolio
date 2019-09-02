## 利用 Selenium 進行網路爬蟲篩選股票標的物
---
### (A)程式學習到的事情：
* (1) 將自己想法利用程式碼實現
    * 如何把自己的想法先以 pseudo code方式先呈現，並將其轉換成程式碼
* (2) 網頁爬蟲
  * 利用 Selenium webdriver 與 xpath 方式重現點擊至目標網頁
  * 紀錄網頁內資訊
* (3) 熟悉操作 pandas.DataFrame
  * 篩選特定指標，將符合標準之標的物輸出至 csv 檔案

### (B)程式描述：
本身踏入投資理財領域時間很短，以基本面偏重，因此常會以營收或是財報等標準篩選股票，
取得適合的標的物，後再進一步使用技術分析找買點，因此想試試看能不能簡化平常流程，
不用重覆許多複製貼上的動作去篩選股票。

[篩選適合投資標的物](https://www.youtube.com/watch?v=6NGJNkKfOmc)

[篩選適合投資標的物心得紀錄](https://medium.com/@jamisonhuang/%E7%B6%B2%E9%A0%81%E7%88%AC%E8%9F%B2%E7%AF%A9%E9%81%B8%E6%8A%95%E8%B3%87%E6%A8%99%E7%9A%84%E7%89%A9-python-da4029e7a0a3)

此為篩選後的標的物 (1) 成交價位於10~40元 (2) 財報評分 60 以上

<img src="https://i.imgur.com/9RDOSBO.png" alt="Filter後投資標的物" title="width=400" width="500" />


解題想法與概念：
1. 以 webdriver 開啟瀏覽器
2. 利用 find_element_by_xpath 方式到達目標頁面
3. 將目標頁面資訊存入 list 作整理，並將其 300 支股票整理成 dict
4. 將 dict 轉成 DataFrame 以 filter 將 (1) 財報評分>=60 與 
(2) 10 <=成交 <=40 標的物篩選出來