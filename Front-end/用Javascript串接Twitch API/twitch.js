const request = new XMLHttpRequest(); //rq
const client = 'g7o1paeiwxkakqj4qs2zajdixk595n';
const game_num = 6;
let game_name = encodeURIComponent('League of Legends');
let base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;  //https://api.twitch.tv/kraken/games/top
// 要拿到channel name https://twitch.tv/channel_name
// json.streams[i].channels 有資訊 url,game,broadcaster_language, status
// json.streams[i].viewers 有觀看人數
// json.streams[i].preview.medium 圖片
function put_live(json){
    // 把抓好的json放到頁面上
    const live_container = document.querySelector('.live'); 
    live_container.innerHTML = ''; //清空
    console.log(json.streams.length)
    for(let i=0; i<json.streams.length;i++){
        const game_tv = document.createElement("div");  //創建物件
        game_tv.classList.add('game-tv'); // 加入class
        game_tv.innerHTML = `
        <a class="game-link" href="${json.streams[i].channel.url}" target="_blank">
        <div class="lang">Language ： ${json.streams[i].channel.broadcaster_language}</div>
        <div class="viewer">Viewer：${json.streams[i].viewers}</div>
        <div class="pic">
            <img src="${json.streams[i].preview.medium}">
        </div>
        <div class="tv-name">Topic ： ${json.streams[i].channel.status}</div>
        </a>
        `; // 把資訊引入
        live_container.appendChild(game_tv);
    }
}
function download_twitch(){
    request.onload = function(){
        if (request.status>=200 && request.status<400){
            const response = request.responseText;
            const json = JSON.parse(response);
            console.log(json.streams);
            put_live(json);
        }else{
            console.log('error');
        }
    }
    request.open("GET",base_url,true); //非同步
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID',client);
    request.send();
}

document.querySelector(".container").addEventListener("click", 
    function(e){
        if (e.target.classList.value === 'lol'){
            game_name = encodeURIComponent('League of Legends');
            base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
            download_twitch();
        }else if (e.target.classList.value === 'hs'){
            game_name = encodeURIComponent('Hearthstone');
            base_url = `https://api.twitch.tv/kraken/streams/?game=${game_name}&limit=${game_num}`;
            download_twitch();
        }
    }
)