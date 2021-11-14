from bs4 import BeautifulSoup
import requests
def get_web(url):
	web = requests.get(url)
	if web.status_code == 200:
		return web.text
	else:
		return "出現錯誤囉!!"
def main():
	web = get_web("https://nba.udn.com/nba/cate/6754")
	web_content = BeautifulSoup(web , 'html5lib')
	web_content = web_content.find('div','box_body')
	print(web_content)
if __name__ == '__main__':
	main()