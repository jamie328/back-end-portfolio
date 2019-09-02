import csv
import os

class Time:
    def __init__(self, hh , mm ,ss):
        self.hh = hh
        self.mm = mm
        self.ss = ss
    doubledigit = True
    @staticmethod #說明接下來為 staticmethod，傳入值不被綁定__init__ 因此可隨心所欲
    def setdoubledigit(dd): 
        Date.doubledigit = dd
    @classmethod  #第一個傳入值被綁定，第二個值可當未調用餐數，先到這個類 再回去__init__
    def strTotime(self , timetostr):
        # t = Time()
        hh , mm , ss = map( int, timetostr.split(":"))
        t = self(hh,mm,ss)
        return t
    def between(self, start_time, end_time):
        if self.later(start_time) and self.early(end_time):
            return True
        return False
    def later(self, start_time):
        if (self.hh > start_time.hh):
            return True
        elif (self.hh == start_time.hh):
            if (self.mm > start_time.mm):
                return True
            elif (self.mm == start_time.mm):
                if(self.ss >= start_time.ss):
                    return True
        return False
    def early(self, end_time):
        if (self.hh < end_time.hh):
            return True
        elif (self.hh == end_time.hh):
            if (self.mm < end_time.mm):
                return True
            elif (self.mm == end_time.mm):
                if(self.ss <= end_time.ss):
                    return True
        return False
    def __str__(self):
        return self.tostr()
    def tostr(self):
        if (self.doubledigit == False):
            return str(self.hh) + ":" + str(self.mm) + ":" + str(self.ss)
        else:
            timestr = ""
            if (self.hh < 10):
                timestr += "0" + str(self.hh) + ":"
            else:
                timestr += str(self.hh) + ":"
            if (self.mm < 10):
                timestr += "0" +str(self.mm) + ":"
            else:
                timestr += str(self.mm) + ":"
            if (self.ss < 10):
                timestr += "0" +str(self.ss)
            else:
                timestr += str(self.ss)
            return timestr
def main():
    try:
        user_input_time = input("Please input you want to start_time & end_time:")
        start_time , end_time = user_input_time.split(" ")
    except Exception:
        print("時間格式輸入錯誤")
    start_time = Time.strTotime(start_time)  #轉換成Time
    end_time = Time.strTotime(end_time)  #轉換成Time
    # print(start_time)
    # print(end_time)

    midtermfile = "midterm2.csv" #原始檔案位置
    midterm = open(midtermfile, "r", encoding = "utf-8", newline = "") #開啟檔案
    midterm_dict = csv.DictReader(midterm, delimiter = ",")
    midterm_in_file = "midterm2_sort.csv" #寫入檔案位置
    midterm_sort = open(midterm_in_file, "w", encoding = "utf-8" , newline="") # 開啟檔案
    headers = ['SubmissionID', 'StudentID', 'Problem', 'Status', 'Score', 'CodeLength', 'SubmissionTime']
    writer_midterm_sort = csv.DictWriter(midterm_sort , fieldnames = headers , delimiter = ",")
    count = 0
    Dict_midterm2 = dict()

    writer_midterm_sort.writeheader() #寫入標頭
    for arow in midterm_dict:
        this_time = arow['SubmissionTime'] #把繳交作業的時間記錄下來比對
        this_time = Time.strTotime(this_time) #轉換成 class
        if this_time.between(start_time, end_time):
            writer_midterm_sort.writerow(arow)
            # print(Dict_midterm2[arow ['Problem']] ) #測試是否做對
            count += 1
    # print("count:",count) #計算 midterm_sort 檔內個數 確認是否正確

    midterm.close()
    midterm_sort.close()
    def count(d):  #去計算各Problem 的 Status數量
        if (arow ['Status'] not in d):
            d[arow['Status']] = 1
        else:
            d[arow['Status']] += 1
        return d
    def printdict(d):  #主要讓程式按照Accepted , Complile Error...依序輸出，因字典是無依序的
        for i in status_list_header:
            if i == status_list_header[-1]:
                print(d[i] , end =";")
            else:
                print(d[i] , end = " ")
    midterm_sort_file = "midterm2_sort.csv"
    midterm_sort2 = open(midterm_sort_file, "r", newline = "")
    midterm_sort_dict = csv.DictReader(midterm_sort2 , delimiter = "," )

    status_list_header = ['Accepted', 'Compile Error', 'Runtime Error', 
    'Time Limit Exceed', 'Wrong Answer']
    set_zero = [0, 0, 0, 0, 0]
    dict1 = dict()
    dict2 = dict()
    dict3 = dict()
    dict4 = dict()
    #初始化設定
    for i,j in zip(status_list_header,set_zero):
        dict1[i]=j
        dict2[i]=j
        dict3[i]=j
        dict4[i]=j
    # csv.DictReader 只能使用一次 特別注意 因此 要在一次for迴圈內將dict紀錄完成
    for arow in midterm_sort_dict:
        if arow['Problem'] == '1':
            dict1 = count(dict1)
        if arow['Problem'] == '2':
            dict2 = count(dict2)
        if arow['Problem'] == '3':
            dict3 = count(dict3)
        if arow['Problem'] == '4':
            dict4 = count(dict4)
    # printdict(dict1)
    # printdict(dict2)
    # printdict(dict3)
    # printdict(dict4)
    # print()
    dict_problem = [dict1,dict2,dict3,dict4]
    # pandas & 整合dict1~4
    import pandas as pd 
    index_row = ['第一題','第二題','第三題','第四題']
    df = pd.DataFrame(dict_problem,columns =status_list_header ,index = index_row)
    df.to_csv("期中考批改數據總覽.csv",encoding = 'utf-8-sig')
    print(df)
if __name__ == '__main__':
    main()