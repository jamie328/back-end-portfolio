## 用Javascript寫一個計算機  <br/>
[計算機連結](https://jamie328.github.io/front-end-portfolio/Calculator/calc.html)<br/>
---
### (A)程式學習到的事情：
* (1) 練習刻畫計算機介面
  * 更瞭解與熟悉 HTML & CSS 
  * 應用 flex 作版面置中管理 
* (2) 使用 Callback 函式與程式邏輯作計算機概念
  * 按下數字鍵有哪些反應
  * 如已有數字按下數字鍵應該直接為字串相加
  * 以陣列去存兩個數字
  * 更熟悉 e.target 等應用

### (B)程式描述：
利用計算機實作強化自己程式邏輯，思考不同情境要怎麼用程式表達，才能達到想要的功能。

[計算機實作心得記錄](https://reurl.cc/yyXM1a)


<img src="./計算機.PNG" alt="計算機" title="width=500" width="250" />
<br/><br/>


解題想法與概念：
1. 使用歸納法，首先計算機分為運算子跟運算元。
2. 切分為data-type =num 為 0~9 <br/>
    data-type = opr 為 MOD+ - X / <br/>
    data-type = sp為 AC DEL = <br/>
    data-type = sp-num 為 . <br/>
3. 撰寫按鍵程式邏輯