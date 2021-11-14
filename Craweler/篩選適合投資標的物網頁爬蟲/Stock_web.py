from selenium import webdriver
import time, csv ,os,json
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from time import sleep
import pandas as pd
import numpy as np
def load_web(url):
	# 不打開瀏覽器執行
	# options = webdriver.ChromeOptions()
	# options.add_argument('--headless')
	driver = webdriver.Chrome()
	driver.maximize_window() #最大化視窗
	driver.set_page_load_timeout(60)  # 等頁面等待載入時間60sec
	driver.get(url) #載入
	button = driver.find_element_by_xpath('//*[@id="MainMenu"]/table/tbody/tr/td[2]/table/tbody/tr[8]/td/nobr/a')
	button.click()
	driver.implicitly_wait(10)	# 等一下
	button2 = driver.find_element_by_xpath('//*[@id="STOCK_LIST_8_4_0"]/tbody/tr[3]/td[3]/nobr[2]/select/option[3]')
	button2.click()
	driver.implicitly_wait(10)	# 等一下
	# 選取指標
	menu = driver.find_element_by_xpath('//*[@id="selSHEET"]')
	menu.click()
	index = driver.find_element_by_xpath('//*[@id="selSHEET"]/option[35]')
	index.click()
	sleep(10)  # 不能refresh 只好等一下
	driver.implicitly_wait(10)	# 等一下
	WebDriverWait(driver, 10).until(
		expected_conditions.presence_of_all_elements_located(
			(By.ID, 'divStockList')
		)  # 很重要，這個步驟為確認 撈取網站內有你所要爬取的內容 這邊是指表格
	) # 等5秒
	return driver
def data_transfer(web):
	# 裝 key 值
	rows_keys = web.find(id='tblStockList').thead.find_all('td')
	data_key = []  # 裝資料key 要寫在前面會比較清楚
	for row in rows_keys:
		data_key.append(row.text.strip())
	# 裝 value 值
	# 有17個tbody，共三層 第一層tbody 第二層tr 第三層td
	rows_values = web.find(id = 'tblStockList').find_all('tbody')
	data_value = []  # 裝資料value
	index = 0 # 代表第幾支股票
	for row in rows_values:
		row_layer1 = row.find_all('tr')
		for row_layer2 in row_layer1:
			row_layer3 = row_layer2.find_all('td')
			data_value.append([])  # 第一支放在第一個list
			for stock_info in row_layer3:
				if stock_info.text.strip():
					data_value[index].append(stock_info.text.strip())
				else:
					data_value[index].append('無資訊')
			index += 1
	return data_key, data_value
def main():
	url = 'https://goodinfo.tw/StockInfo/index.asp'
	date = time.strftime("%Y/%m/%d")  # 爬蟲撈取日期
	try:
		driver = load_web(url)
		# driver.page_source # 相當於requests.get後已拿到text再利用 bs4 解析網頁,以html5編碼
		web = BeautifulSoup(driver.page_source, 'html5lib')
		data_key, data_value= data_transfer(web)
		data_dict = []
		for dim in data_value:  # 有300個字典，每一個字典代表一支股票，一支股票有24個數值與24個key匹配
			data_dict.append(dict(zip(data_key,dim)))
		data_df = pd.DataFrame(data_value,columns = data_key)
		data_df2 = pd.DataFrame(data_dict)
		with open('stock_dict.json', 'w', encoding='utf-8') as f:
			json.dump(data_dict, f, indent=3, sort_keys=False, ensure_ascii=False)
		driver.quit()
	except Exception as e:
		print(e)
def df_arrange():
	with open('stock_dict.json', 'r', encoding='utf-8') as f:
		data_dict = json.load(f)
	df_data = pd.DataFrame(data_dict)
	df_data.to_csv('stock_info.csv',encoding="utf-8-sig", index= False)
	# train_data = pd.DataFrame(data_dict, dtype = float)
	# print(train_data.info())
	train_data = df_data
	train_data['財報評分'] = pd.to_numeric(train_data['財報評分'], errors = 'coerce')
	train_data['成交'] = pd.to_numeric(train_data['成交'], errors = 'coerce')
	filter = (train_data['財報評分']>= 60) & (train_data['成交'] >= 10) & (train_data['成交'] <= 40) # filter
	train_data = train_data[filter]  # 把篩選完結果弄成表格
	print(train_data)
	print('---')
	os.getcwd()
	train_data.to_csv('stock_filter.csv',encoding="utf-8-sig", index = False)
if __name__ == '__main__':
	main()
	df_arrange()