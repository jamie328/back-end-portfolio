## 基地台   <br/>
###  (A)程式學習到的事情：
* (1) 邏輯觀念的建立
    * 如何讀把文字敘述先寫成 pseudo code，並將其轉換成程式碼
* (2) 迴圈以及判斷式的使用
  * for , while
* (3) 二維陣列的應用及小技巧
  * list.append, list.remove , input, spilt,
* (4) 此程式困難點
  * 要更新未涵蓋的城鎮點  

### (B)程式描述：
城市內有5個城鎮挑選2個城鎮設置基地台，離基地台距離3以內都可以收到訊號，求設在哪些城市會使基地台效率最大化。
衡量指標為：收到訊號人數。

程式執行畫面使用者輸入城市資訊5,2,3(5個城鎮,2個基地台,3單位內可收到訊號)，城市座標與人數為[0,0,15],[2,3,30],[3,4,20],[-2,-2,40],[-1,4,25]

<img src="https://i.imgur.com/7qEw7wR.png" alt="基地台執行畫面" title="width=300'" width="350" />

解題想法與概念：
1. 因有n個城鎮，取p個城鎮設置基地台，d距離內可以收到訊號
2. 將input城鎮資訊換成二微陣列 [0][0]=x [0][1]=y [0][2]=人數 
    例如有八個城市就會到[7][0] [7][1] [7][2]
3. 可用 while 判斷未取到 p 個基地台重覆執行迴圈
4. 先紀錄當前位置以pow 計算兩點距離累加人數
    從第一個城市當作基地台去計算收到訊號的人數
5. if 判斷如 sumpopulation > maxpopulation做更新
    for i&j 雙層迴圈結束後，會得到訊號最佳的城市作為基地台
6. 將此最佳城市作為基地台可收到訊號的城鎮從 listtown 中刪除
    並重覆執行 3~6