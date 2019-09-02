import json,os,requests,time,datetime,re,sqlite3
from bs4 import BeautifulSoup
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import jieba
jieba.set_dictionary('dict.txt.big.txt')
from collections import Counter
ptt_url = 'https://www.ptt.cc'
def get_web(url):
    web = requests.get(url)
    if web.status_code == 200:
        return web.text
    else:
        print('出現錯誤')
        return None
def this_page_movie_info(web,criteria,movie_list):
    web_content = BeautifulSoup(web,'html5lib')
    last_page = web_content.find('div','btn-group btn-group-paging').find_all('a')[1]['href']
    divs = web_content.find_all('div','r-ent')
    for div in divs:
        art_date = div.find('div','date').text.strip()
        art_title = div.find('div', 'title').text.strip()
        art_type = art_title[0:4]
        if art_date != criteria and art_type == '[好雷]':
            # 整理標題資訊 re.compile(u"[\u4e00-\u9fa5]+")
            art_title = art_title.lstrip(art_type)
            movie_list.append({
                'date': art_date,
                'title':art_title
            })
    # 日期如果不是criteria日期則遞迴自己
    if art_date != criteria:
        web = get_web(ptt_url+last_page)
        this_page_movie_info(web,criteria,movie_list)
    return movie_list
    # action-bar-container > div > div.btn-group.btn-group-paging
def main():
    web = get_web(ptt_url + '/bbs/movie/index.html')
    criteria = '12/31' #停止日期
    movie_list = []
    movie_list = this_page_movie_info(web,criteria,movie_list)
    with open('movie_excellent.json', 'w', encoding='utf-8') as f:
        json.dump(movie_list, f, indent=3, sort_keys=True, ensure_ascii=False)
def execute_db(file_name, sql_cmd):
    conn = sqlite3.connect(file_name)
    c = conn.cursor()
    c.execute(sql_cmd)
    conn.commit()
    conn.close()

def database(movie_counter):
    os.remove('movie.sqlite')  # 因為資料庫存在就不能覆蓋，因此用os手動移除
    db_name = 'movie.sqlite'
    sql_cmd = 'CREATE TABLE record (id INTEGER PRIMARY KEY AUTOINCREMENT, keyword TEXT, frequency INTEGER)'
    # 建立資料庫
    execute_db(db_name, sql_cmd)
    # 寫入資料
    for key,value in movie_counter.items():
        sql_cmd = 'INSERT INTO record(keyword, frequency) VALUES ("%s", %d)' %(key, int(value))
        execute_db(db_name, sql_cmd)
    # 從 SQLite 資料庫排序資料
    sql_cmd = 'SELECT id,keyword,frequency FROM record ORDER BY frequency DESC'
    execute_db(db_name, sql_cmd)

def cloud_movie():
    # 因爬蟲速度太慢因此直接由json讀取上一次爬完的資料
    with open('movie_excellent.json', 'r', encoding='utf-8') as f:
        movie_list = json.load(f)
    token = []
    for row in movie_list:
        title = row['title']
        for seg in jieba.cut(title):
            if seg.split() and len(seg) > 1: #seg.split()使它成為list
                token += [seg]
    movie_counter = Counter(token)
    # 寫入資料庫 關鍵字發生次數
    # database(movie_counter)
    # print(movie_counter)
    print(movie_counter.most_common(30))
    wcloud = WordCloud(font_path='D:\\myenv\\crawler\\Lib\\site-packages\\wordcloud\\NotoSansMonoCJKtc-Regular.otf'\
                       ,width = 2400, height = 1800).generate(' '.join(token))
    plt.imshow(wcloud)
    plt.axis('off')
    plt.show()

if __name__ == '__main__':
    # main()
    cloud_movie()