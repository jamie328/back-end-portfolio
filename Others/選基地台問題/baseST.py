import math
#先寫出 二維陣列 後續再改成輸入形式
listinfo=[] #二維陣列 存取基本資訊 n, p, d
for i in range(1):
	listinfo.append(input("請輸入你要求解的題目以','分隔 \
		\n(1) 城市內的城鎮數 (2) 挑選幾個城鎮 (3) 基地台可分享距離:").split(","))
	for j in range(3):
		listinfo[i][j]=int(listinfo[i][j])
	n = listinfo[0][0] #幾個城鎮
	p = listinfo[0][1] #挑幾個城鎮
	d = listinfo[0][2] #距離數
#前兩個為座標 第三個為城鎮人數\
arrtown = [] #存取城鎮座標與人口數的陣列
for i in range(n):
	arrtown.append(input("輸入各城鎮的座標與城鎮人數以','進行分隔，\
		\n依序為(1) X座標 (2) Y座標 (3) 城鎮人數:").split(",")) #存取城鎮座標與人口數 並以tab鍵分開
	for j in range(3): #因為只會存進 X座標 Y座標 及人數
		arrtown[i][j]=int(arrtown[i][j])
# arrtown=[[3, -2, 10], [-1, 1, 15], [-1, 4 ,10], [3, 2, 20], [4, 3 ,20], [-3, -4, 25], [2, -3, 15], [0, 2, 10]]
# ans=pow(pow((arrtown[7][0]-arrtown[3][0]),2)+ pow((arrtown[7][1]-arrtown[3][1]),2),0.5)

#程式概念 應該先由城鎮由0~7 只要"座標距離"<=d 將人數加總 sumpopulation 如果maxpopulation最大則選擇此點設為基地台 超過p則break

listtown=[] #城鎮list
finalmaxpopulation=0 #總涵蓋收訊人數加總
chosentownlist =[]  #空的 作為記錄每一次 被選擇之城市

for i in range(n): #弄出所有townlist
	listtown.append(i)
	
chose=0 #代表已選擇之城鎮個數
print('未選擇前的所有城鎮為:',[i+1 for i in listtown])
while (chose < p): 
	sumpopulation=0 # 每一次紀錄要歸零 
	maxpopulation=-1 #要更新
	listsignal=[] #空的 最大就能放入
	listtownsignal=[] #作為刪除用
	chosentown = 0 # 紀錄每一次被選擇之城市 但會一直被修改

	for i in range(n): #從0開始 由各城鎮座標當基準點依序尋找
		sumpopulation=0
		curx = arrtown[i][0] #存取現在位置的X座標
		cury = arrtown[i][1] #存取現在位置的Y座標
		curpop = arrtown[i][2] #存取現在位置城鎮人口數
		listsignal=[] #空的
		for j in listtown: 
			criteria=pow(pow((curx-arrtown[j][0]),2)+ pow((cury-arrtown[j][1]),2),0.5)
			if (criteria - d <= 0.001): #距離數 < d
				sumpopulation+= arrtown[j][2]
				# print("第", i ,"個當起始點其範圍內可收到訊號城鎮為:",j)
				listsignal.append(j) #從0開始各城鎮為基準點，將符合條件之收訊範圍存入listsignal
				
		# print(sumpopulation)  #記錄用看哪邊有錯
		# print(listsignal)	
		# print()	
		
		if (maxpopulation < sumpopulation): #更新本次最大可收訊人數 以及 本次可收訊之城鎮 及被選擇設基地台之城市
			maxpopulation = sumpopulation
			listtownsignal = listsignal
			chosentown = i+1 
	print("第",chose+1,"涵蓋收訊城市為:",[town+1 for town in listtownsignal])
	print("第",chose+1,"選擇基地台城市為:",chosentown)
	#去刪除已有收訊之城鎮 很重要******
	for i in listtownsignal:
		listtown.remove(i)
	
	finalmaxpopulation += maxpopulation #作加總
	chosentownlist.append(chosentown) #把每一次選擇的城鎮放入陣列中
	chose+=1 
	print("第",chose,"次最大涵蓋人數:",maxpopulation)
	print("第",chose,"剩下未涵蓋收訊城市為:",[town+1 for town in listtown])
print("選擇之城鎮有:", chosentownlist , "選擇設基地台個數總涵蓋收訊人數:" , finalmaxpopulation)



