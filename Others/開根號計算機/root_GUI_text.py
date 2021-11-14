import tkinter as tk 
import tkinter.font as tkFont
import math
from PIL import ImageTk  #插圖片用的
class calculator(tk.Frame):   #calculator 繼承tk.Frame 已建立好之class
    flagreset = True #設定歸零鍵
    def __init__(self):
        tk.Frame.__init__(self)
        self.grid()
        self.createwidget()
    def createwidget(self):
        f1 = tkFont.Font(size = 48 , family = "Courier New")
        f2 = tkFont.Font(size = 36, family = "Courier New")
        #顯示計算可打入的視窗
        self.lbtext = tk.Text(self , height = 1 , width = 10 \
        , font = f1)
        self.btnnum1 = tk.Button(self , text = "1", command = self.clickbtnnum1, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum2 = tk.Button(self , text = "2", command = self.clickbtnnum2, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum3 = tk.Button(self , text = "3", command = self.clickbtnnum3, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum4 = tk.Button(self , text = "4", command = self.clickbtnnum4, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum5 = tk.Button(self , text = "5", command = self.clickbtnnum5, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum6 = tk.Button(self , text = "6", command = self.clickbtnnum6, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum7 = tk.Button(self , text = "7", command = self.clickbtnnum7, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum8 = tk.Button(self , text = "8", command = self.clickbtnnum8, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum9 = tk.Button(self , text = "9", command = self.clickbtnnum9, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnum0 = tk.Button(self , text = "0", command = self.clickbtnnum0, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnumAC = tk.Button(self , text = "AC", command = self.clickbtnnumAC, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btnnumdot = tk.Button(self , text = ".", command = self.clickbtnnumdot, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        self.btndel = tk.Button(self , text = "Del", command = self.clickbtnnumdel, \
        height = 1 , width = 2, font = f2) #按鈕按完觸發的事件
        # self.sqrtimg = ImageTk.PhotoImage(file = "C:\\Users\\b1013\\Desktop\\Pythoncode3\\sqrt.png")
        self.btnnumsqrt = tk.Button(self, text ="sqrt", command = self.clickbtnnumsqrt, \
        height = 1 , width =2, font = f2) #按鈕按完觸發的事件
        self.lbtext.grid(row = 0, column = 0, columnspan = 3)
        self.btnnum1.grid(row = 1, column = 0, sticky = tk.SE + tk.NW)
        self.btnnum2.grid(row = 1, column = 1, sticky = tk.SE + tk.NW)
        self.btnnum3.grid(row = 1, column = 2, sticky = tk.SE + tk.NW)
        self.btnnum4.grid(row = 2, column = 0, sticky = tk.SE + tk.NW)
        self.btnnum5.grid(row = 2, column = 1, sticky = tk.SE + tk.NW)
        self.btnnum6.grid(row = 2, column = 2, sticky = tk.SE + tk.NW)
        self.btnnum7.grid(row = 3, column = 0, sticky = tk.SE + tk.NW)
        self.btnnum8.grid(row = 3, column = 1, sticky = tk.SE + tk.NW)
        self.btnnum9.grid(row = 3, column = 2, sticky = tk.SE + tk.NW)
        self.btnnum0.grid(row = 4, column = 0,  sticky = tk.SE + tk.NW)
        self.btnnumAC.grid(row = 4, column = 1, sticky = tk.SE + tk.NW)
        self.btnnumdot.grid(row = 4, column= 2, sticky = tk.SE+ tk.NW )
        self.btndel.grid(row = 5, column = 0 , sticky = tk.SE+ tk.NW)
        self.btnnumsqrt.grid(row = 5, column = 1, columnspan = 2, sticky = tk.SE + tk.NW)
    def clickbtnnum1(self):
        self.change_labtext("1") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum2(self):
        self.change_labtext("2") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum3(self):
        self.change_labtext("3") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum4(self):
        self.change_labtext("4") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum5(self):
        self.change_labtext("5") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum6(self):
        self.change_labtext("6") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum7(self):
        self.change_labtext("7") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum8(self):
        self.change_labtext("8") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum9(self):
        self.change_labtext("9") #進去change_labnum 做判斷與作數字更改
    def clickbtnnum0(self):
        self.change_labtext("0") #進去change_labnum 做判斷與作數字更改
    def clickbtnnumdot(self):
        if self.flagreset == True:
            pass  # do nothing
        else:
            self.lbtext.insert(tk.END, ".")
    def clickbtnnumAC(self):
        self.lbtext.delete("1.0", tk.END)
        self.lbtext.insert("1.0", "0")
        self.flagreset = True
    def clickbtnnumdel(self):
        curnum = self.lbtext.get("1.0", tk.END)
        curnum = curnum[:-2]  #後面有個空格
        self.lbtext.delete("1.0", tk.END)
        self.lbtext.insert("1.0", curnum)
        self.flagreset = False
    def change_labtext(self , content):
        if self.flagreset == True:
            self.lbtext.delete("1.0", tk.END) #刪除第一行全部
            self.lbtext.insert("1.0", content)
        else:
            if (content == "0") and (float(self.lbtext.get("1.0", tk.END)) == 0) :
                self.lbtext.delete("1.0", tk.END) #刪除第一行全部
                self.lbtext.insert("1.0", content)
            else:
                if self.lbtext.get("1.0", tk.END) == "0":
                    self.lbtext.delete("1.0", tk.END) #刪除第一行全部
                    self.lbtext.insert("1.0", content)
                else:
                    self.lbtext.insert(tk.END, content)
        self.flagreset = False
    def clickbtnnumsqrt(self):
        curnum = float(self.lbtext.get("1.0", tk.END))
        self.lbtext.delete("1.0", tk.END) #刪除第一行全部
        self.lbtext.insert("1.0", str(round(math.sqrt(curnum),2)))
        self.flagreset = True  #因為下一次輸入為新的數值，必須觸動鍵盤0~9
def main():
    cal = calculator()
    cal.master.title("My calculator")
    cal.mainloop()
if __name__ == '__main__':
    main()
