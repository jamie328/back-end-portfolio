## 上機期中考批改數據整理
---
### (A)程式學習到的事情：
* (1) 邏輯觀念的建立
    * 如何讀把文字敘述先寫成 pseudo code，並將其轉換成程式碼
* (2) Class 方法(Method)與屬性(Attribute)應用
  * __init__運用
  * @classmethod  #第一個傳入值被綁定，第二個值可當未調用餐數，先到這個類 再回去__init__
  * @staticmethod #說明接下來為 staticmethod，傳入值不被綁定__init__
* (3) csv 讀取與寫入
  * DictReader & DictWriter 搭配 for 作 csv 寫入
* (4) Dict 與 pandas.DataFrame 小技巧
  * 因有期中考有四題，因此要計算各題批改結果是落在 Accepted , Compile Error 等哪個種類，用if 判斷，如無則新增字典，有在字典內則個數加一
  * 學習用 pandas.DataFrame 表達方式練習輸出 

### (B)程式描述：
將 midterm2.csv 檔案內的學生繳交的資料作整理，檔案內重要訊息為：(1) 繳交時間 (2) 繳交題目 (3) 批改結果，其中批改結果包含 Accepted、Compile Error、Runtime Error、Time Limit Exceed、Wrong Answer 五種，想要整理各題目學生的答題狀況。

程式執行畫面為使用者輸入 11:30:00 ~ 12:00:00 學生繳交期中考的批改數據整理
<img src="https://i.imgur.com/3lOU3Pl.png" alt="期中考批改數據" title="width=300'" width="350" />

解題想法與概念：
1. 將使用輸入時間範圍轉成小時、分鐘、秒數作為可比較的數據
2. 把 midterm2.csv 利用 DictReader 轉為 Dict 並把學生繳交時間轉為數據
3. 以 自己寫的 Time Class 篩選符合使用者所輸入的時間範圍，並輸出至新的 csv 檔案
4. 將符合使用者輸出的數據依照各題目作五種批改結果分類的加總
5. 將數據轉成 DataFrame 方式並輸出 csv